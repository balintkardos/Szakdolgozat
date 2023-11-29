import React from 'react';
import DotComponent from './dot'

function szazalek(e,full){
  const percentage = (e / full) * 100;
  return Math.round(percentage * 100) / 100;
}

const OutputAreaAC = (props) => {
  return (
    <div>
        <h4>Találat "{props.pattern}"</h4>
        <p>helye: {props.index}/{props.long}</p>
        <DotComponent number={szazalek(props.index,props.long)}/>
    </div>
  );
};

export default OutputAreaAC;