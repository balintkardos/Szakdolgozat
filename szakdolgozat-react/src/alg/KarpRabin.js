
function preKR(pattern, text) {
    let d, hx, hy, i;
    let m = pattern.length;
    let n = text.length;

    for (d = i = 1; i < m; ++i) {
        d = (d << 1);
    }

    for (hy = hx = i = 0; i < m; ++i) {
        hx = ((hx << 1) + pattern.charCodeAt(i));
        hy = ((hy << 1) + text.charCodeAt(i));
    }

    return [d, m, n, hx, hy]
}


function KR(pattern, text, pre) {
    let hx = pre[3];
    let hy = pre[4];
    let d = pre[0];
    let m = pre[1];
    let n = pre[2];
    let output = []

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

module.exports = {
    KR: KR,
    preKR: preKR
};
