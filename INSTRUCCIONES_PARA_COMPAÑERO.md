# 👋 Instrucciones para el Compañero Facilitador

## 🎯 ¿Qué es este proyecto?

Este es el sitio web de documentación para nuestro **Curso de Desarrollo Seguro e ISO 27001/27002:2022**.

Está construido con **Docusaurus**, una herramienta moderna que convierte archivos Markdown (.md) en un sitio web bonito y funcional.

## ⚡ Inicio Rápido (5 minutos)

### Paso 1: Verifica Node.js

```bash
node --version
```

**Debes ver:** `v18.x.x` o superior

❌ **Si no lo tienes:**
- **macOS**: `brew install node`
- **Windows**: Descarga de [nodejs.org](https://nodejs.org/)
- **Linux**: `curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - && sudo apt-get install -y nodejs`

---

### Paso 2: Instala las Dependencias

```bash
npm install
```

⏱️ **Tiempo:** 2-3 minutos (descarga ~200 MB)

❌ **Si falla con errores de permisos:**
Ver soluciones en [QUICK_START.md](QUICK_START.md)

---

### Paso 3: Inicia el Servidor

```bash
npm start
```

✅ **Debes ver:**
```
[SUCCESS] Docusaurus website is running at: http://localhost:3000/
```

🎉 **¡Listo!** Tu navegador debería abrir automáticamente.

---

## 📖 ¿Cómo Agregar Contenido?

### Opción 1: Editar Archivos Existentes

1. **Abre el archivo** en tu editor favorito (VS Code recomendado):
   ```
   docs/dia-1/owasp-top-10.md
   ```

2. **Agrega contenido** en formato Markdown:
   ```markdown
   ---
   sidebar_position: 3
   ---

   # OWASP Top 10:2021

   ## A01: Broken Access Control

   Descripción aquí...
   ```

3. **Guarda el archivo** (Ctrl+S / Cmd+S)

4. **¡Magia!** 🪄 El navegador se actualiza automáticamente

### Opción 2: Crear Nuevos Archivos

```bash
# Crear nuevo archivo de teoría
touch docs/dia-2/code-review-seguro.md

# Editar en VS Code
code docs/dia-2/code-review-seguro.md
```

**Contenido mínimo:**
```markdown
---
sidebar_position: 4
---

# Code Review Seguro

Tu contenido aquí...
```

---

## 📁 Estructura de Carpetas

```
docs/
├── dia-1/          ← Tu contenido del Día 1
├── dia-2/          ← Tu contenido del Día 2
├── dia-3/          ← Tu contenido del Día 3
├── dia-4/          ← Tu contenido del Día 4
├── dia-5/          ← Tu contenido del Día 5
└── recursos/       ← Checklists, herramientas, templates
```

**Regla simple:** Todo archivo `.md` en `docs/` aparece en el sitio.

---

## 🎨 Formato Markdown

### Títulos
```markdown
# Título Principal (H1)
## Subtítulo (H2)
### Sección (H3)
```

### Listas
```markdown
- Item 1
- Item 2
  - Sub-item 2.1
```

### Código
````markdown
```bash
npm install
```

```csharp
var password = "securePassword123";
```
````

### Alertas
```markdown
:::tip Consejo
Usa Docker para aislar el entorno.
:::

:::warning Precaución
No ejecutes esto en producción.
:::
```

### Tablas
```markdown
| Header 1 | Header 2 |
|----------|----------|
| Valor 1  | Valor 2  |
```

### Imágenes
```markdown
![Descripción](/img/dia-1/diagrama.png)
```

**Coloca imágenes en:** `static/img/dia-X/`

---

## 🔍 Ejemplo Completo

Ve este archivo para referencia:
```
docs/dia-1/iso-27001-27002.md
```

Contiene ejemplos de:
- ✅ Tablas
- ✅ Alertas
- ✅ Bloques de código
- ✅ Listas
- ✅ Links

---

## 🚀 Flujo de Trabajo Recomendado

### Día a Día

1. **Inicia el servidor** (una vez):
   ```bash
   npm start
   ```

2. **Edita archivos** en `docs/dia-X/`

3. **Guarda** y ve los cambios en el navegador

4. **Commit** al final del día:
   ```bash
   git add .
   git commit -m "Agregar contenido Día 2"
   git push
   ```

### División de Trabajo Sugerida

**Tú (Facilitador 1 - Procesos):**
- ✅ `docs/dia-1/iso-27001-27002.md`
- ✅ `docs/dia-2/sdlc-seguro.md`
- ✅ `docs/recursos/checklists/*.md`
- ✅ Threat modeling

**Yo (Facilitador 2 - Técnico):**
- ✅ Todos los labs (`docs/dia-X/labs/*.md`)
- ✅ Herramientas (`docs/recursos/herramientas/*.md`)
- ✅ Configuraciones técnicas

---

## 📝 Archivos Prioritarios por Agregar

### Día 1 (tu enfoque)
- [ ] `docs/dia-1/owasp-top-10.md`
- [ ] `docs/dia-1/principios-seguridad.md`

### Día 2 (tu enfoque)
- [ ] `docs/dia-2/sdlc-seguro.md`
- [ ] `docs/dia-2/metodologias-pentesting.md`

### Recursos (tu enfoque)
- [ ] `docs/recursos/checklists/code-review.md`
- [ ] `docs/recursos/checklists/configuraciones.md`
- [ ] `docs/recursos/checklists/apis.md`

---

## 🛠️ Comandos Útiles

```bash
# Iniciar servidor (desarrollo)
npm start

# Detener servidor
Ctrl + C

# Limpiar cache (si algo no funciona)
npm run clear

# Generar sitio estático (producción)
npm run build

# Ver el build localmente
npm run serve
```

---

## ❓ Problemas Comunes

### El servidor no inicia

```bash
# Solución 1: Limpiar cache
npm run clear
npm start

# Solución 2: Reinstalar
rm -rf node_modules
npm install
```

### Puerto 3000 ocupado

```bash
# Usa otro puerto
npm start -- --port 3001
```

### Cambios no se ven

```bash
# Reinicia el servidor
Ctrl + C
npm start
```

### Link roto

Verifica la ruta:
```markdown
# ✅ Correcto
[Ver Día 1](./dia-1/intro)

# ❌ Incorrecto
[Ver Día 1](dia-1/intro)  # falta ./
```

---

## 📚 Recursos de Ayuda

### Archivos de Documentación

1. **[README.md](README.md)** - Guía completa (LÉELO PRIMERO)
2. **[QUICK_START.md](QUICK_START.md)** - Solución rápida de problemas
3. **[ESTRUCTURA.md](ESTRUCTURA.md)** - Mapa del proyecto
4. **[CONTRIBUTING.md](CONTRIBUTING.md)** - Cómo contribuir

### Markdown

- [Guía de Markdown](https://www.markdownguide.org/)
- [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

### Docusaurus

- [Documentación Oficial](https://docusaurus.io/docs)
- [Markdown Features](https://docusaurus.io/docs/markdown-features)

---

## 💬 Comunicación

### Para Coordinación

**Usa:**
- WhatsApp/Slack para preguntas rápidas
- Git commits descriptivos
- Comentarios en archivos `.md` si es necesario:
  ```markdown
  <!-- TODO: Agregar ejemplo de XSS aquí -->
  ```

### Commits Claros

```bash
# Bueno ✅
git commit -m "Agregar contenido OWASP Top 10 y principios de seguridad"

# Malo ❌
git commit -m "update"
```

---

## 🎯 Tu Primera Tarea

Para familiarizarte:

1. ✅ **Instala y arranca** el servidor (`npm install && npm start`)
2. ✅ **Navega** por el sitio en [http://localhost:3000](http://localhost:3000)
3. ✅ **Lee** `docs/dia-1/iso-27001-27002.md` como ejemplo
4. ✅ **Edita** `docs/dia-1/owasp-top-10.md` y agrega contenido básico
5. ✅ **Verifica** que se vea bien en el navegador
6. ✅ **Commit** tus cambios

---

## 📞 Contacto

Si tienes dudas:

1. **Primero revisa:** README.md y QUICK_START.md
2. **Si persiste:** Envíame mensaje con:
   - Captura del error
   - Lo que intentaste hacer
   - Versión de Node.js (`node --version`)

---

## 🎉 ¡Estás Listo!

El proyecto está **100% funcional**. Solo necesitas:

1. Instalar (`npm install`)
2. Iniciar (`npm start`)
3. Editar archivos `.md`
4. Ver los cambios en tiempo real

**No necesitas saber React, TypeScript ni nada complejo.** Solo Markdown básico.

---

**¡Éxito con el curso!** 🚀

---

**Última actualización:** Diciembre 17, 2025
**Creado por:** Tu compañero facilitador
**Contacto:** [Agregar info de contacto]
