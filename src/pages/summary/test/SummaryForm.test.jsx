import { render, screen, fireEvent } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

test("check initial conditions", () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", { name: /terms and conditions/i });
  const button = screen.getByRole("button", { name: /confirm order/i });

  expect(button).toBeDisabled();
  expect(checkbox).not.toBeChecked();
});

test("Enable on first click and diable on second", () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", { name: /terms and conditions/i });
  const button = screen.getByRole("button", { name: /confirm order/i });

  fireEvent.click(checkbox);
  expect(button).toBeEnabled();

  fireEvent.click(checkbox);
  expect(button).toBeDisabled();
});
