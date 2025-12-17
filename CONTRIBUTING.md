# Guía de Contribución

## Para Facilitadores

Esta guía te ayudará a agregar contenido al sitio del curso de manera efectiva.

## 🚀 Inicio Rápido

1. **Instala dependencias**:
   ```bash
   npm install
   ```

2. **Inicia el servidor de desarrollo**:
   ```bash
   npm start
   ```

3. **Agrega tu contenido** en la carpeta `docs/`

## 📝 Estructura de Archivos

### Archivos Markdown (.md)

Todos los archivos de documentación deben incluir frontmatter:

```markdown
---
sidebar_position: 1
---

# Título de la Página

Contenido aquí...
```

### Organización por Días

```
docs/
├── dia-1/           # Día 1
│   ├── intro.md     # Introducción del día
│   ├── tema1.md     # Temas teóricos
│   └── labs/        # Laboratorios
├── dia-2/
├── dia-3/
├── dia-4/
└── dia-5/
```

## ✅ Checklist antes de Commit

- [ ] El servidor local funciona (`npm start`)
- [ ] No hay errores en la terminal
- [ ] Las imágenes se ven correctamente
- [ ] Los links internos funcionan
- [ ] El contenido es claro y bien formateado

## 🎨 Buenas Prácticas

### Imágenes
- Tamaño máximo: 1MB
- Formatos: PNG, JPG, SVG
- Nombres descriptivos: `diagrama-stride-dia2.png`

### Enlaces
```markdown
# Enlaces internos
[Ver Día 1](./dia-1/intro)

# Enlaces externos
[OWASP Top 10](https://owasp.org/Top10/)
```

### Bloques de código
````markdown
```bash
# Comando de ejemplo
docker run -d dvwa
```
````

## 🐛 Reportar Problemas

Si encuentras algún problema:
1. Verifica primero en el README
2. Revisa la consola de Node.js
3. Contacta al equipo técnico

## 📞 Contacto

Para dudas sobre el contenido, contacta a los facilitadores del curso.
