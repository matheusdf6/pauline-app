import React, { useEffect, useState } from 'react';

import { Link, useParams } from "react-router-dom";

import { getMenus } from "../../api/modules/menus";

import "./styles.css";
import NavbarTop from "../../components/NavbarTop";
import NavbarBottom from "../../components/NavbarBottom";
import Loader from "../../components/Loader";
import isSameDay from "../../utils/isSameDay";


import MenuAccordion from "../../components/MenuAccordion";

// import { Container } from './styles';

export default function MyMenu() {
  
  const [ menu, setMenu ] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [ erro, setErro ] = useState('');

  const orientacoes = null;

  // useEffect(() => {
  //   let result = getMenus();

  //   var today = new Date();
  //   var dd = String(today.getDate()).padStart(2, '0');
  //   var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  //   var yyyy = today.getFullYear();

  //   today = yyyy + '-' + mm + '-' + dd;
  //   let today_menu = result ? result.filter((e) => e.data === today)  : null;
  //   setMenu( today_menu  );
  // }, []);

  const { dia } = useParams();

  useEffect(() => {
    let data = null;
    if( dia && Date.parse(dia) ) {
      data = new Date(dia);
    }
    let result = getMenus();
    if( result.length > 0 ) {
      if( data ) {
        let filtered = result.filter((e,i,a) => {
          let testData = new Date(e.data);
          if( isSameDay(testData, data) ) {
            return e;
          }
        });

        if(filtered.length > 0) {
          setMenu(filtered);
        } else {
          setErro("Nenhum cardápio foi encontrado para este dia");
        }
      } else {
        let sorted = result.sort((a,b) => {
          let dateA = new Date(a.data);
          let dateB = new Date(b.data);
          return  dateB - dateA;
        })
        setMenu(sorted);  
      }
    } 
  }, []);


  return (
    <div className="menu-meals-inner">
        <NavbarTop name="Meu Cardápio" withGoBack={true} withMenu={true}></NavbarTop>
        <div className="my-menu page-content">
            <div className="links">
              <a href="">Baixar Cardápio</a>
              <Link to="/meu-menu/cardapios/lista">Ver todos os cardápios</Link>
            </div>
            {
              orientacoes ? (<div></div>) : ''
            }
            {
              menu && menu[0] !== undefined ? menu[0].novo_cardapio.map((e, index) => {
                  let collapsed = index === expandedIndex;

                  let handleClick = () => {
                    if (collapsed) {
                      setExpandedIndex(null);
                    } else {
                      setExpandedIndex(index);
                    }
                  };

                  return (<MenuAccordion onClick={ handleClick } collapsed={collapsed} key={index + 1} meal={e}></MenuAccordion>)
              }
              ) : ''
            }
            {
              erro ? (<div className="error-message">{erro}</div>) : ''
            }

        </div>
        <NavbarBottom></NavbarBottom>
    </div>
  );
}
