const { getDefaultConfig } = require('@expo/metro-config');
const path = require('path');
const fs = require('fs');
const os = require('os');
const { FileStore } = require('@expo/metro-config/build/file-store');

// Varios usuarios (p. ej. root y andypc) comparten esta máquina y ambos
// corren expo. El caché por defecto de Metro usa un nombre de archivo fijo
// derivado del proyecto; si dos UID lo escriben, el segundo recibe EACCES y el
// bundle falla con HTTP 500. Un subdirectorio por UID en tmpdir aísla los
// cachés: cada usuario crea y escribe solo el suyo, sin choque de permisos.
const uid = process.getuid ? process.getuid() : 'shared';
const projectRoot = __dirname;
const cacheRoot = path.join(os.tmpdir(), `foodie-metro-${uid}`);
fs.mkdirSync(cacheRoot, { recursive: true });

const config = getDefaultConfig(projectRoot);
config.cacheStores = [new FileStore({ root: cacheRoot })];
config.fileMapCacheDirectory = cacheRoot;

module.exports = config;
