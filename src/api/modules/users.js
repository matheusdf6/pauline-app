import api from '../api';
import { signin } from "./auth";
import axios from "axios";
import Storage from "../../services/Storage";

const SITE_URL = "paulinemaccari.com.br"
// const SITE_URL = "locahost"

export const updateUserPass = async (username, lastPassword, password) => {
    let isUser = await testPassword(username, lastPassword);
    if(!isUser) return false;

    let user = Storage.getStoredUser();
    if(!user) return false;

    let response = await api.post(`/users/${user.id}`, {
        password
    });

    if( response ) {
        // Storage.uploadUser(response);
        Storage.removeToken();
        let signed = await signin(username, password);
        if( signed ) {
            return response;
        }
    }

    return false;
}

export const testPassword = async (username, password) => {
    try {
        const body = { username, password };
        const result = await axios.post(`https://${SITE_URL}/wp-json/jwt-auth/v1/token`, body);
        let { status } = result;
        
        if( status == 200 ) {
            return true;
        }
        return false;    
    } catch {
        return false
    }
}

export const updateUserName = async (name) => {
    let user = Storage.getStoredUser();
    if(!user) return false;

    let response = await api.post(`/users/${user.id}`, {
        name
    });

    if( response ) {
        Storage.uploadUser(response);
        return response;
    }

    return false;
}

export const updateUserEmail = async (email) => {
    let user = Storage.getStoredUser();
    if(!user) return false;

    let response = await api.post(`/users/${user.id}`, {
        email
    });

    if( response ) {
        Storage.uploadUser(response);
        return response;
    }

    return false;
}

export const updateUserTelefone = async (telefone) => {
    let user = Storage.getStoredUser();
    if(!user) return false;

    let response = await api.post(`/users/${user.id}`, {
        telefone
    });

    if( response ) {
        Storage.uploadUser(response);
        return response;
    }

    return false;
}

export default { updateUserPass, updateUserTelefone, updateUserEmail, updateUserName }; 