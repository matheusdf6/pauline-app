import React from 'react';

import { useHistory } from "react-router-dom";

import apple from "../../assets/apple.png";
import cooking from "../../assets/cooking.png";
import help from "../../assets/help.png";
import market from "../../assets/market.png";

import "./styles.css";

export default function MyMenuDash() {

  const history = useHistory();

  const goToPage = (page) => {
    history.push(page);
  }

  return (
    <div className="my-menu-dash card-white">
      <h3>Meu Cardápio</h3>
      <button onClick={() => goToPage("/meu-menu/cardapios")} className="view-all">
        <div className="icon-round">
          <img src={apple} alt="Ver cardápio completo"/>
        </div>
        <span>Ver cardápio completo</span>
      </button>
      <div className="row stretch">
        <div className="column_1-of-3">
          <button onClick={() => goToPage("/meu-menu/receitas")} className="menu-card">
            <div className="icon-round">
              <img className="menu-icon" src={cooking} alt="Minhas receitas"/>
            </div>
            <span className="menu-text">Minhas receitas</span>
          </button>
        </div>
        <div className="column_1-of-3">
          <button onClick={() => goToPage("/meu-menu/lista-de-compras")} className="menu-card">
            <div className="icon-round">
              <img className="menu-icon" src={market} alt="Lista de compras"/>
            </div>
            <span className="menu-text">Lista de compras</span>
          </button>
        </div>
        <div className="column_1-of-3">
          <button onClick={() => goToPage("/meu-menu/orientacoes-gerais")} className="menu-card">
            <div className="icon-round">
              <img className="menu-icon" src={help} alt="Orientações gerais"/>
            </div>
            <span className="menu-text">Orientações gerais</span>
          </button>
        </div>
      </div>
    </div>
  );
}
