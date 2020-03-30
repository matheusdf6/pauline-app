import React, { useState, useEffect } from 'react';
import _ from "lodash";
import moment  from "moment";

import Storage from "../../services/Storage";

import "./styles.css";
import drink from "../../assets/drink.png";
// import { Container } from './styles';

export default function WaterIndicator() {

  const NUMBER_OF_DRINKS = 8;
  const [ cups, setCups ] = useState(0);

  function getLastCups() {
    return ( NUMBER_OF_DRINKS - cups > 0 ? NUMBER_OF_DRINKS - cups : 0); 
  }

  const getCupsOfTheDay = () => {
      let today = moment();
      let stored = Storage.getLocalStorage("cups");
      if( stored ) {
        let date = moment(stored.date);
        if( date.isSame(today, 'day') ) {
          setCups(stored.cups);
        } else {
          setCups(0);
          Storage.setLocalStorage("cups", { cups: 0, date: today.format("YYYY-MM-DD") }, 1440);
        }
      } else {
        setCups(0);
        Storage.setLocalStorage("cups", { cups: 0, date: today.format("YYYY-MM-DD") }, 1440);
      }
  }

  useEffect(getCupsOfTheDay, []);

  const handleClick = (index) => {
    setCups(index + 1);
    Storage.setLocalStorage("cups", { cups: index + 1, date: moment().format("YYYY-MM-DD") }, 1440);

  }

  return (
    <div className="water-indicator card-white">
      <div className="cups">
        { 
          _.range(NUMBER_OF_DRINKS).map((key) => 
            (<button key={key} onClick={() => handleClick(key)} className={ (key <= ( cups - 1 ) ? 'cup-box drink-active' : 'cup-box') }><img src={drink} alt="Copo"/></button>)
          )
        }
      </div>
      <div className="message">
        { getLastCups() > 0 ? ('Falta' + ( getLastCups() == 1 ? ' ' : 'm ') + getLastCups() + ' copo' + (getLastCups() != 1 ? 's, ' : ', ') + 'vamos lá') : ('Parabéns! Você conseguiu!')  } 
      </div>
    </div>
  );
}
