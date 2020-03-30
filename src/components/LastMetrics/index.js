import React, { useState, useEffect } from 'react';
import metrics, { getMetrics } from "../../api/modules/metrics";
import getMonthName from "../../utils/getMonthName";
import parseDate from "../../utils/parseDate";
import { range } from 'lodash';
import moment  from "moment";


import  './styles.css';
import searchIcon from "../../assets/search.png";


export default function LastMetrics() {
    const [ medidas, setMedidas ] = useState([]);
    const [ filtered, setFiltered ] = useState(null);
    const [ collapseLast, setCollapseLast ] = useState(false);
    const [ collapseOthers, setCollapseOthers ] = useState(false);

    const [ subCollapsedKey, setSubCollapsedKey ] = useState(-1);

    const [ mes, setMes ] = useState('');
    const [ ano, setAno ] = useState('');

    useEffect(() => {
        const loadMetrics = async () => {
            let response = await getMetrics();
            if( response ) {
                setMedidas(response);
            } else {
                setMedidas([]);
            }
        }
        loadMetrics();
    }, []);

    const getLastMetric = () => {
        if( medidas ) {
            return medidas[0];
        }
        return null;
    }

    const toggleCollapse = () => {
        collapseLast ? setCollapseLast(false) : setCollapseLast(true)
    }

    const toggleCollapseOthers = () => {
        if( collapseOthers ) {
            setCollapseOthers(false);
            setSubCollapsedKey(-1);
        }
        else {
            setCollapseLast(false);
            setCollapseOthers(true);
        }
    }

    const toggleCollapseSubs = (key) => {
        if(subCollapsedKey == key) {
            setSubCollapsedKey(-1);
        } else {
            setSubCollapsedKey(key);
        }
    }

    const renderSelectMes = () => {
        const meses = [
            'Janeiro',
            'Fevereiro',
            'Março',
            'Abril',
            'Maio',
            'Junho',
            'Julho',
            'Agosto',
            'Setembro',
            'Outubro',
            'Novembro',
            'Dezembro'
        ];

        return(
            <div className="select-container">
                <select onChange={ e => setMes(e.target.value) } name="mes" id="mes">
                    <option value={''}></option>
                    {
                        meses.map((m, key) => (<option key={key} value={m}>{m}</option>))
                    }
                </select>
                <label className={ mes ? 'filled' : '' } htmlFor="mes">Mês</label>
            </div>
        )
    }

    const renderSelectAno = () => {
        const ano_inicial = 2010;
        let ano_atual = moment().year();
        return(
            <div className="select-container">
                <select onChange={ e => setAno(e.target.value) } name="ano" id="ano">
                    <option value={''}></option>
                    {
                        range(ano_inicial, ano_atual + 1).map((a, key) => (<option key={key} value={a}>{a}</option>))
                    }
                </select>
                <label className={ ano ? 'filled' : '' }  htmlFor="ano">Ano</label>
            </div>
        )
    }


    const renderLastRegistry = () => {
        let { peso, altura, cintura, braco, gluteos } = medidas[0];
        return(
            <>
                <div className="accordion-row">
                    <span className="accordion-label">Peso</span><span className="valor">{peso} kg</span>
                </div>
                <div className="accordion-row">
                    <span className="accordion-label">Altura</span><span className="valor">{altura} cm</span>
                </div>
                <div className="accordion-row">
                    <span className="accordion-label">Cintura</span><span className="valor">{cintura} cm</span>
                </div>
                <div className="accordion-row">
                    <span className="accordion-label">Braço</span><span className="valor">{braco} cm</span>
                </div>
                <div className="accordion-row">
                    <span className="accordion-label">Glúteos</span><span className="valor">{gluteos} cm</span>
                </div>
            </>
        ) 
    }

    const renderInfoByMedida = (medida) => {
        let { peso, altura, cintura, braco, gluteos } = medida;
        return(
            <>
                <div className="accordion-row">
                    <span className="accordion-label">Peso</span><span className="valor">{peso} kg</span>
                </div>
                <div className="accordion-row">
                    <span className="accordion-label">Altura</span><span className="valor">{altura} cm</span>
                </div>
                <div className="accordion-row">
                    <span className="accordion-label">Cintura</span><span className="valor">{cintura} cm</span>
                </div>
                <div className="accordion-row">
                    <span className="accordion-label">Braço</span><span className="valor">{braco} cm</span>
                </div>
                <div className="accordion-row">
                    <span className="accordion-label">Glúteos</span><span className="valor">{gluteos} cm</span>
                </div>
            </>
        ) 
    }

    const searchMetric = (e) => {
        e.preventDefault();
        if( mes && ano) {
            const result = filterMetrics(mes, ano);
            setSubCollapsedKey(-1)
            setFiltered(result);
        } else {
            setFiltered(null);
        }
    }

    const filterMetrics = (m, a) => {
        return medidas.slice(1).filter((med,index) => {
            let data = moment(med.data);
            if( getMonthName(data) == m && data.year() == Number(a) )
                return true;
        });
    }

    const normalizeDate = (d) => {
        let data = moment(d);
        return `${data.date()} ${ getMonthName(data) } de ${data.year()}`;
    }
    

    return (
        <>
            {
                medidas.length > 1 ? 
                    (
                        <div className={collapseOthers ? "others-registries collapsed" : "others-registries"}>
                            <button onClick={ toggleCollapseOthers } className="others-link">Ver registros anteriores</button>
                            <div className="others-list">
                                <form onSubmit={ searchMetric }>
                                    { renderSelectMes() }
                                    { renderSelectAno() }
                                    <button type="submit"><img src={searchIcon} /></button>
                                </form>
                                <div className="list">
                                    {
                                        ( medidas.slice(1).length > 0 && !filtered ) ? medidas.slice(1).map((medida, key) => (
                                            <div key={key} onClick={() => toggleCollapseSubs(key)} className={ subCollapsedKey == key ? "other-metric-accordion collapsed" : 'other-metric-accordion'}>
                                                <div className="met-title">{ normalizeDate(medida.data) }</div>
                                                <div className="met-info">
                                                    { renderInfoByMedida(medida) }
                                                </div>
                                            </div>
                                        )) : ''
                                    } 
                                    {
                                        filtered ? filtered.map((medida, key) => (
                                            <div key={key} onClick={() => toggleCollapseSubs(key)} className={ subCollapsedKey == key ? "other-metric-accordion collapsed filtered" : 'other-metric-accordion filtered'}>
                                                <div className="met-title">{ normalizeDate(medida.data) }</div>
                                                <div className="met-info">
                                                    { renderInfoByMedida(medida) }
                                                </div>
                                            </div>
                                        )) : ''
                                    }
                                </div>
                            </div>
                        </div>            
                    ) : ''
            }
            <div onClick={toggleCollapse} className={collapseLast ? "last-registry-accordion collapsed" : "last-registry-accordion"}>
                <div className="accordion-title">Último registro</div>
                <div className="accordion-text">
                    {
                        medidas && medidas[0] ? renderLastRegistry() : (<div className="empty">Sem registros</div>)      
                    }
                </div>
            </div>  
        </>
    );
}
