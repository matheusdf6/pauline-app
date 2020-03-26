import React, { useState } from 'react';

import { Link, useHistory } from "react-router-dom";
import { signin } from "../../api/modules/auth";
import { useToasts } from "react-toast-notifications";
import logo from "../../assets/logo.png";
import Loader from "../../components/Loader";

import "./styles.css";

export default function Login() {

    const { addToast } = useToasts();
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [senha, setSenha] = useState('');
    const [ loading, setLoading ] = useState(false);
    const [ filling, setFilling ] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
        const result = await signin(username, senha);
        setLoading(false);

        if (result) {
            history.push('/');
        } else {
            addToast("Usuário e senha incorretos", { appearance: "error" });
        }
    }

    return (     
        <div className="login-page">
            {
                loading ? (<div className="loading-top"><Loader width={50} white={true} /></div>) : ''
            }
            <img src={logo} alt="Logomarca da Pauline Maccari"/>
            <h2>Login</h2>
            <div className="signin-form">
                <form onSubmit={ handleSubmit }>
                    <input onFocus={ () => setFilling(true) } onBlur={ () => setFilling(false) } type="text" value={username} onChange={(e) => setUsername(e.target.value) }  placeholder="Usuário" name="usuario" id="usuario"/>
                    <input onFocus={ () => setFilling(true) } onBlur={ () => setFilling(false) } type="password" value={senha} onChange={(e) => setSenha(e.target.value) } placeholder="Senha" name="senha" id="senha"/>
                    <button type="submit">Entrar</button>
                </form>
            </div>
            <p className={filling ? "not-fixed" : ''}>Ainda não possui uma conta? <Link to="/registrar">Criar conta</Link></p>
        </div>
    );
}