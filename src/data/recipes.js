// icon = nombre de icono de Ionicons (@expo/vector-icons), sin emojis
export const CATEGORIES = [
  { id: 'desayuno', name: 'Desayuno', icon: 'cafe', color: '#FFB4A2' },
  { id: 'almuerzo', name: 'Almuerzo', icon: 'fast-food', color: '#FFD6A5' },
  { id: 'cena', name: 'Cena', icon: 'restaurant', color: '#CAFFBF' },
  { id: 'postres', name: 'Postres', icon: 'ice-cream', color: '#FFC6FF' },
  { id: 'vegano', name: 'Vegano', icon: 'leaf', color: '#9BF6FF' },
  { id: 'vegetariano', name: 'Vegetariano', icon: 'nutrition', color: '#BDB2FF' },
  { id: 'ensaladas', name: 'Ensaladas', icon: 'flower', color: '#A0C4FF' },
  { id: 'sopas', name: 'Sopas', icon: 'water', color: '#FDFFB6' },
  { id: 'pasta', name: 'Pasta', icon: 'restaurant-outline', color: '#FFADAD' },
  { id: 'mariscos', name: 'Mariscos', icon: 'fish', color: '#A0C4FF' },
  { id: 'parrilla', name: 'Parrilla', icon: 'flame', color: '#FFD6A5' },
  { id: 'snacks', name: 'Snacks', icon: 'fast-food-outline', color: '#FDFFB6' },
];

const img = (seed) => `https://picsum.photos/seed/foodie${seed}/600/400`;

export const SAMPLE_RECIPES = [
  {
    id: 'r1', category: 'desayuno', name: 'Tostadas Francesas',
    image: img(1), prepTime: '15 min', servings: 2, calories: 320, difficulty: 'Fácil',
    ingredients: ['2 huevos', '4 rebanadas de pan', '1/2 taza de leche', '1 cda de canela', 'Mantequilla'],
    instructions: ['Bate los huevos con la leche y canela.', 'Remoja el pan en la mezcla.', 'Dora en mantequilla por ambos lados.', 'Sirve con miel.'],
  },
  {
    id: 'r2', category: 'desayuno', name: 'Avena con Frutas',
    image: img(2), prepTime: '10 min', servings: 1, calories: 250, difficulty: 'Fácil',
    ingredients: ['1/2 taza avena', '1 taza leche', 'Fresas', 'Plátano', 'Miel'],
    instructions: ['Cocina la avena con la leche.', 'Añade frutas picadas.', 'Endulza con miel.'],
  },
  {
    id: 'r3', category: 'almuerzo', name: 'Pollo a la Plancha',
    image: img(3), prepTime: '25 min', servings: 3, calories: 410, difficulty: 'Media',
    ingredients: ['2 pechugas de pollo', 'Limón', 'Ajo', 'Aceite de oliva', 'Sal y pimienta'],
    instructions: ['Marina el pollo con limón y ajo.', 'Calienta la plancha con aceite.', 'Cocina 6 min por lado.', 'Reposa y sirve.'],
  },
  {
    id: 'r4', category: 'almuerzo', name: 'Wrap de Vegetales',
    image: img(4), prepTime: '12 min', servings: 2, calories: 290, difficulty: 'Fácil',
    ingredients: ['Tortillas', 'Lechuga', 'Tomate', 'Queso', 'Pavo'],
    instructions: ['Extiende la tortilla.', 'Añade los ingredientes.', 'Enrolla y corta por la mitad.'],
  },
  {
    id: 'r5', category: 'cena', name: 'Salmón al Horno',
    image: img(5), prepTime: '30 min', servings: 2, calories: 480, difficulty: 'Media',
    ingredients: ['2 filetes de salmón', 'Eneldo', 'Limón', 'Aceite de oliva', 'Sal'],
    instructions: ['Precalienta el horno a 200°C.', 'Sazona el salmón.', 'Hornea 18 minutos.', 'Sirve con limón.'],
  },
  {
    id: 'r6', category: 'cena', name: 'Curry de Garbanzos',
    image: img(6), prepTime: '35 min', servings: 4, calories: 360, difficulty: 'Media',
    ingredients: ['1 lata garbanzos', 'Leche de coco', 'Curry', 'Cebolla', 'Tomate'],
    instructions: ['Sofríe la cebolla.', 'Añade curry y tomate.', 'Incorpora garbanzos y coco.', 'Cocina 20 min.'],
  },
  {
    id: 'r7', category: 'postres', name: 'Brownie de Chocolate',
    image: img(7), prepTime: '40 min', servings: 8, calories: 350, difficulty: 'Media',
    ingredients: ['200g chocolate', '3 huevos', '150g mantequilla', '1 taza azúcar', '1 taza harina'],
    instructions: ['Derrite chocolate y mantequilla.', 'Bate huevos con azúcar.', 'Une todo y añade harina.', 'Hornea 25 min a 180°C.'],
  },
  {
    id: 'r8', category: 'postres', name: 'Helado Casero',
    image: img(8), prepTime: '20 min', servings: 4, calories: 200, difficulty: 'Fácil',
    ingredients: ['2 tazas crema', '1 lata leche condensada', 'Vainilla'],
    instructions: ['Bate la crema.', 'Añade leche condensada y vainilla.', 'Congela 4 horas.'],
  },
  {
    id: 'r9', category: 'vegano', name: 'Bowl de Quinoa',
    image: img(9), prepTime: '25 min', servings: 2, calories: 330, difficulty: 'Fácil',
    ingredients: ['1 taza quinoa', 'Pimientos', 'Garbanzos', 'Aguacate', 'Limón'],
    instructions: ['Cocina la quinoa.', 'Asa los vegetales.', 'Arma el bowl y adereza.'],
  },
  {
    id: 'r10', category: 'vegano', name: 'Tofu Salteado',
    image: img(10), prepTime: '20 min', servings: 2, calories: 280, difficulty: 'Media',
    ingredients: ['Tofu', 'Salsa de soja', 'Brócoli', 'Zanahoria', 'Ajo'],
    instructions: ['Dora el tofu.', 'Saltea vegetales.', 'Añade soja y sirve.'],
  },
  {
    id: 'r11', category: 'vegetariano', name: 'Hamburguesa de Lentejas',
    image: img(11), prepTime: '35 min', servings: 4, calories: 310, difficulty: 'Media',
    ingredients: ['1 taza lentejas', 'Pan molido', 'Huevo', 'Cebolla', 'Especias'],
    instructions: ['Cocina las lentejas.', 'Mezcla con el resto.', 'Forma tortas.', 'Dora en sartén.'],
  },
  {
    id: 'r12', category: 'vegetariano', name: 'Pizza Margarita',
    image: img(12), prepTime: '45 min', servings: 4, calories: 400, difficulty: 'Difícil',
    ingredients: ['Masa', 'Salsa de tomate', 'Mozzarella', 'Albahaca', 'Aceite'],
    instructions: ['Extiende la masa.', 'Añade salsa y queso.', 'Hornea 15 min.', 'Decora con albahaca.'],
  },
  {
    id: 'r13', category: 'ensaladas', name: 'Ensalada César',
    image: img(13), prepTime: '15 min', servings: 2, calories: 220, difficulty: 'Fácil',
    ingredients: ['Lechuga romana', 'Pechuga', 'Croutons', 'Parmesano', 'Aderezo César'],
    instructions: ['Corta la lechuga.', 'Añade pollo y croutons.', 'Rocía aderezo y queso.'],
  },
  {
    id: 'r14', category: 'ensaladas', name: 'Ensalada de Pasta',
    image: img(14), prepTime: '20 min', servings: 4, calories: 300, difficulty: 'Fácil',
    ingredients: ['Pasta', 'Tomate cherry', 'Maíz', 'Atún', 'Mayonesa'],
    instructions: ['Cocina la pasta.', 'Mezcla con vegetales.', 'Añade atún y mayonesa.'],
  },
  {
    id: 'r15', category: 'sopas', name: 'Sopa de Pollo',
    image: img(15), prepTime: '40 min', servings: 4, calories: 240, difficulty: 'Media',
    ingredients: ['Pollo', 'Zanahoria', 'Apio', 'Fideos', 'Caldo'],
    instructions: ['Cocina el pollo en caldo.', 'Añade vegetales.', 'Incorpora fideos.', 'Cocina 10 min más.'],
  },
  {
    id: 'r16', category: 'sopas', name: 'Crema de Calabaza',
    image: img(16), prepTime: '30 min', servings: 3, calories: 190, difficulty: 'Fácil',
    ingredients: ['Calabaza', 'Cebolla', 'Crema', 'Caldo', 'Nuez moscada'],
    instructions: ['Asa la calabaza.', 'Licúa con cebolla y caldo.', 'Añade crema y especias.'],
  },
  {
    id: 'r17', category: 'pasta', name: 'Espagueti Boloñesa',
    image: img(17), prepTime: '35 min', servings: 4, calories: 520, difficulty: 'Media',
    ingredients: ['Espagueti', 'Carne molida', 'Tomate', 'Cebolla', 'Ajo'],
    instructions: ['Cocina la pasta.', 'Sofríe cebolla y carne.', 'Añade tomate y cocina.', 'Mezcla y sirve.'],
  },
  {
    id: 'r18', category: 'pasta', name: 'Pesto con Tallarines',
    image: img(18), prepTime: '20 min', servings: 3, calories: 460, difficulty: 'Fácil',
    ingredients: ['Tallarines', 'Albahaca', 'Piñones', 'Ajo', 'Parmesano'],
    instructions: ['Licúa albahaca, ajo y piñones.', 'Cocina la pasta.', 'Mezcla con el pesto.'],
  },
  {
    id: 'r19', category: 'mariscos', name: 'Gambas al Ajillo',
    image: img(19), prepTime: '15 min', servings: 2, calories: 260, difficulty: 'Fácil',
    ingredients: ['Gambas', 'Ajo', 'Aceite de oliva', 'Guindilla', 'Perejil'],
    instructions: ['Calienta aceite con ajo.', 'Añade gambas y guindilla.', 'Cocina 5 min.', 'Espolvorea perejil.'],
  },
  {
    id: 'r20', category: 'mariscos', name: 'Paella de Mariscos',
    image: img(20), prepTime: '50 min', servings: 6, calories: 540, difficulty: 'Difícil',
    ingredients: ['Arroz', 'Mejillones', 'Gambas', 'Calamares', 'Azafrán'],
    instructions: ['Sofríe mariscos.', 'Añade arroz y caldo.', 'Cocina con azafrán.', 'Deja reposar.'],
  },
  {
    id: 'r21', category: 'parrilla', name: 'Costillas BBQ',
    image: img(21), prepTime: '90 min', servings: 4, calories: 600, difficulty: 'Difícil',
    ingredients: ['Costillas', 'Salsa BBQ', 'Miel', 'Ajo en polvo', 'Sal'],
    instructions: ['Marina las costillas.', 'Asa a baja temperatura.', 'Barniza con BBQ.', 'Dora al final.'],
  },
  {
    id: 'r22', category: 'parrilla', name: 'Hamburguesa Clásica',
    image: img(22), prepTime: '25 min', servings: 2, calories: 550, difficulty: 'Media',
    ingredients: ['Carne molida', 'Pan', 'Queso', 'Lechuga', 'Tomate'],
    instructions: ['Forma las hamburguesas.', 'Asa la carne.', 'Arma con pan y vegetales.'],
  },
  {
    id: 'r23', category: 'snacks', name: 'Guacamole',
    image: img(23), prepTime: '10 min', servings: 4, calories: 150, difficulty: 'Fácil',
    ingredients: ['Aguacate', 'Limón', 'Cebolla', 'Tomate', 'Cilantro'],
    instructions: ['Macha el aguacate.', 'Añade el resto picado.', 'Mezcla y sirve.'],
  },
  {
    id: 'r24', category: 'snacks', name: 'Palomitas Especiadas',
    image: img(24), prepTime: '8 min', servings: 3, calories: 120, difficulty: 'Fácil',
    ingredients: ['Maíz pira', 'Aceite', 'Pimentón', 'Sal'],
    instructions: ['Calienta el maíz.', 'Saltea hasta reventar.', 'Sazona con pimentón.'],
  },
];

export const getCategoryById = (id) => CATEGORIES.find((c) => c.id === id);
