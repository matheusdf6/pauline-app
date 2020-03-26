import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { delay } from "lodash"

import Storage from "../Storage";
import { syncChanges } from "../../api/modules/synchronizer";
import useNotification from "../Notification/useNotification"

import novaReceita from "../../assets/nova-receita.png";
import novaAgenda from "../../assets/nova-agenda.png";
import novoCardapio from "../../assets/novo-cardapio.png";

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
            console.log(result);

        

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
        delay(loadSync, 4000);
    },[])

    const goToRecipe = (receita) => {
        history.push(`/meu-menu/receitas/${receita.id}`);
    }

    const checkNewRecipe = (new_recipes, stored) => {
        if( stored ) {
            let recipes = JSON.parse(stored);
            if(new_recipes.length > recipes.length) {
                let receita = new_recipes.slice(1);
                Storage.setLocalStorage("recipes", recipes, 10800);
                newRecipeNotification(receita[0]);
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
            receita.title,
            "Confira",
            () => goToRecipe(receita),
            "Ver depois",
            null
        )

    }

    const goToWhats = () => {
        setPipe(null);
        window.location.href = "https://api.whatsapp.com/send?phone=5548996601926&text=Ol%C3%A1%2C%20gostaria%20de%remarcar%20minha%20consulta";
        return null;
    } 

    const checkNewSchedule = (new_schedule, stored) => {
        if( stored ) {
            // let list = JSON.parse(stored);
            let { inicio } = stored;
            let data = new Date(inicio);
            let now = new Date();
            if(data > now) {
                Storage.setLocalStorage("schedules", new_schedule, 10800);
                newScheduleNotification(`${data.getDate()}/${ twoDigit(data.getMonth()) } - ${twoDigit(data.getHours())}:${twoDigit(data.getMinutes())}`);
                return true;
            }
            return false;
        } else {
            Storage.setLocalStorage("schedules", new_schedule, 10800);

            let { inicio } = new_schedule[0];
            let data = new Date(inicio);
            let now = new Date();
            if(data > now) {
                newScheduleNotification(`${data.getDate()}/${ twoDigit(data.getMonth()) } - ${twoDigit(data.getHours())}:${twoDigit(data.getMinutes())}`);
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
                let dateA = new Date(a.data);
                let dateB = new Date(b.data);
                return  dateB - dateA;
            })

            let sorted_new = new_menus.sort((a,b) => {
                let dateA = new Date(a.data);
                let dateB = new Date(b.data);
                return  dateB - dateA;
            })

            let sorted_date = new Date(sorted_cache[0].data);
            let last_date = new Date(sorted_new[0].data)
      
            if(last_date > sorted_date) {
                let novo_usuario = Storage.getStoredUser();
                novo_usuario.acf.cardapios = new_menus;
                Storage.uploadUser(novo_usuario);
                newMenuNotification(sorted_new[0]);
                return true;
            }
            return false;
        } else {

            let sorted_new = new_menus.sort((a,b) => {
                let dateA = new Date(a.data);
                let dateB = new Date(b.data);
                return  dateB - dateA;
            });

            let novo_usuario = Storage.getStoredUser();
            novo_usuario.acf.cardapios = new_menus;
            Storage.uploadUser(novo_usuario);
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
            let date = new Date(stored.date);
            let today = new Date();

            if( date.getMonth() === today.getMonth() && 
                date.getDate() === today.getDate() && 
                date.getFullYear() === today.getFullYear() ) {
                
                let diff = ( today - date );
                

                if( diff > 5.4e+6 ) {
                    stored.date = today; 
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
            novoCardapio,
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
