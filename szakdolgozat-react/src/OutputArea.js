// OutputArea.js
import React from 'react';
import DotComponent from './dot'

function szazalek(e,full){
  const percentage = (e / full) * 100;
  return Math.round(percentage * 100) / 100;
}

const OutputArea = (props) => {
  return (
    <div>
      <h4>Találat {props.index}</h4>
      <p>helye: {props.element}/{props.long}</p>
      <DotComponent number={szazalek(props.element,props.long)}/>
    </div>
  );
};

export default OutputArea;
