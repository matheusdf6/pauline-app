import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import NavbarTop from "../../components/NavbarTop";
import NavbarBottom from "../../components/NavbarBottom";

import  './styles.css';
import diagram from "../../assets/diagram.png";
import metrics from "../../assets/metrics.png";

import getMonthName from "../../utils/getMonthName.js";
import { getMetrics } from "../../api/modules/metrics";
import { getEvolution } from "../../api/modules/evolution";


export default function Profile() {

    const history = useHistory();

    const [ medidas, setMedidas ] = useState(null);
    const [ erroMedidas, setErroMedidas ] = useState('');
    const [ evolucao, setEvolucao ] = useState(null);
    const [ erroEvolucao, setErroEvolucao ] = useState('');


    const user = Storage.getStoredUser();

    if( !user ) {
        history.push("/login");
    }

    useEffect(() => {
        const loadMetrics = async () => {
            let response = await getMetrics();
            if( response ) {
                let sorted = response.sort((a,b) => {
                    let dateA = new Date(a.data);
                    let dateB = new Date(b.data);
                    return  dateB - dateA;
                })

                setMedidas(sorted);
          
            } else {
                setErroMedidas("Sem registros encontrados");
                setMedidas(null);
            }
        }
        loadMetrics();
    }, []);

    useEffect(() => {
        const loadEvolution = async () => {
            let response = await getEvolution();
            console.log(response);
            if( response ) {
                let sorted = response.sort((a,b) => {
                    let dateA = new Date(a.data);
                    let dateB = new Date(b.data);
                    return  dateB - dateA;
                })

                setEvolucao(sorted);
          
            } else {
                setErroEvolucao("Sem registros encontrados");
                setEvolucao(null);
            }
        }
        loadEvolution();
    }, []);



    const renderMedidaColumn = (m) => {
        let { peso, altura, cintura, c_abdominal, braco, gluteos, data } = m;
        let dataObj = new Date(data);
        return (
            <div className="ft-column">
                <div className="ft-cell ft-head">{`${getMonthName(dataObj)}/${dataObj.getFullYear()}`}</div>
                <div className="ft-cell">{peso}kg</div>
                <div className="ft-cell">{altura}cm</div>
                <div className="ft-cell">{cintura}cm</div>
                <div className="ft-cell">{braco}cm</div>
                <div className="ft-cell">{gluteos}cm</div>
            </div>    
        );
    }

    const signout = () => {
        Storage.cleanAndExit();
        history.push("/");
    }
  

    if(user.tipo_usuario == "Paciente") {
        return (
            <>
                <NavbarTop name="Perfil" withGoBack={true} withMenu={false}></NavbarTop>
                <div className="profile-dash">
                    <div className="header">
                        <h2>Olá { user.name }</h2>
                        <Link to="/perfil/editar">Alterar dados da conta</Link>
                    </div>
                    <div className="profile-links">
                        <Link to="/perfil/medidas">
                            <img src={metrics} />
                            <h3>Minhas medidas</h3>
                        </Link>
                        <Link to="/perfil/evolucao">
                            <img src={diagram} />
                            <h3>Atualizar evolução</h3>
                        </Link>
                    </div>
                    <div className="profile-summary">
                        <div className="box-evolution">
                            <h3>Minha evolução</h3>
                            {
                                !erroEvolucao && evolucao ? (
                                    <>
                                        <div className="imagens">
                                            <div className="back-image-wrapper">
                                                <div className="background-image" style={{ backgroundImage: `url(${evolucao[0].foto})` }}></div>
                                            </div>
                                            {
                                                evolucao.length > 1 && evolucao[1].foto ? (
                                                    <div className="back-image-wrapper">
                                                        <div className="background-image" style={{ backgroundImage: `url(${evolucao[1].foto})` }}></div>
                                                    </div>
                                                ) : ''
                                            }
                                        </div>
                                        <Link to="/perfil/evolucao">Ver todas as fotos &gt;</Link>
                                    </>
                                ) : ''
                            }
                            {
                                erroEvolucao ? (<div className="error-msg">{erroEvolucao}</div>) : ''
                            }
                        </div>
                        <div className="box-metrics">
                            <h3>Medidas</h3>
                            {
                                erroMedidas ? (<div className="error-msg">{erroMedidas}</div>) : ''
                            }
                            {
                               !erroMedidas ? (
                                    <div className={ medidas && medidas.length > 1 ?  "flex-table col-3" : "flex-table col-2"}>
                                        <div className="ft-column">
                                            <div className="ft-cell ft-empty ft-head">Medida</div>
                                            <div className="ft-cell">Peso</div>
                                            <div className="ft-cell">Altura</div>
                                            <div className="ft-cell">Cintura</div>
                                            <div className="ft-cell">Braço</div>
                                            <div className="ft-cell">Glúteos</div>
                                        </div>
                                        {
                                            medidas ? renderMedidaColumn(medidas[0]) : ''
                                        }
                                        {
                                            medidas && medidas.length > 1 ? renderMedidaColumn(medidas[1]) : ''
                                        }
                                    </div>
                                ) : ''
                            }
                            
                                
                            
                        </div>
                    </div>
                    <div className="logout-container">
                        <button onClick={signout} className="logout">Logout</button>
                    </div>
                </div>
                <NavbarBottom></NavbarBottom>
            </>
        );
    
    } else {
        return (
            <>
                <NavbarTop name="Perfil" withGoBack={true} withMenu={false}></NavbarTop>
                <div className="profile-dash">
                    <div className="header">
                        <h2>Olá { user.name }</h2>
                        <Link to="/perfil/editar">Alterar dados da conta</Link>
                    </div>
                </div>
                <div className="logout-container">
                    <button onClick={signout} className="logout">Logout</button>
                </div>
                <NavbarBottom></NavbarBottom>
            </>
        );
    
    }

}
