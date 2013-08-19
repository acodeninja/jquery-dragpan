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

  module('jQuery#dragpan', {
    // This will run before each test in this module.
    setup: function() {
      this.elems = $('#parent').dragpan();
    }
  });

  test('is a function', function() {
    expect(1);
    strictEqual(typeof $.fn.dragpan, 'function', 'dragpan should be a function');
  });

  test('applies cursor', function() {
    expect(1);
    strictEqual($('#parent').css('cursor'), 'all-scroll', 'the parent should have an all-scroll cursor');
  });

}(jQuery));
