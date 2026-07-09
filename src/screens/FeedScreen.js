import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import CategoryBar from '../components/CategoryBar';
import RecipeCard from '../components/RecipeCard';
import { SAMPLE_RECIPES } from '../data/recipes';
import { COLORS, globalStyles } from '../theme';

const FeedScreen = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);

  const handleSelect = (item) => {
    setSelected(item.id);
    if (item.id === 'favoritos') {
      navigation.navigate('Favorites');
    } else if (item.id === 'micomida') {
      navigation.navigate('MyRecipes');
    } else {
      navigation.navigate('CategoryRecipes', { categoryId: item.id });
    }
  };

  return (
    <View style={globalStyles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.appName}>Foodie</Text>
        <Text style={styles.tagline}>Recetas deliciosas para cada momento</Text>
      </View>

      <CategoryBar selectedId={selected} onSelect={handleSelect} />

      <FlatList
        data={SAMPLE_RECIPES}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={styles.sectionTitle}>Recetas populares</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.itemWrap}>
            <RecipeCard
              recipe={item}
              onPress={() => navigation.navigate('RecipeDetail', { recipeId: item.id })}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 4 },
  appName: { fontSize: 30, fontWeight: '900', color: COLORS.primary },
  tagline: { fontSize: 14, color: COLORS.subtext, marginTop: 2 },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: COLORS.text, paddingHorizontal: 20, marginBottom: 12 },
  list: { paddingHorizontal: 20, paddingBottom: 30 },
  row: { justifyContent: 'space-between' },
  itemWrap: { width: '48%' },
});

export default FeedScreen;
