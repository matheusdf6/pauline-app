import React from 'react';
import { NavLink } from "react-router-dom";

import home from "../../assets/home.png";
import sadEmoji from "../../assets/sad-emoji.png";
import apple from "../../assets/apple.png";
import avatar from "../../assets/avatar.png";

import useNotification from "../../services/Notification/useNotification";
import Storage from "../../services/Storage";
import smile from "../../assets/tips.png"
import sad from "../../assets/embarrassed.png"


export default function NavbarBottom() {

  const { addMessage } = useNotification();

  const handleClick = () => {
      let tip = Storage.getOneTip();
      console.log(tip);
      if( tip ) {
          addMessage(
              smile,
              tip[0].tip.title.rendered,
              '',
              tip[0].tip.acf.texto,
              'Ok',
              '',
              'Ainda preciso de ajuda'
          );
      } else {
          addMessage(
              sad,
              "Não consegue controlar a ansiedade?",
              '',
              'Vamos te ajudar! Envie um whats pra nutri',
              'Mandar mensagem',
              '',
              'Enviar depois'
          );

      }
  }

  let stored = Storage.getLocalStorage('user');

  if( !stored ) {
      return null;
  }

  const user = JSON.parse(stored);

  return (
    <div className="navbar-bottom">
        <NavLink exact to="/" activeClassName="selected"><img src={home} alt="Início"/></NavLink>
        <a onClick={ handleClick }to="/ansiedade"><img src={sadEmoji} alt="Ansiedade"/></a>
        {
            user.tipo_usuario == "Paciente" ? (
                <NavLink to="/meu-menu/cardapios" activeClassName="selected"><img src={apple} alt="Meu cardápio"/></NavLink>
            ) : (
                <NavLink to="/meu-menu/receitas" activeClassName="selected"><img src={apple} alt="Meu cardápio"/></NavLink>
            )
        }
        <NavLink to="/perfil" activeClassName="selected"><img src={avatar} alt="Perfil"/></NavLink>
    </div>
  );
}
