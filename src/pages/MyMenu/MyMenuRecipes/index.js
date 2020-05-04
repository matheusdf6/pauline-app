import React, { useState, useEffect } from 'react';
import recipes, { getStoredFirstRecipes, getRecipeCategories } from "../../../api/modules/recipes";
import { useHistory } from "react-router-dom";

import "./styles.css";
import NavbarTop from "../../../components/NavbarTop";
import NavbarBottom from "../../../components/NavbarBottom";
import RecipeCard from "../../../components/RecipeCard";
import Loader from "../../../components/Loader";


import searchIcon from "../../../assets/search.png";
import close from "../../../assets/close.png";

export default function MyMenuRecipes() {
  const history = useHistory();

  const [ receitas, setReceitas ] = useState([]);
  const [ categorias, setCategorias ] = useState([]);
  const [ search, setSearch ] = useState('');
  const [ filtered, setFiltered ] = useState(null);
  const [ hideRecipes, setHideRecipes ] = useState(false);
  const [ catActive, setCatActive ] = useState('');


  useEffect(() => {
    const getPageRecipes = async () => {
      let resultReceitas = await getStoredFirstRecipes();
      setReceitas( resultReceitas ? resultReceitas : []); 
    }
    getPageRecipes();
  }, []);

  useEffect(() => {
    const getPageRecipeCategories = async () => {
      let resultCats = await getRecipeCategories();
      setCategorias( resultCats ? resultCats : []);  
    }
    getPageRecipeCategories();
  }, []);

  const searchRecipeByTerm = (e) => {
    e.preventDefault();
    if( catActive ) {
      setCatActive('');
    }
    if( search ) {
      let result = filterRecipesByTerm(search);
      if( result ) {
        setHideRecipes(true);
      }
      setFiltered(result);  
    }
  }

  const searchRecipeByCategory = (cat) => {
    if( search ) {
      setFiltered(null); 
      setSearch('');
    }

    if(cat == catActive) {
      setCatActive('');
      setFiltered(null);
      setHideRecipes(false);
    } else {

      setCatActive(cat);
      let result = filterRecipesByCategory(cat);
      if( result ) {
        setHideRecipes(true);
      }
      setFiltered(result);  
    }
  }


  const filterRecipesByTerm = (term) => {
    return receitas.filter((receita, key) => {
      let containsTerm = false;
      let lowerTitle = receita.title.toLowerCase();
      let lowerTerm = term.toLowerCase();
      if(lowerTitle.includes(lowerTerm)) 
        containsTerm = true;
      return containsTerm;
    })
  }

  const filterRecipesByCategory = (cat) => {
    return receitas.filter((receita, key) => {
      let containsCat = false;
      if(receita.category && receita.category.name === cat) 
        containsCat = true;
      return containsCat;
    })
  }

  const removeSearch = () => {
    setFiltered(null);
    setSearch('');
    setHideRecipes(false);
  }

  let stored = Storage.getLocalStorage('user');

  if( !stored ) {
      history.push("/");
  }

  const user = JSON.parse(stored);


  return (
    <div className="recipe-inner">
        {
            user.tipo_usuario == "Paciente" ? (
                <NavbarTop name="Meu Cardápio" withGoBack={true} withMenu={true}></NavbarTop>
            ) : (
                <NavbarTop name="Receitas" withGoBack={true} withMenu={false}></NavbarTop>
            )
        }
        <form onSubmit={searchRecipeByTerm} className="search-form">
        <input type="search" 
                     placeholder="Pesquisar" 
                     name="s" 
                     id="search" 
                     value={search} 
                     onChange={(e) => setSearch(e.target.value) } />
          <button className="btn-search" type="submit"><img src={ searchIcon } alt="Pesquisar"/></button>
          {filtered && search ? (<button className="btn-close" onClick={removeSearch} type="reset"><img src={close}/></button>) : ''}
        </form>
        <div className="tags">
          <ul className="tags-slider">
          {
            categorias ? categorias.map((cat, key) => (<li key={key} className={ catActive == cat.name ? 'search-active' : '' } ><button onClick={() => searchRecipeByCategory(cat.name)}>{cat.name}</button></li>)) : ''
          }
          </ul>
        </div>
        <div className="recipe-list">
          {
            receitas && !hideRecipes ? receitas.map((r, key) => (<RecipeCard key={key} recipe={r}></RecipeCard>)) : ''
          }
          {
            filtered && hideRecipes ? filtered.map((r, key) => (<RecipeCard key={key} recipe={r}></RecipeCard>)) : ''
          }

          </div>

        <NavbarBottom></NavbarBottom>
    </div>
  );
}
