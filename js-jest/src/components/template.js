const { isExpired, reduceQuality } = require("./helpers");

class Template {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  update() {
    this.sellIn -= 1;
    if (isExpired(this)) {
      reduceQuality(this, 2);
    } else {
      reduceQuality(this, 1);
    }
  }
}

module.exports = Template;
