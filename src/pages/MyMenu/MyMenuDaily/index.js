import React from 'react';

import "./styles.css";
import NavbarTop from "../../../components/NavbarTop";

export default function MyMenuDaily() {
  return (
    <>
      <NavbarTop withGoBack={true} withMenu={true}></NavbarTop>
      <div>
        Meu cardápio
      </div>

    </>
  );
}
