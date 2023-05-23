# Gilded Rose Challenge

This challenge has been completed as part of the Makers course.
The goal is to simplify handling of the drop in quality and sellIn values of the items in the shop and make it easy in the future to add specialised items which require unique handling of these values.

The updateQuality in the Shop class has been divided into several sections to achieve these goals:

Helpers
--
These methods are developed to avoid repeating the conditional checks required while handling item attributes. They have built in methods that avoid unwanted scenarios (such as item quality going above 50 or dropping below 0).

Adjusters
--
These methods define how an item attribute is handled based on different conditions. Most items fundamentally share a similar handling; quality either increase or decreases with a specific factor amount (multiplied by 2 for most cases). Therefore adjustItemQuality is designed in such a way that it takes in 4 arguments as below;

```js
  adjustItemQuality(item, operation, amount, factor) {
  // Item to modify 
  // The operation to conduct on it (addition or reduction)
  // Amount that will change when the item sellIn value is >=0
  // The factor amount will get multiplied by once sellIn value is < 0 
    if (this.isExpired(item)) {
      operation(item, amount * factor);
    } else {
      operation(item, amount);
    }}
```

## Getting started

Once you are in the folder you want to clone into, type in the code below:

```sh
git clone https://github.com/umutbaykan/gilded-rose.git
cd gilded-rose
# Install dependencies
npm install
```

## Running tests

To run all tests

```sh
npm test
```

To run all tests in watch mode

```sh
npm run test:watch
```

To generate test coverage report

```sh
npm run test:coverage
```

To see the quality and sellIn values of a particular item in a given date:

```sh
# Will print out day 0 and 1.
node test/texttest_fixture.js
# (Optional) Will print out all the days leading up to (but not inclusive) of the number provided.
node test/texttest_fixture.js 100
```

If you wish to add a specific item to be run in batch testing, you can add it through texttest_fixture.js file.
Keep in mind that the items in this file (and their states on given dates) are used in tests, so please make sure to add the expected states in the given dates under requirements inside the file. They are all index based, so you need to add them in the correct order.

```js
//texttest_fixture.js
const items = [
  new Item("+5 Dexterity Vest", 10, 20),
  new Item("Aged Brie", 2, 0)
  // Add your new item here
  new Item("My new Item", 10, 9)
  ];
  
const requirements = {
  day1: [
    ["+5 Dexterity Vest", 9, 19],
    ["Aged Brie", 1, 1],
    // Add the expected state of your new item here
    ["My new Item", 8, 8]
   ],
  
  day2: [
    ["+5 Dexterity Vest", 8, 18],
    ["Aged Brie", 0, 2],
    // Don't forget to add the states for all given dates as well
    ["My new Item", 6, 7]
   ],
```

