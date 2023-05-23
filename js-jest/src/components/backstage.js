const { isExpired, addQuality } = require("./helpers");
const Template = require("./template");

class Backstage extends Template {
  constructor(sellIn, quality) {
    super("Backstage passes to a TAFKAL80ETC concert", sellIn, quality);
  }

  update() {
    this.sellIn -= 1;
    if (isExpired(this)) {
      this.quality = 0;
    } else if (this.sellIn < 5) {
      addQuality(this, 3);
    } else if (this.sellIn < 10) {
      addQuality(this, 2);
    } else {
      addQuality(this, 1);
    }
  }
}

module.exports = Backstage;
