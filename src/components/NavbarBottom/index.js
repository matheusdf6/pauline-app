import React from 'react';
import { NavLink } from "react-router-dom";

import home from "../../assets/home.png";
import sadEmoji from "../../assets/sad-emoji.png";
import apple from "../../assets/apple.png";
import avatar from "../../assets/avatar.png";


export default function NavbarBottom() {
  return (
    <div className="navbar-bottom">
        <NavLink exact to="/" activeClassName="selected"><img src={home} alt="Início"/></NavLink>
        <NavLink to="/ansiedade" activeClassName="selected"><img src={sadEmoji} alt="Ansiedade"/></NavLink>
        <NavLink to="/meu-menu" activeClassName="selected"><img src={apple} alt="Meu cardápio"/></NavLink>
        <NavLink to="/perfil" activeClassName="selected"><img src={avatar} alt="Perfil"/></NavLink>
    </div>
  );
}
