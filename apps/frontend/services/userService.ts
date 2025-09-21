import axiosClient from './axiosClient';

export const getUserFavoriteRecipes = async () => {
  try {
    const response = await axiosClient.get('/users/me/favorites');
    return response.data;
  } catch (error) {
    console.error('Error fetching user favorite recipes:', error);
    throw error;
  }
}

export const getUserRecipes = async () => {
  try {
    const response = await axiosClient.get('/users/me/recipes');
    return response.data;
  } catch (error) {
    console.error('Error fetching user recipes:', error);
    throw error;
  }
}
