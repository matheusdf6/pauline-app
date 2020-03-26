import React from 'react';
import { useHistory } from "react-router-dom";

import "./styles.css";
import recipes from '../../api/modules/recipes';

export default function RecipeCard({ recipe }) {
    const history = useHistory();

    const handleClick = () => {
        history.push(`/meu-menu/receitas/${ recipe.id }`);
    }

    return (
    <a onClick={ handleClick } className="recipe-card">
        <div className="card-image">
            <img src={ recipe.image } alt={ recipe.title } />
        </div>
        <div className="card-text">
            <div className="card-text-info">
                <span className="card-tag">{ recipe.category ? recipe.category.name : "Sem categoria" }</span>
            </div>
            <div className="card-text-title">
                <h3>{ recipe.title }</h3>
            </div>
        </div>
    </a>
  );
}

