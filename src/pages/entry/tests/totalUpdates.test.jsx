import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";
import Options from "../Options";

test("update scoop subtotal when scoop changes", async () => {
  render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });

  // Make sure total starts out at $0
  const scoopsSubtotal = screen.getByText("Scoops total: $", {
    exact: false,
  });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // Update vanilla scoops to 1 and check subtotal
  const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" });
  const chocolateInput = await screen.findByRole("spinbutton", { name: "Chocolate" });

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  //Update chocolate scoops to 2 and check subtotal
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});
