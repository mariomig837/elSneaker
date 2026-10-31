/* =========================================================
   Catálogo de productos
   - `img`: foto del producto. Ahora mismo son fotos de Unsplash (licencia libre,
     uso comercial permitido). Para usar fotos propias: "assets/productos/archivo.webp".
   - `c`: colores de la tarjeta (bg = fondo mientras carga) y de la ilustración
     de respaldo que se dibuja si un producto no tiene foto.
   ========================================================= */
const UNSPLASH = (id) => `https://images.unsplash.com/photo-${id}?w=700&h=875&fit=crop&auto=format&q=72`;

const PRODUCTS = [
  { id: "air-force-1-07", name: "Air Force 1 '07", brand: "Nike", line: "Basket", cat: "basket", price: 119, tag: "TOP",
    img: UNSPLASH("1600269452121-4f2416e55c28"),
    c: { base: "#ffffff", accent: "#111111", sole: "#ffffff", lace: "#ffffff", bg: "#1a1a1a" } },
  { id: "free-rn-flyknit", name: "Free RN Flyknit", brand: "Nike", line: "Running", cat: "running", price: 119, oldPrice: 139, tag: "-15%",
    img: UNSPLASH("1542291026-7eec264c27ff"),
    c: { base: "#c8102e", accent: "#ffffff", sole: "#ffffff", lace: "#c8102e", bg: "#c8102e" } },
  { id: "old-skool-burgundy", name: "Old Skool Burgundy", brand: "Vans", line: "Skate", cat: "skate", price: 80,
    img: UNSPLASH("1525966222134-fcfa99b8ae77"),
    c: { base: "#6b1a2a", accent: "#ffffff", sole: "#ffffff", lace: "#ffffff", bg: "#ffb000" } },
  { id: "superrep-go-volt", name: "SuperRep Go Volt", brand: "Nike", line: "Training", cat: "running", price: 99, tag: "NEW",
    img: UNSPLASH("1606107557195-0e29a4b5b4aa"),
    c: { base: "#d4ff00", accent: "#111111", sole: "#ffffff", lace: "#111111", bg: "#d4ff00" } },
  { id: "af1-shadow-pastel", name: "Air Force 1 Shadow", brand: "Nike", line: "Lifestyle", cat: "lifestyle", price: 129, tag: "HOT",
    img: UNSPLASH("1595950653106-6c9ebd614d3a"),
    c: { base: "#f8c8dc", accent: "#a8c8ff", sole: "#fff3b0", lace: "#ffffff", bg: "#f2d6e8" } },
  { id: "af1-lv8-utility", name: "Air Force 1 LV8 Utility", brand: "Nike", line: "Basket", cat: "basket", price: 139,
    img: UNSPLASH("1543508282-6319a3e2621f"),
    c: { base: "#111111", accent: "#ffffff", sole: "#111111", lace: "#111111", bg: "#e8e8e8" } },
  { id: "air-max-1-orange", name: "Air Max 1 Sunrise", brand: "Nike", line: "Running", cat: "running", price: 149, tag: "NEW",
    img: UNSPLASH("1600185365483-26d7a4cc7519"),
    c: { base: "#ffffff", accent: "#ff4d00", sole: "#ff8a3d", lace: "#ffffff", bg: "#e9e6e1" } },
  { id: "chuck-70-orange", name: "Chuck 70 Orange", brand: "Converse", line: "Skate", cat: "skate", price: 95, oldPrice: 110, tag: "-15%",
    img: UNSPLASH("1771049873881-45b23a2e9847"),
    c: { base: "#ff6a00", accent: "#ffffff", sole: "#f2efe6", lace: "#ffffff", bg: "#ff6a00" } },
  { id: "af1-carhartt-wip", name: "Air Force 1 x Carhartt WIP", brand: "Nike", line: "Lifestyle", cat: "lifestyle", price: 179, tag: "HOT",
    img: UNSPLASH("1549298916-b41d501d3772"),
    c: { base: "#a0672a", accent: "#2b2b2b", sole: "#f2efe6", lace: "#a0672a", bg: "#d99a1e" } },
  { id: "court-classic-white", name: "Court Classic White", brand: "Puma", line: "Lifestyle", cat: "lifestyle", price: 75,
    img: UNSPLASH("1608231387042-66d1773070a5"),
    c: { base: "#ffffff", accent: "#111111", sole: "#ffffff", lace: "#ffffff", bg: "#111111" } },
  { id: "af1-high-white", name: "Air Force 1 High", brand: "Nike", line: "Basket", cat: "basket", price: 139,
    img: UNSPLASH("1512374382149-233c42b6a83b"),
    c: { base: "#ffffff", accent: "#d9b36c", sole: "#ffffff", lace: "#ffffff", bg: "#3a3a3a" } },
  { id: "running-triple-black", name: "Running Triple Black", brand: "Nike", line: "Running", cat: "running", price: 129,
    img: UNSPLASH("1491553895911-0055eca6402d"),
    c: { base: "#1a1a1a", accent: "#d4ff00", sole: "#1a1a1a", lace: "#1a1a1a", bg: "#f2f2f2" } },
];

/* Lanzamiento destacado (sección DROP) */
const DROP = {
  id: "air-jordan-1-bred",
  name: "Air Jordan 1 Bred",
  brand: "Jordan",
  line: "Edición limitada · 500 pares",
  cat: "basket",
  price: 249,
  tag: "DROP",
  img: UNSPLASH("1552346154-21d32810aba3"),
  c: { base: "#111111", accent: "#c8102e", sole: "#ffffff", lace: "#111111", bg: "#111111" },
  // Fecha de lanzamiento: 7 días a partir de hoy (cámbiala por una fecha fija, p. ej. "2026-11-14T18:00:00")
  date: new Date(Date.now() + 7 * 24 * 3600 * 1000 + 5 * 3600 * 1000).toISOString(),
};

const SIZES = [38, 39, 40, 41, 42, 43, 44, 45];
