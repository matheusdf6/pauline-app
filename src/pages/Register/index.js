import React, { useState } from 'react';
import { useToasts } from "react-toast-notifications";
import "./styles.css";

import { Link, useHistory } from "react-router-dom";
import { signup } from "../../api/modules/auth";
import Loader from "../../components/Loader";

import logo from "../../assets/logo.png";

 // import { Container } from './styles';

export default function Register() {

    const { addToast } = useToasts();
    const history = useHistory();
    const [ nome, setNome ] = useState('');
    const [ usuario, setUsuario ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ sexo, setSexo ] = useState('');
    const [ data, setData ] = useState('');
    const [ senha, setSenha ] = useState('');
    const [ senhaConf, setSenhaConf ] = useState('');
    const [ loading, setLoading ] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!nome || !usuario || !email || !sexo || !data || !senha || !senhaConf ) {
            addToast("Preencha todos os campos", {appearance: "warning"});
            return false;
        }

        if( !validateEmail(email) ) {
            addToast("Preencha um endereço de email válido", {appearance: "error"});
            return false;
        }
        if(senha != senhaConf) {
            addToast("As senhas são diferentes", {appearance: "error"});
            return false;
        }

        setLoading(true);
        let result = await signup({
            username: usuario,
            password: senha,
            data_nascimento: data,
            sexo: sexo,
            email,
            name: nome
        });
        setLoading(false);

        if( result ) {
            addToast("Registrado com sucesso!", { appearance: "success"})
            history.push("/");
        } else {
            addToast("Erro ao registrar. Verifique os seus dados.", { appearance: "error"})
        }
    }

    const normalizeDate = (d) => {
        let data = new Date(d);
        return `${data.getDate()}/${ twoDigit(data.getMonth() + 1) }/${data.getFullYear()}`;
    }

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    

    return (
        <div className="register-page">
            {
                loading ? (<div className="loading-top"><Loader width={50} white={true} /></div>) : ''
            }
            <img src={logo} alt="Logomarca da Pauline Maccari"/>
            <h2>Criar Conta</h2>
            <div className="signup-form">
                <form onSubmit={ handleSubmit }>
                    <div className="input-container">
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value) }  name="nome" id="nome"/>
                        <label htmlFor="nome" className={ nome ? "filled" : "not-filled" } >Nome Completo</label>
                    </div>
                    <div className="input-container">
                        <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value) }  name="usuario" id="usuario"/>
                        <label htmlFor="usuario" className={ usuario ? "filled" : "not-filled" } >Nome de usuário</label>
                    </div>
                    <div className="input-container">
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value) }  name="email" id="email"/>
                        <label htmlFor="email" className={ email ? "filled" : "not-filled" } >E-mail</label>

                    </div>
                    <div className="input-container radio-container">
                        <label className="radio-label">Sexo</label>
                        <div className="radio">
                            <label className={  sexo === "Feminino" ? "radio-label checked" : "radio-label"}>
                                <input type="radio" value="Feminino" onChange={(e) => setSexo(e.target.value) }  name="sexo" checked={ sexo === "Feminino" } />
                                Feminino
                            </label>
                        </div>
                        <div className="radio">
                            <label className={  sexo === "Masculino" ? "radio-label checked" : "radio-label"}>
                                <input type="radio" value="Masculino" onChange={(e) => setSexo(e.target.value) }  name="sexo" checked={ sexo === "Masculino" } />
                                Masculino
                            </label>
                        </div>

                    </div>
                    <div className="input-container">
                        <input type="date" value={data} onChange={(e) => setData(e.target.value) }  name="data" id="data"/>
                        <label htmlFor="data" className={ data ? "filled" : "not-filled" } >Data de nascimento</label>

                    </div>
                    <div className="input-container">
                        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value) }  name="senha" id="senha"/>
                        <label htmlFor="senha" className={ senha ? "filled" : "not-filled" } >Senha</label>

                    </div>
                    <div className="input-container">
                        <input type="password" value={senhaConf} onChange={(e) => setSenhaConf(e.target.value) }  name="senha_confirm" id="senha_confirm"/>
                        <label htmlFor="senha_confirm" className={ senhaConf ? "filled" : "not-filled" } >Repita a senha</label>

                    </div>
                    <button type="submit">Entrar</button>
                </form>
                <p className="signup-bottom">Já tem uma conta? <Link to={"/login"}>Faça o Login</Link></p>
            </div>
        </div>
    );
}

function twoDigit(num) {
    return ("0" + num).slice(-2);
  }
  