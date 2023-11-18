// Import functions from naive.js and shiftAnd.js
const naiv = require('./naiv');
const shiftOr = require('./shiftAnd');
const notSoNaive = require('./notSoNaive');
const KR = require('./rubinKarp');

function measureMemoryUsage() {
    const used = process.memoryUsage();
    console.log(`Memory Usage: ${JSON.stringify(used)}`);
}



// Use the functions

console.time("naive");
console.log(naiv.naive("almapapriabckaáabc","abc"));
console.timeEnd("naive");
console.time("shiftOr");
console.log(shiftOr("abc", "almapapriabckaáabc"));
console.timeEnd("shiftOr");
console.time("notSoNaive");
console.log(notSoNaive("abc", "almapapriabckaáabc"));
console.timeEnd("notSoNaive");
console.time("RK");
console.log(KR("abc", "almapapriabckaáabc"));
console.timeEnd("RK");









