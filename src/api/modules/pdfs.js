import api from '../api';
import Storage from "../../services/Storage";

const PAINEL_PAGE_ID = 51871;

export const getOrientacoes = async () => {
    let cached = Storage.getLocalStorage("docs");
    let docs = cached ? cached : null;

    if( docs && docs.orientacoes_gerais ) {
        return docs.orientacoes_gerais;
    }

    const response = await api.get(`/pages/${PAINEL_PAGE_ID}`);
    if( response ) {
        Storage.setLocalStorage("docs", response.acf, 10080 );
        return response.acf.orientacoes_gerais;
    }
    return null;
}

export const getLista = async () => {
    let cached = Storage.getLocalStorage("docs");
    let docs = cached ? cached : null;

    if( docs && docs.lista_de_compras ) {
        return docs.lista_de_compras;
    }

    const response = await api.get(`/pages/${PAINEL_PAGE_ID}`);
    if( response ) {
        Storage.setLocalStorage("docs", response.acf, 10080 );
        return response.acf.lista_de_compras;
    }
    return null;
}

export default { getOrientacoes, getLista };