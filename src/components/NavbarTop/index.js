import React from 'react';
import { useHistory } from "react-router-dom";

import "./styles.css";
import logo from "../../assets/logo-sem-nome.png";
import iconIosBack from "../../assets/icon-ios-back.png";

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
                    <ul class="navbar-nav">
                        <li><button onClick={() => handleClick("/meu-menu")}>Cardápio</button></li>
                        <li><button onClick={() => handleClick("/meu-menu/receitas")}>Receitas</button></li>
                        <li><button onClick={() => handleClick("/meu-menu/lista-de-compras")}>Lista de compras</button></li>
                        <li><button onClick={() => handleClick("/meu-menu/orientacoes-gerais")}>Orientações gerais</button></li>
                    </ul>
                 ) : 
                 ('')
            }   
        </div>
    );
}
