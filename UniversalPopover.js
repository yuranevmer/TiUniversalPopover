if (isIpad()) {
    exports.createPopover = function(args, o){
        return Ti.UI.iPad.createPopover(args, o);
    }; 
} else {
    exports.createPopover = function(args, o){
        return new Popover(args, o);
    }; 
};

/*
 * Popover
 */
function Popover(args,o){
    var self = this;
    var contentView;
    this.contentWindow = null;
    this._args = args || {};
    this._args = _.extend({    //default style
        width: "80%",
        height: "80%",
        borderRadius: 8,
        opacity: 0
    }, args);
    Object.defineProperty(this, "contentView",{
        set: function(cv){
            contentView = cv;
            if (isWindow(contentView)) {
                contentView.applyProperties(this._args);
                this.contentWindow = contentView;
            } else {
                this.contentWindow = Ti.UI.createWindow(this._args);
                this.contentWindow.add(contentView);
            }
        },
        get: function(){
            return contentView;
        }
    });
    if (this._args.contentView) {
        this.contentView = this._args.contentView;
    }
    this.bg = Ti.UI.createWindow({
        backgroundColor: "black",
        opacity: 0.3
    });
    this.bg.addEventListener("click", function(){
        self.hide();
    });
}


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
 * helpers
 */
function isWindow(view){
    return !!(view.getApiName && view.getApiName().match(/window/i));
}
function isIpad(){
    return (Titanium.Platform.osname.match(/ipad/gi));
}
