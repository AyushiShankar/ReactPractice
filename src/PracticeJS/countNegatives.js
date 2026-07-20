function countNegatives(arr) {
  if (!Array.isArray(arr)) {
    return false;
  }

  let count = 0;

  for (const element of arr) {
    if (!Number.isFinite(element)) {
      return false;
    }

    if (element < 0) {
      count++;
    }
  }

  return count;
}

module.exports = { countNegatives };