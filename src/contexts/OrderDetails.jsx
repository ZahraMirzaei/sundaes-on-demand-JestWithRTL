import { createContext, useState, useMemo, useEffect, useContext } from "react";
import { pricePerItem } from "../constants";

//format number as currency
function formatCurrency(currency) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(currency);
}

// eslint-disable-next-line react-hooks/rules-of-hooks
const OrderDetails = createContext();

function useOrderDetails() {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error(
      "useOrderDetails must be used within an OrderDetailsProvider"
    );
  }
  return context;
}

function calculateSubtotal(optionType, optionCounts) {
  let optionCount = 0;
  for (const count of optionCounts[optionType].values()) {
    optionCount += count;
  }

  return optionCount * pricePerItem[optionType];
}

function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });

  const zeroCurrency = formatCurrency(0);
  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  });

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal("scoops", optionCounts);
    const toppingSubtotal = calculateSubtotal("toppings", optionCounts);
    const grandTotal = scoopsSubtotal + toppingSubtotal;
    setTotals({
      scoops: formatCurrency(scoopsSubtotal),
      toppings: formatCurrency(toppingSubtotal),
      grandTotal: formatCurrency(grandTotal),
    });
  }, [optionCounts]);

  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, optionType) {
      const newOptionCounts = { ...optionCounts };

      // update option count for this item with the new value
      const optionCountsMap = optionCounts[optionType];
      optionCountsMap.set(itemName, parseInt(newItemCount));

      setOptionCounts(newOptionCounts);
    }
    return [{ ...optionCounts, totals }, updateItemCount];
  }, [optionCounts, totals]);

  return <OrderDetails.Provider value={value} {...props} />;
}

export { OrderDetailsProvider, useOrderDetails };
