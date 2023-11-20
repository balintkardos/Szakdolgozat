class Node {
    constructor() {
      this.children = [];
      this.ind = [];
    }
  
    insertSuffix(suffix, index) {
      this.ind.push(index);
      if (suffix.length > 0) {
        const cIndex = suffix.charAt(0).charCodeAt(0);
        if (!this.children[cIndex]) {
          this.children[cIndex] = new Node();
        }
        this.children[cIndex].insertSuffix(suffix.substr(1), index + 1);
      }
    }
  
    search(pat) {
      if (pat.length === 0) {
        return this.ind;
      }
      const cIndex = pat.charAt(0).charCodeAt(0);
      if (this.children[cIndex]) {
        return this.children[cIndex].search(pat.substr(1));
      } else {
        return null;
      }
    }

    printTree(depth = 0) {
        const indent = "  ".repeat(depth);
        console.log(indent + "Node");
        console.log(indent + "  Indices: " + this.ind.join(", "));
        for (let i = 0; i < this.children.length; i++) {
          if (this.children[i]) {
            console.log(indent + `  Child[${String.fromCharCode(i)}]`);
            this.children[i].printTree(depth + 1);
          }
        }
      }

  }
  
  class SuffixTrie {
    constructor(txt) {
      this.root = new Node();
      for (let i = 0; i < txt.length; i++) {
        this.root.insertSuffix(txt.substr(i), i);
      }
    }
  
    search(ptr) {
      const ans = this.root.search(ptr);
      if (!ans) {
        console.log("Pattern not found");
      } else {
        const ptrLength = ptr.length;
        for (const i of ans) {
          console.log("Pattern found at position " + (i - ptrLength));
        }
      }
    }

    printTree() {
        this.root.printTree();
      }
  }
  
  const str = "MISSISSIPPI";
  const ptr = "SS";
  const tree = new SuffixTrie(str);
  console.log("Searching for " + ptr);
  tree.search(ptr);
  tree.printTree();
  