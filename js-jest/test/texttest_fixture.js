const { Shop, Item } = require("../src/gilded_rose");

const items = [
  new Item("+5 Dexterity Vest", 10, 20),
  new Item("Aged Brie", 2, 0),
  new Item("Elixir of the Mongoose", 5, 7),
  new Item("Sulfuras, Hand of Ragnaros", 0, 80),
  new Item("Sulfuras, Hand of Ragnaros", -1, 80),
  new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
  new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10),
  new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10),

  // This Conjured item does not work properly yet
  new Item("Conjured Mana Cake", 3, 6),
];

// Content commented out to ensure data does not print in tests

// const days = Number(process.argv[2]) || 2;
// const gildedRose = new Shop(items);
// console.log("OMGHAI!");

// for (let day = 0; day < days; day++) {
//   console.log(`\n-------- day ${day} --------`);
//   console.log("name, sellIn, quality");
//   items.forEach(item => console.log(`${item.name}, ${item.sellIn}, ${item.quality}`));
//   gildedRose.updateQuality();
// }

const requirements = {
  day1: [
    ["+5 Dexterity Vest", 9, 19],
    ["Aged Brie", 1, 1],
    ["Elixir of the Mongoose", 4, 6],
    ["Sulfuras, Hand of Ragnaros", 0, 80],
    ["Sulfuras, Hand of Ragnaros", -1, 80],
    ["Backstage passes to a TAFKAL80ETC concert", 14, 21],
    ["Backstage passes to a TAFKAL80ETC concert", 9, 12],
    ["Backstage passes to a TAFKAL80ETC concert", 4, 13],
    ["Conjured Mana Cake", 2, 4],
  ],
  day2: [
    ["+5 Dexterity Vest", 8, 18],
    ["Aged Brie", 0, 2],
    ["Elixir of the Mongoose", 3, 5],
    ["Sulfuras, Hand of Ragnaros", 0, 80],
    ["Sulfuras, Hand of Ragnaros", -1, 80],
    ["Backstage passes to a TAFKAL80ETC concert", 13, 22],
    ["Backstage passes to a TAFKAL80ETC concert", 8, 14],
    ["Backstage passes to a TAFKAL80ETC concert", 3, 16],
    ["Conjured Mana Cake", 1, 2],
  ],
  day3: [
    ["+5 Dexterity Vest", 7, 17],
    ["Aged Brie", -1, 4],
    ["Elixir of the Mongoose", 2, 4],
    ["Sulfuras, Hand of Ragnaros", 0, 80],
    ["Sulfuras, Hand of Ragnaros", -1, 80],
    ["Backstage passes to a TAFKAL80ETC concert", 12, 23],
    ["Backstage passes to a TAFKAL80ETC concert", 7, 16],
    ["Backstage passes to a TAFKAL80ETC concert", 2, 19],
    ["Conjured Mana Cake", 0, 0],
  ],
  day6: [
    ["+5 Dexterity Vest", 4, 14],
    ["Aged Brie", -4, 10],
    ["Elixir of the Mongoose", -1, 0],
    ["Sulfuras, Hand of Ragnaros", 0, 80],
    ["Sulfuras, Hand of Ragnaros", -1, 80],
    ["Backstage passes to a TAFKAL80ETC concert", 9, 27],
    ["Backstage passes to a TAFKAL80ETC concert", 4, 23],
    ["Backstage passes to a TAFKAL80ETC concert", -1, 0],
    ["Conjured Mana Cake", -3, 0],
  ],
};

module.exports = { items: items, requirements: requirements };
