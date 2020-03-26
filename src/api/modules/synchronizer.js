import recipesAPI from './recipes';
import scheduleAPI from './schedules';
import menusAPI from './menus';

export const syncChanges = async () => {
  const endpoints = {
    recipes: recipesAPI.getRecipes(),
    recipesCategories: recipesAPI.getRecipeCategories(),
    schedules: scheduleAPI.getSchedules(),
    menus: menusAPI.getNewMenus()
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
