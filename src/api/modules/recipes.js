import api from '../api';

import Storage from "../../services/Storage";

export const getRecipes = async (pageOffset = 0) => {

  try {
    const recipes = await api.get('/receitas', {
      params: { offset: pageOffset, per_page: 100, orderby: 'date', order: 'desc' },
    });
  
    let recipesArray = recipes.map(recipe => ({
      id: recipe.id,
      title: recipe.title.rendered,
      image: recipe.acf.imagem_destacada,
      category: recipe.acf.categoria_da_receita[0],
      body: recipe.content.rendered,
    }));
  
    Storage.setLocalStorage("recipes", JSON.stringify(recipesArray));
    return recipesArray;  
  } catch {
    return null;
  }
};

export const getStoredRecipes = () => {
  let response = Storage.getLocalStorage("recipes");
  if(response) {
    return JSON.parse(response);
  }
  return null
}

export const getRecipeCategories = async (pageOffset = 0) => {
  try {
    const recipes = await api.get('/categoria_receita', {
      params: { offset: pageOffset, per_page: 100, hide_empty: true },
    });
  
    return recipes;  
  } catch {
    return null;
  }
};

export const getRecipesCategory = async (categoryID) => {
  try {
    if (!categoryID) {
      return null;
    }
  
    const category = await api.get(`categoria_receita/${categoryID}`);
    return category;  
  } catch {
    return null;
  }
};

export const getRecipe = async (id) => {
  try {
    let cached = Storage.getLocalStorage("recipes");
    let recipes = cached ? JSON.parse(cached) : null;
    if( recipes ) {
      let recipe = recipes.filter((r) => r.id == id);
      return recipe;  
    } 
  
    const response = await api.get(`/receitas/${id}`);
    if( response ) {
      return {
        id: response.id,
        title: response.title.rendered,
        image: response.acf.imagem_destacada,
        category: response.acf.categoria_da_receita[0],
        body: response.content.rendered,  
      };
    }
  
    return null;  
  } catch {
    return null;
  }

}
export default { getRecipes, getRecipe, getRecipeCategories, getRecipesCategory };
