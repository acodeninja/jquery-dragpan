/*jshint -W098 */
(function ($) {

    $.fn.dragpan = function (input) {

        // Define the accessible API so we can check methods
        var API = {
            on: 'addMouseBinding',
            off: 'removeMouseBinding'
        };

        // Set opts to be an object for later use
        var opts = {};

        // Instantiate a new Dragpan if needed
        if ($(this).dragpan) {
            console.info('We have dragpan');
        } else {
            console.info('We have no dragpan');
        }

        var dp = ($(this).dragpan) ? $(this).dragpan : new Dragpan;

        // If the input is a sting
        if (typeof input === 'string') {
            // Is the input an available API call
            if (input in API) {
                // If it is then run the API call
                console.info(API[input]);
            } else {
                // If not then return nothing
                return;
            }
        } else if (typeof input === 'object') {
            return this;
        } else {
            return this;
        }
        // Set up the variables and default values
        // var this = this,
        //     maxX,
        //     maxY,
        //     posX,
        //     posY,
        //     lastPosX = 0,
        //     lastPosY = 0,
        //     $parent = options.parent,
        //     $child = $parent.children();

        return this;

    };

    var Dragpan = {
        // Set the internal option defaults
        _defaults: {
            speedX: 10, // X Speed default is 10
            speedY: 10, // Y Speed default is 10
            parent: $(this) // The parent selector
        },
        options: {},
        setOptions: function (opts) {
            // Set the options to override defaults if any are given
            var options = '';//$.extend( _defaults, opts );
        },
        setup: function (opts) {
            // Set the options up
            this.setOptions(opts);

            // Get the maximum width and height of the scrollable content
            this.maxX = $child.prop('scrollWidth');
            this.maxY = $child.prop('scrollHeight');

            // Set the all-scroll cursor
            $parent.css( "cursor", "all-scroll" );

            // Get the current scroll position
            this.posX = $parent.scrollLeft();
            this.posY = $parent.scrollTop();

            // If the scroll event is triggered then update scroll position (keys and wheel)
            $parent.scroll( function () {
                this.posX = $parent.scrollLeft();
                this.posY = $parent.scrollTop();
            });

            Dragpan.addMouseBinding();
            
        },
        updateScrollPosition: function (x, y, relational) {
            // If the new scroll position is in relation to the old ones 
            // then update the scroll position based on them
            if ( relational === true ) {
                $parent.scrollLeft( this.posX + x );
                $parent.scrollTop( this.posY + y );
            } else {
                $parent.scrollLeft( x );
                $parent.scrollTop( y );
            }
        },
        dragging: function ( t ) {
            // If toggling dragging on then add a mousemove event to update the position
            if ( t === 'on' ) {
                $parent.mousemove(function (e) {

                    var x = ( this.lastPosX - e.clientX ) * (options.speedX / 10);
                    var y = ( this.lastPosY - e.clientY ) * (options.speedY / 10);

                    this.updateScrollPosition( x, y, true );

                    this.lastPosX = e.clientX;
                    this.lastPosY = e.clientY;

                });
            } else {
                $parent.off('mousemove');
            }
        },
        addMouseBinding: function () {
            // On mousedown toggle dragging on
            $parent.mousedown( function (e) {
                this.lastPosX = e.clientX;
                this.lastPosY = e.clientY;
                this.dragging( 'on' );
            });

            // On mouseup toggle dragging off
            $parent.mouseup( function (e) {
                console.log('Add Binding:mouseup', this);
                this.dragging( 'off' );
            });

            // When the mouse leaves the window toggle dragging off
            $parent.mouseleave( function (e) {
                this.dragging( 'off' );
            });
        },
        removeMouseBinding: function () {
            $parent.mousedown( function (e) {
                this.dragging( 'off' );
            });
        }
    };

}( jQuery ));