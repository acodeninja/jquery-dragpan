(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  module('Generic', {
    // This will run before each test in this module.
    setup: function() {
      this.elems = $('#parent').dragpan();
    }
  });

  test('Dragpan is a function of $.fn', function() {
    expect(1);
    strictEqual(typeof $.fn.dragpan, 'function', 'dragpan should be a function');
  });

  test('Dragpan applies all-scroll cursor', function() {
    expect(1);
    strictEqual($('#parent').css('cursor'), 'all-scroll', 'the parent should have an all-scroll cursor by default');
  });

  module('Dragpan On', {
    setup: function () {
      this.elems = $('#parent').dragpan();
      $('#parent').dragpan('on');
    }
  });

  test('Dragpan applies all-scroll cursor', function() {
    expect(1);
    strictEqual($('#parent').css('cursor'), 'all-scroll', 'the parent should have an all-scroll cursor by default');
  });

  module('Dragpan With Options', {
    setup: function () {
      this.elems = $('#parent').dragpan({ cursor: 'pointer', speedX: 50, speedY: 60 });
    }
  });

  test('Drapan uses specified cursor', function() {
    expect(1);
    strictEqual($('#parent').css('cursor'), 'pointer', 'the parent should have a pointer cursor for this test');
  });

  module('Dragpan Off', {
    setup: function () {
      this.elems = $('#parent').dragpan();
      $('#parent').dragpan('off');
    }
  });

  test('defaul cursor', function() {
    expect(1);
    strictEqual($('#parent').css('cursor'), 'default', 'the parent should have a pointer cursor for this test');
  });


}(jQuery));
