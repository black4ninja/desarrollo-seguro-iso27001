# 🚀 Inicio Rápido

## Para tu Compañero - Primeros Pasos

Guía rápida para instalar y ejecutar el proyecto con **Yarn** (recomendado).

### Opción 1: Instalación con Yarn (Recomendada)

```bash
# 1. Asegúrate de tener Node.js >= 18
node --version

# 2. Instala Yarn si no lo tienes
corepack enable
# O: npm install -g yarn

# 3. Instala dependencias
yarn install

# 4. Inicia el servidor
yarn start
```

### Opción 2: Si tienes problemas con Yarn

```bash
# Limpia el caché de Yarn
yarn cache clean

# Reinstala
yarn install

# Inicia
yarn start
```

### Opción 3: Usar npm como alternativa

```bash
# Si Yarn no funciona, usa npm
npm install
npm start
```

### Opción 4: Instalación desde cero

```bash
# Borra node_modules y lockfiles
rm -rf node_modules yarn.lock

# Reinstala con Yarn
yarn install

# O con npm si es necesario
npm install
```

## ✅ Verificación

Cuando la instalación sea exitosa, verás:

```
✔ Dependencies installed successfully
```

Luego:

```bash
yarn start
```

Deberías ver:

```
[SUCCESS] Docusaurus website is running at: http://localhost:3000/
```

## 🆘 ¿Aún tienes problemas?

### Error: "Node version incompatible"
```bash
# Instala Node.js 18 o superior
# macOS: brew install node
# Windows: descarga de nodejs.org
# Linux: usa nvm (Node Version Manager)
```

### Error: "Port 3000 already in use"
```bash
# Usa un puerto diferente
yarn start --port 3001
```

### Error: "Cannot find module"
```bash
# Reinstala dependencias
rm -rf node_modules yarn.lock
yarn install
```

## 📞 Contacto

Si ninguna opción funciona, contacta al otro facilitador con:
- Captura del error completo
- Versión de Node.js (`node --version`)
- Sistema operativo

---

**Tip:** Una vez que funcione `yarn start`, cualquier cambio en los archivos `.md` se reflejará automáticamente en el navegador. ¡No necesitas reiniciar el servidor!
