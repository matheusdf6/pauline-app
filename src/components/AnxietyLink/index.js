import React from 'react';

// import { Container } from './styles';

import "./styles.css";

import sadEmoji from "../../assets/sad-emoji.png";

export default function AnxietyLink() {
  return (
    <div className="ansiety-link">
      <img src={sadEmoji} alt="Rosto Triste"/>
      <h4>Controle de ansiedade</h4>
      <button>A nutri ajuda</button>
    </div>
  );
}
