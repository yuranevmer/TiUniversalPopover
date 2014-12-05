if (isIpad()) {
    exports.createPopover = function(args, o){
        return Ti.UI.iPad.createPopover(args, o);
    }; 
    exports.createContentView = function(args, o){
        return Ti.UI.iPad.createContentView(args, o);
    };    
} else {
    exports.createPopover = function(args, o){
        return new Popover(args, o);
    }; 
    exports.createContentView = function(args, o){
        return new ContentView(args, o);
    };    
};

/*
 * Popover
 */
function Popover(args,o){
    var self = this;
    args = args || {};
    this._args = args;
    this.contentView = null;
    this.contentWindow = null; //root window for contentView
    this._args = _.extend({    //default style
        width: "80%",
        height: "80%",
        borderRadius: 8,
        opacity: 0
    }, args);
    if (this._args.contentView) {
        var contentView = new ContentView();
        this.add(contentView);
        contentView.add(this._args.contentView);
    }
    this.bg = Ti.UI.createWindow({
        backgroundColor: "black",
        opacity: 0.3
    });
    this.bg.addEventListener("click", function(){
        self.hide();
    });
}

Popover.prototype.add = function(view){
    view._popover = this;
    this._content = view;
};

// popover public api
Popover.prototype.show = function(){
    var openAnim = Ti.UI.createAnimation({
        opacity: 1,
        duration: 300
    });
    this.bg.open();  
    this.contentWindow.open(openAnim);  
};
Popover.prototype.hide = function(){
    this.bg.close();  
    this.contentWindow.close();  
};


/*
 * simulate ContentView
 */
function ContentView(args,o){
    
}
ContentView.prototype.add = function(view){
    if (isWindow(view)) {
        view.applyProperties(this._popover._args);
        this._popover.contentWindow = view;
        this._popover.contentView = view;
    } else {
        this._popover.contentView = view;
        this._popover.contentWindow = Ti.UI.createWindow(this._popover._args);
        this._popover.contentWindow.add(this._popover.contentView);
    }
};

/*
 * helpers
 */
function isWindow(view){
    return !!(view.getApiName && view.getApiName().match(/window/i));
}
function isIpad(){
    return (Titanium.Platform.osname.match(/ipad/gi));
}
