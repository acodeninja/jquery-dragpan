/**
 * jQuery dragpan
 *
 * Creates a click and drag to pan region from a jQuery selector
 *
 * Example:
 *
 *  <div id="parent"><div id="child"></div></div>
 *  
 *  $('#parent').dragpan();
 *
 * ----------------------------------------------------------------------
 *
 * Copyright (c) 2013 Lawrence Goldstien @lgoldstien
 * 
 */

 (function ($) {

    $.fn.dragpan = function ( options ) {
        // The options for the plugin
        var _options = $.extend({
            speedX: 10, // X Speed default is 10
            speedY: 10, // Y Speed default is 10
            parent: this // The parent selector
        }, options);

        // Set up the variables and default values
        var _this = this,
            maxX,
            maxY,
            posX,
            posY,
            lastPosX = 0,
            lastPosY = 0,
            $parent = _options.parent,
            $child = $parent.children();

        var dragPan = {
            // Set up the dragpan plugin for the element we want to work with
            setup: function () {

                // Get the maximum width and height of the scrollable content
                _this.maxX = $child.prop('scrollWidth');
                _this.maxY = $child.prop('scrollHeight');

                // Set the all-scroll cursor
                $parent.css( "cursor", "all-scroll" );

                // Get the current scroll position
                _this.posX = $parent.scrollLeft();
                _this.posY = $parent.scrollTop();

                // If the scroll even is triggered then update scroll position (keys and wheel)
                $parent.scroll( function () {
                    _this.posX = $parent.scrollLeft();
                    _this.posY = $parent.scrollTop();
                });

                // On mousedown toggle dragging on
                $parent.mousedown( function (e) {
                    _this.lastPosX = e.clientX;
                    _this.lastPosY = e.clientY;
                    dragPan.dragging( 'on' );
                });

                // On mouseup toggle dragging off
                $parent.mouseup( function () {
                    dragPan.dragging( 'off' );
                });

                // When the mouse leaves the window toggle dragging off
                $parent.mouseleave( function () {
                    dragPan.dragging( 'off' );
                });
            },
            updateScrollPosition: function (x, y, relational) {
                // If the new scroll position is in relation to the old ones 
                // then update the scroll position based on them
                if ( relational === true ) {
                    $parent.scrollLeft( _this.posX + x );
                    $parent.scrollTop( _this.posY + y );
                } else {
                    $parent.scrollLeft( x );
                    $parent.scrollTop( y );
                }
            },
            dragging: function ( toggle ) {
                // If toggling dragging on then add a mousemove event to update the position
                if ( toggle === 'on' ) {
                    $parent.mousemove(function (e) {

                        var x = ( _this.lastPosX - e.clientX ) * (_options.speedX / 10);
                        var y = ( _this.lastPosY - e.clientY ) * (_options.speedY / 10);

                        dragPan.updateScrollPosition( x, y, true );

                        _this.lastPosX = e.clientX;
                        _this.lastPosY = e.clientY;

                    });
                } else {
                    $parent.off('mousemove');
                }
            }

        };
        
        dragPan.setup();
    };

}( jQuery ));