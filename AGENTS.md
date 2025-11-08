# Guía para agentes CODEX

## Resumen del proyecto
- Colección de minijuegos educativos servidos de forma estática.
- React y ReactDOM se cargan desde CDN en cada juego; el JSX se transforma en el navegador con `@babel/standalone`.
- Tailwind CSS se usa mediante el Play CDN y puede configurarse en línea.
- No existe tooling de Node ni procesos de build.

## Estructura clave
- `index.html`: portada que lee `games/games.json` y renderiza la lista de juegos.
- `games/`: cada subcarpeta es un juego independiente (por ejemplo `games/demo-counter/`).
  - Usa `index.html` como punto de entrada y `app.jsx` (u otros `.jsx`) con `type="text/babel"`.
- `common/`: recursos compartidos reutilizables entre juegos.
- `games/games.json`: índice de juegos. Cada entrada debe incluir `id`, `name`, `description` y `path`.

## Convenciones de implementación
- Mantén las dependencias externas vía CDN; evita introducir herramientas de build salvo que la tarea lo pida explícitamente.
- Usa JSX estándar compatible con Babel en el navegador. Evita características que requieran transpilers adicionales.
- Para estilos usa clases de Tailwind; define configuraciones personalizadas con `tailwind.config` en línea si es necesario.
- Utiliza rutas relativas desde cada juego hacia sus recursos (`./app.jsx`, `../common/...`).
- Conserva la estructura y formato de los archivos existentes (sangría de 2 espacios en JSON, HTML bien formateado).
- Cuando añadas un juego, recuerda actualizar `games/games.json` y asegurarte de que `index.html` pueda encontrarlo.

## Pruebas y verificación
- No hay suite automatizada. Comprueba los cambios abriendo `index.html` o la página del juego en un navegador o sirviendo el repositorio con `python -m http.server`.
- Verifica que los juegos carguen sin errores en la consola del navegador.

## Notas de contribución
- Escribe commits descriptivos y en español si la tarea lo permite.
- Mantén el README y la documentación alineados si introduces cambios estructurales relevantes.
- Si añades recursos estáticos (imágenes, sonidos), ubícalos dentro de la carpeta del juego correspondiente o en `common/` si se comparten.

## Tono y comunicación
- Cuando actualices textos visibles para el público (README, portadas, copys de juegos), prioriza un lenguaje accesible para estudiantes de ESO.
- Evita jerga técnica innecesaria en la interfaz y ofrece explicaciones sencillas cuando debas mencionar herramientas como React o Tailwind.
