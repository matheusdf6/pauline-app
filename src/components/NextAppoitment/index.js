import React, { useState, useEffect } from 'react';
import { getSchedules } from "../../api/modules/schedules";
// import { Container } from './styles';

import "./styles.css";

import calendar from "../../assets/calendar.png";

export default function NextAppoitment() {

  const [ schedule, setSchedule ] = useState('');

  useEffect(() => {
    async function loadSchedule() {
        let response = await getSchedules(3055);
        if(response.length > 0) {
          let { inicio }  = response[0];
          let data = new Date(inicio);
          let now = new Date();
          if(data > now) {
            setSchedule(`${data.getDate()}/${ twoDigit(data.getMonth()) } - ${twoDigit(data.getHours())}:${twoDigit(data.getMinutes())}`);
            return;
          }
        } 
        setSchedule("Sem agendamento");
    }
    loadSchedule();
  }, [])

  return (
    <div className="next-appoitment">
        <img src={calendar} alt="Calendário"/>
        <h4>Próxima consulta:</h4>
        <span>{schedule}</span>
    </div>
  );
}

function twoDigit(num) {
  return ("0" + num).slice(-2);
}
