function reverseWords(sentence) {
    if (sentence.length === 0) return "";

    return sentence.split(" ").map((word) => word.split("").reverse().join("")).join(" ");


}

reverseWords("Hello World");

module.exports = reverseWords