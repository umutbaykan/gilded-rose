const {Shop, Item} = require("../src/gilded_rose");
const TestItems = require("./texttest_fixture").items
const TestRequirements = require("./texttest_fixture").requirements

describe("Gilded Rose", () => {

  let shop;
  let items;
  let requirements;

  beforeEach(() => {
    items = TestItems
    requirements = TestRequirements
  })

  describe('for regular items that have >0 quality and sellIn', () => {
    test('on day1 it should only drop by one', () => {
      const gildedRose = new Shop([new Item("foo", 10, 5)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(9);
      expect(gildedRose.items[0].quality).toBe(4);
    })
  })
});
