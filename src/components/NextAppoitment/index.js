import React, { useState, useEffect } from 'react';
import { getSchedules } from "../../api/modules/schedules";
import { useToasts } from "react-toast-notifications";
import Loader from "../Loader";

import "./styles.css";

import calendar from "../../assets/calendar.png";

export default function NextAppoitment() {

  const [ schedule, setSchedule ] = useState('');
  const { addToast } = useToasts();

  useEffect(() => {
    async function loadSchedule() {
        getSchedules()
          .then((response) => {
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
          })
          .catch((error) => {
            addToast('Erro na conexão', { appearance: 'error'});
            setSchedule("Sem agendamento");
          });
    }
    loadSchedule();
  }, [])

  return (
    <div className="next-appoitment">
        <img src={calendar} alt="Calendário"/>
        <h4>Próxima consulta:</h4>
        <span>
          {
            schedule ? schedule : <Loader width={50}/>
          }
        </span>
    </div>
  );
}

function twoDigit(num) {
  return ("0" + num).slice(-2);
}
