import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import FeedScreen from './src/screens/FeedScreen';
import RecipeDetailScreen from './src/screens/RecipeDetailScreen';
import CategoryRecipesScreen from './src/screens/CategoryRecipesScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import MyRecipesScreen from './src/screens/MyRecipesScreen';
import AddRecipeScreen from './src/screens/AddRecipeScreen';
import { COLORS } from './src/theme';

const Stack = createNativeStackNavigator();

const headerOptions = {
  headerStyle: { backgroundColor: COLORS.background },
  headerTintColor: COLORS.text,
  headerTitleStyle: { fontWeight: '800', color: COLORS.text },
  headerBackTitleVisible: false,
};

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator screenOptions={headerOptions} initialRouteName="Feed">
        <Stack.Screen name="Feed" component={FeedScreen} options={{ title: 'Foodie' }} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} options={{ title: 'Receta' }} />
        <Stack.Screen name="CategoryRecipes" component={CategoryRecipesScreen} options={{ title: 'Categoría' }} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Favoritos' }} />
        <Stack.Screen name="MyRecipes" component={MyRecipesScreen} options={{ title: 'Mi comida' }} />
        <Stack.Screen
          name="AddRecipe"
          component={AddRecipeScreen}
          options={({ route }) => ({ title: route.params && route.params.recipe ? 'Editar receta' : 'Nueva receta' })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
