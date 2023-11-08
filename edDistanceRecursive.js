/*
def edDistRecursive(a,b):
    if len(a) == 0:
        return len(b)
    if len(b) == 0_
        return len(a)
    delt = 1 if a[-1] != b[-1] esle 0
    return min(
        edDistRecursive(a[:-1],b[:-1]) +delt,
        edDistRecursive(a[:-1],b)+1,
        edDistRecursive(a,b[:-1])+1
    )
*/
function editDistanceRecursive(a, b) {
    if (a.length === 0) {
      return b.length;
    }
    if (b.length === 0) {
      return a.length;
    }
  
    const delta = a.slice(-1) !== b.slice(-1) ? 1 : 0;
  
    return Math.min(
      editDistanceRecursive(a.slice(0, -1), b.slice(0, -1)) + delta,
      editDistanceRecursive(a.slice(0, -1), b) + 1,
      editDistanceRecursive(a, b.slice(0, -1)) + 1
    );
}

function editDistance(str1, str2) {
    const len1 = str1.length;
    const len2 = str2.length;
  
    // Create a 2D array to store the edit distances
    const dp = new Array(len1 + 1).fill(null).map(() => new Array(len2 + 1));
  
    // Initialize the first row and first column of the array
    for (let i = 0; i <= len1; i++) {
      dp[i][0] = i;
    }
    for (let j = 0; j <= len2; j++) {
      dp[0][j] = j;
    }
  
    // Fill in the rest of the array
    for (let i = 1; i <= len1; i++) {
      for (let j = 1; j <= len2; j++) {
        if (str1[i - 1] === str2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] = Math.min(
            dp[i - 1][j] + 1, // Deletion
            dp[i][j - 1] + 1, // Insertion
            dp[i - 1][j - 1] + 1 // Substitution
          );
        }
      }
    }
  
    // The final value in the bottom-right corner of the array is the edit distance
    console.log(dp[len1][len2])
    return dp[len1][len2];
  }
console.time('editDistance');
let distance = editDistanceRecursive("Shakespeare", "shake spear");
console.timeEnd('editDistance');
console.log(distance);

const str1 = "Shakespeare";
const str2 = "shake spear";
console.time('editDistance2');
const distance2 = editDistance(str1, str2);
console.timeEnd('editDistance2');
console.log(`Edit distance between "${str1}" and "${str2}" is ${distance2}`);
