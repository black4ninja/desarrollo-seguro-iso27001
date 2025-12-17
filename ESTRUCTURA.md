# 📁 Estructura del Proyecto Docusaurus

## Vista General

```
desarrollo-seguro-iso27001/
│
├── 📄 README.md                    ← EMPIEZA AQUÍ
├── 📄 QUICK_START.md               ← Solución rápida de problemas
├── 📄 CONTRIBUTING.md              ← Guía para agregar contenido
├── 📄 ESTRUCTURA.md                ← Este archivo
│
├── 📦 package.json                 ← Dependencias y scripts
├── 📦 package-lock.json            ← Lockfile de npm (no editar)
├── 🔧 docusaurus.config.ts         ← Configuración principal
├── 🔧 sidebars.ts                  ← Navegación del sidebar
├── 🔧 tsconfig.json                ← Configuración TypeScript
├── 🚫 .gitignore                   ← Archivos ignorados por Git
│
├── 📂 docs/                        ← **CONTENIDO PRINCIPAL AQUÍ**
│   │
│   ├── 📄 intro.md                 ← Página de bienvenida
│   ├── 📄 objetivos.md             ← Objetivos del curso
│   ├── 📄 metodologia.md           ← Metodología del curso
│   │
│   ├── 📂 dia-1/                   ← Contenido Día 1
│   │   ├── 📄 intro.md
│   │   ├── 📄 iso-27001-27002.md   ← Ejemplo completo
│   │   ├── 📄 owasp-top-10.md      ← (por agregar)
│   │   ├── 📄 principios-seguridad.md
│   │   └── 📂 labs/
│   │       ├── 📄 lab-1-1-mapeo-controles.md
│   │       ├── 📄 lab-1-2-dvwa.md
│   │       └── 📄 lab-1-3-reconocimiento.md
│   │
│   ├── 📂 dia-2/
│   │   ├── 📄 intro.md
│   │   ├── 📄 sdlc-seguro.md       ← (por agregar)
│   │   ├── 📄 metodologias-pentesting.md
│   │   └── 📂 labs/
│   │       ├── 📄 lab-2-1-threat-modeling.md
│   │       ├── 📄 lab-2-2-setup-entorno.md
│   │       ├── 📄 lab-2-3-sast-sonarqube.md
│   │       └── 📄 lab-2-4-dependency-check.md
│   │
│   ├── 📂 dia-3/
│   │   ├── 📄 intro.md
│   │   ├── 📄 owasp-api-security.md
│   │   ├── 📄 arquitecturas-modernas.md
│   │   ├── 📄 configuraciones-seguras.md
│   │   └── 📂 labs/
│   │       ├── 📄 lab-3-1-api-security.md
│   │       ├── 📄 lab-3-2-dast-zap.md
│   │       ├── 📄 lab-3-3-pentesting-apis.md
│   │       └── 📄 lab-3-4-auditoria-configuraciones.md
│   │
│   ├── 📂 dia-4/
│   │   ├── 📄 intro.md
│   │   ├── 📄 devsecops.md
│   │   ├── 📄 cicd-security.md
│   │   ├── 📄 logging-monitoring.md
│   │   └── 📂 labs/
│   │       ├── 📄 lab-4-1-security-gates.md
│   │       ├── 📄 lab-4-2-logging-monitoring.md
│   │       ├── 📄 lab-4-3-gestion-secretos.md
│   │       └── 📄 lab-4-4-security-tests.md
│   │
│   ├── 📂 dia-5/
│   │   ├── 📄 intro.md
│   │   ├── 📄 gestion-vulnerabilidades.md
│   │   └── 📂 actividades/
│   │       ├── 📄 auditoria-completa.md
│   │       ├── 📄 plan-accion.md
│   │       ├── 📄 presentaciones.md
│   │       └── 📄 examen.md
│   │
│   └── 📂 recursos/
│       ├── 📄 guia-facilitador.md   ← Guía completa
│       ├── 📂 checklists/
│       │   ├── 📄 code-review.md
│       │   ├── 📄 configuraciones.md
│       │   └── 📄 apis.md
│       ├── 📂 herramientas/
│       │   ├── 📄 sonarqube.md
│       │   ├── 📄 dependency-check.md
│       │   └── 📄 owasp-zap.md
│       └── 📂 templates/
│           ├── 📄 reporte-auditoria.md
│           ├── 📄 threat-model.md
│           └── 📄 plan-mejora.md
│
├── 📂 src/                         ← Código fuente React
│   ├── 📂 css/
│   │   └── 📄 custom.css           ← Estilos personalizados
│   ├── 📂 components/              ← Componentes personalizados (vacío)
│   └── 📂 pages/
│       ├── 📄 index.tsx            ← Página de inicio
│       └── 📄 index.module.css     ← Estilos de inicio
│
├── 📂 static/                      ← Archivos estáticos
│   └── 📂 img/
│       ├── 🖼️ logo.svg             ← Logo del curso
│       └── 🖼️ favicon.ico          ← (placeholder, reemplazar)
│
├── 📂 .vscode/                     ← Configuración VS Code
│   └── 📄 extensions.json          ← Extensiones recomendadas
│
├── 📂 node_modules/                ← Dependencias (generado, no editar)
├── 📂 .docusaurus/                 ← Cache Docusaurus (generado)
└── 📂 build/                       ← Build de producción (generado)
```

## 📝 Archivos que DEBES Editar

### Prioridad Alta

| Archivo | Propósito | Acción |
|---------|-----------|--------|
| `docs/dia-X/*.md` | Contenido teórico | Agregar presentaciones en Markdown |
| `docs/dia-X/labs/*.md` | Guías de laboratorio | Instrucciones paso a paso |
| `static/img/` | Imágenes y recursos | Agregar diagramas, capturas |

### Prioridad Media

| Archivo | Propósito | Acción |
|---------|-----------|--------|
| `docs/recursos/*.md` | Checklists y templates | Documentos de apoyo |
| `static/img/logo.svg` | Logo del curso | Reemplazar con logo real |
| `static/img/favicon.ico` | Icono del sitio | Reemplazar con favicon real |

### Prioridad Baja

| Archivo | Propósito | Acción |
|---------|-----------|--------|
| `src/css/custom.css` | Personalización visual | Ajustar colores/tipografía |
| `docusaurus.config.ts` | Config del sitio | Cambiar URL, metadata |

## 🚫 Archivos que NO Debes Editar

- ❌ `node_modules/` - Generado por npm
- ❌ `.docusaurus/` - Cache de Docusaurus
- ❌ `build/` - Build de producción
- ❌ `package-lock.json` - Lockfile de npm
- ⚠️ `sidebars.ts` - Solo editar si conoces la estructura

## 🎯 Flujo de Trabajo Recomendado

### 1. Día 1 - Setup Inicial
```bash
npm install
npm start
# Verifica que http://localhost:3000 funcione
```

### 2. Día 2-5 - Agregar Contenido Día por Día
```bash
# Edita: docs/dia-1/tema-x.md
# Guarda el archivo
# El navegador se actualiza automáticamente
```

### 3. Día Final - Build y Deploy
```bash
npm run build
# Sube a GitHub Pages / Netlify / etc.
```

## 📂 Convenciones de Nombres

### Archivos Markdown

✅ **Correcto**:
- `iso-27001-27002.md`
- `lab-2-3-sast-sonarqube.md`
- `principios-seguridad.md`

❌ **Incorrecto**:
- `ISO 27001.md` (espacios)
- `Lab2.3.md` (puntos)
- `PrincipiosSeguridad.md` (camelCase)

### Carpetas

✅ **Correcto**:
- `dia-1/`
- `labs/`
- `recursos/`

❌ **Incorrecto**:
- `Día 1/` (espacios, acentos)
- `Labs/` (mayúsculas)

## 🖼️ Organización de Imágenes

```
static/img/
├── dia-1/
│   ├── diagrama-stride.png
│   ├── captura-dvwa-xss.png
│   └── tabla-mapeo-iso.png
├── dia-2/
│   └── sonarqube-dashboard.png
├── logo.svg
└── favicon.ico
```

**Uso en Markdown**:
```markdown
![Diagrama STRIDE](/img/dia-1/diagrama-stride.png)
```

## 📊 Tamaño de Archivos Recomendado

| Tipo | Tamaño Max | Formato |
|------|------------|---------|
| Imágenes (capturas) | 500 KB | PNG, JPG |
| Diagramas | 200 KB | SVG (preferido), PNG |
| PDFs | 5 MB | PDF |
| Videos | - | Enlace a YouTube/Vimeo |

## 🔄 Sincronización con Git

```bash
# Ver archivos cambiados
git status

# Agregar todos los archivos nuevos/modificados
git add .

# Commit
git commit -m "Agregar contenido del Día 2"

# Push
git push origin main
```

## 🆘 Ayuda Rápida

| Problema | Archivo | Acción |
|----------|---------|--------|
| Página no aparece en sidebar | `sidebars.ts` | Agregar ruta al array |
| Imagen no se ve | Ruta incorrecta | Usar `/img/...` desde `static/` |
| Link roto | Markdown | Verificar ruta relativa |
| Estilos no aplican | `src/css/custom.css` | Verificar selectores CSS |

---

**Próximo paso**: Lee [README.md](README.md) para instrucciones de instalación completas.
