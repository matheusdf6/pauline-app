import recipesAPI from './recipes';

export const syncChanges = async () => {
  const endpoints = {
    recipes: recipesAPI.getRecipes(),
    recipesCategories: recipesAPI.getRecipeCategories(),
  };

  const keys = Object.keys(endpoints);
  const promises = Object.values(endpoints);
  const resolvedPromises = await Promise.all(promises);

  const result = {};
  keys.forEach((endpoint, index) => {
    result[endpoint] = resolvedPromises[index];
  });

  return result;
};
