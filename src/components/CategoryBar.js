import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORIES } from '../data/recipes';
import { COLORS } from '../theme';

const SPECIAL = [
  { id: 'favoritos', name: 'Favoritos', icon: 'heart', color: '#ffd6e0' },
  { id: 'micomida', name: 'Mi comida', icon: 'book', color: '#d0f4de' },
];

const CategoryBar = ({ selectedId, onSelect }) => {
  const items = [...CATEGORIES, ...SPECIAL];
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {items.map((c) => {
        const active = c.id === selectedId;
        return (
          <TouchableOpacity
            key={c.id}
            style={[styles.chip, active && styles.chipActive]}
            onPress={() => onSelect(c)}
          >
            <Ionicons name={c.icon} size={16} color={active ? '#fff' : COLORS.text} />
            <Text style={[styles.label, active && styles.labelActive]}>{c.name}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: 12, paddingHorizontal: 16, gap: 10 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 22,
    paddingVertical: 8,
    paddingHorizontal: 14,
    gap: 6,
  },
  chipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  label: { fontSize: 14, fontWeight: '600', color: COLORS.text },
  labelActive: { color: '#fff' },
});

export default CategoryBar;
