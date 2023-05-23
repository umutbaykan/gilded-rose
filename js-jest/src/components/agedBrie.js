const Item = require("./item")

class AgedBrie extends Item {
  constructor(sellIn, quality) {
    super('Aged Brie', sellIn, quality)
  }

  update() {
    this.sellIn -= 1
    if (this.isExpired()) {
      this.addQuality(2);
    } else {
      this.addQuality(1)
    }
  }
}

module.exports = AgedBrie