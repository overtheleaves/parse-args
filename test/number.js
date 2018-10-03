const assert = require('assert');
const parse = require('../');

describe('number', function() {
    it('digit', function() {
        assert.deepStrictEqual(parse(['1234']), {
            args: [1234]
        });
        assert.deepStrictEqual(parse(['-a', '1234']), {
            a: 1234,
            args: []
        });
        assert.deepStrictEqual(parse(['--abc=1234']), {
            abc: 1234,
            args: []
        });

        assert.deepStrictEqual(parse(['-1234']), {
            args: [-1234]
        });
        assert.deepStrictEqual(parse(['-a', '-1234']), {
            a: -1234,
            args: []
        });
        assert.deepStrictEqual(parse(['--abc=-1234']), {
            abc: -1234,
            args: []
        });
    });

    it('float', function() {
        assert.deepStrictEqual(parse(['0.123']), {
            args: [0.123]
        });
        assert.deepStrictEqual(parse(['-a', '0.123']), {
            a: 0.123,
            args: []
        });
        assert.deepStrictEqual(parse(['--abc=0.123']), {
            abc: 0.123,
            args: []
        });

        assert.deepStrictEqual(parse(['.123']), {
            args: [0.123]
        });
        assert.deepStrictEqual(parse(['-a', '.123']), {
            a: 0.123,
            args: []
        });
        assert.deepStrictEqual(parse(['--abc=.123']), {
            abc: 0.123,
            args: []
        });
    });

    it('hex', function() {
        assert.deepStrictEqual(parse(['0xef']), {
            args: [0xef]
        });
        assert.deepStrictEqual(parse(['-a', '0xef']), {
            a: 0xef,
            args: []
        });
        assert.deepStrictEqual(parse(['--abc=0xef']), {
            abc: 0xef,
            args: []
        });

        assert.deepStrictEqual(parse(['0xAF']), {
            args: [0xaf]
        });
        assert.deepStrictEqual(parse(['-a', '0xAF']), {
            a: 0xaf,
            args: []
        });
        assert.deepStrictEqual(parse(['--abc=0xAF']), {
            abc: 0xaf,
            args: []
        });
    });
    it('e', function() {
        assert.deepStrictEqual(parse(['10e7']), {
            args: [10e7]
        });
        assert.deepStrictEqual(parse(['-a', '10e7']), {
            a: 10e7,
            args: []
        });
        assert.deepStrictEqual(parse(['--abc=10e7']), {
            abc: 10e7,
            args: []
        });
    });
});