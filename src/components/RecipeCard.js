import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme';

const RecipeCard = ({ recipe, onPress }) => {
  const isCustom = !!recipe.isCustom;
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <Image
        source={recipe.image ? { uri: recipe.image } : require('../../assets/icon.png')}
        style={styles.image}
      />
      {isCustom && <View style={styles.badge}><Text style={styles.badgeText}>MÍA</Text></View>}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{recipe.name}</Text>
        <View style={styles.meta}>
          <Ionicons name="time-outline" size={13} color={COLORS.subtext} />
          <Text style={styles.metaText}>{recipe.prepTime}</Text>
          <Ionicons name="flame-outline" size={13} color={COLORS.subtext} />
          <Text style={styles.metaText}>{recipe.calories} cal</Text>
        </View>
        <Text style={styles.diff}>{recipe.difficulty}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  image: { width: '100%', height: 150, backgroundColor: COLORS.accent },
  badge: {
    position: 'absolute', top: 10, left: 10,
    backgroundColor: COLORS.primary, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3,
  },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '800' },
  info: { padding: 12 },
  name: { fontSize: 17, fontWeight: '700', color: COLORS.text },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 6 },
  metaText: { fontSize: 13, color: COLORS.subtext },
  diff: { marginTop: 6, fontSize: 12, color: COLORS.primaryDark, fontWeight: '700' },
});

export default RecipeCard;
