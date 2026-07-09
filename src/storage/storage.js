import AsyncStorage from '@react-native-async-storage/async-storage';
import { SAMPLE_RECIPES } from '../data/recipes';

const FAVORITES_KEY = 'foodie_favorites';
const CUSTOM_KEY = 'foodie_custom_recipes';

const readJSON = async (key, fallback) => {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
};

const writeJSON = async (key, value) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

/* ---------- Favoritos ---------- */
export const getFavorites = () => readJSON(FAVORITES_KEY, []);

export const isFavorite = async (id) => {
  const favs = await getFavorites();
  return favs.some((r) => r.id === id);
};

export const addFavorite = async (recipe) => {
  const favs = await getFavorites();
  if (!favs.some((r) => r.id === recipe.id)) {
    favs.push(recipe);
    await writeJSON(FAVORITES_KEY, favs);
  }
};

export const removeFavorite = async (id) => {
  const favs = await getFavorites();
  await writeJSON(FAVORITES_KEY, favs.filter((r) => r.id !== id));
};

export const toggleFavorite = async (recipe) => {
  const fav = await isFavorite(recipe.id);
  if (fav) {
    await removeFavorite(recipe.id);
  } else {
    await addFavorite(recipe);
  }
  return !fav;
};

/* ---------- Recetas personalizadas (Mis recetas) ---------- */
export const getCustomRecipes = () => readJSON(CUSTOM_KEY, []);

export const addCustomRecipe = async (recipe) => {
  const list = await getCustomRecipes();
  list.unshift(recipe);
  await writeJSON(CUSTOM_KEY, list);
};

export const updateCustomRecipe = async (recipe) => {
  const list = await getCustomRecipes();
  const idx = list.findIndex((r) => r.id === recipe.id);
  if (idx !== -1) list[idx] = recipe;
  await writeJSON(CUSTOM_KEY, list);
};

export const deleteCustomRecipe = async (id) => {
  const list = await getCustomRecipes();
  await writeJSON(CUSTOM_KEY, list.filter((r) => r.id !== id));
};

/* ---------- Utilidad ---------- */
export const getRecipeById = async (id) => {
  const sample = SAMPLE_RECIPES.find((r) => r.id === id);
  if (sample) return sample;
  const custom = await getCustomRecipes();
  return custom.find((r) => r.id === id) || null;
};
