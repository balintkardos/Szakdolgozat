function prefixFunction(s) {
    let p = new Array(s.length).fill(0);
    let j = 0;
    for (let i = 1; i < s.length; i++) {
      while (j > 0 && s.charAt(j) !== s.charAt(i)) {
        j = p[j-1];
      }
      if (s.charAt(j) === s.charAt(i)) {
        j++;
      }
      p[i] = j;
    }
    return p;
}

let p="ababaaba"
console.log(prefixFunction(p))