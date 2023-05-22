const {Shop, Item} = require("../src/gilded_rose");
const { requirements } = require("./texttest_fixture");
const TestItems = require("./texttest_fixture").items
const TestRequirements = require("./texttest_fixture").requirements

describe("Gilded Rose", () => {

  let shop;
  let items;
  let requirements;

  beforeEach(() => {
    items = TestItems
    requirements = TestRequirements
    shop = new Shop(items)
  })

  it("should foo", () => {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });
});
