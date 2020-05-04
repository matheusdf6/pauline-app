import api from '../api';
import Storage from "../../services/Storage";

export const getMenus = () => {
    let user = Storage.getStoredUser();
    if(user.acf && user.acf.cardapios) {
        return user.acf.cardapios;
    }  
    return null;
}


export const getNewMenus = async () => {
    try {
        let user = Storage.getStoredUser();
        const response = await api.get(`/users/${user.id}`);
        if( response ) {
            Storage.uploadUser(response);
            return response.acf.cardapios;
        }    
    } catch {
        return null;
    }
}

export default { getMenus, getNewMenus };  