import React, { useMemo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import RecipeCard from '../components/RecipeCard';
import { SAMPLE_RECIPES, getCategoryById } from '../data/recipes';
import { COLORS } from '../theme';

const CategoryRecipesScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const categoryId = route.params ? route.params.categoryId : null;
  const category = getCategoryById(categoryId);

  const recipes = useMemo(
    () => SAMPLE_RECIPES.filter((r) => r.category === categoryId),
    [categoryId]
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {category && <Ionicons name={category.icon} size={34} color={COLORS.primary} />}
        <View>
          <Text style={styles.title}>{category ? category.name : ''}</Text>
          <Text style={styles.count}>{recipes.length} recetas</Text>
        </View>
      </View>

      {recipes.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No hay recetas en esta categoría.</Text>
        </View>
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.itemWrap}>
              <RecipeCard
                recipe={item}
                onPress={() => navigation.navigate('RecipeDetail', { recipeId: item.id })}
              />
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 20, paddingTop: 16 },
  title: { fontSize: 26, fontWeight: '800', color: COLORS.text },
  count: { fontSize: 14, color: COLORS.subtext },
  list: { paddingHorizontal: 20, paddingBottom: 30 },
  row: { justifyContent: 'space-between' },
  itemWrap: { width: '48%' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { color: COLORS.subtext, fontSize: 16 },
});

export default CategoryRecipesScreen;
