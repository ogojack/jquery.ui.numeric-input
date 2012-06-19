/**
 * Created with JetBrains WebStorm.
 * User: Eugene Grebeshkov
 * Date: 13.06.12
 * Time: 9:54
 * To change this template use File | Settings | File Templates.
 */
(function( $ ) {

    $.widget( "custom.numericInput", {


        // These options will be used as defaults

        options: {
            clear: null,
            cssClass:"b-vivo-numeric-input",
            minValue:1,
            maxValue:10,
            defValue:0,
            step:1,
            format:'number'
        },

        _wrapper:null,_btnInc:null,_btnDec:null,_interval:null,_value:0,

        // Set up the widget
        _create: function() {

            if (this.element.get(0).tagName.toLowerCase()==="input"){
                this._wrapper=$("<div />").addClass(this.options.cssClass);
                this.element.wrap(this._wrapper);
                this._wrapper=this.element.parent();
            }
            else{
                this.element.addClass(this.options.cssClass+"_input");
            }
            var _btnWrap=$("<div />").addClass(this.options.cssClass+"_button-block");
            this._btnInc=$("<span />")
                .addClass(this.options.cssClass+"_button-inc")
                .appendTo(_btnWrap)
                .bind("mousedown", $.proxy( this._btnIncMouseDown, this ))
                .bind("mouseup", $.proxy( this._btnIncMouseUp, this ));

            this._btnDec=$("<span />")
                .addClass(this.options.cssClass+"_button-dec")
                .appendTo(_btnWrap)
                .bind("mousedown", $.proxy( this._btnDecMouseDown, this ))
                .bind("mouseup", $.proxy( this._btnDecMouseUp, this ));
            _btnWrap.append(this._btnInc,this._btnDec);
            this._wrapper.append(_btnWrap);
        },
        _init:function(){
            this._value=this.options.defValue;
            this.setValue();
        },
        _doIncrement:function(){
            if (this._value<this.options.maxValue){
                this._value+=this.options.step;
                this.setValue();
            }
        },
        _doDecrement:function(){
            if (this._value>this.options.minValue){
                this._value-=this.options.step;
                this.setValue();
            }
        },
        _btnIncMouseDown:function(event){
            var self=this;
            this._interval=setInterval(function(){
                self._doIncrement.call(self);
            },100);

        },
        _btnIncMouseUp:function(event){
            clearInterval(this._interval);
        },


        _btnDecMouseDown:function(event){
            var self=this;
            this._interval=setInterval(function(){
                self._doDecrement.call(self);
            },100);

        },
        _btnDecMouseUp:function(event){
            clearInterval(this._interval);
        },
        _btnDecClick:function(event){
            if (this._value>this.options.minValue){
                this._value-=this.options.step;
                this.setValue();
            }
        },

        setValue:function(){
           if (this.options.format==='minutes'&&this._value<10) {
               this.element.val("0"+this._value);
           }
            else{
               this.element.val(this._value);
           }
        },


        // Use the _setOption method to respond to changes to options

        _setOption: function( key, value ) {

            switch( key ) {

                case "clear":
                    // handle changes to clear option

                    break;

            }

            // In jQuery UI 1.8, you have to manually invoke the _setOption method from the base widget

            $.Widget.prototype._setOption.apply( this, arguments );
            // In jQuery UI 1.9 and above, you use the _super method instead
            this._super( "_setOption", key, value );

        },

        // Use the destroy method to clean up any modifications your widget has made to the DOM

        destroy: function() {

            // In jQuery UI 1.8, you must invoke the destroy method from the base widget

            $.Widget.prototype.destroy.call( this );
            // In jQuery UI 1.9 and above, you would define _destroy instead of destroy and not call the base method

        }

    });

}( jQuery ) );

