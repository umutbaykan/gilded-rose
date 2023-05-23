# Gilded Rose Challenge

This challenge has been completed as part of the Makers course.
The goal is to simplify handling of the drop in quality and sellIn values of the items in the shop and make it easy in the future to add specialised items which require unique handling of these values.

Approach
---
Items react differently to conditions, some lose more quality over time, whereas others gain instead of losing. One thing they have in common is that one way or another, they all get updated (yes, that even includes sulfuras items, not reacting to changes is also part of updating). With that in mind, we can utilise class inheritence and create a parent template object which all the items would inherit their core methods and attributes from.

This template object defines the attributes and helper methods which all children inherit. If children have different rules apply to them while being updated, they override the update() method and apply their own set of rules. This greatly reduces the overall complexity of the operation, so next time we need to add a new item to shop (that needs its own set of rules) we only need to create a new class object under the components folder and override where required. If we need to create a new object that follows the standard set of rules for quality and sellIn during update, we simply create a new Template object (or Item, whichever you prefer as Shop class automatically maps all Item objects into Template objects, more on that later).

Shop class in this scenario becomes a very simple holding class which just stores the items and invokes the update method in each of them. Lets imagine further down the line there is a requirement for boosting quality, which when invoked, boosts the quality of all items by +10. With our current configuration, all we would need to do is to add a boostQuality() method in the template and define it to increase the quality by 10 and all children objects would automatically inherit it. The shop class would only need to invoke item.boostQuality() while iterating through the loop. If some objects had a different reaction (such as sulfuras, which never changes quality) we would need to override the boostQuality() method in sulfuras class with an empty method.

As it stands, Item and Template classes are way too similar and could be considered as duplicates. This is only done as the requirements were <b>not to modify the Item class</b> in any way, therefore a Template class which stores all the helper methods was created. To get around the issue of Item objects that were already created, Shop class maps them to Template objects prior to conducting any operations so they share all the helper methods.

There is a separate branch on this project called methods, where the project was completed using one single Shop class which handles different rules applying to items through methods. While both methods work, I personally prefer the approach described above as it is easier to read and update.

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

If you wish to add a specific item to be run in batch testing, you need to add it in two separate files (under the requirements array in texttest_fixture.js and during initiation of the shop class in gilded_rose.test.js) See examples below;

```js
//gilded_rose.test.js
//Batch tests are stored under the describe block
//with the "test fixture scenarios" mark:

shop = new Shop([
  new Item("+5 Dexterity Vest", 10, 20),
  new Item("Aged Brie", 2, 0)
  // Add your new item here
  new Item("My new Item", 10, 9)
  ]);
  
//texttest_fixture.js  
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

Keep in mind that the requirements imported from texttest_fixture file (and their states on given dates) are used in tests, so please make sure to add the expected states in the given days under requirements inside the file. They are all index based, so you need to add them in the correct order.
