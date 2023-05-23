const Item = require("./item")

class Sulfuras extends Item {
  constructor(sellIn, quality) {
    super('Sulfuras, Hand of Ragnaros', sellIn, quality)
  }

  update() {
  }
}

module.exports = Sulfuras