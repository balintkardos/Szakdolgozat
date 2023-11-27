//simpla naiv
function naive(pat,txt){
    let M=pat.length;
    let N=txt.length;
    const result = [];

    for (let i=0; i<=(N-M);i++){
      let j;
      for (j=0; j <M;j++){
        if(txt[i+j]!==pat[j]){
          break;
        }
      }
      if(j===M){
         result.push(i);
      }
    }
     
    return result;
}

//hibával is müködik

function naiveH(pat,txt,hdistance){
  let M=pat.length;
  let N=txt.length;
  const result = [];

  for (let i=0; i<=(N-M);i++){
    let j;
    let nmm= 0;
    for (j=0; j <M;j++){
      if(txt[i+j]!==pat[j]){
        nmm++;
        if(nmm>hdistance){
          break;
        }
      }
    }
    if(nmm <= hdistance){
       result.push(i);
    }
  }
   
  return result;
}

//exportálás
module.exports = {
  naive: naive,
  naiveH: naiveH
};
