class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
    this.specialItems = {
      "Aged Brie": {qualityHandle: (item) => this.adjustAgedBrieQuality(item), sellInHandle: (item) => this.adjustSellIn(item)},
      "Sulfuras, Hand of Ragnaros":  {qualityHandle: ()=>{return}, sellInHandle: ()=>{return}},
      "Conjured Mana Cake":  {qualityHandle: (item) => this.adjustConjuredQuality(item), sellInHandle: (item) => this.adjustSellIn(item)},
      "Backstage passes to a TAFKAL80ETC concert":  {qualityHandle: (item) => this.adjustBackstageQuality(item), sellInHandle: (item) => this.adjustSellIn(item)},
    };
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const currentItem = this.items[i];
      if (currentItem.name in this.specialItems) {
        this.specialItems[currentItem.name].sellInHandle(currentItem)
        this.specialItems[currentItem.name].qualityHandle(currentItem)
      } else {
        this.adjustSellIn(currentItem);
        this.adjustGeneralQuality(currentItem, 1);
      }
    }
  }

  // Adjustment methods
  // These methods change the quality / sellIn attributes of the items

  reduceQuality(item, factor) {
    if (item.quality > 0) {
      item.quality -= factor;
    }
  }

  addQuality(item, factor) {
    if (item.quality + factor > 50) {
      item.quality = 50
    } else {
      item.quality += factor;
    }
  }

  adjustSellIn(item) {
    item.sellIn -= 1;
  }

  // Item specific adjustments
  adjustAgedBrieQuality(item) {
    if (this.isExpired(item)) {
      this.addQuality(item, 2);
    } else {
      this.addQuality(item, 1);
    }
  }

  adjustConjuredQuality(item) {
    if (this.isExpired(item)) {
      this.reduceQuality(item, 4);
    } else {
      this.reduceQuality(item, 2);
    }
  }

  adjustGeneralQuality(item) {
    if (this.isExpired(item)) {
      this.reduceQuality(item, 2);
    } else {
      this.reduceQuality(item, 1);
    }
  }

  adjustBackstageQuality(item) {
    if (this.isExpired(item)) {
      item.quality = 0
    } else if (item.sellIn < 5) {
      this.addQuality(item, 3);
    } else if (item.sellIn < 10) {
      this.addQuality(item, 2);
    } else {
      this.addQuality(item, 1);
    }
  }

  // Helper methods

  isExpired(item) {
    if (item.sellIn < 0) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = {
  Item,
  Shop,
};
