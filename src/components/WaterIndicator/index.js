import React, { useState, useEffect } from 'react';
import _ from "lodash";

import Storage from "../../services/Storage";
import minsToMidnight from "../../utils/minsToMidnight";

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
      let today = new Date();
      let stored = Storage.getLocalStorage("cups");
      if( stored ) {
        let date = new Date(stored.date);
        if(date.getMonth() === today.getMonth() && 
           date.getDate() === today.getDate() && 
           date.getFullYear() === today.getFullYear() ) {
          setCups(stored.cups);
        } else {
          setCups(0);
          Storage.setLocalStorage("cups", { cups: 0, date: today }, 1440);
        }
      } else {
        setCups(0);
        Storage.setLocalStorage("cups", { cups: 0, date: today }, 1440);
      }
  }

  useEffect(getCupsOfTheDay, []);

  const handleClick = (index) => {
    setCups(index + 1);

    let today = new Date();
    Storage.setLocalStorage("cups", { cups: index + 1, date: today }, 1440);

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
        { getLastCups() > 0 ? ('Falta' + ( getLastCups() == 1 ? ' ' : 'm ') + getLastCups() + ' copo' + (getLastCups() != 1 ? 's, ' : ', ') + 'vamos lá') : ('Deu')  } 
      </div>
    </div>
  );
}
