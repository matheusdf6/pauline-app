import React from 'react';
import { NavLink, useHistory } from "react-router-dom";

import "./styles.css";
import logo from "../../assets/logo-sem-nome.png";
import iconIosBack from "../../assets/icon-ios-back.png";

import apple from "../../assets/apple.png";
import cooking from "../../assets/cooking.png";
import market from "../../assets/market.png";
import help from "../../assets/help.png";


export default function NavbarTop({ name, withMenu, withLogo, withGoBack }) {
    
    const history = useHistory();

    function handleClick(path) {
        history.push(path);
    }

    function classNames() {
        let classes = 'navbar-top';
        if(withMenu) classes += " with-menu";
        if(withLogo) classes += " with-logo";
        return classes;
    }

    return (
        <div className={ classNames() }>
            {
                withLogo ? (<img src={logo} alt="Pauline Maccari"/>) : ('')

            }
            {
                withGoBack ? (<button className="goback" onClick={() => history.goBack() }><img src={iconIosBack} /></button>) : ('')
            } 
            <h2>{name}</h2>
            {
                withMenu ? 
                 (
                    <ul className="navbar-nav">
                        <li><NavLink to="/meu-menu/cardapios" activeClassName="selected"><img src={apple} />Cardápio</NavLink></li>
                        <li><NavLink to="/meu-menu/receitas" activeClassName="selected"><img src={cooking} />Receitas</NavLink></li>
                        <li><NavLink to="/meu-menu/lista-de-compras" activeClassName="selected"><img src={market} />Lista de compras</NavLink></li>
                        <li><NavLink to="/meu-menu/orientacoes-gerais" activeClassName="selected"><img src={help} />Orientações gerais</NavLink></li>
                    </ul>
                 ) : 
                 ('')
            }   
        </div>
    );
}
