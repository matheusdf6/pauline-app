import React from 'react';

import smile from "../assets/tips.png";

export default function TipsManager() {
  return (
    <div className="full-screen">
        <div className="tips-box">
            <img src={smile} />
            <h2>Tome um chá</h2>
            <p>Prepara um cházinho de camomila, melissa ou valeriana</p>
            <button className="ok-button">Ok!</button>
            <button className="help-button">Ainda preciso de ajuda :(</button>
        </div>
    </div>
  );
}
