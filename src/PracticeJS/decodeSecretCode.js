function decodeSecretCode(s) {
  if (!s || s.length === 0 || s.length % 2 !== 0) return "";
  let str = "";
  for (let i = 0; i < s.length; i += 2) {
    let letter = s[i];
    let shift = parseInt(s[i + 1]);
    if (typeof letter !== "string" || (typeof shift !== "number" && !Number.isInteger(shift)))
      return false;
    if (letter >= 'a' && letter <='z') {
      const code = (letter.charCodeAt(0) + shift);
      str = str + String.fromCharCode(code);
    }

  }
  return str;
}
module.exports = { decodeSecretCode };