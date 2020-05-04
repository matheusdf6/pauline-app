import React, { useState, useEffect } from 'react';
import NavbarTop from "../../../components/NavbarTop";
import NavbarBottom from "../../../components/NavbarBottom";
import PdfWrapper from "../../../components/PdfWrapper";
import { getLista } from "../../../api/modules/pdfs";

import download from "../../../assets/download.png";

import "./styles.css";

export default function MyMenuShoplist() {

  const [ doc, setDoc ] = useState(null);
  const [ erro, setErro ] = useState('');

  useEffect(() => {
    const loadShoplist = async () => {
      let response = await getLista();
      if( response ) {
        setDoc(response);
      } else {
        setErro("Não foi possivel carregar o PDF");
      }
    }
    loadShoplist();
  })


  return (
    <div className="orientations-inner">
      <NavbarTop name="Meu Cardápio" withGoBack={true} withMenu={true}></NavbarTop>
      <div className="shoplist-box">
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
