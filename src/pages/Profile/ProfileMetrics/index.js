import React, { useState } from 'react';

import NavbarTop from "../../../components/NavbarTop";
import NavbarBottom from "../../../components/NavbarBottom";
import LastMetrics from "../../../components/LastMetrics";


import  './styles.css';

export default function ProfileMetrics() {
    const [ openRegistros, setOpenRegistros ] = useState(false);
    return (
        <>
            <NavbarTop name="Perfil" withGoBack={true} withMenu={false}></NavbarTop>
            <div className="profile-metrics">
                <div className="header">
                    <h2>Minhas medidas</h2>
                </div>
                <div className="metrics-registries">
                    <LastMetrics />
                </div>
                <h2>Tabelas de Referência</h2>
                <div className="table-container table-2 card-white">
                    <h3>IMC</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>IMC</th>
                                <th>Resultado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Menos de 18,5</td>
                                <td>Abaixo do peso</td>
                            </tr>
                            <tr>
                                <td>Entre 18,5 e 24,9</td>
                                <td>Peso normal</td>
                            </tr>
                            <tr>
                                <td>Entre 25 e 29,9</td>
                                <td>Sobrepeso</td>
                            </tr>
                            <tr>
                                <td>Entre 30 e 34,9</td>
                                <td>Obesidade grau 1</td>
                            </tr>
                            <tr>
                                <td>Entre 35 e 29,9</td>
                                <td>Obesidade grau 2</td>
                            </tr>
                            <tr>
                                <td>Mais de 40</td>
                                <td>Obesidade grau 3</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
                
                <div className="table-container table-3 card-white">
                    <h3>Porcentual de Gordura</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>% de gordura</th>
                                <th>Homem</th>
                                <th>Mulher</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Baixo</td>
                                <td>2-5%</td>
                                <td>2-5%</td>
                            </tr>
                            <tr>
                                <td>Atlético</td>
                                <td>6-13%</td>
                                <td>6-13%</td>
                            </tr>
                            <tr>
                                <td>Bom</td>
                                <td>14-17%</td>
                                <td>14-17%</td>
                            </tr>
                            <tr>
                                <td>Regular</td>
                                <td>18-24%</td>
                                <td>18-24%</td>
                            </tr>
                            <tr>
                                <td>Sobrepeso</td>
                                <td>25 + %</td>
                                <td>25 + %</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
                
                <div className="table-container table-3 card-white">
                    <h3>Circuferencia abdominal</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Risco</th>
                                <th>Homem</th>
                                <th>Mulher</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Normal</td>
                                <td>&gt; 90cm</td>
                                <td>&gt; 80cm</td>
                            </tr>
                            <tr>
                                <td>Alto</td>
                                <td>&ge; 94cm</td>
                                <td>&ge; 84cm</td>
                            </tr>
                            <tr>
                                <td>Altíssimo</td>
                                <td>&ge; 102cm</td>
                                <td>&ge; 88cm</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
            </div>
            <NavbarBottom></NavbarBottom>
        </>
        );
}
