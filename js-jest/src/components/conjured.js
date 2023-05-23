const { isExpired, reduceQuality } = require("./helpers");
const Template = require("./template");

class Conjured extends Template {
  constructor(sellIn, quality) {
    super("Conjured Mana Cake", sellIn, quality);
  }

  update() {
    this.sellIn -= 1;
    if (isExpired(this)) {
      reduceQuality(this, 4);
    } else {
      reduceQuality(this, 2);
    }
  }
}

module.exports = Conjured;
