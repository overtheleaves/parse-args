const assert = require('assert');
const parse = require('../');

describe('newlines', function() {
    it('args', function() {
        assert.deepEqual(parse(['aa\naa']), {
            args: ['aa\naa']
        });
    });
    it('single hyphen', function() {
        assert.deepEqual(parse(['-a', 'aa\naa']), {
            a: 'aa\naa',
            args: []
        });
    });

    it('double hyphen', function() {
        assert.deepEqual(parse(['--abc=aa\naa']), {
            abc: 'aa\naa',
            args: []
        })
    })
});