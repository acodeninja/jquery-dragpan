/*jshint -W117 */
$.widget( "oml.dragpan", {
    
    // The widget default options
    _defaults: {
        speedX: 10, // X Speed default is 10
        speedY: 10, // Y Speed default is 10
        cursor: 'all-scroll', // Cursor default is all-scroll
        on: true // Default to turning on dragpan on calling the function
    },
    vars: {},

    // The public functions
    on: function () {
        // Set the cursor
        _this.options.$parent.css( "cursor", _this.options.cursor );
        
        // Disable selection dragging
        _this.vars.$parent.css( "-webkit-touch-callout", "none" );
        _this.vars.$parent.css( "-webkit-user-select", "none" );
        _this.vars.$parent.css( "-khtml-user-select", "none" );
        _this.vars.$parent.css( "-moz-user-select", "-moz-none" );
        _this.vars.$parent.css( "-ms-user-select", "none" );
        _this.vars.$parent.css( "user-select", "none" );

        // Add the mouse binding
        this._addMouseBinding();
    },
    off: function () {
        // Enable selection dragging if it was enabled to begin with
        if (_this.vars.selection === true) {
            _this.vars.$parent.css( "-webkit-touch-callout", "all" );
            _this.vars.$parent.css( "-webkit-user-select", "all" );
            _this.vars.$parent.css( "-khtml-user-select", "all" );
            _this.vars.$parent.css( "-moz-user-select", "all" );
            _this.vars.$parent.css( "-ms-user-select", "all" );
            _this.vars.$parent.css( "user-select", "all" );
        }

        // Set back to default cursor
        _this.options.$parent.css( "cursor", "default" );

        // Remove the mouse binding
        this._removeMouseBinding();
    },

    // The class construct
    _create: function() {
        // This fix
        _this = this;

        // Set the parent option as we cannot do this in defaults
        _this._defaults.$parent = $(_this.element);

        // Set the options based on the defaults (if we have any options)
        if (typeof _this.options === 'undefined') {
            _this.options = _this._defaults;
        } else {
            _this.options = $.extend( _this._defaults, _this.options );
        }
        if (typeof _this.options.parent === 'object') {
            _this.options.$parent = _this.options.parent;
        }

        // Set up the variables used in the function
        
        // Set up child and parent elements
        _this.vars.$parent = _this.options.$parent;
        _this.vars.$child = _this.vars.$parent.children();

        // Find out the maximum scroll positions
        _this.vars.maxX = _this.vars.$child.prop('scrollWidth');
        _this.vars.maxY = _this.vars.$child.prop('scrollHeight');

        // Set the current X and Y scroll position
        _this.vars.posX = _this.vars.$parent.scrollLeft();
        _this.vars.posY = _this.vars.$parent.scrollTop();

        // Set last X and Y to 0 to create the variable
        _this.vars.lastPosX = 0;
        _this.vars.lastPosY = 0;

        // Find out if text selection was enabled before
        _this.vars.selection = false;
        if ( _this.vars.$parent.css( "-webkit-touch-callout" ) !== 'none' ){
            _this.vars.selection = true;
        }
        if ( _this.vars.$parent.css( "-webkit-user-select" ) !== 'none' ){
            _this.vars.selection = true;
        }
        if ( _this.vars.$parent.css( "-khtml-user-select" ) !== 'none' ){
            _this.vars.selection = true;
        }
        if ( _this.vars.$parent.css( "-moz-user-select" ) !== 'none' ){
            _this.vars.selection = true;
        }
        if ( _this.vars.$parent.css( "-ms-user-select" ) !== 'none' ){
            _this.vars.selection = true;
        }
        if ( _this.vars.$parent.css( "user-select" ) !== 'none' ){
            _this.vars.selection = true;
        }

        // If the scroll event is triggered then update scroll position (keys and wheel)
        _this.vars.$parent.scroll( function () {
            _this.vars.posX = _this.vars.$parent.scrollLeft();
            _this.vars.posY = _this.vars.$parent.scrollTop();
        });

        // Trigger the mouse binding if this is set to on
        if( _this.options.on === true ) {
            this.on();
        }
    },
    _dragging: function ( action ) {
        if ( action === 'on' ) {
            _this.vars.$parent.mousemove(function (e) {

                var x = ( _this.vars.lastPosX - e.clientX ) * (_this.options.speedX / 10);
                var y = ( _this.vars.lastPosY - e.clientY ) * (_this.options.speedY / 10);

                _this._updateScrollPosition( x, y, true );

                _this.vars.lastPosX = e.clientX;
                _this.vars.lastPosY = e.clientY;

            });
        } else {
            _this.vars.$parent.off('mousemove');
        }
    },
    _updateScrollPosition: function (x, y, relational) {
        // If the new scroll position is in relation to the old ones 
        // then update the scroll position based on them
        if ( relational === true ) {
            _this.vars.$parent.scrollLeft( _this.vars.posX + x );
            _this.vars.$parent.scrollTop( _this.vars.posY + y );
        } else {
            _this.vars.$parent.scrollLeft( x );
            _this.vars.$parent.scrollTop( y );
        }
    },
    _addMouseBinding: function () {
        // On mousedown toggle dragging on
        _this.vars.$parent.mousedown( function (e) {
            _this.vars.lastPosX = e.clientX;
            _this.vars.lastPosY = e.clientY;
            _this._dragging( 'on' );
        });

        // On mouseup toggle dragging off
        _this.vars.$parent.mouseup( function (e) {
            _this._dragging( 'off' );
        });

        // When the mouse leaves the window toggle dragging off
        _this.vars.$parent.mouseleave( function (e) {
            _this._dragging( 'off' );
        });
    },
    _removeMouseBinding: function () {
        _this.vars.$parent.off();
        _this._dragging( 'off' );
    }
 
});
