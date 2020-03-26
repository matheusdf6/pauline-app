import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { updateUserEmail, updateUserName, updateUserPass, updateUserTelefone } from "../../../api/modules/users";
import { useToasts } from "react-toast-notifications";

import NavbarTop from "../../../components/NavbarTop";
import NavbarBottom from "../../../components/NavbarBottom";
import Loader from "../../../components/Loader";

import  './styles.css';

import edit from "../../../assets/edit.png";

export default function ProfileEdit() {

    const { addToast } = useToasts();
    const [ nome, setNome ]  = useState('');
    const [ telefone, setTelefone ]  = useState('');
    const [ email, setEmail ]  = useState('');
    const [ previousNome, setPreviousNome ]  = useState('');
    const [ previousTelefone, setPreviousTelefone ]  = useState('');
    const [ previousEmail, setPreviousEmail ]  = useState('');
    const [ senha, setSenha ]  = useState('');
    const [ novaSenha, setNovaSenha ]  = useState('');
    const [ novaSenhaRepeat, setNovaSenhaRepeat ]  = useState('');
    
    const [ loading, setLoading ] = useState(false);
    const [ nomeDisabled, setNomeDisabled ] = useState(true);
    const [ telefoneDisabled, setTelefoneDisabled ] = useState(true);
    const [ emailDisabled, setEmailDisabled ] = useState(true);

    const inputNome = useRef(null);
    const inputTelefone = useRef(null);
    const inputEmail = useRef(null);

    const history = useHistory();

    const user = Storage.getStoredUser();

    if( !user ) {
        history.push("/login");
    }


    const handleSubmit = (event) => {
      event.preventDefault();
    }

    useEffect(() => {
      setPreviousNome(user.name);
      setNome(user.name);
      setPreviousTelefone(user.acf.telefone);
      setTelefone(user.acf.telefone);
      setPreviousEmail(user.user_email);
      setEmail(user.user_email);
    }, [])

    const handleChangeNome = () => {
      
    }

    const enableNome = () => {
      setNomeDisabled(false);
      inputNome.current.focus();
    }

    const enableTelefone = () => {
      setTelefoneDisabled(false);
      inputTelefone.current.focus();
    }

    const enableEmail = () => {
        setEmailDisabled(false);
        inputEmail.current.focus();
    }

    const maybeChangeNome = async () => {
      if(nome != previousNome) {
        setLoading(true);
        let response = await updateUserName(nome);
        setLoading(false);
        if(response) {
          addToast("Nome alterado com sucesso!", { appearance: 'success' });
          setNome(response.name)
          setPreviousNome(response.name);  
        } else {
          addToast("Não foi possivel alterar o nome. Tente novamente!", { appearance: 'error' });
        }
      } else {
        // addToast("Não foi possivel alterar o nome. Tente novamente!", { appearance: 'error' });
      }
    }

    const maybeChangeEmail = async () => {
      if(email != previousEmail) {
        setLoading(true);
        let response = await updateUserEmail(email);
        setLoading(false);
        if(response) {
          addToast("Email alterado com sucesso!", { appearance: 'success' });
          setEmail(response.user_email)
          setPreviousEmail(response.user_email);  
        } else {
          addToast("Não foi possivel alterar o email. Tente novamente!", { appearance: 'error' });
        }
      } else {
        // addToast("Não foi possivel alterar o email. Tente novamente!", { appearance: 'error' });
      }
    }

    const maybeChangeTelefone = async () => {
      if(telefone != previousTelefone) {
        setLoading(true);
        let response = await updateUserTelefone(telefone);
        setLoading(false);
        if(response) {
          addToast("Telefone alterado com sucesso!", { appearance: 'success' });
          setTelefone(response.acf.telefone)
          setPreviousTelefone(response.acf.telefone);  
        } else {
          addToast("Não foi possivel alterar o telefone. Tente novamente!", { appearance: 'error' });
        }
      } else {
        // addToast("Não foi possivel alterar o email. Tente novamente!", { appearance: 'error' });
      }
    }

    const maybeChangePassword = async (e) => {
      e.preventDefault();
      if( senha == novaSenha || senha == novaSenhaRepeat ) {
        addToast("A nova senha é igual a anterior", { appearance: "info"});
        return;
      }

      if( novaSenha != novaSenhaRepeat ) {
        addToast("As duas senhas são diferentes", { appearance: "warning"});
        return;
      }

      setLoading(true);
      let response = await updateUserPass(user.slug, senha, novaSenha);
      console.log(response);
      setLoading(false);

      if(response) {
        addToast("Senha alterada com sucesso!", { appearance: 'success' });
      } else {
        addToast("Não foi possivel alterar a senha. Tente novamente!", { appearance: 'error' });
      }
    }

    return (
        <>
            <NavbarTop name="Perfil" withGoBack={true} withMenu={false}></NavbarTop>
            <div className="profile-edit">
                <div className="loading-info">
                  { loading ? (<Loader width={50} />) : ''}
                </div>
                <div className="header">
                    <h2>Olá { user.name }</h2>
                </div>
                <div className={ loading ? "box-dados loading" : "box-dados"}>
                  <h3>Dados pessoais</h3>
                  <div className="row">
                    <label htmlFor="nome">Nome: </label>
                    <input ref={ inputNome } onBlur={ maybeChangeNome } type="text" input="nome" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} disabled={nomeDisabled}/>
                    <button disabled={loading} onClick={ enableNome }><img src={edit}/></button>
                  </div>
                  <div className="row">
                    <label htmlFor="telefone">Telefone: </label>
                    <input  ref={ inputTelefone } onBlur={ maybeChangeTelefone } type="text" input="telefone" name="telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} disabled={telefoneDisabled}/>
                    <button disabled={loading} onClick={ enableTelefone  }><img src={edit}/></button>
                  </div>
                  <div className="row">
                    <label htmlFor="email">E-mail: </label>
                    <input ref={ inputEmail } onBlur={ maybeChangeEmail } type="text" input="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={emailDisabled}/>
                    <button disabled={loading} onClick={ enableEmail }><img src={edit}/></button>
                  </div>
                </div>
                <div className="box-senhas">
                  <h3>Alterar senha</h3>
                  <form onSubmit={maybeChangePassword} className={ loading ? 'loading' : '' }>
                    <div className="row">
                      <input type="password" input="senha" name="senha" value={senha} onChange={(e) => setSenha(e.target.value)}  />
                      <label className={ senha ? 'filled' : '' }  htmlFor="senha">Senha atual</label>
                    </div>
                    <div className="row">
                      <input type="password" input="novaSenha" name="novaSenha" value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)}/>
                      <label className={ novaSenha ? 'filled' : '' } htmlFor="novaSenha">Nova senha</label>
                    </div>
                    <div className="row">
                      <input type="password" input="novaSenhaRepeat" name="novaSenhaRepeat" value={novaSenhaRepeat} onChange={(e) => setNovaSenhaRepeat(e.target.value)}/>
                      <label  className={ novaSenhaRepeat ? 'filled' : '' } htmlFor="novaSenhaRepeat">Repetir nova senha</label>
                    </div>
                    <div className="row footer">
                      <button disabled={loading} type="submit">Salvar</button>
                    </div>
                  </form>
                </div>
                
            </div>
            <NavbarBottom></NavbarBottom>
        </>
    );
}
