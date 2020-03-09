import api from '../api';

export const getRecipes = async (pageOffset = 0) => {
  const recipes = await api.get('/receitas', {
    params: { offset: pageOffset, per_page: 100 },
  });

  return recipes.map(recipe => ({
    id: recipe.id,
    title: recipe.title.rendered,
    image: recipe.acf.imagem_destacada,
    category: recipe.acf.categoria_da_receita[0],
    body: recipe.content.rendered,
  }));
};

export const getRecipeCategories = async (pageOffset = 0) => {
  const recipes = await api.get('/categoria_receita', {
    params: { offset: pageOffset, per_page: 100 },
  });

  return recipes;
};

export const getRecipesCategory = async (categoryID) => {
  if (!categoryID) {
    return null;
  }

  const category = await api.get(`categoria_receita/${categoryID}`);
  return category;
};

export default { getRecipes, getRecipeCategories, getRecipesCategory };
