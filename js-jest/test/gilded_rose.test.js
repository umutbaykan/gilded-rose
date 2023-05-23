const Shop = require("../src/gilded_rose");
const Item = require("../src/item")
const TestItems = require("./texttest_fixture").items;
const TestRequirements = require("./texttest_fixture").requirements;

describe("Gilded Rose", () => {
  describe("for regular items that have >0 quality and sellIn", () => {
    test("they should only drop by one", () => {
      const gildedRose = new Shop([new Item("foo", 10, 5)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(9);
      expect(gildedRose.items[0].quality).toBe(4);
    });

    test("quality should never drop below 0", () => {
      const gildedRose = new Shop([new Item("foo", 10, 1)]);
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(8);
      expect(gildedRose.items[0].quality).toBe(0);
    });

    test("their quality drops by two if sellIn date is <0", () => {
      const gildedRose = new Shop([new Item("foo", 1, 4)]);
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(-1);
      expect(gildedRose.items[0].quality).toBe(1);
    });
  });

  describe("for aged brie", () => {
    test("it should gain quality every day", () => {
      const gildedRose = new Shop([new Item("Aged Brie", 2, 0)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(1);
      expect(gildedRose.items[0].quality).toBe(1);
    });

    test("quality should not increase beyond 50", () => {
      const gildedRose = new Shop([new Item("Aged Brie", 2, 49)]);
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(0);
      expect(gildedRose.items[0].quality).toBe(50);
    });

    test("should gain twice the quality points once expired", () => {
      const gildedRose = new Shop([new Item("Aged Brie", 1, 0)]);
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(-1);
      expect(gildedRose.items[0].quality).toBe(3);
    });
  });

  describe("for sulfuras the legendary item", () => {
    test("it should not gain or lose quality", () => {
      const gildedRose = new Shop([
        new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      ]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(0);
      expect(gildedRose.items[0].quality).toBe(80);
    });

    test("does not change sellIn value", () => {
      const gildedRose = new Shop([
        new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      ]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(-1);
      expect(gildedRose.items[0].quality).toBe(80);
    });
  });

  describe("for conjured items", () => {
    test("it loses quality by 2 points on a regular day", () => {
      const gildedRose = new Shop([new Item("Conjured Mana Cake", 2, 4)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(1);
      expect(gildedRose.items[0].quality).toBe(2);
    });

    test("it loses quality by 4 points when expired", () => {
      const gildedRose = new Shop([new Item("Conjured Mana Cake", 1, 8)]);
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(-1);
      expect(gildedRose.items[0].quality).toBe(2);
    });
  });

  describe("for Backstage passes", () => {
    test("it gains quality by 1 point when expiration > 10 until expiry", () => {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 11, 0),
      ]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(10);
      expect(gildedRose.items[0].quality).toBe(1);
    });

    test("it gains quality by 2 points when 5 < expiration <= 10 days until expiry", () => {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 0),
      ]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(9);
      expect(gildedRose.items[0].quality).toBe(2);
    });

    test("it gains quality by 3 points when 0 < expiration <= 5 days until expiry", () => {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 0),
      ]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(4);
      expect(gildedRose.items[0].quality).toBe(3);
    });

    test("quality drops to 0 if expiration date has passed", () => {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10),
      ]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(-1);
      expect(gildedRose.items[0].quality).toBe(0);
    });

    test("its quality cannot rise over 50", () => {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 21, 49),
      ]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(20);
      expect(gildedRose.items[0].quality).toBe(50);
    });

    test("its quality cannot leap over 50", () => {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 1, 49),
      ]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(0);
      expect(gildedRose.items[0].quality).toBe(50);
    });

    test("its quality cannot increase if already at 50", () => {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 1, 50),
      ]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(0);
      expect(gildedRose.items[0].quality).toBe(50);
    });
  });

  describe("test fixture scenarios", () => {
    let shop;
    let requirements;

    beforeEach(() => {
      requirements = TestRequirements;
      const unmodifiedCopy = JSON.parse(JSON.stringify(TestItems));
      shop = new Shop(unmodifiedCopy);
    });

    test("should pass accordingly for day 1", () => {
      shop.updateQuality();
      for (let i = 0; i < shop.items.length; i++) {
        expect(shop.items[i].sellIn).toEqual(requirements.day1[i][1]);
        expect(shop.items[i].quality).toEqual(requirements.day1[i][2]);
      }
    });

    test("should pass accordingly for day 2", () => {
      for (let i = 0; i < 2; i++) {
        shop.updateQuality();
      }
      for (let i = 0; i < shop.items.length; i++) {
        expect(shop.items[i].sellIn).toEqual(requirements.day2[i][1]);
        expect(shop.items[i].quality).toEqual(requirements.day2[i][2]);
      }
    });

    test("should pass accordingly for day 3", () => {
      for (let i = 0; i < 3; i++) {
        shop.updateQuality();
      }
      for (let i = 0; i < shop.items.length; i++) {
        expect(shop.items[i].sellIn).toEqual(requirements.day3[i][1]);
        expect(shop.items[i].quality).toEqual(requirements.day3[i][2]);
      }
    });

    test("should pass accordingly for day 6", () => {
      for (let i = 0; i < 6; i++) {
        shop.updateQuality();
      }
      for (let i = 0; i < shop.items.length; i++) {
        expect(shop.items[i].sellIn).toEqual(requirements.day6[i][1]);
        expect(shop.items[i].quality).toEqual(requirements.day6[i][2]);
      }
    });

    test("should pass accordingly for day 100", () => {
      for (let i = 0; i < 100; i++) {
        shop.updateQuality();
      }
      for (let i = 0; i < shop.items.length; i++) {
        expect(shop.items[i].sellIn).toEqual(requirements.day100[i][1]);
        expect(shop.items[i].quality).toEqual(requirements.day100[i][2]);
      }
    });
  });
});
