# elSneaker

Tienda online de sneakers (prototipo). HTML + CSS + JavaScript, sin dependencias.

## Ver la web en local
```bash
python -m http.server 5288
```
Abre http://localhost:5288

## Estructura
- `index.html`: estructura de la página (hero con pasarelas, catálogo, drop, categorías, carrusel, club, carrito).
- `css/styles.css`: estilos. Los colores y tipografías están en `:root`.
- `js/products.js`: **catálogo**. Aquí se añaden o editan productos, precios, etiquetas y el lanzamiento (DROP).
- `js/app.js`: lógica (pasarelas, filtros, carrito, cuenta atrás, animaciones). Envío gratis y moneda arriba del archivo.

## Fotos reales
Guarda las fotos en `assets/productos/` (mejor PNG/WebP con fondo transparente) y añade `img` al producto:
```js
{ id: "volt-runner", name: "Volt Runner", ..., img: "assets/productos/volt-runner.webp" }
```
Si no hay `img`, se dibuja una ilustración con los colores del producto.
