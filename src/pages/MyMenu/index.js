import React, { useEffect, useState } from 'react';
import moment from "moment";
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

  const { dia } = useParams();

  useEffect(() => {
    let data = null;
    let is_valid = false;
    if( dia ) {
      let dia_moment = moment(dia);
      if( dia_moment.isValid() ) {
        data = dia_moment;
      }
    }
    let result = getMenus();
    if( result.length > 0 ) {
      if( data ) {
        let filtered = result.filter((e,i,a) => {
          let testData = moment(e.data);
          if( testData.isSame(data, "day") ) {
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
          let dateA = moment(a.data);
          let dateB = moment(b.data);
          return  dateB.diff(dateA);
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
              {/* <a href="">Baixar Cardápio</a> */}
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
