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
    this.overrideItems = {
      'Aged Brie': 1, 
      'Sulfuras, Hand of Ragnaros': 0,
      'Conjured Mana Cake': -2, 
      'Backstage passes to a TAFKAL80ETC concert': 0
    }
  }

  lowerSellIn(item) {
    item.sellIn -= 1;
  }

  adjustQuality(item, factor) {
  if (item.quality > 0) {
    item.quality += factor;
    }
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const currentItem = this.items[i];
      if (currentItem.name in this.overrideItems) {
        this.adjustQuality(currentItem, this.overrideItems[currentItem.name]);
      } else {
      this.adjustQuality(currentItem, -1);}
      
      this.lowerSellIn(currentItem);
    }
  }

  // updateQuality() {
  //   for (let i = 0; i < this.items.length; i++) {
  //     const currentItem = this.items[i];
  //     if (currentItem.name in this.overrideItems) {
  //       this.adjustQuality(currentItem, this.overrideItems.currentItem);
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
