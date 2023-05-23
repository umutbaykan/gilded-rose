class Shop {
  constructor(items = []) {
    this.items = items;
    this.specialItems = {
      "Aged Brie": {
        qualityHandle: (item) => this.adjustItemQuality(item, this.addQuality, 1, 2),
        sellInHandle: (item) => this.adjustSellIn(item),
      },
      "Sulfuras, Hand of Ragnaros": {
        qualityHandle: () => { return; },
        sellInHandle: () => { return; },
      },
      "Conjured Mana Cake": {
        qualityHandle: (item) => this.adjustItemQuality(item, this.reduceQuality, 2, 2),
        sellInHandle: (item) => this.adjustSellIn(item),
      },
      "Backstage passes to a TAFKAL80ETC concert": {
        qualityHandle: (item) => this.adjustBackstageQuality(item),
        sellInHandle: (item) => this.adjustSellIn(item),
      },
    };
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const currentItem = this.items[i];
      if (currentItem.name in this.specialItems) {
        this.specialItems[currentItem.name].sellInHandle(currentItem);
        this.specialItems[currentItem.name].qualityHandle(currentItem);
      } else {
        this.adjustSellIn(currentItem);
        this.adjustItemQuality(currentItem, this.reduceQuality, 1, 2);
      }
    }
  }

  // Item specific adjustments

  adjustItemQuality(item, operation, amount, factor) {
    if (this.isExpired(item)) {
      operation(item, amount * factor);
    } else {
      operation(item, amount);
    }
  }

  adjustBackstageQuality(item) {
    if (this.isExpired(item)) {
      item.quality = 0;
    } else if (item.sellIn < 5) {
      this.addQuality(item, 3);
    } else if (item.sellIn < 10) {
      this.addQuality(item, 2);
    } else {
      this.addQuality(item, 1);
    }
  }

  // Helper methods

  reduceQuality(item, amount) {
    if (item.quality > 0) {
      item.quality -= amount;
    }
  }

  addQuality(item, amount) {
    if (item.quality + amount > 50) {
      item.quality = 50;
    } else {
      item.quality += amount;
    }
  }

  adjustSellIn(item) {
    item.sellIn -= 1;
  }

  isExpired(item) {
    if (item.sellIn < 0) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = Shop