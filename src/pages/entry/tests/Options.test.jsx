import { render, screen } from "../../../test-utils/testing-library-utils";
import Options from "../Options";

test("it displays image for each scoop from the server", async () => {
  render(<Options optionType="scoops" />);

  //   Find images $ sign in RegEx indicates that scoop is at the end
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  //   confirm alt text of images
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("it displays image for each topping from the server", async () => {
  render(<Options optionType="toppings" />);

  //   Find images $ sign in RegEx indicates that scoop is at the end
  const scoopImages = await screen.findAllByRole("img", { name: /topping$/i });
  expect(scoopImages).toHaveLength(3);

  //   confirm alt text of images
  const imageTitles = scoopImages.map((element) => element.alt);
  expect(imageTitles).toEqual(["Cherries topping", "M&Ms topping", "Hot Fudge topping"]);
});
