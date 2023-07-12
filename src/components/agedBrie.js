const { isExpired, addQuality } = require("./helpers");
const Template = require("./template");

class AgedBrie extends Template {
  constructor(sellIn, quality) {
    super("Aged Brie", sellIn, quality);
  }

  update() {
    this.sellIn -= 1;
    if (isExpired(this)) {
      addQuality(this, 2);
    } else {
      addQuality(this, 1);
    }
  }
}

module.exports = AgedBrie;
