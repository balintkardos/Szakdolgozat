// Import functions from naive.js and shiftAnd.js
const naiv = require('./naiv');
const shiftOr = require('./shiftAnd');

function measureMemoryUsage() {
    const used = process.memoryUsage();
    console.log(`Memory Usage: ${JSON.stringify(used)}`);
}




// Use the functions
measureMemoryUsage();
console.time("naive");
console.log(naiv.naive("almapapriabckaáabc","abc"));
console.timeEnd("naive");
measureMemoryUsage();
console.time("shiftOr");
console.log(shiftOr("abc", "almapapriabckaáabc"));
console.timeEnd("shiftOr");
measureMemoryUsage();
