/*! Dragpan - v1.1.3 - 2015-02-19
* https://github.com/lgoldstien/jquery-dragpan
* Copyright (c) 2015 Lawrence Goldstien; Licensed MIT */
(function () {
    "use strict";

    var scope;

    /*jshint -W117 */
    $.widget( "oml.dragpan", {

        // The widget default options
        _defaults: {
            speedX: 10, // X Speed default is 10
            speedY: 10, // Y Speed default is 10
            cursor: 'all-scroll', // Cursor default is all-scroll
            on: true, // Default to turning on dragpan on calling the function
            bodyselect: false // Default to turning selection on the body off completely
        },

        // The class construct
        _create: function() {
            // This fix
            scope = this;

            // Set the parent option as we cannot do this in defaults
            this._defaults.$parent = $(this.element);

            // Set the options based on the defaults (if we have any options)
            if (typeof this.options === 'undefined') {
                this.options = this._defaults;
            } else {
                this.options = $.extend( this._defaults, this.options );
            }
            if (typeof this.options.parent === 'object') {
                this.options.$parent = this.options.parent;
            }

            // Set up the variables used in the function
            this.vars = {
                $parent    : this.options.$parent,
                $child     : this.options.$parent.children(),
                maxX       : this.options.$parent.children().prop('scrollWidth'),
                maxY       : this.options.$parent.children().prop('scrollHeight'),
                posX       : this.options.$parent.scrollLeft(),
                posY       : this.options.$parent.scrollTop(),
                lastPosX   : 0,
                lastPosY   : 0,
                state      : 'off'
            };

            // Find out if text selection was enabled before
            this.vars.selection = false;

            if ( this.vars.$parent.css( "-webkit-touch-callout" ) !== 'none' ){
                this.vars.selection = true;
            }
            if ( this.vars.$parent.css( "-webkit-user-select" ) !== 'none' ){
                this.vars.selection = true;
            }
            if ( this.vars.$parent.css( "-khtml-user-select" ) !== 'none' ){
                this.vars.selection = true;
            }
            if ( this.vars.$parent.css( "-moz-user-select" ) !== 'none' ){
                this.vars.selection = true;
            }
            if ( this.vars.$parent.css( "-ms-user-select" ) !== 'none' ){
                this.vars.selection = true;
            }
            if ( this.vars.$parent.css( "user-select" ) !== 'none' ){
                this.vars.selection = true;
            }

            // If the scroll event is triggered then update scroll position (keys and wheel)
            this.vars.$parent.scroll( function () {
                scope.vars.posX = scope.vars.$parent.scrollLeft();
                scope.vars.posY = scope.vars.$parent.scrollTop();
            });

            // Trigger the mouse binding if this is set to on
            if( scope.options.on === true ) {
                this.on();
            }
        },
        _dragging: function ( action ) {
            if ( action === 'on' ) {
                this.vars.$parent.mousemove(function (e) {

                    var x = ( scope.vars.lastPosX - e.clientX ) * (scope.options.speedX / 10);
                    var y = ( scope.vars.lastPosY - e.clientY ) * (scope.options.speedY / 10);

                    scope._updateScrollPosition( x, y, true );

                    scope.vars.lastPosX = e.clientX;
                    scope.vars.lastPosY = e.clientY;

                });
            } else {
                this.vars.$parent.off('mousemove');
            }
        },
        _updateScrollPosition: function (x, y, relational) {
            // If the new scroll position is in relation to the old ones
            // then update the scroll position based on them
            if ( relational === true ) {
                this.vars.$parent.scrollLeft( this.vars.posX + x );
                this.vars.$parent.scrollTop( this.vars.posY + y );
            } else {
                this.vars.$parent.scrollLeft( x );
                this.vars.$parent.scrollTop( y );
            }
        },
        _addMouseBinding: function () {
            // On mousedown toggle dragging on
            this.vars.$parent.mousedown( function (e) {
                scope.vars.lastPosX = e.clientX;
                scope.vars.lastPosY = e.clientY;
                scope._dragging( 'on' );
            });

            // On mouseup toggle dragging off
            this.vars.$parent.mouseup( function (e) {
                scope._dragging( 'off' );
            });

            // When the mouse leaves the window toggle dragging off
            this.vars.$parent.mouseleave( function (e) {
                scope._dragging( 'off' );
            });
        },
        _removeMouseBinding: function () {
            this.vars.$parent.off('mousemove')
                             .off('mousedown')
                             .off('mouseup')
                             .off('mouseleave');

            this._dragging( 'off' );
        },
        _state: function () {
            return this.vars.state;
        },
        // Turn off selection for the entire page
        _selectionOff: function () {
            if (this.vars.bodyselect === false) {
                $('body').css( "-webkit-touch-callout", "none" )
                         .css( "-webkit-user-select", "none" )
                         .css( "-khtml-user-select", "none" )
                         .css( "-moz-user-select", "-moz-none" )
                         .css( "-ms-user-select", "none" )
                         .css( "user-select", "none" );
            }
        },
        // The public functions
        on: function () {
            if (this._state() === 'off') {
                // Set the cursor
                this.options.$parent.css( "cursor", this.options.cursor );

                // Disable selection dragging
                this.vars.$parent.css( "-webkit-touch-callout", "none" )
                                 .css( "-webkit-user-select", "none" )
                                 .css( "-khtml-user-select", "none" )
                                 .css( "-moz-user-select", "-moz-none" )
                                 .css( "-ms-user-select", "none" )
                                 .css( "user-select", "none" );

                // Add the mouse binding
                this._addMouseBinding();

                // Turn off selection on body if set
                this._selectionOff();

                // Set the state to on
                this.vars.state = 'on';
            }
        },
        off: function () {
            if (this._state() === 'on') {
                // Enable selection dragging if it was enabled to begin with
                if (this.vars.selection === true) {
                    this.vars.$parent.css( "-webkit-touch-callout", "all" )
                                     .css( "-webkit-user-select", "all" )
                                     .css( "-khtml-user-select", "all" )
                                     .css( "-moz-user-select", "all" )
                                     .css( "-ms-user-select", "all" )
                                     .css( "user-select", "all" );
                }

                // Set back to default cursor
                this.options.$parent.css( "cursor", "default" );

                // Remove the mouse binding
                this._removeMouseBinding();

                // Set the state to off
                this.vars.state = 'off';
            }
        }

    });
})();
