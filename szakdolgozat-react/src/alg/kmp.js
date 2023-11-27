
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

function kmp(pat,txt,prefixTable){
  let M=pat.length
  let N=txt.length
  const result = [];
  
for (let i=0; i<=(N-M);i++){
  let j;
  for (j=0; j <M;j++){
    if(txt[i+j]!==pat[j]){
      if(j>0){
        i+=(j-prefixTable[j-1]-1)
      }
      break;
      }
  }
  if(j===M){
    result.push(i);
    i+=M-1;
  }
}
return result
}

module.exports = {
  kmp: kmp,
  kmpPrefix: kmpPrefix
};
