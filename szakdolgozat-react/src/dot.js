import React from 'react';

const DotComponent = ({ number }) => {
  const dots = Array.from({ length: 101 }, (_, index) => (
    <span key={index} className="dot" style={{ backgroundColor: (index === Math.round(number)) ? '#7289da' : '#424549' }}></span>
  ));
  return <div className="dot-container">{dots}</div>;
};

export default DotComponent;