/*
Python code
class Index(object):
    def __init__(slef, t, k):
        self.k=k
        self.index = []
        for i in Range(len(t)-k+1):
            self.index.append((t[i:i+k,i]))
        self.index.sort()
    
    def query(self,p):
        kmer =p[:slef.k]
        i = bisect.bisect_left(self.index,(kmer,-1))
        hits = []
        while i < len(self.index):
            if self.index[i][0] != kmer:
                break
            hits.append(self.index[i][1])
            i+=1
        return hits

def queryIndex(p,t,index):
    k = index.k
    offsets = []
    for i in index.query(p):
        if p[k:] == t[i+k:i+length(p)]:
            offsets.append(i)
    return offsets
*/

//HammingDistance es keresés


class Index {
    constructor(t, k) {
      this.k = k;
      this.index = [];
      for (let i = 0; i < t.length - k + 1; i++) {
        this.index.push([t.slice(i, i + k), i]);
      }
      this.index.sort((a, b) => a[0].localeCompare(b[0]));
    }
  
    query(p) {
      const kmer = p.slice(0, this.k);
      let i = this.bisectLeft(this.index, [kmer, -1]);
      const hits = [];
      while (i < this.index.length) {
        if (this.index[i][0] !== kmer) {
          break;
        }
        hits.push(this.index[i][1]);
        i++;
      }
      return hits;
    }
  
    bisectLeft(array, target) {
      let left = 0;
      let right = array.length;
      while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (array[mid][0] < target[0]) {
          left = mid + 1;
        } else {
          right = mid;
        }
      }
      return left;
    }
  }

  function queryIndex(p, t, index) {
    const k = index.k;
    const offsets = [];
  
    const queryResults = index.query(p);
    for (let i = 0; i < queryResults.length; i++) {
      const indexValue = queryResults[i];
      if (p.slice(k) === t.slice(indexValue + k, indexValue + p.length)) {
        offsets.push(indexValue);
      }
    }
  
    return offsets;
  }

  module.exports = {
    Index: Index,
    queryIndex: queryIndex
  };
  
  /*
  // Example usage:
  const myIndex = new Index("ACGTACGTACGT", 0);
  const result = myIndex.query("CGTA");
  //console.log(result);  // Output: [1, 5]
  

  const text = "GCTACGATCTAGAATCTA";
  const pattern = "TCTA";
  
  // Create an index for the text with a k-mer length of 8
  const index = new Index(text, 2);
  
  // Query the index to find the positions of the pattern in the text
  const positions = queryIndex(pattern, text, index);
  
  console.log("Pattern positions:", positions);
  */