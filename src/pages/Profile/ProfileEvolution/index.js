import React, { useRef, useState, useEffect } from 'react';

import NavbarTop from "../../../components/NavbarTop";
import NavbarBottom from "../../../components/NavbarBottom";

import { useToasts } from "react-toast-notifications";

import  './styles.css';
import afterExample from "../../../assets/after-example.png";
import beforeExample from "../../../assets/before-example.png";
import addImage from "../../../assets/add-image.png";

import { getEvolution, uploadEvolution } from "../../../api/modules/evolution";
import Storage from "../../../services/Storage";


export default function ProfileEvolution() {

  const { addToast } = useToasts();
  const fileInput = useRef(null);

  const [ evolucao, setEvolucao ] = useState(null);

  const addEvolution = () => {

  }

  const handleChange = (e) => {
      let files = e.target.files;
      var allFiles = [];
      for (var i = 0; i < files.length; i++) {
      let file = files[i];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
              let fileInfo = {
                  name: file.name,
                  type: file.type,
                  size: Math.round(file.size / 1000) + ' kB',
                  base64: reader.result,
                  file: file,
              };
              allFiles.push(fileInfo);
              if(allFiles.length == files.length) {
                  onDone(allFiles[0]);
              }
          }
      } 
  }
  const onDone = async (file) => {
    uploadEvolution(file.base64)
      .then((response) => {
        let sorted = response.acf.minha_evolucao.sort((a,b) => {
          let dateA = new Date(a.data);
          let dateB = new Date(b.data);
          return  dateB - dateA;
        })
        setEvolucao(sorted);
        Storage.uploadUser(response);
      })
      .catch((error) => {
        addToast("Não foi possivel enviar a imagem. Tente novamente", { appearance: 'error' });
      })
  }

  useEffect(() => {
      const loadEvolution = async () => {
          let response = await getEvolution();
          if( response ) {
              let sorted = response.sort((a,b) => {
                  let dateA = new Date(a.data);
                  let dateB = new Date(b.data);
                  return  dateB - dateA;
              })

              setEvolucao(sorted);
        
          } else {
            addToast("Não foi possivel enviar a imagem. Tente novamente", { appearance: 'error' });
            setEvolucao(null);
          }
      }
      loadEvolution();
  }, []);

  const normalizeDate = (d) => {
    let data = new Date(d);
    return `${data.getDate()}/${ twoDigit(data.getMonth() + 1) }/${data.getFullYear()}`;
  }

  const twoDigit = (num) => {
    return ("0" + num).slice(-2);
  }


  return (
    <>
        <NavbarTop name="Perfil" withGoBack={true} withMenu={false}></NavbarTop>
        <div className="profile-evolution">
            <div className="header">
              <h2>Minha evolução</h2>
            </div>
                <div className="imagens">
                  <div className="add-image-box">
                    <img src={ addImage } alt="Adicionar imagem"/>
                    <button onClick={() => fileInput.current.click()} className="add-image">+ Adicionar</button>
                    <input ref={fileInput} type="file" onChange={ handleChange } style={{visibility: 'hidden'}}/>  
                  </div>
                  {
                    evolucao ? evolucao.map((evo, key) => (
                      <div className="back-image-wrapper">
                        <div className="background-image" style={{ backgroundImage: `url(${evo.foto})` }}></div>
                        <div className="data-tag">{normalizeDate(evo.data)}</div>
                      </div>
                    )) : ''
                  }
                </div>
        </div>
        <NavbarBottom></NavbarBottom>
    </>
);
}
