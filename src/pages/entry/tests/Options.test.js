import { render, screen } from "../../../test-utils/testing-library-utils";

import Options from "../Options";

test("displays image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  //find images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  //confirm alt text of images
  //@ts-ignore
  //☝ to ignore typescript error about Property 'alt' does not exist on type 'HTMLElement'. (she just right click on alt and ignore error)
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("display image for each toppings options from server", async () => {
  render(<Options optionType="toppings" />);

  const toppingsImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });

  expect(toppingsImages).toHaveLength(3);

  //check the actual alt text for the images
  //@ts-ignore
  const imageTitles = toppingsImages.map((img) => img.alt);
  expect(imageTitles).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});
