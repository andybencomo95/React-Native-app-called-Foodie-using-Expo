import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { getRecipeById, isFavorite, toggleFavorite } from '../storage/storage';
import { getCategoryById } from '../data/recipes';
import { COLORS } from '../theme';

const RecipeDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const recipeId = route.params ? route.params.recipeId : null;

  const [recipe, setRecipe] = useState(null);
  const [fav, setFav] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      const r = await getRecipeById(recipeId);
      const f = await isFavorite(recipeId);
      if (active) {
        setRecipe(r);
        setFav(f);
      }
    })();
    return () => { active = false; };
  }, [recipeId]);

  const onToggle = useCallback(async () => {
    if (!recipe) return;
    const nowFav = await toggleFavorite(recipe);
    setFav(nowFav);
  }, [recipe]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={onToggle} style={{ marginRight: 12 }}>
          <Ionicons
            name={fav ? 'heart' : 'heart-outline'}
            size={26}
            color={fav ? COLORS.favorite : COLORS.subtext}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, fav, onToggle]);

  if (!recipe) {
    return (
      <View style={styles.center}><Text>Cargando...</Text></View>
    );
  }

  const cat = getCategoryById(recipe.category);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image
        source={recipe.image ? { uri: recipe.image } : require('../../assets/icon.png')}
        style={styles.image}
      />
      <View style={styles.body}>
        <Text style={styles.name}>{recipe.name}</Text>
        {cat && (
          <View style={styles.categoryRow}>
            <Ionicons name={cat.icon} size={16} color={COLORS.primaryDark} />
            <Text style={styles.category}>{cat.name}</Text>
          </View>
        )}

        <View style={styles.stats}>
          <Stat icon="time-outline" label="Preparación" value={recipe.prepTime} />
          <Stat icon="restaurant-outline" label="Raciones" value={recipe.servings} />
          <Stat icon="flame-outline" label="Calorías" value={recipe.calories} />
          <Stat icon="stats-chart-outline" label="Dificultad" value={recipe.difficulty} />
        </View>

        <Section title="Ingredientes">
          {recipe.ingredients.map((ing, i) => (
            <View key={i} style={styles.bullet}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>{ing}</Text>
            </View>
          ))}
        </Section>

        <Section title="Instrucciones">
          {recipe.instructions.map((step, i) => (
            <View key={i} style={styles.step}>
              <View style={styles.stepNum}><Text style={styles.stepNumText}>{i + 1}</Text></View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </Section>

        <TouchableOpacity
          style={[styles.favBtn, fav && styles.favBtnActive]}
          onPress={onToggle}
        >
          <Ionicons
            name={fav ? 'heart' : 'heart-outline'}
            size={20}
            color={fav ? '#fff' : COLORS.favorite}
          />
          <Text style={[styles.favBtnText, fav && styles.favBtnTextActive]}>
            {fav ? 'En favoritos' : 'Marcar como favorita'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const Stat = ({ icon, label, value }) => (
  <View style={styles.stat}>
    <Ionicons name={icon} size={20} color={COLORS.primary} />
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={styles.statValue}>{value}</Text>
  </View>
);

const Section = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  image: { width: '100%', height: 260, backgroundColor: COLORS.accent },
  body: { padding: 20, paddingBottom: 40 },
  name: { fontSize: 26, fontWeight: '800', color: COLORS.text },
  category: { fontSize: 15, color: COLORS.primaryDark, fontWeight: '600' },
  categoryRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  stats: {
    flexDirection: 'row', flexWrap: 'wrap', marginTop: 16, gap: 10,
  },
  stat: {
    backgroundColor: COLORS.card, borderRadius: 14, padding: 12, width: '47%',
    alignItems: 'center', borderWidth: 1, borderColor: COLORS.border,
  },
  statLabel: { fontSize: 12, color: COLORS.subtext, marginTop: 4 },
  statValue: { fontSize: 16, fontWeight: '800', color: COLORS.text, marginTop: 2 },
  section: { marginTop: 24 },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: COLORS.text, marginBottom: 10 },
  bullet: { flexDirection: 'row', marginBottom: 8 },
  bulletDot: { color: COLORS.primary, fontSize: 18, marginRight: 8 },
  bulletText: { fontSize: 16, color: COLORS.text, flex: 1 },
  step: { flexDirection: 'row', marginBottom: 12, alignItems: 'flex-start' },
  stepNum: {
    width: 28, height: 28, borderRadius: 14, backgroundColor: COLORS.primary,
    alignItems: 'center', justifyContent: 'center', marginRight: 12, marginTop: 2,
  },
  stepNumText: { color: '#fff', fontWeight: '800' },
  stepText: { fontSize: 16, color: COLORS.text, flex: 1 },
  favBtn: {
    marginTop: 28, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, borderWidth: 2, borderColor: COLORS.favorite, borderRadius: 14,
    paddingVertical: 14, backgroundColor: '#fff',
  },
  favBtnActive: { backgroundColor: COLORS.favorite, borderColor: COLORS.favorite },
  favBtnText: { color: COLORS.favorite, fontWeight: '800', fontSize: 16 },
  favBtnTextActive: { color: '#fff' },
});

export default RecipeDetailScreen;
