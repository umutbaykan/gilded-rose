const Item = require("./item")

class Backstage extends Item {
  constructor(sellIn, quality) {
    super("Backstage passes to a TAFKAL80ETC concert", sellIn, quality)
  }

  update() {
    this.sellIn -= 1
    if (this.isExpired()) {
      this.quality = 0;
    } else if (this.sellIn < 5) {
      this.addQuality(3);
    } else if (this.sellIn < 10) {
      this.addQuality(2);
    } else {
      this.addQuality(1);
    }
  }
}

module.exports = Backstage