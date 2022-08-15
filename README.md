# Alter-Bible.com-URLs-JavaScript-Plugin

This plugin was created for the purpose of altering Bible.com URLs ons a web page depending on the Bible version selected.

A demo of this code in action can be found on <a href="https://codepen.io/boksburger/pen/JjLmwma" target="_blak">codepen.io</a>

## Available Options:

```
  elementID: "myElement", //Element to which the plugin will be applied
  showHeading: true, //Wheather to display the heading
  dynamicHeadings: true, //Display the selected item version as the header
  headingText: "Yout Text Here",
  headingSize: 1, //h1
  dynamicURLText: true, //Append 'ver' to the anchor text
  hoverText: "Choose the Bible version.", //Text to appear on hover of the 'select' element
  defaultOption: "Original version", //Default select option (has a value of "0")
  versions: [{version: "King James", ver: "KJV", code: "1"}] //String[] of Bible versions
 ```
