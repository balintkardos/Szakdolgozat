/**
 * Végrehajtja a Shift-or mintaillesztési algoritmust, hogy megtalálja a mintaegyezéseket a szövegben.
 * @param {string} pattern - A keresendő minta.
 * @param {string} text - A szöveg amiben keresünk.
 * @returns {Array.<number>} - Indexek tömbje, ahol egyezések találhatók.
 */
function shiftOr(pattern, text) {
    let state = 0;
    let mask = [];
    let matches = [];
    let m = pattern.length;
    if (m === 0) {
        return matches
    }
    for (let i = 0; i < m; i++) {
        mask[pattern[i]] = mask[pattern[i]] | (1 << i);
    }
    for (let i = 0; i < text.length; i++) {
        state = (state << 1) + 1;
        state = state & mask[text[i]];
        if ((state & (1 << (m - 1))) !== 0) {
            matches.push(i - pattern.length + 1);
        }
    }
    return matches;
}

/**
 * Exportálja a Shift-or mintaillesztési algoritmust más modulokban való használatra.
 * @module NotSoNaivePatternMatching
 */
module.exports = shiftOr;
