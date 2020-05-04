import React, { useState, useEffect } from 'react';
import NavbarTop from "../../../components/NavbarTop";
import NavbarBottom from "../../../components/NavbarBottom";
import PdfWrapper from "../../../components/PdfWrapper";
import { getOrientacoes } from "../../../api/modules/pdfs";

import download from "../../../assets/download.png";

import "./styles.css";

export default function MyMenuOrientations() {

  const [ doc, setDoc ] = useState(null);
  const [ erro, setErro ] = useState('');

  useEffect(() => {
    const loadOrientacoes = async () => {
      let response = await getOrientacoes();
      if( response ) {
        setDoc(response);
      } else {
        setErro("Não foi possivel carregar o PDF");
      }
    }
    loadOrientacoes();
  })

  return (
    <div className="orientations-inner">
      <NavbarTop name="Meu Cardápio" withGoBack={true} withMenu={true}></NavbarTop>
      <div className="orientation-box">
        {
          doc ? (
            <>
            <a className="download-pdf" download href={doc}><img src={download} />Baixar PDF</a>
            <PdfWrapper file={doc} />    
            </>
          ) : ''
        }
      </div>
      <NavbarBottom></NavbarBottom>
    </div>
  );

  
}
