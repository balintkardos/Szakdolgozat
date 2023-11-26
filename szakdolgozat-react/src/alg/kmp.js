
const kmpPrefix = require('./kmpPrefix')

function kmp(pat,txt){
  let M=pat.length
  let N=txt.length
  let prefixTable = kmpPrefix(pat);
  const result = [];
  
for (let i=0; i<=(N-M);i++){
  let j;
  for (j=0; j <M;j++){
    if(txt[i+j]!=pat[j]){
      if(j>0){
        i+=(j-prefixTable[j-1]-1)
      }
      break;
      }
  }
  if(j==M){
    result.push(i);
    i+=M-1;
  }
}
return result
}

//console.log(kmp("jhdfgbjshagdfhjasvhud<_ fjvashjfvhjsdATATATATATAT dfsadas","ATATATATATAT"))

module.exports = kmp;