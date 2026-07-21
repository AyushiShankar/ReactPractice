// eslint-disable-next-line no-extend-native
Array.prototype.myReduce = function (callback, initialValue) {
  const arr = this;
  let accumulator;
  let startIndex;

  if (arguments.length > 1) {
    accumulator = initialValue;
    startIndex = 0;
  } else {
    accumulator = arr[0];
    startIndex = 1;
  }

  for (let i = startIndex; i < arr.length; i++) {
    accumulator = callback(accumulator, arr[i], i, arr);
  }
  return accumulator;
};
