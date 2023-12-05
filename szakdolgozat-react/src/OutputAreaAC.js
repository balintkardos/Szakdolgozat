import React from 'react';
import DotComponent from './dot'

/**
 * Kiszámítja a százalékot a megadott értékek alapján.
 * @param {number} e - A számláló értéke.
 * @param {number} full - A nevező értéke.
 * @returns {number} - A kiszámolt százalék kerekítve.
 */
function szazalek(e, full) {
  const percentage = (e / full) * 100;
  return Math.round(percentage * 100) / 100;
}

/**
 * Az Aho-Corasick algoritmus eredményeinek kimeneti területét reprezentáló funkcionális komponens.
 * @param {Object} props - Component properties.
 * @param {string} props.pattern - Minta string.
 * @param {number} props.index - A mintaegyezés indexe.
 * @param {number} props.long - A szöveg hossza.
 * @returns {JSX.Element} - React JSX element.
 */
const OutputAreaAC = (props) => {
  return (
    <div>
      <h4>Találat "{props.pattern}"</h4>
      <p>helye: {props.index}/{props.long}</p>
      <DotComponent number={szazalek(props.index, props.long)} />
    </div>
  );
};

export default OutputAreaAC;