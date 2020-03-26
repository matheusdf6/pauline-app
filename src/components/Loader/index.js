import React from 'react';

import './styles.css';

export default function Loader({ width, white }) {
  return (
    <div className={ white ? "spinner white" : "spinner"} style={{width}}>
        <div className="bounce-wrapper b1">
            <div></div>
        </div>
        <div className="bounce-wrapper b2">
            <div></div>
        </div>
        <div className="bounce-wrapper b3">
            <div></div>
        </div>
    </div>
  );
}
