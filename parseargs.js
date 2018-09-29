var debug = false;

module.exports = function(args) {
    if (!args) {
        console.error('args cannot null or empty');
        return;
    }

    var result = {'args': []};
    //args = args.trim();
    var strargs = '';
    for (var i = 0; i < args.length; i++) {
        strargs = strargs + args[i] + ' ';
    }
    if (debug) console.log(strargs);

    var status = { ERROR : -1, START : 0, SINGLE : 1, DOUBLE: 2, ARG_START: 3, ARG_END: 4
        , OPT_NAME_START: 5, OPT_NAME_END: 6, OPT_VALUE_START: 7, OPT_VALUE_END: 8};
    var offset = 0;
    var curr = status.START;
    var token = '';
    var token2 = '';
    var hasSingleQuote = false;

    while (offset < strargs.length) {
        var c = strargs[offset];

        if (debug) console.log('char = ' + c + ' current status = ' + curr);
        switch (curr) {
            case status.START:
                if (isSpace(c)) {
                    // pass
                } else if (isHyphen(c)) {
                    curr = status.SINGLE;
                } else {  // any characters
                    curr = status.ARG_START;
                    offset--;
                }
                break;

            case status.SINGLE:
                if (isHyphen(c)) curr = status.DOUBLE;
                else if (isAlphabet(c)) {
                    curr = status.OPT_NAME_START;
                    offset--;
                }
                else curr = status.ERROR;

                break;

            case status.DOUBLE:
                if (isAlphabet(c)) curr = status.OPT_NAME_START;
                else {
                    curr = status.ERROR;
                    offset--;
                }
                break;

            case status.OPT_NAME_START:
                if (isSpace(c) || isEqualMark(c)) {
                    curr = status.OPT_NAME_END;
                    offset--;
                }
                else if (isAlphabet(c)) {
                    token = token + c;
                }
                else curr = status.ERROR;

                break;

            case status.OPT_NAME_END:
                if (isSpace(c) || isEqualMark(c)) curr = status.OPT_VALUE_START;
                else {  // boolean flag
                    for (var i = 0; i < token.length; i++) {
                        result[token[i]] = true;
                    }
                    token = '';
                    curr = status.START;
                }
                break;

            case status.OPT_VALUE_START:
                if (isSpace(c) && !hasSingleQuote) {
                    curr = status.OPT_VALUE_END;
                    offset--;
                } else if (isSingleQuote(c)) {
                    if (!hasSingleQuote) {
                        // start single quote
                        hasSingleQuote = true;
                    } else {
                        // end single quote
                        hasSingleQuote = false;
                        curr = status.OPT_VALUE_END;
                        offset--;
                    }
                } else {
                    token2 = token2 + c;
                }
                break;

            case status.OPT_VALUE_END:
                result[token] = token2;
                token = '';
                token2 = '';
                curr = status.START;
                break;

            case status.ARG_START:
                if (isSpace(c) && !hasSingleQuote) {
                    curr = status.ARG_END;
                    offset--;
                } else if (isSingleQuote(c)) {
                    if (!hasSingleQuote) {
                        // start single quote
                        hasSingleQuote = true;
                    } else {
                        // end single quote
                        hasSingleQuote = false;
                        curr = status.ARG_END;
                        offset--;
                    }
                } else {
                    token = token + c;
                }
                break;

            case status.ARG_END:
                result.args.push(token);
                token = '';
                curr = status.START;
                break;

            case status.ERROR:
                console.error('Parse Error: ');
                console.error(strargs);
                var space = '';
                for (var i = 0; i < offset; i++)
                    space += ' ';
                console.error(space + '^ <- error occured while parse this position');
                return;
        }

        offset++;
    }

    console.log(result);

    return result;
};


function checkValid(c) {
    if (!c) {
        console.error('argument c cannot be null or empty');
        return;
    }
}

function isSingleQuote(c) {
    checkValid(c);
    return c === '\'';
}

function isHyphen(c) {
    checkValid(c);
    return c === '-';
}

function isAlphabet(c) {
    checkValid(c);
    return ('a' <= c && c <= 'z') || ('A' <= c && c <= 'Z');
}

function isSpace(c) {
    checkValid(c);
    return c === ' ';
}

function isEqualMark(c) {
    checkValid(c);
    return c === '=';
}