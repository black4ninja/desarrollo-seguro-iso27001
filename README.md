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

- **npm** (incluido con Node.js) o **yarn**
  ```bash
  npm --version   # Debe mostrar 9.x.x o superior
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

---

## 📦 Instalación

1. **Clona el repositorio** (si aún no lo has hecho):
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd desarrollo-seguro-iso27001
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

   O si prefieres usar yarn:
   ```bash
   yarn install
   ```

   Esto instalará todas las dependencias necesarias listadas en `package.json`, incluyendo Docusaurus y sus plugins.

---

## 🚀 Ejecución Local

### Iniciar el servidor de desarrollo

```bash
npm start
```

O con yarn:
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
npm run build
```

Este comando:
- Genera archivos HTML, CSS y JavaScript estáticos en el directorio `/build`
- Optimiza el código para mejor rendimiento
- Valida links internos

### Probar el build localmente

Después de hacer el build, puedes probarlo localmente:

```bash
npm run serve
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
    npm install
    ```
  </TabItem>
  <TabItem value="mac" label="macOS">
    ```bash
    npm install
    ```
  </TabItem>
  <TabItem value="linux" label="Linux">
    ```bash
    npm install
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

### Problema: `npm install` falla con errores de permisos

**Solución (macOS/Linux):**
```bash
# Limpiar cache de npm
npm cache clean --force

# Si el problema persiste, corrige permisos (reemplaza 501:20 con tu usuario:grupo)
sudo chown -R $(whoami) ~/.npm
```

**Solución (Windows):**
```powershell
# Ejecuta PowerShell/CMD como Administrador
npm cache clean --force
npm install
```

### Problema: Puerto 3000 ya está en uso

**Solución:**
```bash
# Especifica un puerto diferente
npm start -- --port 3001
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
npm run clear

# Reinicia
npm start
```

### Problema: Errores de TypeScript

**Solución:**
```bash
# Reinstala dependencias
rm -rf node_modules package-lock.json
npm install

# Si persiste, verifica que tengas Node.js >= 18
node --version
```

### Problema: Links rotos en el build

```bash
# El comando build te mostrará qué links están rotos
npm run build

# Revisa y corrige los links indicados
```

---

## 🌐 Deployment

### Opción 1: GitHub Pages

1. **Configura el repositorio** en `docusaurus.config.ts`:
   ```typescript
   url: 'https://tu-usuario.github.io',
   baseUrl: '/desarrollo-seguro-iso27001/',
   organizationName: 'tu-usuario',
   projectName: 'desarrollo-seguro-iso27001',
   ```

2. **Agrega script de deploy** a `package.json`:
   ```json
   "scripts": {
     "deploy": "GIT_USER=<tu-usuario> npm run deploy"
   }
   ```

3. **Ejecuta el deploy**:
   ```bash
   npm run deploy
   ```

### Opción 2: Netlify

1. **Crea cuenta en [Netlify](https://www.netlify.com/)**
2. **Conecta tu repositorio GitHub**
3. **Configuración de build**:
   - Build command: `npm run build`
   - Publish directory: `build`
4. **Deploy automático** en cada push a `main`

### Opción 3: Vercel

1. **Instala Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

### Opción 4: Servidor propio (Apache/Nginx)

```bash
# Build del proyecto
npm run build

# Copia los archivos al servidor
scp -r build/* usuario@servidor:/var/www/html/

# O usa rsync
rsync -avz build/ usuario@servidor:/var/www/html/
```

---

## 👥 Colaboración

### Flujo de trabajo recomendado

1. **Crea una rama para tu contenido**:
   ```bash
   git checkout -b dia-1-contenido
   ```

2. **Agrega tu contenido** y prueba localmente:
   ```bash
   npm start
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

- [ ] Node.js >= 18.0 instalado
- [ ] Repositorio clonado
- [ ] Dependencias instaladas (`npm install`)
- [ ] Servidor de desarrollo funcionando (`npm start`)
- [ ] Página de inicio visible en [http://localhost:3000](http://localhost:3000)
- [ ] Primer contenido agregado y validado
- [ ] Cambios commiteados a Git

---

## 🎉 ¡Listo para Empezar!

Ahora puedes comenzar a agregar contenido al curso. Algunos puntos de partida:

1. **Revisa la estructura** en [docs/](docs/)
2. **Agrega contenido teórico** a los días correspondientes
3. **Completa los laboratorios** en las carpetas `labs/`
4. **Prueba localmente** con `npm start`
5. **Commit y push** regularmente

**💡 Recuerda:** El contenido se escribe en Markdown (.md) y se organiza por días. ¡Cualquier cambio que hagas se verá reflejado automáticamente en el navegador!

---

**Versión:** 1.0.0
**Última actualización:** Diciembre 2025
**Mantenedores:** Facilitadores del curso
