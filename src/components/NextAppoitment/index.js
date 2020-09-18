import React, { useState, useEffect } from 'react';
import { getSchedules } from "../../api/modules/schedules";
import useNotification from "../../services/Notification/useNotification";
import { useToasts } from "react-toast-notifications";
import Loader from "../Loader";
import moment  from "moment";

import "./styles.css";

import calendar from "../../assets/calendar.png";
import novaAgenda from "../../assets/nova-agenda.png";

export default function NextAppoitment() {

  const { addMessage } = useNotification();
  const [ schedule, setSchedule ] = useState('');
  const { addToast } = useToasts();

  useEffect(() => {
    async function loadSchedule() {
        getSchedules()
          .then((response) => {
            if(response.length > 0) {
              let { inicio }  = response[0];
              let data = moment(inicio);
              let now = moment();
              if(now.diff(data) < 0) {
                setSchedule(`${twoDigit(data.date())}/${ twoDigit(data.month() + 1) } - ${twoDigit(data.hours())}:${twoDigit(data.minute())}`);
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

  const goToWhats = () => {
    window.location.href = "https://api.whatsapp.com/send?phone=5548996601926&text=Ol%C3%A1%2C%20gostaria%20de%20falar%20sobre%20a%20minha%20consulta";
    return null;
} 


  const maybeShowPopup = () => {
    if( schedule && schedule !== "Sem agendamento" ) {
      addMessage(
        novaAgenda,
        "Próxima consulta",
        schedule,
        "Não se esqueça da sua próxima consulta. Caso precise remarcar entre em contato",
        "Ok",
        null,
        "Entre em contato",
        goToWhats
      )
    }
  }

  return (
    <div onClick={ maybeShowPopup } className="next-appoitment">
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
