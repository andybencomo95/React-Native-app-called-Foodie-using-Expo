import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { getCustomRecipes, deleteCustomRecipe } from '../storage/storage';
import { COLORS } from '../theme';

const MyRecipesScreen = () => {
  const navigation = useNavigation();
  const [recipes, setRecipes] = useState([]);

  useFocusEffect(
    useCallback(() => {
      (async () => setRecipes(await getCustomRecipes()))();
    }, [])
  );

  const onDelete = (recipe) => {
    Alert.alert(
      'Borrar receta',
      `¿Seguro que quieres borrar "${recipe.name}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Borrar', style: 'destructive',
          onPress: async () => {
            await deleteCustomRecipe(recipe.id);
            setRecipes(await getCustomRecipes());
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.cardMain}
        onPress={() => navigation.navigate('RecipeDetail', { recipeId: item.id })}
      >
        <View style={styles.textBox}>
          <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.meta}>{item.prepTime} · {item.calories} cal</Text>
        </View>
        <Ionicons name="chevron-forward" size={22} color={COLORS.subtext} />
      </TouchableOpacity>
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionBtn, styles.editBtn]}
          onPress={() => navigation.navigate('AddRecipe', { recipe: item })}
        >
          <Ionicons name="create-outline" size={16} color="#fff" />
          <Text style={styles.actionText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBtn, styles.deleteBtn]}
          onPress={() => onDelete(item)}
        >
          <Ionicons name="trash-outline" size={16} color="#fff" />
          <Text style={styles.actionText}>Borrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="restaurant" size={26} color={COLORS.primary} />
        <Text style={styles.title}>Mi comida</Text>
      </View>

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => navigation.navigate('AddRecipe')}
      >
        <Ionicons name="add-circle" size={20} color="#fff" />
        <Text style={styles.addBtnText}>Añadir nueva receta</Text>
      </TouchableOpacity>

      {recipes.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="restaurant-outline" size={50} color={COLORS.primary} style={styles.emptyIcon} />
          <Text style={styles.emptyText}>Todavía no has creado recetas.</Text>
          <Text style={styles.emptyHint}>Pulsa "Añadir nueva receta" para empezar.</Text>
        </View>
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 20, paddingTop: 16 },
  title: { fontSize: 26, fontWeight: '800', color: COLORS.text },
  addBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: COLORS.primary, marginHorizontal: 20, paddingVertical: 14,
    borderRadius: 14, marginBottom: 16,
  },
  addBtnText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  list: { paddingHorizontal: 20, paddingBottom: 30 },
  card: {
    backgroundColor: COLORS.card, borderRadius: 16, marginBottom: 14, overflow: 'hidden',
    borderWidth: 1, borderColor: COLORS.border,
  },
  cardMain: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 10 },
  textBox: { flex: 1 },
  name: { fontSize: 17, fontWeight: '700', color: COLORS.text },
  meta: { fontSize: 13, color: COLORS.subtext, marginTop: 4 },
  actions: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: COLORS.border },
  actionBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    paddingVertical: 12,
  },
  editBtn: { backgroundColor: COLORS.primary },
  deleteBtn: { backgroundColor: '#e5484d', borderLeftWidth: 1, borderLeftColor: COLORS.card },
  actionText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 },
  emptyIcon: { marginBottom: 12 },
  emptyText: { fontSize: 18, fontWeight: '700', color: COLORS.text },
  emptyHint: { fontSize: 14, color: COLORS.subtext, marginTop: 6, textAlign: 'center' },
});

export default MyRecipesScreen;
