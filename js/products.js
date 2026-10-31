/* =========================================================
   Catálogo de productos
   - Para usar fotos reales: añade `img: "assets/productos/archivo.webp"`
     a cualquier producto y se mostrará en lugar de la ilustración.
   - Los colores (`c`) generan la ilustración SVG de la zapatilla:
     base = cuerpo, accent = franja, sole = suela, lace = cordones, bg = fondo de la tarjeta.
   ========================================================= */
const PRODUCTS = [
  { id: "volt-runner",   name: "Volt Runner",    line: "Running",   cat: "running",   price: 139, tag: "NEW",
    c: { base: "#d4ff00", accent: "#111111", sole: "#ffffff", lace: "#111111", bg: "#2e5bff" } },
  { id: "neon-drift",    name: "Neon Drift",     line: "Lifestyle", cat: "lifestyle", price: 119, oldPrice: 149, tag: "-20%",
    c: { base: "#ff2e88", accent: "#ffe600", sole: "#ffffff", lace: "#ffffff", bg: "#111111" } },
  { id: "court-king",    name: "Court King Hi",  line: "Basket",    cat: "basket",    price: 169, tag: "HOT",
    c: { base: "#ffffff", accent: "#ff4d00", sole: "#111111", lace: "#ff4d00", bg: "#ffe600" } },
  { id: "street-pulse",  name: "Street Pulse",   line: "Skate",     cat: "skate",     price: 89,
    c: { base: "#111111", accent: "#00e5ff", sole: "#f2efe6", lace: "#f2efe6", bg: "#ff2e88" } },
  { id: "aero-flux",     name: "Aero Flux 2",    line: "Running",   cat: "running",   price: 155, tag: "NEW",
    c: { base: "#ff4d00", accent: "#ffffff", sole: "#111111", lace: "#ffffff", bg: "#d4ff00" } },
  { id: "blackout",      name: "Blackout Pro",   line: "Basket",    cat: "basket",    price: 189,
    c: { base: "#1a1a1a", accent: "#d4ff00", sole: "#d4ff00", lace: "#d4ff00", bg: "#7a2cff" } },
  { id: "ice-wave",      name: "Ice Wave",       line: "Lifestyle", cat: "lifestyle", price: 129,
    c: { base: "#00e5ff", accent: "#2e5bff", sole: "#ffffff", lace: "#ffffff", bg: "#ff4d00" } },
  { id: "grape-jam",     name: "Grape Jam",      line: "Skate",     cat: "skate",     price: 95, oldPrice: 110, tag: "-15%",
    c: { base: "#7a2cff", accent: "#ff2e88", sole: "#f2efe6", lace: "#ffe600", bg: "#00e5ff" } },
  { id: "sunset-dash",   name: "Sunset Dash",    line: "Running",   cat: "running",   price: 145,
    c: { base: "#ffe600", accent: "#ff2e88", sole: "#111111", lace: "#111111", bg: "#ff4d00" } },
  { id: "chalk-classic", name: "Chalk Classic",  line: "Lifestyle", cat: "lifestyle", price: 99, tag: "HOT",
    c: { base: "#f2efe6", accent: "#2e5bff", sole: "#c8452c", lace: "#f2efe6", bg: "#ff2e88" } },
  { id: "lava-dunk",     name: "Lava Dunk",      line: "Basket",    cat: "basket",    price: 175, tag: "NEW",
    c: { base: "#c8102e", accent: "#111111", sole: "#ffffff", lace: "#ffffff", bg: "#ffe600" } },
  { id: "toxic-grind",   name: "Toxic Grind",    line: "Skate",     cat: "skate",     price: 92,
    c: { base: "#39ff14", accent: "#7a2cff", sole: "#111111", lace: "#111111", bg: "#111111" } },
];

/* Lanzamiento destacado (sección DROP) */
const DROP = {
  id: "hyper-volt-x",
  name: "Hyper Volt X",
  line: "Edición limitada · 500 pares",
  cat: "running",
  price: 249,
  tag: "DROP",
  c: { base: "#111111", accent: "#ff2e88", sole: "#ffffff", lace: "#d4ff00", bg: "#111111" },
  // Fecha de lanzamiento: 7 días a partir de hoy (cámbiala por una fecha fija, p. ej. "2026-11-14T18:00:00")
  date: new Date(Date.now() + 7 * 24 * 3600 * 1000 + 5 * 3600 * 1000).toISOString(),
};

const SIZES = [38, 39, 40, 41, 42, 43, 44, 45];
