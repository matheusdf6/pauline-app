import axios from 'axios';
import moment from 'moment';
import api from '../api';

import Storage from "../../services/Storage";

export const signin = async (username, password) => {
  const body = { username, password };
  const result = await axios.post('https://paulinemaccari.com.br/wp-json/jwt-auth/v1/token', body);
  let { data } = result;

  if (typeof data === 'string') {
    data = JSON.parse(result.data.slice(1, result.data.length));
  }

  if (!result.data || data.code === 'invalid_username' || data.code === 'invalid_password') {
    throw new Error('Nome de usuário ou senha inválidos');
  }

  const { token, user_id } = data;

  if (token && user_id) {
    Storage.setLocalStorage("user", user_id, 10080); // uma semana
    Storage.setLocalStorage("token", token, 10080);

    let user = await api.get(`/users/${user_id}`);
    return user;
  
  } else {
    return false
  }

};

export async function signup(fields) {
  let body = {
    username: fields.username,
    password: fields.password,
    email: fields.email,
  };

  if (fields.password !== fields.repeatPassword) {
    throw new Error('Senhas não conferem');
  }

  let user = await api.post('/users', body);
  const { id } = user;

  const [day, month, year] = fields.birthdate.split('/');
  body = {
    sexo: fields.gender === 0 ? 'masculino' : 'feminino',
    data_nascimento: `${year}${month}${day}`,
    roles: 'usuarios_app',
  };

  await api.post(`/users/${id}`, body);
  user = await signin(fields.username, fields.password);
  return user;
}

export const edit = async (id, fields) => {
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
};

export const uploadEvolutionImage = async (id, imageBase64) => {
  const image = `{"data":"${moment().format('YYYY-MM-DD')}","foto":"data:image/jpeg;base64,${imageBase64}"}`;
  const user = await api.post(`/users/${id}`, { minha_evolucao: image });
  return user;
};
