# Juegos ESO

Colección de minijuegos educativos construidos con React y servidos de forma
estática. El objetivo es que se puedan clonar y ejecutar directamente desde un
navegador o publicarse con GitHub Pages sin depender de instalaciones previas.

## Características principales

- **Sin build**: React se carga desde CDN. Los componentes se escriben en JSX y
  se transforman en el navegador mediante `@babel/standalone`.
- **Estilos con Tailwind**: la interfaz se maqueta con Tailwind CSS vía Play
  CDN, sin proceso de compilación.
- **Estructura modular**: cada juego vive en su propia carpeta dentro de
  `games/`, con sus recursos (HTML, imágenes, componentes, etc.).
- **Componentes compartidos**: los recursos reutilizables pueden colocarse en la
  carpeta `common/` y referenciarse desde cualquier juego.
- **Listado dinámico**: la portada (`index.html`) renderiza la lista de juegos a
  partir del archivo `games/games.json`.

## Estructura del repositorio

```
.
├── common/                # Recursos compartidos opcionales
│   └── .gitkeep
├── games/
│   ├── games.json         # Índice de juegos disponibles
│   └── demo-counter/
│       ├── app.jsx        # Lógica del juego en React
│       └── index.html     # Entrada del juego
├── index.html             # Portada con el listado de juegos
├── LICENSE
└── README.md
```

## Cómo añadir un nuevo juego

1. Crea una carpeta dentro de `games/` (por ejemplo `games/mi-juego/`).
2. Copia el contenido de `games/demo-counter` como punto de partida o crea tus
   propios archivos:
   - `index.html` debe incluir React, ReactDOM y Babel desde CDN.
   - Añade Tailwind con el Play CDN (`<script src="https://cdn.tailwindcss.com">`).
   - Usa `<script type="text/babel" src="./app.jsx"></script>` para cargar tu
     lógica escrita en JSX.
   - Si necesitas recursos compartidos, colócalos en `common/` y enlázalos con
     rutas relativas.
3. Añade una entrada en `games/games.json` con los metadatos del juego:

   ```json
   {
     "id": "mi-juego",
     "name": "Nombre visible",
     "description": "Descripción corta",
     "path": "./games/mi-juego/"
   }
   ```

4. Abre `index.html` en el navegador para comprobar que el juego aparece en la
   lista y se carga correctamente.

## Desarrollo local

Al no depender de Node ni herramientas de build, basta con abrir los archivos en
un navegador moderno. Si prefieres usar un servidor local estático, cualquier
opción vale (por ejemplo `python -m http.server`).

## Uso de Tailwind CSS sin proceso de compilación

Tailwind es la base visual del proyecto y se carga mediante el *Play CDN*, por
lo que no se requiere tooling adicional. El patrón recomendado es incluir una
configuración ligera antes de cargar la librería:

```html
<head>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brand: {
              DEFAULT: "#38bdf8",
              dark: "#0ea5e9",
            },
          },
          fontFamily: {
            sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
          },
        },
      },
    };
  </script>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
```

Una vez cargado, puedes utilizar las clases utilitarias directamente en tu JSX o
HTML (`class="bg-slate-900 text-white"`, etc.). Si necesitas *plugins*, añade la
query string al script (`https://cdn.tailwindcss.com?plugins=forms,typography`).

Recomendaciones rápidas:

- Declara las clases de forma literal para que el CDN pueda detectarlas; evita
  generar nombres dinámicos como `"bg-" + color`.
- El Play CDN es perfecto para prototipos o proyectos pequeños sin build. Si el
  proyecto crece y necesitas *purge* o personalizaciones complejas, conviene dar
  el salto a una configuración con build.

## Publicación

Los archivos pueden publicarse directamente en GitHub Pages (modo "Deploy from a
branch") u otro servicio de hosting estático. Solo asegúrate de que el directorio
`games/` y los recursos `common/` se suban junto con el resto del repositorio.
