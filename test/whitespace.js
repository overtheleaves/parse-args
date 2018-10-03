const assert = require('assert');
const parse = require('../');

describe('whitespace', function() {
    it('args', function() {
        assert.deepEqual(parse(['\t']), {
            args: ['\t']
        })
    });

    it('single hyphen', function() {
        assert.deepEqual(parse(['-a', '\t']), {
            a: '\t',
            args: []
        });
    });

    it('double hyphen', function() {
        assert.deepEqual(parse(['--abc=\t']), {
            abc: '\t',
            args: []
        });
    });
});