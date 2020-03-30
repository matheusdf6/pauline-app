import axios from 'axios';
import moment from 'moment';
import api from '../api';

import Storage from "../../services/Storage";

const SITE_URL = "https://paulinemaccari.com.br"
// const SITE_URL = "http://localhost:80"

export const signin = async(username, password) => {


    try {
        const body = { username, password };
        const result = await axios.post(`${SITE_URL}/wp-json/jwt-auth/v1/token`, body);
        let { data } = result;
    
        if (typeof data === 'string') {
            data = JSON.parse(result.data.slice(1, result.data.length));
        }
    
        if (!result.data || data.code === 'invalid_username' || data.code === 'invalid_password') {
            throw new Error('Nome de usuário ou senha inválidos');
        }
    
        const { token, user_id, user_email } = data;
    
        if (token && user_id) {
            Storage.setLocalStorage("token", token, 10080);
    
            let user = await api.get(`/users/${user_id}`);
    
            user = { ...user, user_email};
    
            Storage.setLocalStorage("user", JSON.stringify(user), 10080); // uma semana
    
            return user;
    
        } else {
            return false
        }    
    } catch {
        return false;
    }

};

export async function signup(fields) {
    try {
        let body = {
            username: fields.username,
            password: fields.password,
            name: fields.name,
            email: fields.email,
            data_nascimento: fields.data_nascimento,
            sexo: fields.sexo
        };
        
        let response = await api.post('/users/register', body);
        if(!response) return false;

        let user = await signin(fields.username, fields.password);
        if(!user) return false;

        return user;    
    } catch {
        return false
    }
}

export const edit = async(id, fields) => {
    try {
        const body = {};

        if (fields.name) {
            body.first_name = fields.name;
            body.name = fields.name;
        }
    
        if (fields.email) {
            body.email = fields.email;
        }
    
        if (fields.phone) {
            body.telefone = fields.phone;
        }
    
        if (fields.password) {
            body.password = fields.password;
        }
    
        if (fields.newPassword || fields.confirmPassword) {
            if (fields.newPassword !== fields.confirmPassword) throw new Error('Senhas não conferem');
            body.password = fields.newPassword;
        }
    
        const user = await api.post(`/users/${id}`, body);
        return user;
    
    } catch {
        return false;
    }
};

export const uploadEvolutionImage = async(id, imageBase64) => {
    try {
        const image = `{"data":"${moment().format('YYYY-MM-DD')}","foto":"data:image/jpeg;base64,${imageBase64}"}`;
        const user = await api.post(`/users/${id}`, { minha_evolucao: image });
        return user;    
    } catch {
        return false;
    }
};