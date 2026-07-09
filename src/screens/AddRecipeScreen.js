import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, Alert, Image,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { COLORS } from '../theme';
import { CATEGORIES } from '../data/recipes';
import { addCustomRecipe, updateCustomRecipe } from '../storage/storage';

const DIFFICULTIES = ['Fácil', 'Media', 'Difícil'];

const AddRecipeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const editing = route.params ? route.params.recipe : null;

  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState(CATEGORIES[2].id);
  const [prepTime, setPrepTime] = useState('30 min');
  const [servings, setServings] = useState('2');
  const [calories, setCalories] = useState('300');
  const [difficulty, setDifficulty] = useState('Fácil');
  const [ingredients, setIngredients] = useState(['']);
  const [instructions, setInstructions] = useState(['']);

  useEffect(() => {
    if (editing) {
      setName(editing.name || '');
      setImage(editing.image || null);
      setCategory(editing.category || CATEGORIES[2].id);
      setPrepTime(editing.prepTime || '30 min');
      setServings(String(editing.servings != null ? editing.servings : '2'));
      setCalories(String(editing.calories != null ? editing.calories : '300'));
      setDifficulty(editing.difficulty || 'Fácil');
      setIngredients(editing.ingredients && editing.ingredients.length ? editing.ingredients : ['']);
      setInstructions(editing.instructions && editing.instructions.length ? editing.instructions : ['']);
    }
  }, []);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.status !== 'granted') {
      Alert.alert('Permiso requerido', 'Necesitamos acceso a tus fotos para subir una imagen.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.6,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission.status !== 'granted') {
      Alert.alert('Permiso requerido', 'Necesitamos acceso a la cámara.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [4, 3], quality: 0.6 });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const updateList = (setter, list, index, value) => {
    const copy = [...list];
    copy[index] = value;
    setter(copy);
  };
  const addField = (setter, list) => setter([...list, '']);
  const removeField = (setter, list, index) => {
    if (list.length === 1) return;
    setter(list.filter((_, i) => i !== index));
  };

  const save = async () => {
    if (!name.trim()) {
      Alert.alert('Falta el nombre', 'Por favor escribe el nombre de la receta.');
      return;
    }
    const cleanIngredients = ingredients.map((i) => i.trim()).filter(Boolean);
    const cleanInstructions = instructions.map((i) => i.trim()).filter(Boolean);
    if (cleanIngredients.length === 0 || cleanInstructions.length === 0) {
      Alert.alert('Faltan datos', 'Añade al menos un ingrediente y una instrucción.');
      return;
    }

    const recipe = {
      id: editing ? editing.id : `custom_${Date.now()}`,
      name: name.trim(),
      image,
      category,
      prepTime: prepTime.trim() || '30 min',
      servings: Number(servings) || 1,
      calories: Number(calories) || 0,
      difficulty,
      ingredients: cleanIngredients,
      instructions: cleanInstructions,
      isCustom: true,
    };

    if (editing) {
      await updateCustomRecipe(recipe);
    } else {
      await addCustomRecipe(recipe);
    }
    navigation.navigate('MyRecipes');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.imageBox}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Ionicons name="image-outline" size={40} color={COLORS.subtext} />
            <Text style={styles.imageHint}>Sin imagen</Text>
          </View>
        )}
        <View style={styles.imageBtns}>
          <TouchableOpacity style={styles.imgBtn} onPress={pickImage}>
            <Ionicons name="images-outline" size={16} color="#fff" />
            <Text style={styles.imgBtnText}>Galería</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.imgBtn} onPress={takePhoto}>
            <Ionicons name="camera-outline" size={16} color="#fff" />
            <Text style={styles.imgBtnText}>Cámara</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Field label="Nombre de la receta">
        <TextInput
          style={styles.input}
          placeholder="Ej. Tacos al pastor"
          value={name}
          onChangeText={setName}
        />
      </Field>

      <Field label="Categoría">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
          {CATEGORIES.map((c) => (
            <TouchableOpacity
              key={c.id}
              style={[styles.catChip, category === c.id && styles.catChipActive]}
              onPress={() => setCategory(c.id)}
            >
              <Ionicons name={c.icon} size={15} color={category === c.id ? '#fff' : COLORS.text} />
              <Text style={[styles.catLabel, category === c.id && styles.catLabelActive]}>{c.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Field>

      <View style={styles.row3}>
        <Field label="Preparación" small>
          <TextInput style={styles.input} value={prepTime} onChangeText={setPrepTime} placeholder="30 min" />
        </Field>
        <Field label="Raciones" small>
          <TextInput style={styles.input} value={servings} onChangeText={setServings} keyboardType="numeric" />
        </Field>
        <Field label="Calorías" small>
          <TextInput style={styles.input} value={calories} onChangeText={setCalories} keyboardType="numeric" />
        </Field>
      </View>

      <Field label="Nivel de dificultad">
        <View style={styles.diffRow}>
          {DIFFICULTIES.map((d) => (
            <TouchableOpacity
              key={d}
              style={[styles.diffBtn, difficulty === d && styles.diffBtnActive]}
              onPress={() => setDifficulty(d)}
            >
              <Text style={[styles.diffText, difficulty === d && styles.diffTextActive]}>{d}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Field>

      <Field label="Lista de ingredientes">
        {ingredients.map((ing, i) => (
          <View key={i} style={styles.listRow}>
            <TextInput
              style={[styles.input, styles.flex]}
              placeholder={`Ingrediente ${i + 1}`}
              value={ing}
              onChangeText={(v) => updateList(setIngredients, ingredients, i, v)}
            />
            <TouchableOpacity style={styles.removeBtn} onPress={() => removeField(setIngredients, ingredients, i)}>
              <Ionicons name="close-circle" size={22} color={COLORS.subtext} />
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity style={styles.addFieldBtn} onPress={() => addField(setIngredients, ingredients)}>
          <Ionicons name="add" size={16} color={COLORS.primary} />
          <Text style={styles.addFieldText}>Añadir ingrediente</Text>
        </TouchableOpacity>
      </Field>

      <Field label="Instrucciones paso a paso">
        {instructions.map((step, i) => (
          <View key={i} style={styles.listRow}>
            <View style={styles.stepNum}><Text style={styles.stepNumText}>{i + 1}</Text></View>
            <TextInput
              style={[styles.input, styles.flex]}
              placeholder={`Paso ${i + 1}`}
              value={step}
              multiline
              onChangeText={(v) => updateList(setInstructions, instructions, i, v)}
            />
            <TouchableOpacity style={styles.removeBtn} onPress={() => removeField(setInstructions, instructions, i)}>
              <Ionicons name="close-circle" size={22} color={COLORS.subtext} />
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity style={styles.addFieldBtn} onPress={() => addField(setInstructions, instructions)}>
          <Ionicons name="add" size={16} color={COLORS.primary} />
          <Text style={styles.addFieldText}>Añadir paso</Text>
        </TouchableOpacity>
      </Field>

      <TouchableOpacity style={styles.saveBtn} onPress={save}>
        <Ionicons name="save-outline" size={20} color="#fff" />
        <Text style={styles.saveBtnText}>Guardar receta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const Field = ({ label, children, small }) => (
  <View style={[styles.field, small && { flex: 1 }]}>
    <Text style={styles.label}>{label}</Text>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 20, paddingBottom: 40 },
  imageBox: { marginBottom: 18 },
  image: { width: '100%', height: 200, borderRadius: 16, backgroundColor: COLORS.accent },
  imagePlaceholder: {
    width: '100%', height: 200, borderRadius: 16, backgroundColor: COLORS.card,
    alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: COLORS.border,
  },
  imageHint: { color: COLORS.subtext, marginTop: 6 },
  imageBtns: { flexDirection: 'row', gap: 10, marginTop: 10 },
  imgBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: COLORS.primary,
    paddingVertical: 10, paddingHorizontal: 16, borderRadius: 12, flex: 1, justifyContent: 'center',
  },
  imgBtnText: { color: '#fff', fontWeight: '700' },
  field: { marginBottom: 18 },
  label: { fontSize: 15, fontWeight: '700', color: COLORS.text, marginBottom: 8 },
  input: {
    backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.border,
    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 16, color: COLORS.text,
  },
  flex: { flex: 1 },
  row3: { flexDirection: 'row', gap: 10, marginBottom: 18 },
  catScroll: { flexDirection: 'row' },
  catChip: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.card,
    borderWidth: 1, borderColor: COLORS.border, borderRadius: 20,
    paddingVertical: 8, paddingHorizontal: 12, marginRight: 8, gap: 4,
  },
  catChipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  catLabel: { fontSize: 13, fontWeight: '600', color: COLORS.text },
  catLabelActive: { color: '#fff' },
  diffRow: { flexDirection: 'row', gap: 10 },
  diffBtn: {
    flex: 1, backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.border,
    borderRadius: 12, paddingVertical: 12, alignItems: 'center',
  },
  diffBtnActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  diffText: { fontWeight: '700', color: COLORS.text },
  diffTextActive: { color: '#fff' },
  listRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  removeBtn: { padding: 2 },
  stepNum: {
    width: 26, height: 26, borderRadius: 13, backgroundColor: COLORS.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  stepNumText: { color: '#fff', fontWeight: '800', fontSize: 13 },
  addFieldBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  addFieldText: { color: COLORS.primary, fontWeight: '700' },
  saveBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: COLORS.primary, borderRadius: 14, paddingVertical: 16, marginTop: 10,
  },
  saveBtnText: { color: '#fff', fontWeight: '800', fontSize: 17 },
});

export default AddRecipeScreen;
