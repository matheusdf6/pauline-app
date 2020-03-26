import React, { useEffect, useState } from 'react';

import { useHistory } from "react-router-dom";

import { getMenus } from "../../../api/modules/menus";

import "./styles.css";
import NavbarTop from "../../../components/NavbarTop";
import NavbarBottom from "../../../components/NavbarBottom";
import Loader from "../../../components/Loader";

import searchIcon from "../../../assets/search.png";
import close from "../../../assets/close.png";


export default function MyMenuList() {
  
  const history = useHistory();
  const [ search, setSearch ] = useState('');
  const [ menus, setMenus ] = useState(null);
  const [ filtered, setFiltered ] = useState(null);
  const [ hideMenus, setHideMenus ] = useState(false);

  useEffect(() => {
    let result = getMenus();
    if( result.length > 0 ) {
      let sorted = result.sort((a,b) => {
        let dateA = new Date(a.data);
        let dateB = new Date(b.data);
        return  dateB - dateA;
      })
      setMenus(sorted);
    } 
  }, []);

  const searchMenu = (e) => {
    e.preventDefault();
    let result = filterArrays(search);
    if( result ) {
      setHideMenus(true);
    }
    setFiltered(result);
  }

  const removeSearch = () => {
    setFiltered(null);
    setSearch('');
    setHideMenus(false);
  }

  const filterArrays = (term) => {
    return menus.filter((e,index) => {
      let containTerm = false;
      e.novo_cardapio.forEach((card) => {
        if(card.opcoes) 
          card.opcoes.forEach((op) => {
            if( op.descricao.includes(term) ) {
              containTerm = true;
            }
          }) 
      })
      return containTerm;
    });
  }

  const normalizeDate = (d) => {
    let data = new Date(d);
    return `${data.getDate()}/${ twoDigit(data.getMonth() + 1) }/${data.getFullYear()}`;
  }

  return (
    <div className="menu-meals-inner">
        <NavbarTop name="Meu Cardápio" withGoBack={true} withMenu={true}></NavbarTop>
        <div className="my-menu-list page-content">
            <form onSubmit={searchMenu} className="menus-search-form">
              <input type="search" 
                     placeholder="Pesquisar" 
                     name="s" 
                     id="search" 
                     value={search} 
                     onChange={(e) => setSearch(e.target.value) } />
              <button type="submit"><img src={searchIcon} alt="Pesquisar"/></button>
            </form>
              {
                menus && !hideMenus ? (<p className="results">{menus.length} Cardápios encontrados</p>) : ''
              }
              {
                filtered && hideMenus ? (
                  <div className="head-search" style={{display: 'flex', justifyContent: 'space-between'}}>
                    <button onClick={removeSearch} style={{ background: 'none', display: 'inline-flex', alignItems: 'center' }}><img src={close} style={{marginRight: '4px'}}/>{search}</button>
                    <span className="results">{filtered.length} Cardápios encontrados</span>
                  </div>
                  ) : ''
              }
            <div className="menu-cards">
            {
              menus && !hideMenus  ? menus.map((e, index) => (
                <div key={index} onClick={ () => history.push(`/meu-menu/cardapios/${e.data}`) } className="menu-card">
                  <div className="menu-text">
                    <p className="data">{normalizeDate(e.data)}</p>
                    <p className="name">Cardápio {index + 1}</p>
                  </div>
                  <div className="menu-link">
                    Ver cardápio
                  </div>
                </div>
              ) ) : ''
            }
            {
              filtered && hideMenus ? filtered.map((e, index) => (
                <div key={index} onClick={ () => history.push(`/meu-menu/cardapios/${e.data}`) } className="menu-card">
                  <div className="menu-text">
                    <p className="data">{e.data}</p>
                    <p className="name">Cardápio {index + 1}</p>
                  </div>
                  <div className="menu-link">
                    Ver cardápio
                  </div>
                </div>
              ) ) : ''
            }
            </div>

        </div>
        <NavbarBottom></NavbarBottom>
    </div>
  );
}

function twoDigit(num) {
  return ("0" + num).slice(-2);
}
