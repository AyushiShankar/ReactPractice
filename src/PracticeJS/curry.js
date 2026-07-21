function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        }
        return function (...nextArgs) {
            return curried.apply(this, [...args, ...nextArgs]);
        }

    }
}

curry();
module.exports = curry