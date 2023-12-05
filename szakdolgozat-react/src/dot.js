import React from 'react';

/**
 * Functional component pont konténer megjelenítéséhez kiemelt ponttal a megadott szám alapján.
 * @param {Object} props - Component properties.
 * @param {number} props.number - A kiemelt pont meghatározásához szükséges szám.
 * @returns {JSX.Element} - React JSX element.
 */
const DotComponent = ({ number }) => {
  const dots = Array.from({ length: 101 }, (_, index) => (
    <span key={index} className="dot" style={{ backgroundColor: (index === Math.round(number)) ? '#7289da' : '#424549' }}></span>
  ));
  return <div className="dot-container">{dots}</div>;
};

export default DotComponent;
