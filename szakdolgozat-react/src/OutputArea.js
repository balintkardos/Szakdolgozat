// OutputArea.js
import React from 'react';

function szazalek(e,full){
  const percentage = (e / full) * 100;
  return Math.round(percentage * 100) / 100;
}

const OutputArea = (props) => {
  // eslint-disable-next-line
  {console.log(props)}
  return (
    <div>
      <h3>Algorithm Output {props.index}:</h3>
      <p>hely: {props.element}</p>
      <p>szazalek: {szazalek(props.element,props.long)}</p>
    </div>
  );
};

export default OutputArea;
