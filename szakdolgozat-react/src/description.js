import React from 'react';

/**
 * Functional component leírás megjelnítése az alapján milyen propertivel hívtuk meg.
 * @param {Object} props - Component properties.
 * @param {number} props.number - A szám ami reprezenztálja a kereső algoritmust.
 * @returns {JSX.Element} - React JSX element.
 */
const Description = ({ number }) => {
    if (number === 0) {
        return <div>A naiv algoritmus <p>Minden lehetséges helyen megpróbálja illeszteni a keresett sztringeket a szövegre</p></div>;
    }
    if (number === 1) {
        return <div>A Not So Naive algoritmus.
            <p>Az algoritmus a szöveget a második karaktertől kezdve vizsgálja.</p>
            <p>Ha a szöveg következő karaktere megegyezik a keresett minta második karakterével, akkor az algoritmus megvizsgálja, hogy a keresett minta fennmaradó karakterei megegyeznek-e a szöveg következő m-1 karakterével.</p>
            <p>Ha a keresett minta fennmaradó karakterei megegyeznek a szöveg következő m-1 karakterével, akkor az algoritmus megtalált egy egyezést, és visszaadja az egyezés kezdőpozícióját.</p>
            <p>Ha nem egyezik meg a keresett minta második karakterével, akkor az algoritmus továbblép a következő karakterre.</p>
        </div>;
    }
    if (number === 2) {
        return <div>A Boyer-Moore algoritmus.
            <p>A hatékony ugrás érdekébe két szabály alapján ugrik előre a szövegben. Szöveget balról jobbra, mintát jobról balra olvassa.</p>
            <p>1. Bad character szabály</p>
            <p>2.Good Suffix szabály</p>
        </div>;
    }
    if (number === 10) {
        return <div>Naiv algoritmus Hamming távolsággal kiegészítve.
            <p>Brute force-al keresi a mintát de Hamming távolságnyi eltérést enged.</p>
        </div>
    }
    if (number === 4) {
        return <div>Knuth-Morris-Pratt algoritmus.
            <p>Az algoritmus a minta előzetes vizsgálatával előre meghatározza, hogy a minta adott karaktere nem illeszkedik a szövegre, akkor mekkora az a legkisebb ugrás amíg biztosan nem lesz egyezés.</p>
        </div>
    }
    if (number === 6) {
        return <div>Aho-Corasick algoritmus.
            <p>Az algoritmus egy automatát épít a mintákból, és ezzel egyszerre több mintát is lehet keresni egy szövegben gyorsan és hatékonyan.</p>
        </div>
    }
    if (number === 8) {
        return <div>Karp and Rabin algoritmus.
            <p>Az algoritmus a minta és a szöveg összehasonlításához egy hashfüggvényt használ, így csak a hashértékek egyenlőségének ellenőrzésére van szükség, ami gyorsabb, mint a karakterek egyezőségének ellenőrzése.</p>
        </div>
    }
    if (number === 7) {
        return <div>Shift-Or algoritmus.
            <p>Az algoritmus egy hatékony mintaillesztési algoritmus, amely egy biteltolást használ.</p>
        </div>
    }

    return null;
};

export default Description;