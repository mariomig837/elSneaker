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

## Fotos de producto
Las fotos actuales son de [Unsplash](https://unsplash.com) (licencia gratuita, uso comercial permitido) y se cargan desde su servidor.
Para usar fotos propias, guárdalas en `assets/productos/` y cambia el campo `img` del producto en `js/products.js`:
```js
img: "assets/productos/air-force-1.webp",
```
Si un producto no tiene `img`, se dibuja una ilustración con sus colores (`c`).

> Las marcas (Nike, Jordan, Vans, Converse, Puma) son de sus propietarios. Para vender de verdad hay que ser distribuidor autorizado o vender producto original con factura.
