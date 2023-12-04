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

module.exports = shiftOr;
