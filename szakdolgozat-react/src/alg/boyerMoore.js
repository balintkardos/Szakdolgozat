/**
 * Kiszámítja a string két indexe közötti illeszkedő substring hosszát.
 * @param {string} S - A bemeneti string.
 * @param {number} idx1 - Az első kezdő indexe a substring-nek.
 * @param {number} idx2 - A második kezdő indexe a substring-nek.
 * @returns {number} - A hoszza az illeszkedő substring-nek.
 */
function match_length(S, idx1, idx2) {
    if (idx1 === idx2) {
        return S.length - idx1;
    }
    let match_count = 0;
    while (idx1 < S.length && idx2 < S.length && S[idx1] === S[idx2]) {
        match_count++;
        idx1++;
        idx2++;
    }
    return match_count;
}

/**
 * Elvégzi a Boyer-Moore algoritmus alapvető előfeldolgozását.
 * @param {string} S - A bemeneti string.
 * @returns {Array.<number>} - Az alapvető előfeldolgozási eredményt reprezentáló tömb.
 */
function fundamental_preprocess(S) {
    if (S.length === 0) {
        return [];
    }
    if (S.length === 1) {
        return [1];
    }

    const z = new Array(S.length).fill(0);
    z[0] = S.length;
    z[1] = match_length(S, 0, 1);

    for (let i = 2; i <= z[1]; i++) {
        z[i] = z[1] - i + 1;
    }

    let l = 0;
    let r = 0;

    for (let i = 2 + z[1]; i < S.length; i++) {
        if (i <= r) {
            const k = i - l;
            const b = z[k];
            const a = r - i + 1;

            if (b < a) {
                z[i] = b;
            } else {
                z[i] = a + match_length(S, a, r + 1);
                l = i;
                r = i + z[i] - 1;
            }
        } else {
            z[i] = match_length(S, 0, i);
            if (z[i] > 0) {
                l = i;
                r = i + z[i] - 1;
            }
        }
    }

    return z;
}

/**
 * A Hibás karakterváltási táblázatát állítja elő.
 * @param {string} pattern - A minta string.
 * @returns {Array.<Array.<number>>} - hibás karakterváltási táblázat.
 */
function bad_character_table(pattern) {
    //const ALPHABET_SIZE = 0x10FFFF; //minden karakterrejó csak lassú az előfeldolgozás
    const ALPHABET_SIZE = 2047; //legtöbb esetben elég
    if (pattern.length === 0) {
        return Array.from({ length: ALPHABET_SIZE }, () => []);
    }

    const bct = Array.from({ length: ALPHABET_SIZE }, () => [-1]);
    const alpha = Array(ALPHABET_SIZE).fill(-1);

    for (let i = 0; i < pattern.length; i++) {
        alpha[(pattern[i]).codePointAt(0)] = i;

        for (let j = 0; j < alpha.length; j++) {
            bct[j].push(alpha[j]);
        }
    }

    return bct;
}

/**
 * Létrehozza a good suffix shift táblázatot.
 * @param {string} pattern - A minta string.
 * @returns {Array.<number>} - A good suffix shift tábla.
 */
function good_suffix_table(pattern) {
    const gst = Array(pattern.length).fill(-1);
    const fp = fundamental_preprocess([...pattern].reverse());

    fp.reverse();

    for (let j = 0; j < pattern.length - 1; j++) {
        const i = pattern.length - fp[j];
        if (i !== pattern.length) {
            gst[i] = j;
        }
    }

    return gst;
}

/**
 * Generálja a full shift táblát.
 * @param {string} pattern - A minta string.
 * @returns {Array.<number>} - A full shift tábla.
 */
function full_shift_table(pattern) {
    const fst = Array(pattern.length).fill(0);
    const fp = fundamental_preprocess(pattern);
    let longest = 0;

    for (let i = fp.length - 1; i >= 0; i--) {
        longest = Math.max(fp[i], longest);
        fst[i] = longest;
    }

    return fst;
}

/**
 * Boyer-Moore algoritmust al megkeresi a minta találatait a szövegben.
 * @param {string} P - A minta amit keresünk.
 * @param {string} T - A szöveg amibe keresünk.
 * @param {Array.<Array.<number>>} R - A bad character shift tábla.
 * @param {Array.<number>} L - Good suffix shift tábla.
 * @param {Array.<number>} F - Full shift tábla.
 * @returns {Array.<number>} - Tömb amibe a talált helyek vannak.
 */
function boyerMoore(P, T, R, L, F) {
    if (P.length === 0 || T.length === 0 || T.length < P.length) {
        return [];
    }
    const matches = [];
    let k = P.length - 1;
    let previous_k = -1;

    while (k < T.length) {
        let i = P.length - 1;
        let h = k;

        while (i >= 0 && h > previous_k && P[i] === T[h]) {
            i--;
            h--;
        }

        if (i === -1 || h === previous_k) {
            matches.push(k - P.length + 1);
            k += P.length - (P.length > 1 ? F[1] : 1);
        } else {
            const char_shift = i - R[(T[h]).codePointAt(0)][i];

            let suffix_shift;
            if (i + 1 === P.length) {
                suffix_shift = 1;
            } else if (L[i + 1] === -1) {
                suffix_shift = P.length - F[i + 1];
            } else {
                suffix_shift = P.length - 1 - L[i + 1];
            }

            const shift = Math.max(char_shift, suffix_shift);
            previous_k = shift >= i + 1 ? k : previous_k;
            k += shift;
        }
    }

    return matches;
}

/**
 * Exportálja a Boyer-Moore algoritmust és a kapcsolódó táblázatokat más modulokban való használatra.
 * @module BoyerMoore
 */
module.exports = {
    boyerMoore: boyerMoore,
    full_shift_table: full_shift_table,
    bad_character_table: bad_character_table,
    good_suffix_table: good_suffix_table
};
