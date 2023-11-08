function z_array(s){
    let z=z = [lenS].concat(Array(lenS - 1).fill(0));
    for (let i = 1; i < s.length; i++) {
        if (s[i] === s[i - 1]) {
          z[1] += 1;
        } else {
          break;
        }
    }
    let r=0;
    let l=0;
    if(z[1]>0){
        r=z[1];
        l=1;
    }
    
}
console.log("müködik")