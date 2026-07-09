import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import RecipeCard from '../components/RecipeCard';
import { getFavorites } from '../storage/storage';
import { COLORS } from '../theme';

const FavoritesScreen = () => {
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState([]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const f = await getFavorites();
        setFavorites(f);
      })();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="heart" size={28} color={COLORS.favorite} />
        <Text style={styles.title}>Favoritos</Text>
      </View>

      {favorites.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="heart-outline" size={50} color={COLORS.favorite} style={styles.emptyIcon} />
          <Text style={styles.emptyText}>Aún no tienes recetas favoritas.</Text>
          <Text style={styles.emptyHint}>Toca el corazón en una receta para guardarla aquí.</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
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
  header: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 20, paddingTop: 16 },
  title: { fontSize: 26, fontWeight: '800', color: COLORS.text },
  list: { paddingHorizontal: 20, paddingBottom: 30 },
  row: { justifyContent: 'space-between' },
  itemWrap: { width: '48%' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 },
  emptyIcon: { marginBottom: 12 },
  emptyText: { fontSize: 18, fontWeight: '700', color: COLORS.text },
  emptyHint: { fontSize: 14, color: COLORS.subtext, marginTop: 6, textAlign: 'center' },
});

export default FavoritesScreen;
