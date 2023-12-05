/**
 * Végrehajtja a "Not so naiv" mintaillesztő algoritmust, hogy megtalálja a mintaegyezéseket a szövegben.
 * @param {string} pattern - A keresendő minta.
 * @param {string} text - A szöveg amiben keresünk.
 * @returns {Array.<number>} - Indexek tömbje, ahol egyezések találhatók.
 */
function notSoNaive(pattern, text) {
    let j, k, ell;
    let m = pattern.length;
    let n = text.length;

    if (pattern[0] === pattern[1]) {
        k = 2;
        ell = 1;
    } else {
        k = 1;
        ell = 2;
    }

    j = 0;
    let output = [];
    while (j <= n - m) {
        if (pattern[1] !== text[j + 1]) {
            j += k;
        } else {
            if (
                pattern.slice(2) === text.slice(j + 2, j + m) &&
                pattern[0] === text[j]
            ) {
                output.push(j)
            }
            j += ell;
        }
    }
    return output;
}

/**
 * Exportálja a "Not So Naive" mintaillesztési algoritmust más modulokban való használatra.
 * @module NotSoNaivePatternMatching
 */
module.exports = notSoNaive;



