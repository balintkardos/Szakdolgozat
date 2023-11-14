class TrieNode {
    constructor() {
      this.children = {};
      this.output = [];
      this.failure = null;
    }
  }
  
  class AhoCorasick {
    constructor() {
      this.root = new TrieNode();
    }
  
    addPattern(pattern) {
      let node = this.root;
      for (let char of pattern) {
        if (!node.children[char]) {
          node.children[char] = new TrieNode();
        }
        node = node.children[char];
      }
      node.output.push(pattern);
    }
  
    buildFailureLinks() {
      const queue = [];
  
      // Set failure links for depth 1 (child nodes of the root)
      for (const key in this.root.children) {
        const child = this.root.children[key];
        child.failure = this.root;
        queue.push(child);
      }
  
      // Set failure links using BFS
      while (queue.length > 0) {
        const currentNode = queue.shift();
  
        for (const key in currentNode.children) {
          const child = currentNode.children[key];
          queue.push(child);
  
          let failureNode = currentNode.failure;
  
          while (failureNode !== null && !failureNode.children[key]) {
            failureNode = failureNode.failure;
          }
  
          child.failure = failureNode ? failureNode.children[key] : this.root;
  
          child.output = child.output.concat(child.failure.output);
        }
      }
    }
  
    search(text) {
      let node = this.root;
      const results = [];
  
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
  
        while (node !== this.root && !node.children[char]) {
          node = node.failure;
        }
  
        if (node.children[char]) {
          node = node.children[char];
        } else {
          node = this.root;
        }
  
        for (const pattern of node.output) {
          results.push({ pattern, index: i - pattern.length + 1 });
        }
      }
  
      return results;
    }
  }
  
  // Példa használat:
  const ac = new AhoCorasick();
  
  ac.addPattern("he");
  ac.addPattern("she");
  ac.addPattern("his");
  ac.addPattern("hers");
  
  ac.buildFailureLinks();
  
  const text = "hershey";
  const matches = ac.search(text);
  
  console.log(`Text: ${text}`);
  console.log("Matches:");
  matches.forEach(match => {
    console.log(`Pattern: ${match.pattern}, Index: ${match.index}`);
  });

  //https://www.geeksforgeeks.org/aho-corasick-algorithm-pattern-searching/
  