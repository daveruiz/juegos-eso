# Juegos ESO

Colección de minijuegos educativos pensada para el alumnado de Educación Secundaria.
Todo funciona directamente desde el navegador: solo necesitas abrir `index.html`
para empezar a jugar o compartir la carpeta con tu clase.

## Cómo usar la colección

1. Descarga la carpeta y guárdala en tu ordenador.
2. Abre el archivo `index.html` con tu navegador favorito (Chrome, Edge, Firefox…).
3. Elige un juego de la lista y pulsa "Abrir juego" para jugar en una pestaña nueva.

## Juegos incluidos

- **Contador interactivo (Demo)**: practica sumas y restas rápidas mientras el
  marcador registra cuántos puntos consigues.
- **Memoria de valencias químicas**: reta tu memoria emparejando elementos con su
  valencia correspondiente y supera el temporizador.

## Para quienes quieran crear o adaptar juegos

Si eres docente o te encargas de ampliar la colección, cada juego vive en una
carpeta dentro de `games/`. Puedes duplicar `games/demo-counter` como plantilla
mínima:

- El archivo `index.html` arma la página del juego y ya incluye las librerías
  necesarias.
- El archivo `app.jsx` contiene la lógica del juego y está escrito en JSX, un
  formato similar a HTML que React entiende directamente en el navegador gracias
  a Babel (todo viene configurado en los ejemplos).
- Para añadir estilos utilizamos Tailwind CSS a través de un script (`<script
  src="https://cdn.tailwindcss.com"></script>`). Puedes ajustar colores o
  tipografías modificando la pequeña configuración `tailwind.config` que verás en
  cada encabezado `<head>`.
- Si varias actividades comparten imágenes, sonidos u otros recursos, colócalos
  dentro de `common/`.

Cuando tengas listo tu juego, añade su información al archivo `games/games.json`
(con identificador, nombre visible, descripción y ruta).

## Compartir con tu grupo

Puedes copiar la carpeta completa en ordenadores del aula, subirla al aula
virtual o publicarla en un servicio de páginas estáticas (por ejemplo GitHub
Pages o Netlify). Solo asegúrate de incluir la carpeta `games/` y los recursos de
`common/` si los usas.

## Consejos técnicos opcionales

- Para revisar los cambios sin necesidad de subirlos a internet, puedes abrir un
  servidor estático desde la carpeta del proyecto. Un ejemplo sencillo es `python
  -m http.server`.
- Tailwind funciona mejor cuando las clases se escriben de forma literal (por
  ejemplo `class="bg-slate-900"`). Evita construir nombres mediante variables.
- Si la colección crece mucho y necesitas personalizaciones avanzadas, quizá sea
  conveniente migrar a un flujo de trabajo con herramientas de compilación, pero
  para prototipos y actividades pequeñas este formato es suficiente.
