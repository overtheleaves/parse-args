const assert = require('assert');
const parse = require('../');

describe('empty string', function() {
    it('empty string', function() {
        assert.deepEqual(parse(['']), {
            args: ['']
        });
    });
});
