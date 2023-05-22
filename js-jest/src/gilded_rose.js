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
    this.qualityOverrideValues = {
      "Aged Brie": 1,
      "Sulfuras, Hand of Ragnaros": 0,
      "Conjured Mana Cake": -2,
      "Backstage passes to a TAFKAL80ETC concert": 1,
    };
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const currentItem = this.items[i];
      if (currentItem.name in this.qualityOverrideValues) {
        this.adjustSpecialItemSellIn(currentItem);
        this.adjustSpecialItemQuality(currentItem);
      } else {
        this.adjustSellIn(currentItem);
        const valueToSubtract = this.qualityDefaultLossAmount(currentItem);
        this.adjustQuality(currentItem, valueToSubtract);
      }
    }
  }

  // Global settings

  qualityDefaultLossAmount(item) {
    if (this.checkIfExpired(item)) {
      return -2;
    } else {
      return -1;
    }
  }

  // Adjustment methods
  // These methods change the quality / sellIn attributes of the items

  adjustQuality(item, factor) {
    if (item.quality > 0) {
      item.quality += factor;
    }
  }

  adjustSellIn(item) {
    item.sellIn -= 1;
  }

  adjustSpecialItemQuality(item) {
    if (item.name === "Aged Brie") {
      if (this.itemCanIncreaseQuality(item)) {
        item.quality += this.qualityOverrideValues[item.name];
      }
    } else if (item.name === "Sulfuras, Hand of Ragnaros") {
      return;
    } else if (item.name === "Conjured Mana Cake") {
      if (this.checkIfExpired(item)) {
        this.adjustQuality(item, this.qualityOverrideValues[item.name] * 2
        );
      } else {
        this.adjustQuality(item, this.qualityOverrideValues[item.name]
        );
      }
    } else if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
      if (this.itemCanIncreaseQuality(item)) {
        item.quality += this.qualityOverrideValues[item.name];
      }
    }
  }

  adjustSpecialItemSellIn(item) {
    if (item.name === "Sulfuras, Hand of Ragnaros") {
      return;
    } else {
      this.adjustSellIn(item);
    }
  }

  // Helper methods

  checkIfExpired(item) {
    if (item.sellIn < 0) {
      return true;
    } else {
      return false;
    }
  }

  itemCanIncreaseQuality(item) {
    if (item.quality === 50) {
      return false;
    } else {
      return true;
    }
  }

  // updateQuality() {
  //   for (let i = 0; i < this.items.length; i++) {
  //     const currentItem = this.items[i];
  //     if (currentItem.name in this.qualityOverrideValues) {
  //       this.adjustQuality(currentItem, this.qualityOverrideValues.currentItem);
  //     } else {
  //       this.adjustQuality(currentItem, -1)
  // if (currentItem.quality < 50) {
  //   currentItem.quality = currentItem.quality + 1;
  //   if (currentItem.name == 'Backstage passes to a TAFKAL80ETC concert') {
  //     if (currentItem.sellIn < 11) {
  //       if (currentItem.quality < 50) {
  //         currentItem.quality = currentItem.quality + 1;
  //       }
  //     }
  //     if (currentItem.sellIn < 6) {
  //       if (currentItem.quality < 50) {
  //         currentItem.quality = currentItem.quality + 1;
  //       }
  //     }
  //   }
  // }
  //     }
  //     if (currentItem.name != 'Sulfuras, Hand of Ragnaros') {
  //       currentItem.sellIn = currentItem.sellIn - 1;
  //     }
  //     if (currentItem.sellIn < 0) {
  //       if (currentItem.name != 'Aged Brie') {
  //         if (currentItem.name != 'Backstage passes to a TAFKAL80ETC concert') {
  //           if (currentItem.quality > 0) {
  //             if (currentItem.name != 'Sulfuras, Hand of Ragnaros') {
  //               currentItem.quality = currentItem.quality - 1;
  //             }
  //           }
  //         } else {
  //           currentItem.quality = currentItem.quality - currentItem.quality;
  //         }
  //       } else {
  //         if (currentItem.quality < 50) {
  //           currentItem.quality = currentItem.quality + 1;
  //         }
  //       }
  //     }
  // }

  //   return this.items;
  // }
}

module.exports = {
  Item,
  Shop,
};
