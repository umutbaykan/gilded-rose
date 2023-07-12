const isExpired = (item) => {
  if (item.sellIn < 0) {
    return true;
  } else {
    return false;
  }
};

const reduceQuality = (item, amount) => {
  if (item.quality > 0) {
    item.quality -= amount;
  }
};

const addQuality = (item, amount) => {
  if (item.quality + amount > 50) {
    item.quality = 50;
  } else {
    item.quality += amount;
  }
};

module.exports = {
  isExpired,
  reduceQuality,
  addQuality,
};
