// OutputArea.js
import React from 'react';

const OutputArea = (props) => {
  // eslint-disable-next-line
  {console.log(props)}
  return (
    <div>
      <h3>Algorithm Output {props.index}:</h3>
      <p>hely: {props.element}</p>
    </div>
  );
};

export default OutputArea;
