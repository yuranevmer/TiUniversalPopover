//set namespace
Ti.UI.Popover = require("UniversalPopover");

//create UI
var win = Ti.UI.createWindow({
    backgroundColor: "white"
});
var button = Ti.UI.createButton({
    title: "Click Me!"
});
win.add(button);

button.addEventListener("click", function(){
    //create popover and content view
    var contentView = Ti.UI.createView({
        backgroundColor:"red",
        width:"50%",
        height:"50%"
    });
    var popover = Ti.UI.Popover.createPopover({
        backgroundColor: "blue",
        contentView: contentView,
        width: 200,
        height: 200
    });
    popover.show();    
});

win.open();
