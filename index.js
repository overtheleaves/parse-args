var debug = true;

module.exports = function(args) {

    if (!args) {
        console.error('args cannot null or empty');
        return;
    }

    const result = {'args': []};
    const leftstack = [];
    var i = 0;
    for (i = 0; i < args.length; i++) {
        const arg = args[i];

        if (/^--.+=/.test(arg)) {   // start with '--' with value
            if (debug) console.log('--arg = ' + arg);
            const m = arg.match(/^--([^=]+)=([\s\S]*)$/);
            put(result, m[1], m[2]);

        } else if (/^--.+/.test(arg)) { // start with '--' with no value
            if (debug) console.log('--arg-no-val = ' + arg);
            const m = arg.match(/^--(.+)$/);
            if (m[1].startsWith('no-')) {   // --no-xxx
                put(result, m[1].replace('no-', ''), false);
            } else {
                leftstack.push(m[1]);
            }

        } else if (/^-[^-]+/.test(arg)) {    // start with '-'
            if (debug) console.log('-arg = ' + arg);

            const letters = arg.slice(1).split('');
            for (var j = 0; j < letters.length; j++) {
                leftstack.push(letters[j]); // push one character individually
            }
        } else if ('--' === arg) { // end of the options
            break;
        } else {    // value
            if (debug) console.log('val = ' + arg);
            // match last leftstack item with value
            const k = leftstack.pop();

            if (typeof k === 'undefined') put(result, 'args', arg);
            else put(result, k, arg);

            // pop leftover
            for (var j = 0; j < leftstack.length; j++) {
                put(result, leftstack.pop(), true);
            }
        }
    }

    // leftover arguments
    for (var j = i + 1; j < args.length; j++) {
        var arg = args[j];
        put(result, 'args', arg);
    }

    // leftover stack
    for (var j = 0; j < leftstack.length; j++) {
        put(result, leftstack[j], true);
    }

    if (debug) console.log(result);
    return result;
};

function put(obj, key, value) {

    if (obj[key] !== undefined) {
        if (obj[key] instanceof Array) {
            obj[key].push(value);
        } else if (typeof obj[key] === 'boolean') {
            obj[key] = value;
        } else {
            var tmp = obj[key];
            obj[key] = [];
            obj[key].push(tmp);
            obj[key].push(value);
        }
    } else {
        obj[key] = value;
    }
}