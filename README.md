# Foodie

Aplicación móvil y web de recetas, desarrollada con **Expo (SDK 51)** y **React Native**. Permite explorar recetas por categoría, ver su detalle completo, marcar favoritas y gestionar tus propias recetas ("Mi comida").

## Características

- **Feed principal** con barra horizontal de **14 categorías** (Desayuno, Almuerzo, Cena, Postres, Vegano, Vegetariano, Ensaladas, Sopas, Pasta, Mariscos, Parrilla, Snacks, Favoritos y Mi comida).
- **Detalle de receta** con los 6 campos: ingredientes, instrucciones, tiempo de preparación, número de raciones, calorías y nivel de dificultad.
- **Favoritos**: icono de corazón que alterna entre marcar/desmarcar; las recetas favoritas se guardan en el dispositivo (AsyncStorage).
- **Mi comida**: sección para añadir, editar y borrar recetas propias, con formulario completo (nombre, imagen, categoría, tiempos, ingredientes e instrucciones paso a paso).
- **Botón de volver atrás** en la navegación.

## Tecnologías

- Expo SDK 51 (`expo` ~51.0.39)
- React Native 0.74 / React 18
- React Navigation (native-stack)
- `@react-native-async-storage/async-storage` para persistencia local
- `@expo/vector-icons` (Ionicons)
- `react-native-web` para la versión web

## Cómo ejecutar en local

```bash
npm install
npx expo start          # menú de Expo: pulsa w para web, o escanea el QR con Expo Go en Android
npx expo start --tunnel   # si el móvil no alcanza tu red LAN, usa túnel
```

## Despliegue (GitHub Pages)

La versión web se publica en GitHub Pages mediante GitHub Actions (`actions/deploy-pages`).
URL de la aplicación: **https://andybencomo95.github.io/React-Native-app-called-Foodie-using-Expo/**

Notas del despliegue:
- `app.json` define `"expo": { "experiments": { "baseUrl": "/React-Native-app-called-Foodie-using-Expo" } }` para que los archivos se sirvan desde el subpath del repositorio.
- El flujo de Actions genera `dist/` con `expo export -p web` y añade `.nojekyll` para que GitHub no ignore la carpeta `_expo`.

## Estructura

```
App.js                  Entrada y navegación principal
src/
  screens/              Feed, Detalle, Categoría, Favoritos, Mi comida, Añadir
  components/           CategoryBar, RecipeCard
  data/recipes.js      Categorías y recetas de ejemplo
  storage/storage.js    Persistencia (favoritos y recetas propias)
  theme.js             Colores y estilos globales
metro.config.js        Caché de Metro por usuario (evita conflictos de permisos)
```

---

Firmado por andy bencomo del rio
