import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import MyMenu from './pages/MyMenu';
import MyMenuRecipes from './pages/MyMenu/MyMenuRecipes';
import MyMenuOrientations from './pages/MyMenu/MyMenuOrientations';
import MyMenuShoplist from './pages/MyMenu/MyMenuShoplist';



export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/login" component={Login} />
                <Route path="/meu-menu" component={MyMenu} />
                <Route path="/meu-menu/receitas" component={MyMenuRecipes} />
                <Route path="/meu-menu/orientacoes-gerais" component={MyMenuOrientations} />
                <Route path="/meu-menu/lista-de-compras" component={MyMenuShoplist} />
            </Switch>
        </BrowserRouter>
    )
}