'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _write = require('../write');

var _write2 = _interopRequireDefault(_write);

describe('write', function () {
  it('should put simple values', function () {
    var data = {};
    var data1 = _write2['default']('foo', 'bar', data);
    _expect2['default'](data1.foo).toBe('bar');
    var data2 = _write2['default']('foo', 7, data);
    _expect2['default'](data2.foo).toBe(7);
    var data3 = _write2['default']('foo', true, data);
    _expect2['default'](data3.foo).toBe(true);
  });

  it('should create structure for arbitrarily deep dotted values', function () {
    var data1 = _write2['default']('foo.bar', 'baz', {});
    _expect2['default'](data1.foo.bar).toBe('baz');
    var data2 = _write2['default']('foo.bar.dog', 7, {});
    _expect2['default'](data2.foo.bar.dog).toBe(7);
    var data3 = _write2['default']('foo.bar.dog.cat', true, {});
    _expect2['default'](data3.foo.bar.dog.cat).toBe(true);
  });

  it('should throw an error when array syntax is broken', function () {
    _expect2['default'](function () {
      _write2['default']('foo[dog', 42, {});
    }).toThrow(/found/);
  });

  it('should put simple arrays', function () {
    var data1 = _write2['default']('cat', ['foo', 'bar'], {});
    _expect2['default'](data1.cat).toBeA('array').toEqual(['foo', 'bar']);
    var data2 = _write2['default']('dog', ['rabbit', 42], {});
    _expect2['default'](data2.dog).toBeA('array').toEqual(['rabbit', 42]);
  });

  it('should put simple indexless array values', function () {
    var data = _write2['default']('cat[]', 'meow', {
      cat: [1, 2, 3, 4]
    });
    _expect2['default'](data.cat).toBeA('array').toEqual(['meow', 'meow', 'meow', 'meow']);
  });

  it('should put arrays as indexless array values', function () {
    var data = _write2['default']('cat[]', ['meow', 'woof'], {
      cat: [1, 2, 3, 4]
    });
    _expect2['default'](data.cat).toBeA('array').toEqual(['meow', 'woof']);
  });

  it('should put simple indexless array values', function () {
    var data = _write2['default']('cat[]', 'meow', {
      cat: [1, 2, 3, 4]
    });
    _expect2['default'](data.cat).toBeA('array').toEqual(['meow', 'meow', 'meow', 'meow']);
  });

  it('should put properties on array values', function () {
    var data1 = _write2['default']('cat[0].name', 'foo', {});
    _expect2['default'](data1.cat).toBeA('array');
    _expect2['default'](data1.cat[0]).toBeA('object');
    _expect2['default'](data1.cat[0].name).toBe('foo');
    var data2 = _write2['default']('dog[2].friend', 'rabbit', {});
    _expect2['default'](data2.dog).toBeA('array');
    _expect2['default'](data2.dog[2]).toBeA('object');
    _expect2['default'](data2.dog[2].friend).toBe('rabbit');
  });

  it('should put simple array values', function () {
    var data1 = _write2['default']('cat[0]', 'foo', {});
    _expect2['default'](data1.cat).toBeA('array');
    _expect2['default'](data1.cat[0]).toBe('foo');
    var data2 = _write2['default']('dog[2]', 'rabbit', {});
    _expect2['default'](data2.dog).toBeA('array');
    _expect2['default'](data2.dog[2]).toBe('rabbit');
  });

  it('should put simple indexless array values', function () {
    var data = _write2['default']('cat[]', 'meow', {
      cat: [1, 2, 3, 4]
    });
    _expect2['default'](data.cat).toBeA('array').toEqual(['meow', 'meow', 'meow', 'meow']);
  });

  it('should put properties on array values', function () {
    var data1 = _write2['default']('cat[0].name', 'foo', {});
    _expect2['default'](data1.cat).toBeA('array');
    _expect2['default'](data1.cat[0]).toBeA('object');
    _expect2['default'](data1.cat[0].name).toBe('foo');
    var data2 = _write2['default']('dog[2].friend', 'rabbit', {});
    _expect2['default'](data2.dog).toBeA('array');
    _expect2['default'](data2.dog[2]).toBeA('object');
    _expect2['default'](data2.dog[2].friend).toBe('rabbit');
  });

  it('should put properties on array values for index-less paths', function () {
    var data1 = _write2['default']('cat[].name', 'foo', {
      cat: [{ name: 'fido' }, { name: 'whiskers' }]
    });
    _expect2['default'](data1.cat).toBeA('array');
    _expect2['default'](data1.cat[0]).toBeA('object');
    _expect2['default'](data1.cat[0].name).toBe('foo');
    _expect2['default'](data1.cat[1]).toBeA('object');
    _expect2['default'](data1.cat[1].name).toBe('foo');
  });

  it('should put complex array values', function () {
    var data = _write2['default']('cat[0].dog[7].rabbit.fox', 'wolf', {});
    _expect2['default'](data.cat).toBeA('array');
    _expect2['default'](data.cat[0]).toBeA('object');
    _expect2['default'](data.cat[0].dog).toBeA('array');
    _expect2['default'](data.cat[0].dog[7]).toBeA('object');
    _expect2['default'](data.cat[0].dog[7].rabbit).toBeA('object');
    _expect2['default'](data.cat[0].dog[7].rabbit.fox).toBe('wolf');
  });

  it('should only modify values along path', function () {
    var initial = {
      a: {
        b: 4
      },
      c: {
        d: 5,
        e: {
          f: 6,
          g: {
            h: 9
          }
        }
      },
      i: 10,
      j: [{
        k: 8
      }, {
        l: 9
      }]
    };
    var backup = _extends({}, initial);
    var result1 = _write2['default']('a.b', 'dog', initial);
    _expect2['default'](backup).toEqual(initial); // initial not mutated
    _expect2['default'](result1.a).toNotBe(initial.a);
    _expect2['default'](result1.a.b).toBe('dog');
    _expect2['default'](result1.c).toBe(initial.c);
    _expect2['default'](result1.i).toBe(initial.i);
    _expect2['default'](result1.j).toBe(initial.j);
    var result2 = _write2['default']('c.e.g.h', 'dog', initial);
    _expect2['default'](backup).toEqual(initial); // initial not mutated
    _expect2['default'](result2.a).toBe(initial.a);
    _expect2['default'](result2.c).toNotBe(initial.c);
    _expect2['default'](result2.c.e).toNotBe(initial.c.e);
    _expect2['default'](result2.c.e.g).toNotBe(initial.c.e.i);
    _expect2['default'](result2.c.e.g.h).toBe('dog');
    _expect2['default'](result2.i).toBe(initial.i);
    _expect2['default'](result2.j).toBe(initial.j);
    var result3 = _write2['default']('j[1].l', 'dog', initial);
    _expect2['default'](backup).toEqual(initial); // initial not mutated
    _expect2['default'](result3.a).toBe(initial.a);
    _expect2['default'](result3.c).toBe(initial.c);
    _expect2['default'](result3.i).toBe(initial.i);
    _expect2['default'](result3.j).toNotBe(initial.j);
    _expect2['default'](result3.j[0]).toBe(initial.j[0]);
    _expect2['default'](result3.j[1]).toNotBe(initial.j[1]);
    _expect2['default'](result3.j[1].l).toBe('dog');
  });

  it('should use mutator if value is function', function () {
    var result1 = _write2['default']('foo', function (value) {
      return value + 'bar';
    }, { foo: 'candy' });
    _expect2['default'](result1.foo).toBe('candybar');

    var result2 = _write2['default']('foo.bar.dog', function (value) {
      return value * 2;
    }, {
      foo: {
        bar: {
          'dog': 4
        }
      }
    });
    _expect2['default'](result2.foo.bar.dog).toBe(8);

    var result3 = _write2['default']('foo.bar', function (value) {
      return _extends({}, value, { cat: 5, rat: 6 });
    }, {
      foo: {
        bar: {
          dog: 4
        }
      }
    });
    _expect2['default'](result3.foo.bar).toEqual({
      dog: 4,
      cat: 5,
      rat: 6
    });

    var result4 = _write2['default']('foo', function (value) {
      return value.map(function (num) {
        return num * 2;
      });
    }, { foo: [1, 2, 3, 4, 5] });
    _expect2['default'](result4.foo).toEqual([2, 4, 6, 8, 10]);
  });
});