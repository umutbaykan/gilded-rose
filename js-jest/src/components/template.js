class Template {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  update() {
    this.sellIn -= 1;
    if (this.isExpired()) {
      this.reduceQuality(2);
    } else {
      this.reduceQuality(1);
    }
  }

  isExpired() {
    if (this.sellIn < 0) {
      return true;
    } else {
      return false;
    }
  }

  reduceQuality(amount) {
    if (this.quality > 0) {
      this.quality -= amount;
    }
  }

  addQuality(amount) {
    if (this.quality + amount > 50) {
      this.quality = 50;
    } else {
      this.quality += amount;
    }
  }
}

module.exports = Template;
