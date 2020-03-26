import api from '../api';

import Storage from "../../services/Storage";

export const getEvolution = () => {
    let user = Storage.getStoredUser();
    if(user.acf && user.acf.minha_evolucao) {
        return user.acf.minha_evolucao;
    }  
    return null;                           
}

export const uploadEvolution = async (image) => {
    try {
        let user = Storage.getStoredUser();
        let data = new Date();
        if( image && user ) {
            const response = await api.post(`/users/${user.id}`, {
                minha_evolucao: {
                    data,
                    foto: image
                }
            });
            return response;
        }
        return null;    
    } catch {
        return null;
    }
}

export default { getEvolution, uploadEvolution };  