function kmpPrefix(s) {
    let p = [0];
    let j = 0;
    for (let i = 1; i < s.length; i++) {
      while (j > 0 && s[j] !== s[i]) {
        j = p[j-1];
      }
      if (s[j] === s[i]) {
        j++;
      }
      p[i] = j;
    }
    return p;
}


module.exports = kmpPrefix;