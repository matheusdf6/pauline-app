import React from 'react';
import replaceNewLine from "../../utils/replaceNewLine";

import './styles.css';

import arrow_down from "../../assets/arrow-down.png";

export default function MenuAccordion({ meal, collapsed, onClick }) {
  
  const { refeicao, descricao, opcoes } = meal;
  
  console.log(descricao);
  console.log(replaceNewLine(descricao));
  return (
    <div className={collapsed ? "meal-accordion collapsed" : "meal-accordion"}>
      <div className="accordion-title" onClick={ onClick }>
        <h4>{refeicao}</h4>
        <img src={arrow_down} alt="Expandir"/>
      </div>
      <div className="accordion-text">
        <div className="meal-descricao">
          {replaceNewLine(descricao)}
        </div>
        {
          opcoes ? opcoes.map((op, index) => (
            <div key={index} className="opcao">
              <h5>{op.titulo}</h5>
              <p>{replaceNewLine(op.descricao)}</p>
            </div>
          )) : ''

        }
      </div>
    </div>
  );
}
