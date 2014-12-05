# TiUniversalPopover

The TiUniversalPopover common.js module for Titanium that emulates [Ti.UI.iPad.Popover](http://docs.appcelerator.com/titanium/3.0/#!/api/Titanium.UI.iPad.Popover) on non iPad devices. On iPad it creates native Ti.UI.iPad.Popover, on the other it opens styled window with closing on background click. 

Useful for launching iPad apps on iPhones.
##Installation

Copy `UniversalPopover.js` in `app/lib` folder.

##Usage
```js
Ti.UI.Popover = require("UniversalPopover");
```
In `.XML` files simply add namespace attribute
```xml
<Popover ns="Ti.UI.Popover" id="popover">
<ContentView ns="Ti.UI.Popover">
<NavigationWindow>
...
</NaigationWindow>
</ContentView>
</Popover>
```
`<ContentView>` supports have both View or Window as a child.

Or in vanilla Titanium
```js
var contentView = Ti.UI.createView({
backgroundColor:"red",
width:"50%",
height:"50%"
});
var popover = Ti.UI.Popover.createPopover({
contentView: contentView,   //can set only on creation
width: 200,
height: 200
});
popover.show();    
```

License
----
MIT
