import api from '../api';

export const getMetrics = () => {
    let user = Storage.getStoredUser();
    if(user.acf && user.acf.minhas_medidas) {
        return user.acf.minhas_medidas;
    }  
    return null;
}

export default { getMetrics };  