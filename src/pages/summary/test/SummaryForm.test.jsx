import {
  screen,
  render,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import SummaryFrom from "../SummaryFrom";
import userEvent from "@testing-library/user-event";

test("Initial conditions", () => {
  render(<SummaryFrom />);
  const termCheckbox = screen.getByRole("checkbox", {
    name: /I agree to Terms and Conditions/i,
  });
  expect(termCheckbox).not.toBeChecked();

  const confirmButton = screen.getByRole("button", { name: "Confirm order" });
  expect(confirmButton).toBeDisabled();
});

test("Checkbox enables button on first click and disables on second click", () => {
  render(<SummaryFrom />);
  const confirmButton = screen.getByRole("button", { name: "Confirm order" });
  const termCheckbox = screen.getByRole("checkbox");

  userEvent.click(termCheckbox);
  expect(confirmButton).toBeDisabled();

  userEvent.click(termCheckbox);
  expect(confirmButton).toBeDisabled();
});

test("popover responds to hover", async () => {
  render(<SummaryFrom />);

  //initial state
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  //popover appears when we mouse over
  const termsAndConditions = screen.getByText(/Terms and Conditions/i);
  userEvent.hover(termsAndConditions);
  const popover = await screen.findByText(
    /no ice cream will actually be delivered/i
  );
  expect(popover).toBeInTheDocument();

  //popover disappears when we mouse out
  userEvent.unhover(termsAndConditions);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i)
  );
});
