import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

test("check initial conditions", () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", { name: /terms and conditions/i });
  const button = screen.getByRole("button", { name: /confirm order/i });

  expect(button).toBeDisabled();
  expect(checkbox).not.toBeChecked();
});

test("Enable on first click and disable on second", () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", { name: /terms and conditions/i });
  const button = screen.getByRole("button", { name: /confirm order/i });

  userEvent.click(checkbox);
  expect(button).toBeEnabled();

  userEvent.click(checkbox);
  expect(button).toBeDisabled();
});

test("Popover responds to hover", async () => {
  render(<SummaryForm />);

  // Popover starts hidden
  const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i);
  expect(nullPopover).not.toBeInTheDocument();

  // Popover appears on mouseover
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // Popover disappears on mouse out
  userEvent.unhover(termsAndConditions);
  await waitForElementToBeRemoved(() => screen.queryByText(/no ice cream will actually be delivered/i));
});
