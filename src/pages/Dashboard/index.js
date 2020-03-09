import React from "react";

import AnxietyLink from "../../components/AnxietyLink";
import NextAppoitment from "../../components/NextAppoitment";
import MyMenuDash from "../../components/MyMenuDash";
import WaterIndicator from "../../components/WaterIndicator";
import NavbarTop from "../../components/NavbarTop";
import NavbarBottom from "../../components/NavbarBottom";

import "./styles.css";

import { useHistory } from "react-router-dom";
import Storage from "../../services/Storage";

export default function Dashboard() {

    const history = useHistory();

    const user = Storage.getLocalStorage('user');

    if( !user ) {
        history.push("/login");
    }

    return(
        <>
            <NavbarTop name="Olá Matheus" withMenu={false} withGoBack={false} withLogo={true}></NavbarTop>
            <div class="dashboard">
                <WaterIndicator></WaterIndicator>
                <div className="row stretch">
                    <div className="column_1-of-2">
                        <NextAppoitment></NextAppoitment>
                    </div>
                    <div className="column_1-of-2">
                        <AnxietyLink></AnxietyLink>
                    </div>
                </div>
                <MyMenuDash></MyMenuDash>
            </div>
            <NavbarBottom></NavbarBottom>
        </>
    );

}