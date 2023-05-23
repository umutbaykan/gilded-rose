const { Shop } = require("./gilded_rose");

class Brie extends Shop {
  // adjustItemQuality(item) {
  //   if (this.isExpired(item)) {
  //     this.addQuality(item)
  //   }
  // }
  steps(item) {
    item.quality = 25
  }
}

module.exports = Brie;

// const Something = require('./src/some_test')
// s = new Something()