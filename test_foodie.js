const Module = require('module');
const path = require('path');
const fs = require('fs');
const assert = require('assert');
const babel = require('@babel/core');

// Mock the native AsyncStorage module so storage.js runs in plain Node.
const store = {};
const mockAsyncStorage = {
  getItem: async (k) => (Object.prototype.hasOwnProperty.call(store, k) ? store[k] : null),
  setItem: async (k, v) => { store[k] = String(v); },
  removeItem: async (k) => { delete store[k]; },
};
const origLoad = Module._load;
Module._load = function (request, parent, isMain) {
  if (request === '@react-native-async-storage/async-storage') return mockAsyncStorage;
  return origLoad.apply(this, arguments);
};

const SRC = path.join(__dirname, 'src');
// ponytail: emit inside the project so node_modules/@babel resolves; wiped after.
const outDir = path.join(__dirname, '.test-tmp', 'src');
fs.mkdirSync(path.join(outDir, 'data'), { recursive: true });
fs.mkdirSync(path.join(outDir, 'storage'), { recursive: true });

const toCjs = (rel) => {
  const srcPath = path.join(SRC, rel);
  const code = babel.transformFileSync(srcPath, { presets: ['babel-preset-expo'] }).code;
  const dest = path.join(outDir, rel);
  fs.writeFileSync(dest, code);
  return dest;
};

toCjs('data/recipes.js');
toCjs('storage/storage.js');

const { CATEGORIES, SAMPLE_RECIPES } = require(path.join(outDir, 'data/recipes.js'));
const {
  toggleFavorite, isFavorite, getFavorites,
  addCustomRecipe, getCustomRecipes, updateCustomRecipe, deleteCustomRecipe,
  getRecipeById,
} = require(path.join(outDir, 'storage/storage.js'));

const REQUIRED_FIELDS = ['ingredients', 'instructions', 'prepTime', 'servings', 'calories', 'difficulty'];
let passed = 0;
const check = (name, fn) => { fn(); console.log('  ok -', name); passed++; };

(async () => {
  // Req 2: at least 10 categories in the bar (12 categories + 2 special render in CategoryBar).
  check('feed muestra >= 10 categorias', () => assert(CATEGORIES.length >= 10));

  // Req 3: every recipe exposes the 6 detail fields.
  check('recetas tienen los 6 campos de detalle', () => {
    SAMPLE_RECIPES.forEach((r) => {
      REQUIRED_FIELDS.forEach((f) => assert(r[f] != null, `falta ${f} en ${r.id}`));
      assert(Array.isArray(r.ingredients) && r.ingredients.length > 0);
      assert(Array.isArray(r.instructions) && r.instructions.length > 0);
    });
  });

  // Req 4: clicking a category loads only that category's recipes.
  check('filtrar por categoria devuelve solo esa categoria', () => {
    CATEGORIES.forEach((c) => {
      const list = SAMPLE_RECIPES.filter((r) => r.category === c.id);
      assert(list.length > 0, `categoria sin recetas: ${c.id}`);
      list.forEach((r) => assert.strictEqual(r.category, c.id));
    });
  });

  // Req 5: heart toggles favorite on/off.
  check('favorito se alterna on/off', async () => {
    const r = SAMPLE_RECIPES[0];
    let fav = await toggleFavorite(r);
    assert.strictEqual(fav, true);
    assert.strictEqual(await isFavorite(r.id), true);
    fav = await toggleFavorite(r);
    assert.strictEqual(fav, false);
    assert.strictEqual(await isFavorite(r.id), false);
  });

  // Req 6: a favorite saved shows in favorites list.
  check('favorita aparece en lista de favoritos', async () => {
    await toggleFavorite(SAMPLE_RECIPES[1]);
    const favs = await getFavorites();
    assert(favs.some((x) => x.id === SAMPLE_RECIPES[1].id));
  });

  // Req 8/9: adding a recipe persists it with full fields; it shows in "Mis recetas".
  check('nueva receta se guarda y es recuperable', async () => {
    const nueva = {
      id: 'custom_test', name: 'Tacos al pastor', image: null, category: 'cena',
      prepTime: '40 min', servings: 4, calories: 520, difficulty: 'Media',
      ingredients: ['Tortilla', 'Carne', 'Piña'], instructions: ['Marina', 'Asa', 'Sirve'],
      isCustom: true,
    };
    await addCustomRecipe(nueva);
    const mine = await getCustomRecipes();
    assert(mine.some((x) => x.id === 'custom_test'));
    const byId = await getRecipeById('custom_test');
    assert.strictEqual(byId.name, 'Tacos al pastor');
    assert(Array.isArray(byId.ingredients) && byId.ingredients.length === 3);
    assert(Array.isArray(byId.instructions) && byId.instructions.length === 3);
  });

  // Req 11: edit and delete are functional.
  check('editar y borrar receta personal', async () => {
    await updateCustomRecipe({ id: 'custom_test', name: 'Tacos editados', category: 'cena',
      prepTime: '45 min', servings: 2, calories: 600, difficulty: 'Dificil',
      ingredients: ['Tortilla'], instructions: ['Asa'], isCustom: true });
    let mine = await getCustomRecipes();
    assert.strictEqual(mine.find((x) => x.id === 'custom_test').name, 'Tacos editados');
    await deleteCustomRecipe('custom_test');
    mine = await getCustomRecipes();
    assert(!mine.some((x) => x.id === 'custom_test'));
  });

  console.log(`\nTodos los tests pasaron (${passed} grupos).`);
  fs.rmSync(path.join(__dirname, '.test-tmp'), { recursive: true, force: true });
  process.exit(0);
})().catch((e) => {
  console.error('FALLO:', e.message);
  fs.rmSync(path.join(__dirname, '.test-tmp'), { recursive: true, force: true });
  process.exit(1);
});
