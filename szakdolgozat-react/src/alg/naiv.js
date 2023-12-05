/**
 * Végrehajtja a naiv mintaillesztési algoritmust, hogy megtalálja a mintaegyezéseket a szövegben.
 * @param {string} pat - A keresendő minta.
 * @param {string} txt - A szöveg amiben keresünk.
 * @returns {Array.<number>} - Indexek tömbje, ahol egyezések találhatók.
 */
function naive(pat, txt) {
  let M = pat.length;
  let N = txt.length;
  const result = [];

  for (let i = 0; i <= (N - M); i++) {
    let j;
    for (j = 0; j < M; j++) {
      if (txt[i + j] !== pat[j]) {
        break;
      }
    }
    if (j === M) {
      result.push(i);
    }
  }

  return result;
}

/**
 * Végrehajtja a naiv mintaillesztési algoritmust egy megadott Hamming-távolsággal.
 * @param {string} pat - A keresendő minta.
 * @param {string} txt - A szöveg amiben keresünk.
 * @param {number} hdistance - A megengedett legnagyobb Hamming-távolság.
 * @returns {Array.<number>} - Indexek tömbje, ahol egyezések találhatók.
 */
function naiveH(pat, txt, hdistance) {
  let M = pat.length;
  let N = txt.length;
  const result = [];

  for (let i = 0; i <= (N - M); i++) {
    let j;
    let nmm = 0;
    for (j = 0; j < M; j++) {
      if (txt[i + j] !== pat[j]) {
        nmm++;
        if (nmm > hdistance) {
          break;
        }
      }
    }
    if (nmm <= hdistance) {
      result.push(i);
    }
  }

  return result;
}

/**
 * Exportálja a naiv mintaillesztési algoritmusokat más modulokban való használatra.
 * @module NaivePatternMatching
 */
module.exports = {
  naive: naive,
  naiveH: naiveH
};
