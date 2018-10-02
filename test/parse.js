const assert = require('assert');
const parse = require('../');

describe('compound', function() {
    it('multiple arguments', function() {
        assert.deepEqual(parse([
            '--name=owner', '--multi=foo',
            'free', '-xyzf',
            'eee',
            '-a', 'test',
            '--key', 'value',
            '-b', '--bool',
            '--no-create', '--multi=baz',
            '--', '--not-a-flag', 'arg'
        ]), {
            x : true,
            y : true,
            z : true,
            f : 'eee',
            a : 'test',
            b : true,
            bool : true,
            key : 'value',
            multi : [ 'foo', 'baz' ],
            create : false,
            name : 'owner',
            args : [ 'free', '--not-a-flag', 'arg' ]
        });
    })
});

