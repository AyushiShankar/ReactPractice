function makeCounter(initialValue = 0) {
    let count = initialValue;

    return {
        increment() {
            return ++count;
        },
        decrement() {
            return --count;
        },
        reset() {
            count = initialValue;
            return count;
        }
    };
}