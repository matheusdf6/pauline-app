import React from 'react';

// import { Container } from './styles';

import "./styles.css";

import sadEmoji from "../../assets/sad-emoji.png";

export default function AnxietyLink({ click }) {

  let stored = Storage.getLocalStorage('user');

  if( !stored ) {
      return null;
  }

  const user = JSON.parse(stored);

  if(user.tipo_usuario == "Paciente") {
    return (
      <div className="ansiety-link">
        <img src={sadEmoji} alt="Rosto Triste"/>
        <h4>Controle de ansiedade</h4>
        <button onClick={ click }>A nutri ajuda</button>
      </div>
    );
  } else {
    return (
      <div className="ansiety-link al-row">
        <img src={sadEmoji} alt="Rosto Triste"/>
        <h4>Controle de ansiedade</h4>
        <button onClick={ click }>A nutri ajuda</button>
      </div>
    );
  }

}
