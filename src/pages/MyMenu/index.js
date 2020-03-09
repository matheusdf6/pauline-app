import React from 'react';

import { Route, Router } from "react-router-dom";

import "./styles.css";
import NavbarTop from "../../components/NavbarTop";
import NavbarBottom from "../../components/NavbarBottom";

import AllMenus from "../AllMenus";
// import { Container } from './styles';

export default function MyMenu() {
  return (
    <>
        <NavbarTop name="Meu Menu" withMenu={true}></NavbarTop>
        <div className="my-menu page-content">
            Meu Menu
        </div>
        <NavbarBottom></NavbarBottom>
    </>
  );
}
