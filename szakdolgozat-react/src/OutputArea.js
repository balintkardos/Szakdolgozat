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
  return  Math.round(Math.round(percentage * 100) / 100);
}

/**
 * A kimeneti területet reprezentáló funkcionális komponens.
 * @param {Object} props - Component properties.
 * @param {number} props.index - A mintaegyezés indexe.
 * @param {number} props.element - Az elem helyzete.
 * @param {number} props.long - A szöveg hossza.
 * @param {string} props.pattern - A a minta.
 * @returns {JSX.Element} - React JSX element.
 */
const OutputArea = (props) => {
  return (
    <div>
      <h4>{props.index}. indexű találat</h4>
      <p>ami {props.element}. karakteren kezdődik. Összes karkter száma: {props.long}</p>
      <DotComponent number={szazalek(props.element, props.long)} long={szazalek(props.element+props.pattern.length,props.long)}/>
    </div>
  );
};

export default OutputArea;
