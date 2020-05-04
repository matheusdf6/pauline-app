import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { delay } from "lodash"
import moment from "moment";

import Storage from "../Storage";
import { syncChanges } from "../../api/modules/synchronizer";
import useNotification from "../Notification/useNotification"
import decodeSpecialChars from "../../utils/decodeSpecialChars";

import novaReceita from "../../assets/nova-receita.png";
import novaAgenda from "../../assets/nova-agenda.png";
import novoCardapio from "../../assets/novo-cardapio.png";
import cups from "../../assets/cups.png";

export default function SynchronizerComponent() {

    const history = useHistory();
    const { addToPipeline, startPipeline } = useNotification();
    const [ pipe, setPipe ] = useState([]);


    useEffect(() => {
        const loadSync = async () => {
            let stored = Storage.getLocalStorage('user');
            if( !stored ) {
                return null;
            }

            let user = JSON.parse(stored);

            const storedSchedules = Storage.getLocalStorage("schedules");
            const storedrecipes = Storage.getLocalStorage("recipes");
            const cardapios =  user.acf && user.acf.cardapios ? user.acf.cardapios : null;
        
            let result = await syncChanges();
        
            if(result) {
                let isNewRec = checkNewRecipe(result.recipes, storedrecipes);
                let isWaterCheck = checkWater();

                let isNewMenu = false;
                let isNewSchedule = false;
                if(user.tipo_usuario == "Paciente") {
                    isNewMenu = checkNewMenu(result.menus, cardapios)
                    isNewSchedule = checkNewSchedule(result.schedules, storedSchedules);    
                }

            
                if( isNewMenu || isNewRec || isWaterCheck || isNewSchedule ) {
                    startPipeline(true);
                }
            }
        }
        delay(loadSync, 1);
    },[])

    const goToRecipe = (receita) => {
        history.push(`/meu-menu/receitas/${receita.id}`);
    }

    const checkNewRecipe = (new_recipes, stored) => {
        console.log(new_recipes);
        console.log(stored);
        if( stored ) {
            let recipes = JSON.parse(stored);
            if(new_recipes.length > recipes.length) {
                let receita = new_recipes.shift();
                // Storage.setLocalStorage("recipes", JSON.stringify(new_recipes), 10800);
                newRecipeNotification(receita);
                return true;
            }
            return false;
        } else {
            let receita = new_recipes.slice(1);
            newRecipeNotification(receita[0]);
            return true;
        }
    }

    const newRecipeNotification = (receita) => {

        addToPipeline(
            novaReceita,
            "Receitinha nova!!",
            '',
            decodeSpecialChars(receita.title),
            "Confira",
            () => goToRecipe(receita),
            "Ver depois",
            null
        )

    }

    const goToWhats = () => {
        setPipe(null);
        window.location.href = "https://api.whatsapp.com/send?phone=5548996601926&text=Ol%C3%A1%2C%20gostaria%20de%20falar%20sobre%20a%20minha%20consulta";
        return null;
    } 

    const checkNewSchedule = (new_schedule, stored) => {
        if( stored ) {
            // let list = JSON.parse(stored);
            let { inicio } = stored;
            let data = moment(inicio);
            let now = moment();

            if(now.diff(data) < 0) {
                Storage.setLocalStorage("schedules", new_schedule, 10800);
                newScheduleNotification(`${twoDigit(data.date())}/${ twoDigit(data.month() + 1) } - ${twoDigit(data.hour())}:${twoDigit(data.minute())}`);
                return true;
            }
            return false;
        } else {
            Storage.setLocalStorage("schedules", new_schedule, 10800);

            let { inicio } = new_schedule;

            let data = moment(inicio);
            let now = moment();
            
            if(now.diff(data) < 0) {
                newScheduleNotification(`${twoDigit(data.date())}/${ twoDigit(data.month() + 1) } - ${twoDigit(data.hour())}:${twoDigit(data.minute())}`);
                return true;
            }
            return false;
        }
    }

    function twoDigit(num) {
        return ("0" + num).slice(-2);
    }

    const goToMenu = (menu) => {
        history.push(`/meu-menu/cardapios/${menu.data}`);
    }

    const newScheduleNotification = (dia) => {

        addToPipeline(
            novaAgenda,
            "Próxima consulta",
            dia,
            "Não se esqueça da sua próxima consulta. Caso precise remarcar entre em contato",
            "Ok",
            null,
            "Entre em contato",
            goToWhats
        )

    }
    

    const checkNewMenu = (new_menus, cardapios) => {
        if( cardapios ) {
            let sorted_cache = cardapios.sort((a,b) => {
                let dateA = moment(a.data);
                let dateB = moment(b.data);
                return  dateB.diff(dateA);
            })

            let sorted_new = new_menus.sort((a,b) => {
                let dateA = moment(a.data);
                let dateB = moment(b.data);
                return  dateB.diff(dateA);
            })

            let sorted_date = moment(sorted_cache[0].data);
            let last_date = moment(sorted_new[0].data)
      
            if(last_date.diff(sorted_date) > 0) {
                newMenuNotification(sorted_new[0]);
                return true;
            }
            return false;
        } else {

            let sorted_new = new_menus.sort((a,b) => {
                let dateA = moment(a.data);
                let dateB = moment(b.data);
                return  dateB.diff(dateA);
            });

            newMenuNotification(sorted_new[0]);
            return true;
        }
    }

    const newMenuNotification = (menu) => {

        addToPipeline(
            novoCardapio,
            "Ebaa! Cardápio novo",
            '',
            "Preparamos várias opções pra você não perder o foco!",
            "Confira",
            () => goToMenu(menu),
            "Ver depois",
            null
        )    

    }

    const checkWater = () => {
        let stored = Storage.getLocalStorage("cups");
        if( stored ) {
            let date = moment(stored.date);
            let today = moment();

            if( date.isSame(today, 'day') ) {
                
                let diff = today.diff(date, 'minute');
                
                if( diff > 90 ) {
                    stored.date = today.format("YYYY-MM-DD HH:mm:ss"); 
                    Storage.setLocalStorage("cups", stored, 1440);
                    newWaterNotification();
                    return true;
                }
            }
        }
        return false;
    }

    const newWaterNotification = () => {

        addToPipeline(
            cups,
            "Beba água",
            '',
            "Mantenha-se hidratado",
            "Beber",
            null,
            "Lembre-me depois",
            null
        )

    }

    return (
        <div />
    );
}
