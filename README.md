#DragPan

A jQuery plugin designed to allow click and drag panning of an element.


##Usage

    <div id="document">
      <div id="content">
      </div>
    </div>
    <script src="path/to/jquery.js"></script>
    <script src="path/to/dragpan.js"></script>
    <script>
    $(document).ready( function () {
      $("#document").dragpan();
    });
    </script>

##Options

####Speed

You can adjust the speed of the drag using the speedX and speedY options.

    $("element").dragpan({ speedX: 20, speedY: 20 });

The default speeds are 10, this equates to a 1:1 relationship between mouse movement and scrolling.
