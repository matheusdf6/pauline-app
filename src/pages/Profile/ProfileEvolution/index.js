import React, { useRef, useState, useEffect } from 'react';
import moment from "moment";
import { useHistory } from "react-router-dom";

import NavbarTop from "../../../components/NavbarTop";
import NavbarBottom from "../../../components/NavbarBottom";

import { useToasts } from "react-toast-notifications";

import  './styles.css';
import afterExample from "../../../assets/after-example.png";
import beforeExample from "../../../assets/before-example.png";
import addImage from "../../../assets/add-image.png";

import { getEvolution, uploadEvolution } from "../../../api/modules/evolution";
import Storage from "../../../services/Storage";


import ImageViewer from "../../../components/ImageViewer";
import Loader from "../../../components/Loader";

export default function ProfileEvolution() {

  const history = useHistory();
  const { addToast } = useToasts();
  const fileInput = useRef(null);

  const [ evolucao, setEvolucao ] = useState(null);
  const [ loading, setLoading ] = useState(false);

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
    setLoading(true);
    uploadEvolution(file.base64)
      .then((response) => {

        let sorted = response.acf.minha_evolucao.sort((a,b) => {
          let dateA = moment(a.data);
          let dateB = moment(b.data);
          return  dateB.diff(dateA);
        })

        setLoading(false);
        Storage.uploadUser(response);
        window.location.reload();
        return null;
      })
      .catch((error) => {
        setLoading(false);
        addToast("Não foi possivel enviar a imagem. Tente novamente", { appearance: 'error' });
      })
  }

  useEffect(() => {
      const loadEvolution = async () => {
          let response = await getEvolution();
          if( response ) {
              let sorted = response.sort((a,b) => {
                    let dateA = moment(a.data);
                    let dateB = moment(b.data);
                    return  dateB.diff(dateA);
              })
              console.log(sorted);

              setEvolucao(sorted);
        
          } else {
            addToast("Não foi possivel carregar as imagens. Tente novamente", { appearance: 'error' });
            setEvolucao(null);
          }
      }
      loadEvolution();
  }, []);

  const normalizeDate = (d) => {
    let data = moment(d);
    return `${twoDigit(data.date())}/${ twoDigit(data.month() + 1) }/${data.year()}`;
  }

  const twoDigit = (num) => {
    return ("0" + num).slice(-2);
  }


  return (
    <>
        <NavbarTop name="Perfil" withGoBack={true} withMenu={false}></NavbarTop>
        <div className="profile-evolution">
            {  loading ? (<div className="loading-top"><Loader width={50} /></div>) : '' }
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
                      <div key={key} className="back-image-wrapper">
                        <ImageViewer source={evo.foto} />
                        {/* <img src={evo.foto} style={{width: '100%', height: "100%", objectFit: "cover", objectPosition: "cemter" }}/> */}
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
