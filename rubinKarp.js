
function KR(pattern, text) {
    let d, hx, hy, i;
    let m =pattern.length;
    let n =text.length;
    let output=[]

    // Preprocessing
    for (d = i = 1; i < m; ++i) {
        d = (d << 1);
    }

    for (hy = hx = i = 0; i < m; ++i) {
        hx = ((hx << 1) + pattern.charCodeAt(i));
        hy = ((hy << 1) + text.charCodeAt(i));
    }

    // Searching
    let j = 0;
    while (j <= n - m) {
        if (hx === hy && pattern === text.substring(j, j + m)) {
            output.push(j)
        }
        
        hy = ((hy - text.charCodeAt(j) * d) << 1) + text.charCodeAt(j + m);
        ++j;
    }
    return output
}

// Example usage:
//const x = "pattern";
//const y = "textwithpatterndspattern";
//KR(x, y);

module.exports = KR;
