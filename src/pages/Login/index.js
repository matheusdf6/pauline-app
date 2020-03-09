import React, { useState } from 'react';

import { Link, useHistory } from "react-router-dom";
import { signin } from "../../api/modules/auth";

import logo from "../../assets/logo.png";

import "./styles.css";

export default function Login() {

    const history = useHistory();
    const [ username, setUsername ] = useState('');
    const [ senha, setSenha ] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await signin(username, senha);
        if( result ) {
            history.push('/');
        } else {
            console.error("NÃO AUTORIZADO")
        }
    }

  return (
    <div className="login-page">
        <img src={logo} alt="Logomarca da Pauline Maccari"/>
        <h2>Login</h2>
        <div className="signin-form">
            <form onSubmit={ handleSubmit }>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value) }  name="usuario" id="usuario"/>
                <input type="password" value={senha} onChange={(e) => setSenha(e.target.value) } name="senha" id="senha"/>
                <button type="submit">Entrar</button>
            </form>
        </div>
        <p>Ainda não possui uma conta? <Link to="/registrar">Criar conta</Link></p>
    </div>
  );
}
