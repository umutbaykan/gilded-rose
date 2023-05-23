const Item = require("./item")

class Conjured extends Item {
  constructor(sellIn, quality) {
    super('Conjured Mana Cake', sellIn, quality)
  }
}

module.exports = Conjured