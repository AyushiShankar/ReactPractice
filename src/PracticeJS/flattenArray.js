function flattenArray(arr) {
    if (!Array.isArray(arr) || arr.length === 0) return [];
    let output = [];
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            output.push(...flattenArray(arr[i]));
        }
        else
            output.push(arr[i]);
    }
    return output;
}

flattenArray([1, [2, [3, 4], 5], 6]);

module.exports = flattenArray