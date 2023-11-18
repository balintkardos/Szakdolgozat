// Import functions from naive.js and shiftAnd.js
const naiv = require('./naiv');
const shiftOr = require('./shiftAnd');
const notSoNaive = require('./notSoNaive');
const KR = require('./rubinKarp');
//const SuffixTree = require('./suffixTree');
const SuffixTree = require('./suffix-tree');

function measureMemoryUsage() {
    const used = process.memoryUsage();
    console.log(`Memory Usage: ${JSON.stringify(used)}`);
}
/*
function isStringInTree(tree, P) {
    let currentNode = tree.head;
  
    for (let i = 0; i < P.length; i++) {
      let found = false;
  
      // Check among child nodes
      for (let j = 0; j < currentNode.nodes.length; j++) {
        const node = currentNode.nodes[j];
        if (node.value === P[i]) {
          currentNode = node;
          found = true;
          break;
        }
      }
  
      if (!found) {
        // If no matching child node is found, the string is not in the tree
        return false;
      }
    }
  
    // If the loop completes, the entire string is present in the tree
    return true;
  }
  const suffixTree = new SuffixTree();
  suffixTree.add("aaaabbb");
  const longestSubstring = suffixTree.getLongestSubstring();
  console.log("Longest Substring:", longestSubstring);
  const searchString = "aab";
const isStringPresent = isStringInTree(suffixTree, searchString);
console.log(`String "${searchString}" is${isStringPresent ? '' : ' not'} in the tree.`);
*/


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

// Create an instance of SuffixTree
const suffixTree = new SuffixTree();

// Add the document to the suffix tree
const text = "almapapriabckaáabc";
const document = "doc1";

for (let i = text.length; i >= 0; i--) {
    suffixTree.add(text.substring(i), document);
}

// Find occurrences of the pattern "abc"
const pattern = "pap";
const result = suffixTree.getPattern(pattern);

console.log(result);






