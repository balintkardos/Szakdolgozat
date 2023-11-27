const ALPHABET_SIZE = 0x10FFFF;

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

function bad_character_table(S) {
    if (S.length === 0) {
        return Array.from({ length: ALPHABET_SIZE }, () => []);
    }

    const R = Array.from({ length: ALPHABET_SIZE }, () => [-1]);
    const alpha = Array(ALPHABET_SIZE).fill(-1);

    for (let i = 0; i < S.length; i++) {
        alpha[(S[i]).codePointAt(0)] = i;

        for (let j = 0; j < alpha.length; j++) {
            R[j].push(alpha[j]);
        }
    }

    return R;
}

function good_suffix_table(S) {
    const L = Array(S.length).fill(-1);
    const N = fundamental_preprocess([...S].reverse());

    N.reverse();

    for (let j = 0; j < S.length - 1; j++) {
        const i = S.length - N[j];
        if (i !== S.length) {
            L[i] = j;
        }
    }

    return L;
}

function full_shift_table(S) {
    const F = Array(S.length).fill(0);
    const Z = fundamental_preprocess(S);
    let longest = 0;

    for (let i = Z.length - 1; i >= 0; i--) {
        longest = Math.max(Z[i], longest);
        F[i] = longest;
    }

    return F;
}

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

/*
function approximateMatch(p, t, n) {
    const segmentLength = Math.round(p.length / (n + 1));
    const allMatches = new Set();
  
    for (let i = 0; i <= n; i++) {
      const start = i * segmentLength;
      const end = Math.min((i + 1) * segmentLength, p.length);
      const segment = p.substring(start, end);
  
      const matches = boyerMoore(segment, t);
      
      let mismatches = 0;
      for (const m of matches) {
        if (m < start || m - start + p.length > t.length) {
          continue;
        }
        mismatches = 0;
        for (let j = 0; j < start; j++) {
          if (p[j] !== t[m - start + j]) {
            mismatches++;
            if (mismatches > n) {
              break;
            }
          }
        }
        for (let j = end; j < p.length; j++) {
          if (p[j] !== t[m - start + j]) {
            mismatches++;
            if (mismatches > n) {
              break;
            }
          }
        }
        if (mismatches <= n) {
          allMatches.add(m - start);
        }
      }
    }
  
    return Array.from(allMatches);
  }
*/

  module.exports = {
    boyerMoore: boyerMoore,
    full_shift_table: full_shift_table,
    bad_character_table: bad_character_table,
    good_suffix_table: good_suffix_table
  };
