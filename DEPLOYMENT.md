# 🚀 Deployment Configuration

Este documento explica la configuración de deployment automático y git hooks para el proyecto.

## 📋 Contenido

- [Git Hooks con Husky](#git-hooks-con-husky)
- [GitHub Actions para Deployment](#github-actions-para-deployment)
- [Configuración de GitHub Pages](#configuración-de-github-pages)
- [Cómo Funciona el Workflow](#cómo-funciona-el-workflow)

---

## 🎣 Git Hooks con Husky

### ¿Qué es Husky?

Husky es una herramienta que permite configurar git hooks fácilmente. En este proyecto, usamos un **pre-push hook** que valida que el sitio construya correctamente antes de permitir un push.

### Pre-push Hook

**Archivo:** `.husky/pre-push`

Este hook se ejecuta automáticamente cada vez que intentas hacer `git push`. Realiza las siguientes acciones:

1. Ejecuta `yarn build` para construir el sitio de Docusaurus
2. Si el build falla, **bloquea el push** y muestra un error
3. Si el build es exitoso, permite continuar con el push

**Ventajas:**
- ✅ Previene que se suba código que rompe el build
- ✅ Detecta errores antes de que lleguen al repositorio remoto
- ✅ Mantiene la calidad del código en el repositorio

### Instalación de Husky

La instalación ya está configurada. Cuando alguien clona el repositorio y ejecuta:

```bash
yarn install
```

El script `prepare` en `package.json` automáticamente configura los hooks:

```json
{
  "scripts": {
    "prepare": "husky"
  }
}
```

### Desactivar el Pre-push Hook Temporalmente

Si necesitas hacer un push sin validar el build (NO recomendado), puedes:

```bash
# Opción 1: Usar --no-verify
git push --no-verify

# Opción 2: Desactivar Husky temporalmente
HUSKY=0 git push
```

⚠️ **Advertencia:** Solo usa esto en casos de emergencia. El hook existe para proteger la calidad del código.

---

## ⚙️ GitHub Actions para Deployment

### Workflow Automático

**Archivo:** `.github/workflows/deploy.yml`

Este workflow de GitHub Actions se ejecuta automáticamente en los siguientes casos:

1. **Push a la rama `main`**: Cada vez que se hace push a main
2. **Manual**: Desde la pestaña "Actions" en GitHub

### Pasos del Workflow

El workflow tiene dos jobs:

#### Job 1: Build

1. **Checkout**: Descarga el código del repositorio
2. **Setup Node.js**: Instala Node.js 18 con cache de Yarn
3. **Install dependencies**: Ejecuta `yarn install --frozen-lockfile`
4. **Build Docusaurus**: Ejecuta `yarn build`
5. **Setup Pages**: Configura GitHub Pages
6. **Upload artifact**: Sube el directorio `build/` como artifact

#### Job 2: Deploy

1. **Deploy to GitHub Pages**: Despliega el artifact a GitHub Pages
2. Solo se ejecuta si el push fue a la rama `main`
3. Proporciona la URL del sitio desplegado

### Permisos Necesarios

El workflow requiere los siguientes permisos:

```yaml
permissions:
  contents: read      # Para leer el código
  pages: write        # Para escribir en GitHub Pages
  id-token: write     # Para autenticación
```

### Ejecución Manual

Para ejecutar el workflow manualmente:

1. Ve a la pestaña **Actions** en GitHub
2. Selecciona **Deploy Docusaurus to GitHub Pages**
3. Haz clic en **Run workflow**
4. Selecciona la rama `main` y confirma

---

## 🌐 Configuración de GitHub Pages

### Configuración en GitHub

Para habilitar GitHub Pages en tu repositorio:

1. **Ve a Settings** → **Pages**
2. **Source**: Selecciona "GitHub Actions"
3. No necesitas configurar una rama específica (el workflow lo maneja)

### Configuración en Docusaurus

**Archivo:** `docusaurus.config.ts`

```typescript
const config: Config = {
  url: 'https://black4ninja.github.io',
  baseUrl: '/desarrollo-seguro-iso27001/',

  organizationName: 'black4ninja',
  projectName: 'desarrollo-seguro-iso27001',

  deploymentBranch: 'gh-pages',
  trailingSlash: false,
};
```

**Explicación:**

- `url`: Tu dominio de GitHub Pages (usuario.github.io)
- `baseUrl`: Ruta del proyecto (nombre del repositorio con `/`)
- `organizationName`: Tu usuario o organización de GitHub
- `projectName`: Nombre del repositorio
- `deploymentBranch`: Rama donde se despliega (automática)
- `trailingSlash`: No agregar `/` al final de las URLs

### URL del Sitio Desplegado

Una vez desplegado, tu sitio estará disponible en:

```
https://black4ninja.github.io/desarrollo-seguro-iso27001/
```

---

## 🔄 Cómo Funciona el Workflow Completo

### Flujo de Desarrollo

```
1. Desarrollador trabaja localmente
   │
   ├─→ Edita archivos .md en docs/
   ├─→ Prueba con: yarn start
   ├─→ Commit: git commit -m "mensaje"
   │
2. Desarrollador intenta push
   │
   ├─→ Pre-push hook se ejecuta
   ├─→ Ejecuta: yarn build
   ├─→ Si falla → Push bloqueado ❌
   └─→ Si pasa → Push permitido ✅
   │
3. Push llega a GitHub (rama main)
   │
   ├─→ GitHub Actions se dispara automáticamente
   ├─→ Instala dependencias
   ├─→ Construye el sitio
   ├─→ Despliega a GitHub Pages
   └─→ Sitio actualizado en minutos 🎉
```

### Tiempo Estimado

- **Pre-push hook**: ~10-15 segundos (build local)
- **GitHub Actions**: ~2-3 minutos (build + deploy)
- **Total**: Tu sitio se actualiza en ~3-4 minutos después del push

---

## 🐛 Troubleshooting

### Pre-push Hook No Se Ejecuta

**Problema:** El hook no se ejecuta al hacer push.

**Solución:**

```bash
# Reinstalar Husky
yarn install

# Verificar que el hook existe
ls -la .husky/pre-push

# Si no existe, reinicializar
npx husky init
```

### GitHub Actions Falla

**Problema:** El workflow falla en GitHub.

**Solución:**

1. **Revisa los logs** en la pestaña Actions
2. **Verifica que el build funcione localmente**:
   ```bash
   yarn build
   ```
3. **Común:** Broken links → Cambia `onBrokenLinks: 'throw'` a `'warn'` en `docusaurus.config.ts`

### GitHub Pages No Se Actualiza

**Problema:** El sitio no muestra los cambios.

**Solución:**

1. **Verifica que GitHub Pages esté habilitado** en Settings → Pages
2. **Espera 2-3 minutos** para que se complete el despliegue
3. **Limpia caché del navegador**: Ctrl+Shift+R (o Cmd+Shift+R en Mac)
4. **Revisa el status** en Actions → Ver el workflow

### Permisos Insuficientes

**Problema:** Error de permisos en GitHub Actions.

**Solución:**

1. Ve a **Settings** → **Actions** → **General**
2. En "Workflow permissions" selecciona:
   - ✅ **Read and write permissions**
3. Guarda los cambios

---

## 📝 Comandos Útiles

### Desarrollo Local

```bash
# Iniciar servidor de desarrollo
yarn start

# Construir para producción (lo que hace el pre-push hook)
yarn build

# Servir el build localmente
yarn serve

# Limpiar cache
yarn clear
```

### Git Hooks

```bash
# Forzar push sin hook (emergencia)
git push --no-verify

# Ver hooks configurados
ls -la .husky/

# Hacer hook ejecutable
chmod +x .husky/pre-push
```

### GitHub Actions

```bash
# Ver workflows disponibles
gh workflow list

# Ver runs del workflow
gh run list --workflow=deploy.yml

# Ver logs del último run
gh run view --log
```

---

## 🎯 Mejores Prácticas

### Para Desarrolladores

1. ✅ **Siempre prueba localmente** con `yarn build` antes de hacer push
2. ✅ **No uses `--no-verify`** a menos que sea absolutamente necesario
3. ✅ **Revisa los logs** de GitHub Actions si el deployment falla
4. ✅ **Usa commits descriptivos** para facilitar el debugging

### Para Facilitadores

1. ✅ **Revisa el sitio desplegado** después de cada push importante
2. ✅ **Mantén limpio el historial** de commits
3. ✅ **Documenta cambios grandes** en los commits
4. ✅ **Monitorea los workflows** en caso de fallos

---

## 🔗 Links Útiles

- **Documentación de Husky**: https://typicode.github.io/husky/
- **GitHub Actions Docs**: https://docs.github.com/en/actions
- **Docusaurus Deployment**: https://docusaurus.io/docs/deployment
- **GitHub Pages**: https://docs.github.com/en/pages

---

## 📞 Soporte

Si tienes problemas con el deployment:

1. **Revisa este documento** primero
2. **Consulta los logs** de GitHub Actions
3. **Verifica que tu build local funcione**: `yarn build`
4. **Contacta al otro facilitador** con capturas de pantalla del error

---

**Última actualización:** Diciembre 17, 2025
**Mantenedores:** Facilitadores del curso
