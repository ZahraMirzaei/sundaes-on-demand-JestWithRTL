import { screen, render, fireEvent } from "@testing-library/react";
import SummaryFrom from "../SummaryFrom";

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

  fireEvent.click(termCheckbox);
  expect(confirmButton).toBeEnabled();

  fireEvent.click(termCheckbox);
  expect(confirmButton).toBeDisabled();
});
