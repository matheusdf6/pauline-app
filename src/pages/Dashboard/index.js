import React, { useEffect } from "react";

import AnxietyLink from "../../components/AnxietyLink";
import NextAppoitment from "../../components/NextAppoitment";
import MyMenuDash from "../../components/MyMenuDash";
import WaterIndicator from "../../components/WaterIndicator";
import NavbarTop from "../../components/NavbarTop";
import NavbarBottom from "../../components/NavbarBottom";
import PostsDash from "../../components/PostsDash";
import PatientRequest from "../../components/PatientRequest";


import { getTips } from "../../api/modules/tips";
import useNotification from "../../services/Notification/useNotification";

import "./styles.css";

import { useHistory } from "react-router-dom";
import Storage from "../../services/Storage";
import TipsManager from "../../services/TipsManager";
import decodeSpecialChars from "../../utils/decodeSpecialChars";

import smile from "../../assets/tips.png"
import sad from "../../assets/embarrassed.png"

export default function Dashboard() {

    const history = useHistory();
    const { addMessage } = useNotification();

    let stored = Storage.getLocalStorage('user');

    if( !stored ) {
        history.push("/login");
    }

    const user = JSON.parse(stored);


    useEffect(() => {
        const loadTips = async () => {
            let response = await getTips();
            if( response ) {
            }
        }
        loadTips();
    }, []);

    const goToWhats = () => {
        window.location.href = "https://api.whatsapp.com/send?phone=5548996601926&text=Ol%C3%A1%2C%20gostaria%20de%20obter%20ajuda";
        return null
    } 

    const handleClick = () => {
        let tip = Storage.getOneTip();
        if( tip ) {
            addMessage(
                smile,
                decodeSpecialChars(tip[0].tip.title.rendered),
                '',
                decodeSpecialChars(tip[0].tip.acf.texto),
                'Ok',
                null,
                'Ainda preciso de ajuda',
                handleClick
            );
        } else {
            addMessage(
                sad,
                "Não consegue controlar a ansiedade?",
                '',
                'Vamos te ajudar! Envie um whats pra nutri',
                'Mandar mensagem',
                goToWhats,
                'Enviar depois',
                null
            );

        }
    }

    if(user.tipo_usuario == "Paciente") {
        return(
            <div className="dashboard-page">
                <NavbarTop name={`Olá ${user.name}`} withMenu={false} withGoBack={false} withLogo={true}></NavbarTop>
                <div className="dashboard">
                    <WaterIndicator></WaterIndicator>
                    <div className="row stretch">
                        <div className="column_1-of-2">
                            <NextAppoitment></NextAppoitment>
                        </div>
                        <div className="column_1-of-2">
                            <AnxietyLink click={ handleClick } ></AnxietyLink>
                        </div>
                    </div>
                    <MyMenuDash></MyMenuDash>
                    <PostsDash />
                </div>
                <NavbarBottom></NavbarBottom>
            </div>
        );    
    } else {
        return(
            <div className="dashboard-page">
                <NavbarTop name={`Olá ${user.name}`} withMenu={false} withGoBack={false} withLogo={true}></NavbarTop>
                <div className="dashboard">
                    <WaterIndicator></WaterIndicator>
                    <AnxietyLink click={ handleClick } ></AnxietyLink>
                    <PostsDash />
                    <PatientRequest />
                </div>
                <NavbarBottom></NavbarBottom>
            </div>
        );    

    }


}