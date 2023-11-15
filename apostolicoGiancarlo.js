// Preprocessing functions for the Boyer-Moore algorithm
function preBmBc(pattern) {
    // Compute the bad-character shift table
    let m = pattern.length;
    let alphabetSize = 256; // Assuming ASCII characters
    let bmBc = new Array(alphabetSize).fill(m); // Initialize with the pattern length
    for (let i = 0; i < m - 1; i++) {
      bmBc[pattern.charCodeAt(i)] = m - i - 1; // Update the shift for each character in the pattern
    }
    return bmBc;
  }
  
  function preBmGs(pattern) {
    // Compute the good-suffix shift table
    let m = pattern.length;
    let suff = suffixes(pattern); // Get the suffix lengths
    let bmGs = new Array(m).fill(m); // Initialize with the pattern length
    let j = 0;
    for (let i = m - 1; i >= 0; i--) {
      if (suff[i] == i + 1) {
        // Case 1: the suffix matches the prefix of the pattern
        while (j < m - 1 - i) {
          if (bmGs[j] == m) {
            // Only update if not already set
            bmGs[j] = m - 1 - i;
          }
          j++;
        }
      }
    }
    for (let i = 0; i < m - 1; i++) {
      // Case 2: the suffix matches somewhere in the pattern
      bmGs[m - 1 - suff[i]] = m - 1 - i;
    }
    return bmGs;
  }
  
  function suffixes(pattern) {
    // Compute the length of the longest suffix ending at each position
    let m = pattern.length;
    let suff = new Array(m); // Initialize the array
    suff[m - 1] = m; // The last suffix is the whole pattern
    let g = m - 1; // The rightmost position of the current suffix
    let f = 0; // The leftmost position of the current suffix
    for (let i = m - 2; i >= 0; i--) {
      if (i > g && suff[i + m - 1 - f] < i - g) {
        // Case 1: the suffix is contained in the previous suffix
        suff[i] = suff[i + m - 1 - f];
      } else {
        // Case 2: the suffix is not contained in the previous suffix
        if (i < g) {
          // Adjust the rightmost position
          g = i;
        }
        f = i; // Adjust the leftmost position
        while (g >= 0 && pattern[g] == pattern[g + m - 1 - f]) {
          // Compare the characters from right to left
          g--;
        }
        suff[i] = f - g; // Store the suffix length
      }
    }
    return suff;
  }
  
  // Apostolico-Giancarlo algorithm
  function apostolicoGiancarlo(text, pattern) {
    let n = text.length;
    let m = pattern.length;
    let bmBc = preBmBc(pattern);
    let bmGs = preBmGs(pattern);
    let skip = new Array(m).fill(0);
    let j = 0;
    let matches = [];
    
    while (j <= n - m) {
      let i = m - 1;
      let k = skip[j + m - 1];
      
      while (i >= k && pattern[i] == text[i + j]) {
        i--;
      }
      
      if (i < k) {
        matches.push(j);
        
        skip[j + m - 1] = m;
        j += bmGs[0];
      } else {
        skip[j + m - 1] = m - 1 - i;
        j += Math.max(bmBc[text.charCodeAt(i + j)] - m + 1 + i, bmGs[i]);
      }
    }
    
    return matches;
  }
  
  
console.log(apostolicoGiancarlo("abababaabcababa","ab"))

//szar
