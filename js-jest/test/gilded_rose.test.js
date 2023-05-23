const Shop = require("../src/gilded_rose");
const Item = require("../src/components/item");
const Template = require("../src/components/template");
const Conjured = require("../src/components/conjured");
const Sulfuras = require("../src/components/sulfuras");
const AgedBrie = require("../src/components/agedBrie");
const Backstage = require("../src/components/backstage");

const TestRequirements = require("./texttest_fixture");

describe("Gilded Rose", () => {
  describe("upon initiation", () => {
    test("can be initiated as an empty array", () => {
      const gildedRose = new Shop();
      expect(gildedRose.items).toEqual([]);
    });

    test("it maps item objects into template objects", () => {
      const gildedRose = new Shop([new Item("foo", 10, 5)])
      expect(gildedRose.items[0] instanceof Template).toEqual(true);
    });
  })
  
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
      const gildedRose = new Shop([new AgedBrie(2, 0)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(1);
      expect(gildedRose.items[0].quality).toBe(1);
    });

    test("quality should not increase beyond 50", () => {
      const gildedRose = new Shop([new AgedBrie(2, 49)]);
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(0);
      expect(gildedRose.items[0].quality).toBe(50);
    });

    test("should gain twice the quality points once expired", () => {
      const gildedRose = new Shop([new AgedBrie(1, 0)]);
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(-1);
      expect(gildedRose.items[0].quality).toBe(3);
    });
  });

  describe("for sulfuras the legendary item", () => {
    test("it should not gain or lose quality", () => {
      const gildedRose = new Shop([new Sulfuras(0, 80)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(0);
      expect(gildedRose.items[0].quality).toBe(80);
    });

    test("does not change sellIn value", () => {
      const gildedRose = new Shop([new Sulfuras(-1, 80)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(-1);
      expect(gildedRose.items[0].quality).toBe(80);
    });
  });

  describe("for conjured items", () => {
    test("it loses quality by 2 points on a regular day", () => {
      const gildedRose = new Shop([new Conjured(2, 4)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(1);
      expect(gildedRose.items[0].quality).toBe(2);
    });

    test("it loses quality by 4 points when expired", () => {
      const gildedRose = new Shop([new Conjured(1, 8)]);
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(-1);
      expect(gildedRose.items[0].quality).toBe(2);
    });
  });

  describe("for backstage passes", () => {
    test("it gains quality by 1 point when expiration > 10 until expiry", () => {
      const gildedRose = new Shop([new Backstage(11, 0)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(10);
      expect(gildedRose.items[0].quality).toBe(1);
    });

    test("it gains quality by 2 points when 5 < expiration <= 10 days until expiry", () => {
      const gildedRose = new Shop([new Backstage(10, 0)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(9);
      expect(gildedRose.items[0].quality).toBe(2);
    });

    test("it gains quality by 3 points when 0 < expiration <= 5 days until expiry", () => {
      const gildedRose = new Shop([new Backstage(5, 0)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(4);
      expect(gildedRose.items[0].quality).toBe(3);
    });

    test("quality drops to 0 if expiration date has passed", () => {
      const gildedRose = new Shop([new Backstage(0, 10)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(-1);
      expect(gildedRose.items[0].quality).toBe(0);
    });

    test("its quality cannot rise over 50", () => {
      const gildedRose = new Shop([new Backstage(21, 49)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(20);
      expect(gildedRose.items[0].quality).toBe(50);
    });

    test("its quality cannot leap over 50", () => {
      const gildedRose = new Shop([new Backstage(1, 49)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(0);
      expect(gildedRose.items[0].quality).toBe(50);
    });

    test("its quality cannot increase if already at 50", () => {
      const gildedRose = new Shop([new Backstage(1, 50)]);
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
      shop = new Shop([
        new Item("+5 Dexterity Vest", 10, 20),
        new AgedBrie(2, 0),
        new Item("Elixir of the Mongoose", 5, 7),
        new Sulfuras(0, 80),
        new Sulfuras(-1, 80),
        new Backstage(15, 20),
        new Backstage(10, 10),
        new Backstage(5, 10),
        new Backstage(5, 0),
        new Conjured(2, 12),
      ]);
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
