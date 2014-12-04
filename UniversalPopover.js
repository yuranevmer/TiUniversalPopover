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
 * simulate Popover
 */
function Popover(args,o){
    var self = this;
    this.contentWindow = null;
    this.contentView = null;
    args = args || {};
    this._args = _.extend({
        width: "80%",
        height: "80%",
        borderRadius: 8,
        opacity: 0
    }, args);
    this.bg = Ti.UI.createWindow({
        backgroundColor: "black",
        opacity: 0.3
    });
    this.bg.addEventListener("click", function(){
        self.hide();
    });
}
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
Popover.prototype.add = function(view){
    view._parent = this;
};
Popover.prototype.setContentView = function(view){
    this.contentWindow.removeAllChildren();
    this.contentView = view;  
    this.contentWindow.add(this.contentView);
};


/*
 * simulate ContentView
 */
function ContentView(args,o){
    
}
ContentView.prototype.add = function(view){
    if (isWindow(view)) {
        view.applyProperties(this._parent._args);
        this._parent.contentWindow = view;
        this._parent.contentView = view;
    } else {
        this._parent.contentView = view;
        this._parent.contentWindow = Ti.UI.createWindow(this._parent._args);
        this._parent.contentWindow.add(this._parent.contentView);
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
