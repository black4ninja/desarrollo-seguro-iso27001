# Curso: Desarrollo Seguro e ISO 27001/27002:2022

![Docusaurus](https://img.shields.io/badge/Docusaurus-3.5.2-green.svg)
![Node](https://img.shields.io/badge/Node-%3E%3D18.0-blue.svg)
![License](https://img.shields.io/badge/license-Private-red.svg)

Sitio web de documentación para el curso de **Desarrollo Seguro e ISO 27001/27002:2022** (5 días - 40 horas).

Este proyecto está construido con [Docusaurus 3](https://docusaurus.io/), un generador moderno de sitios web estáticos optimizado para documentación técnica.

---

## 📋 Tabla de Contenidos

- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Git Hooks y Husky](#-git-hooks-y-husky)
- [Ejecución Local](#-ejecución-local)
- [Build de Producción](#-build-de-producción)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Agregar Contenido](#-agregar-contenido)
- [Personalización](#-personalización)
- [Troubleshooting](#-troubleshooting)
- [Deployment](#-deployment)
- [Colaboración](#-colaboración)

---

## 🔧 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** versión 18.0 o superior
  ```bash
  node --version  # Debe mostrar v18.x.x o superior
  ```

- **Yarn** (gestor de paquetes recomendado)
  ```bash
  yarn --version   # Debe mostrar 1.22.x o superior
  ```

### Instalación de Node.js

#### macOS
```bash
# Usando Homebrew
brew install node

# O descarga desde: https://nodejs.org/
```

#### Windows
```bash
# Descarga el instalador desde: https://nodejs.org/
# Elige la versión LTS (Long Term Support)
```

#### Linux (Ubuntu/Debian)
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Instalación de Yarn

Una vez que tengas Node.js instalado:

```bash
# Habilitar Corepack (incluido con Node.js >= 16)
corepack enable

# O instalar Yarn globalmente con npm
npm install -g yarn

# Verificar instalación
yarn --version
```

---

## 📦 Instalación

1. **Clona el repositorio** (si aún no lo has hecho):
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd desarrollo-seguro-iso27001
   ```

2. **Instala las dependencias con Yarn**:
   ```bash
   yarn install
   ```

   Esto instalará todas las dependencias necesarias listadas en `package.json`, incluyendo:
   - Docusaurus y sus plugins
   - Husky (git hooks)
   - lint-staged
   - Todas las demás dependencias del proyecto

   **¿Qué sucede durante la instalación?**
   - Se descargan ~200 MB de dependencias
   - Se ejecuta automáticamente el script `prepare` que configura Husky
   - Los git hooks quedan listos para usar

   :::tip Alternativa con npm
   Si prefieres usar npm en lugar de Yarn:
   ```bash
   npm install
   ```
   :::

---

## 🎣 Git Hooks y Husky

Este proyecto usa **Husky** para gestionar git hooks que ayudan a mantener la calidad del código.

### Pre-push Hook

**¿Qué hace?**
Cada vez que intentas hacer `git push`, se ejecuta automáticamente un hook que:

1. Ejecuta `yarn build` para validar que Docusaurus compile correctamente
2. Si el build falla → **Bloquea el push** y muestra el error
3. Si el build es exitoso → Permite continuar con el push

**Ventajas:**
- ✅ Previene que se suba código que rompe el build
- ✅ Detecta errores de configuración antes de que lleguen al repositorio
- ✅ Valida links rotos y problemas de compilación MDX
- ✅ Mantiene el sitio siempre en estado funcional

### Configuración Automática

Los git hooks se configuran automáticamente cuando ejecutas `yarn install`. No necesitas hacer nada adicional.

**Archivos involucrados:**
- `.husky/pre-push` - Script del hook de pre-push
- `package.json` - Contiene el script `prepare: "husky"` que se ejecuta automáticamente

### Bypass del Hook (Solo Emergencias)

Si necesitas hacer un push sin validar el build (NO recomendado):

```bash
# Opción 1: Skip hooks (no recomendado)
git push --no-verify

# Opción 2: Desactivar Husky temporalmente
HUSKY=0 git push
```

⚠️ **Advertencia:** Solo usa esto en casos de emergencia. El hook existe para proteger la calidad del proyecto.

### Más Información

Para detalles completos sobre deployment, git hooks y GitHub Actions, consulta:

📖 **[DEPLOYMENT.md](DEPLOYMENT.md)** - Guía completa de deployment y configuración

---

## 🚀 Ejecución Local

### Iniciar el servidor de desarrollo

```bash
yarn start
```

Este comando:
- Inicia un servidor de desarrollo local
- Abre automáticamente [http://localhost:3000](http://localhost:3000) en tu navegador
- Habilita **hot reload**: los cambios que hagas en los archivos se reflejarán automáticamente sin recargar la página

**💡 Tip:** Deja esta terminal abierta mientras trabajas en el contenido.

### Detener el servidor

Presiona `Ctrl + C` en la terminal donde está corriendo el servidor.

---

## 🏗️ Build de Producción

Para generar una versión optimizada del sitio para producción:

```bash
yarn build
```

Este comando:
- Genera archivos HTML, CSS y JavaScript estáticos en el directorio `/build`
- Optimiza el código para mejor rendimiento
- Valida links internos

### Probar el build localmente

Después de hacer el build, puedes probarlo localmente:

```bash
yarn serve
```

Esto iniciará un servidor local en [http://localhost:3000](http://localhost:3000) sirviendo los archivos del build.

---

## 📁 Estructura del Proyecto

```
desarrollo-seguro-iso27001/
├── docs/                          # Contenido de la documentación (Markdown)
│   ├── intro.md                   # Página de introducción
│   ├── objetivos.md               # Objetivos del curso
│   ├── metodologia.md             # Metodología del curso
│   ├── dia-1/                     # Contenido del Día 1
│   │   ├── intro.md
│   │   └── labs/                  # Laboratorios del Día 1
│   │       ├── lab-1-1-mapeo-controles.md
│   │       ├── lab-1-2-dvwa.md
│   │       └── lab-1-3-reconocimiento.md
│   ├── dia-2/                     # Contenido del Día 2
│   │   └── ...
│   ├── dia-3/                     # Contenido del Día 3
│   ├── dia-4/                     # Contenido del Día 4
│   ├── dia-5/                     # Contenido del Día 5
│   └── recursos/                  # Recursos adicionales
│       ├── guia-facilitador.md
│       ├── checklists/
│       ├── herramientas/
│       └── templates/
├── src/                           # Código fuente de React/componentes
│   ├── css/
│   │   └── custom.css             # Estilos personalizados
│   ├── components/                # Componentes React personalizados
│   └── pages/                     # Páginas adicionales (no docs)
│       ├── index.tsx              # Página de inicio
│       └── index.module.css       # Estilos de la página de inicio
├── static/                        # Archivos estáticos (imágenes, PDFs, etc.)
│   └── img/
├── docusaurus.config.ts           # Configuración principal de Docusaurus
├── sidebars.ts                    # Configuración del sidebar (navegación)
├── package.json                   # Dependencias y scripts
├── tsconfig.json                  # Configuración de TypeScript
└── README.md                      # Este archivo
```

---

## ✍️ Agregar Contenido

### Agregar una nueva página de documentación

1. **Crea un archivo Markdown** en el directorio `docs/`:
   ```bash
   # Ejemplo: Agregar contenido teórico al Día 1
   touch docs/dia-1/iso-27001-27002.md
   ```

2. **Agrega el frontmatter** al inicio del archivo:
   ```markdown
   ---
   sidebar_position: 2
   ---

   # ISO 27001/27002:2022

   Aquí va el contenido...
   ```

3. **Actualiza `sidebars.ts`** si quieres control manual de la navegación:
   ```typescript
   {
     type: 'category',
     label: 'Día 1: ISO 27001 y OWASP Top 10',
     items: [
       'dia-1/intro',
       'dia-1/iso-27001-27002',  // Tu nuevo archivo
       // ...
     ],
   }
   ```

### Agregar imágenes

1. **Coloca la imagen** en `static/img/`:
   ```bash
   cp mi-diagrama.png static/img/dia-1/diagrama-stride.png
   ```

2. **Referencia la imagen** en Markdown:
   ```markdown
   ![Diagrama STRIDE](../../static/img/dia-1/diagrama-stride.png)
   ```

   O con ruta absoluta:
   ```markdown
   ![Diagrama STRIDE](/img/dia-1/diagrama-stride.png)
   ```

### Agregar archivos descargables (PDFs, Excel, etc.)

1. **Coloca el archivo** en `static/`:
   ```bash
   cp matriz-iso-owasp.xlsx static/recursos/matriz-iso-owasp.xlsx
   ```

2. **Crea un link** en Markdown:
   ```markdown
   📥 [Descargar Matriz ISO-OWASP](/recursos/matriz-iso-owasp.xlsx)
   ```

### Sintaxis Markdown Avanzada

Docusaurus soporta varias extensiones útiles:

#### Alertas/Admoniciones
```markdown
:::note
Este es un mensaje informativo.
:::

:::tip Tip Útil
Usa Docker para aislar el entorno de laboratorio.
:::

:::warning Precaución
No ejecutes este comando en producción.
:::

:::danger Peligro
Esto puede comprometer la seguridad del sistema.
:::
```

#### Tabs
```markdown
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="windows" label="Windows" default>
    ```powershell
    yarn install
    ```
  </TabItem>
  <TabItem value="mac" label="macOS">
    ```bash
    yarn install
    ```
  </TabItem>
  <TabItem value="linux" label="Linux">
    ```bash
    yarn install
    ```
  </TabItem>
</Tabs>
```

#### Bloques de código con resaltado
````markdown
```csharp title="Program.cs" {3,5-7}
using System;

namespace VulnerableApp  // Línea resaltada
{
    // Estas líneas también están resaltadas
    var connectionString = "Server=...";
    var password = "hardcoded123";
}
```
````

---

## 🎨 Personalización

### Cambiar colores del tema

Edita `src/css/custom.css`:

```css
:root {
  --ifm-color-primary: #0066cc;  /* Cambia el color primario */
  --ifm-color-primary-dark: #005cb8;
  /* ... más colores */
}
```

### Modificar la página de inicio

Edita `src/pages/index.tsx` para cambiar el contenido de la landing page.

### Cambiar el logo

1. Reemplaza `static/img/logo.svg` con tu logo
2. Actualiza `docusaurus.config.ts`:
   ```typescript
   navbar: {
     logo: {
       alt: 'Logo del Curso',
       src: 'img/mi-logo.png',  // Cambia aquí
     },
   }
   ```

### Configurar metadata del sitio

Edita `docusaurus.config.ts`:

```typescript
const config: Config = {
  title: 'Tu Título',
  tagline: 'Tu tagline',
  url: 'https://tu-dominio.com',
  baseUrl: '/',
  // ...
};
```

---

## 🔍 Troubleshooting

### Problema: `yarn install` falla con errores de permisos

**Solución (macOS/Linux):**
```bash
# Limpiar cache de Yarn
yarn cache clean

# Si el problema persiste, reinstala Yarn
npm install -g yarn
```

**Solución (Windows):**
```powershell
# Ejecuta PowerShell como Administrador
yarn cache clean
yarn install
```

**Alternativa con npm:**
```bash
# Si Yarn sigue fallando, usa npm
npm install
```

### Problema: Puerto 3000 ya está en uso

**Solución:**
```bash
# Especifica un puerto diferente
yarn start --port 3001
```

O mata el proceso que usa el puerto 3000:
```bash
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Problema: Cambios no se reflejan en el navegador

**Solución:**
```bash
# Detén el servidor (Ctrl+C)
# Limpia el cache
yarn clear

# Reinicia
yarn start
```

### Problema: Errores de TypeScript

**Solución:**
```bash
# Reinstala dependencias
rm -rf node_modules yarn.lock
yarn install

# Si persiste, verifica que tengas Node.js >= 18
node --version
```

### Problema: Links rotos en el build

```bash
# El comando build te mostrará qué links están rotos
yarn build

# Revisa y corrige los links indicados
```

### Problema: Pre-push hook no se ejecuta

**Síntomas:** El hook no valida el build al hacer push.

**Solución:**
```bash
# Reinstalar Husky
yarn install

# Verificar que el hook existe y es ejecutable
ls -la .husky/pre-push
chmod +x .husky/pre-push

# Si no existe, reinicializar Husky
npx husky init
```

### Problema: Pre-push hook falla pero quiero hacer push de emergencia

**Solución:**
```bash
# Primero intenta arreglar el error del build
yarn build

# Si es una emergencia y DEBES hacer push:
git push --no-verify

# O:
HUSKY=0 git push
```

⚠️ **Solo usa esto en emergencias. Arregla el build lo antes posible.**

### Problema: GitHub Actions falla en deployment

**Solución:**

1. **Revisa los logs** en GitHub → Actions
2. **Verifica que el build funcione localmente**:
   ```bash
   yarn build
   ```
3. **Común:** Permisos insuficientes
   - Ve a Settings → Actions → General
   - Marca "Read and write permissions"
4. **Consulta** [DEPLOYMENT.md](DEPLOYMENT.md) para troubleshooting detallado

---

## 🌐 Deployment

Este proyecto está configurado con **deployment automático a GitHub Pages** usando GitHub Actions.

### 🚀 Deployment Automático (Configurado)

**Ya está todo listo.** Cada vez que hagas `git push` a la rama `main`:

1. El **pre-push hook** valida que el build funcione localmente
2. Si el build pasa, el push se completa
3. **GitHub Actions** automáticamente:
   - Instala las dependencias
   - Construye el sitio
   - Despliega a GitHub Pages
4. Tu sitio se actualiza en ~3 minutos

**URL del sitio desplegado:**
```
https://black4ninja.github.io/desarrollo-seguro-iso27001/
```

### ⚙️ Configuración Inicial de GitHub Pages

Si es la primera vez que despliegas, necesitas habilitar GitHub Pages:

1. **Ve a tu repositorio en GitHub**
2. **Settings** → **Pages**
3. En **Source**, selecciona: **GitHub Actions**
4. (Opcional) En **Settings** → **Actions** → **General**:
   - Marca **Read and write permissions**

**¡Listo!** El próximo push activará el deployment automático.

### 📋 Workflow de Deployment

**Archivo de configuración:** `.github/workflows/deploy.yml`

El workflow se ejecuta:
- ✅ Automáticamente en cada push a `main`
- ✅ Manualmente desde la pestaña "Actions" en GitHub

**Pasos que ejecuta:**
1. Checkout del código
2. Setup de Node.js 18 con cache de Yarn
3. `yarn install --frozen-lockfile`
4. `yarn build`
5. Deploy a GitHub Pages

### 🔍 Monitorear Deployments

Para ver el estado de tus deployments:

1. **GitHub**: Pestaña **Actions** en tu repositorio
2. **Logs completos**: Haz clic en cualquier workflow run
3. **URL del sitio**: Se muestra al final del deployment exitoso

### 📖 Documentación Completa

Para información detallada sobre deployment, git hooks, troubleshooting y mejores prácticas:

📘 **[DEPLOYMENT.md](DEPLOYMENT.md)** - Guía completa de deployment

**Incluye:**
- Explicación detallada de Husky y git hooks
- Configuración de GitHub Actions paso a paso
- Troubleshooting de deployment
- Comandos útiles y mejores prácticas
- Cómo hacer deployment manual si es necesario

### 🛠️ Otras Opciones de Deployment

Si prefieres usar otro servicio en lugar de GitHub Pages, consulta [DEPLOYMENT.md](DEPLOYMENT.md) para instrucciones sobre:

- **Netlify**: Deployment automático con interfaz visual
- **Vercel**: Deployment con preview automático de PRs
- **Servidor propio**: Apache/Nginx con rsync

---

## 👥 Colaboración

### Flujo de trabajo recomendado

1. **Crea una rama para tu contenido**:
   ```bash
   git checkout -b dia-1-contenido
   ```

2. **Agrega tu contenido** y prueba localmente:
   ```bash
   yarn start
   ```

3. **Commit de cambios**:
   ```bash
   git add .
   git commit -m "Agregar contenido teórico del Día 1"
   ```

4. **Push a GitHub**:
   ```bash
   git push origin dia-1-contenido
   ```

   **Nota:** El pre-push hook validará que tu código compile correctamente antes de permitir el push.

5. **Crea un Pull Request** en GitHub para revisión

### Convenciones de nombres de archivos

- Usa minúsculas y guiones: `lab-1-1-mapeo-controles.md` ✅
- Evita espacios: `Lab 1.1 Mapeo.md` ❌
- Usa nombres descriptivos: `intro.md` mejor que `d1.md`

### Commits semánticos (opcional)

```bash
git commit -m "docs: agregar lab 2.3 de SonarQube"
git commit -m "fix: corregir link roto en día 3"
git commit -m "feat: agregar sección de APIs en día 3"
git commit -m "style: mejorar formato de tablas"
```

---

## 📚 Recursos Adicionales

### Documentación de Docusaurus
- [Guía oficial](https://docusaurus.io/docs)
- [Markdown Features](https://docusaurus.io/docs/markdown-features)
- [Configuración](https://docusaurus.io/docs/configuration)

### Ayuda con Markdown
- [Markdown Guide](https://www.markdownguide.org/)
- [GitHub Flavored Markdown](https://github.github.com/gfm/)

### Herramientas útiles
- **Editor Markdown**: [Typora](https://typora.io/), [Mark Text](https://marktext.app/)
- **Capturas de pantalla**: [Flameshot](https://flameshot.org/) (Linux), [Greenshot](https://getgreenshot.org/) (Windows)
- **Diagramas**: [draw.io](https://draw.io/), [Excalidraw](https://excalidraw.com/)

---

## 📞 Contacto y Soporte

### Problemas técnicos con Docusaurus
- [Docusaurus GitHub Issues](https://github.com/facebook/docusaurus/issues)
- [Docusaurus Discord](https://discord.gg/docusaurus)

### Preguntas sobre el curso
- Contacta a los facilitadores del curso
- Revisa la [Guía del Facilitador](docs/recursos/guia-facilitador.md)

---

## 📄 Licencia

Este material es privado y propiedad del curso **Desarrollo Seguro e ISO 27001/27002:2022**.

---

## ✅ Checklist para Comenzar

### Configuración Inicial
- [ ] Node.js >= 18.0 instalado (`node --version`)
- [ ] Yarn instalado (`yarn --version`)
- [ ] Repositorio clonado
- [ ] Dependencias instaladas (`yarn install`)
- [ ] Git hooks de Husky configurados automáticamente

### Desarrollo Local
- [ ] Servidor de desarrollo funcionando (`yarn start`)
- [ ] Página de inicio visible en [http://localhost:3000](http://localhost:3000)
- [ ] Hot reload funciona correctamente
- [ ] Primer contenido agregado y validado

### Git y Deployment
- [ ] Pre-push hook funciona (prueba con `git push`)
- [ ] GitHub Pages habilitado en Settings → Pages
- [ ] Primer deployment exitoso
- [ ] Sitio visible en `https://black4ninja.github.io/desarrollo-seguro-iso27001/`

### Documentación
- [ ] Leído [README.md](README.md)
- [ ] Leído [DEPLOYMENT.md](DEPLOYMENT.md) (configuración de deployment)
- [ ] Leído [INSTRUCCIONES_PARA_COMPAÑERO.md](INSTRUCCIONES_PARA_COMPAÑERO.md) (si aplica)

---

## 🎉 ¡Listo para Empezar!

Ahora puedes comenzar a agregar contenido al curso. Algunos puntos de partida:

1. **Revisa la estructura** en [docs/](docs/)
2. **Agrega contenido teórico** a los días correspondientes
3. **Completa los laboratorios** en las carpetas `labs/`
4. **Prueba localmente** con `yarn start`
5. **Commit y push** regularmente

**💡 Recuerda:**
- El contenido se escribe en Markdown (.md) y se organiza por días
- Los cambios se reflejan automáticamente en el navegador con hot reload
- El pre-push hook valida tu build antes de cada push
- Consulta [DEPLOYMENT.md](DEPLOYMENT.md) para más información sobre el workflow de desarrollo

---

**Versión:** 1.0.0
**Última actualización:** Diciembre 2025
**Mantenedores:** Facilitadores del curso
