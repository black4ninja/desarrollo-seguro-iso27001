# 🚀 Inicio Rápido

## Para tu Compañero - Primeros Pasos

Si tienes problemas con `npm install`, sigue estos pasos:

### Opción 1: Instalación Normal (Recomendada)

```bash
# 1. Asegúrate de tener Node.js >= 18
node --version

# 2. Limpia el caché de npm (si tienes problemas)
npm cache clean --force

# 3. Instala dependencias
npm install

# 4. Inicia el servidor
npm start
```

### Opción 2: Si Opción 1 falla

```bash
# Usa yarn en lugar de npm
npm install -g yarn
yarn install
yarn start
```

### Opción 3: Si tienes problemas de permisos (macOS/Linux)

```bash
# Corrige permisos de npm
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules

# Intenta de nuevo
npm install
```

### Opción 4: Instalación desde cero

```bash
# Borra node_modules y lockfiles
rm -rf node_modules package-lock.json

# Reinstala con npm
npm install

# O con yarn
yarn install
```

## ✅ Verificación

Cuando la instalación sea exitosa, verás:

```
✔ Dependencies installed successfully
```

Luego:

```bash
npm start
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
npm start -- --port 3001
```

### Error: "Cannot find module"
```bash
# Reinstala dependencias
rm -rf node_modules
npm install
```

## 📞 Contacto

Si ninguna opción funciona, contacta al otro facilitador con:
- Captura del error completo
- Versión de Node.js (`node --version`)
- Sistema operativo

---

**Tip:** Una vez que funcione `npm start`, cualquier cambio en los archivos `.md` se reflejará automáticamente en el navegador. ¡No necesitas reiniciar el servidor!
