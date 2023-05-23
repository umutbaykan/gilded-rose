const Template = require("./template");

class Conjured extends Template {
  constructor(sellIn, quality) {
    super("Conjured Mana Cake", sellIn, quality);
  }

  update() {
    this.sellIn -= 1;
    if (this.isExpired()) {
      this.reduceQuality(4);
    } else {
      this.reduceQuality(2);
    }
  }
}

module.exports = Conjured;
