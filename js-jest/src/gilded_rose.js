const Template = require("./components/template");
const Item = require("../src/components/item");

class Shop {
  constructor(items = []) {
    this.items = items.map((item) => {
      if (item instanceof Item) {
        return new Template(item.name, item.sellIn, item.quality);
      } else {
        return item;
      }
    });
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].update();
    }
  }
}

module.exports = Shop;
