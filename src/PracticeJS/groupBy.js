function groupBy(arr, key) {
    if (!Array.isArray(arr) || arr.length === 0) return {};
    const formatted = arr.reduce((acc, curr) => {
        if (!acc[curr[key]]) {
            acc[curr[key]] = [];
        }

        acc[curr[key]].push(curr);

        return acc;
    }, {});
    return formatted;

}
groupBy([
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 },
    { name: 'Charlie', age: 25 }
], 'age');
module.exports = groupBy;