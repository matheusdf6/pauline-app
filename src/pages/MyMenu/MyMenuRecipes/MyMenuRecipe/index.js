import React, { useEffect, useState } from 'react';
import { getRecipe } from "../../../../api/modules/recipes";
import { useHistory } from "react-router-dom";

import NavbarTop from "../../../../components/NavbarTop";
import NavbarBottom from "../../../../components/NavbarBottom";

import './styles.css';

export default function MyMenuRecipe({ match }) {
    
    const history = useHistory();
    const [ recipe, setRecipe ] = useState(null);

    useEffect(() =>{
        const getRecipeObject = async () => {
            let result = await getRecipe(match.params.id);
            if(result) {
                console.log(result);
                if ( Array.isArray(result) ) setRecipe(result[0]);
                else setRecipe(result);
            }
        }
        getRecipeObject();
    },[]);

    let stored = Storage.getLocalStorage('user');

    if( !stored ) {
        history.push("/");
    }
  
    const user = JSON.parse(stored);
  

    return (
    <div className="recipe-single-inner">
        {
            user.tipo_usuario == "Paciente" ? (
                <NavbarTop name="Meu Cardápio" withGoBack={true} withMenu={true}></NavbarTop>
            ) : (
                <NavbarTop name="Receitas" withGoBack={true} withMenu={false}></NavbarTop>
            )
        }
        {
            recipe ? 
            (
                <div className="recipe-single">
                    <img src={recipe.image} alt={recipe.title}/>
                    <div className="recipe-single-text">
                        <h2>{recipe.title}</h2>
                        <span className="single-tag">{recipe.category ? recipe.category.name : "Sem categoria"}</span>
                        {
                            recipe.body ? (
                                <div className="single-body" dangerouslySetInnerHTML={{__html: recipe.body.replace(/&lt;/g, '<')
                                                                                                    .replace(/&gt;/g, '>')
                                                                                                    .replace(/&#8221;/g, '"')
                                                                                                    .replace(/&#8220;/g, '"')}}></div>

                            ) : ''
                        }   
                    </div>
                </div>

            ) : ''
        }
        <NavbarBottom></NavbarBottom>
    </div>
  );
}
