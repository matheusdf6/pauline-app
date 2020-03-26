import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import MyMenu from './pages/MyMenu';
import MyMenuRecipes from './pages/MyMenu/MyMenuRecipes';
import MyMenuRecipe from './pages/MyMenu/MyMenuRecipes/MyMenuRecipe';
import MyMenuOrientations from './pages/MyMenu/MyMenuOrientations';
import MyMenuShoplist from './pages/MyMenu/MyMenuShoplist';
import MyMenuList from './pages/MyMenu/MyMenuList';
import Profile from './pages/Profile';
import ProfileMetrics from './pages/Profile/ProfileMetrics';
import ProfileEvolution from './pages/Profile/ProfileEvolution';
import ProfileEdit from './pages/Profile/ProfileEdit';
import Blog from './pages/Blog';
import BlogPost from './pages/Blog/BlogPost';
import NotificationProvider from "./services/Notification/NotificationProvider";
import Notification from "./services/Notification/Notification";
import NotificationPipeline from "./services/Notification/NotificationPipeline";
import SynchronizerComponent from "./services/Syncronizer/SyncronizerComponent";

export default function Routes() {
    return ( 
        <BrowserRouter basename="/aplicativo" >
            <NotificationProvider>
                <Switch>
                    <Route path="/" exact component={ Dashboard }/> 
                    <Route path="/login" component={ Login } /> 
                    <Route path="/registrar" component={ Register } />
                    <Route exact path="/meu-menu/cardapios/lista" component={ MyMenuList }/> 
                    <Route exact path="/meu-menu/cardapios/:dia?" component={ MyMenu }/> 
                    <Route path="/meu-menu/receitas/:id" component={ MyMenuRecipe }/> 
                    <Route path="/meu-menu/receitas" component={ MyMenuRecipes }/> 
                    <Route path="/meu-menu/orientacoes-gerais" component={ MyMenuOrientations }/> 
                    <Route path="/meu-menu/lista-de-compras" component={ MyMenuShoplist }/>  
                    <Route exact path="/perfil" component={ Profile }/> 
                    <Route path="/perfil/medidas" component={ ProfileMetrics }/> 
                    <Route path="/perfil/evolucao" component={ ProfileEvolution }/> 
                    <Route path="/perfil/editar" component={ ProfileEdit }/> 
                    <Route path="/blog/:id" component={ BlogPost }/> 
                    <Route exact path="/blog" component={ Blog }/> 
                </Switch>
                <Notification />
                <NotificationPipeline />
                <SynchronizerComponent />
            </NotificationProvider>
        </BrowserRouter>
    )
}