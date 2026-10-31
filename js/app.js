/* =========================================================
   elSneaker — lógica de la tienda
   ========================================================= */
(() => {
  const CURRENCY = "EUR";
  const FREE_SHIPPING = 120;
  const SHIPPING_COST = 4.95;
  const STORAGE_KEY = "elsneaker-cart";

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const money = (n) => new Intl.NumberFormat("es-ES", { style: "currency", currency: CURRENCY, maximumFractionDigits: n % 1 ? 2 : 0 }).format(n);
  const ALL = [...PRODUCTS, DROP];
  const byId = (id) => ALL.find((p) => p.id === id);

  /* ---------- Ilustración SVG de zapatilla ---------- */
  function sneakerSVG({ base, accent, sole, lace }) {
    return `<svg viewBox="0 0 400 230" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M28 176 Q26 206 62 208 L352 208 Q388 206 386 182 L382 168 L32 166 Z" fill="${sole}"/>
      <path d="M30 168 L383 170 L385 184 Q300 190 30 186 Z" fill="${accent}" opacity=".9"/>
      <g stroke="#000" stroke-opacity=".18" stroke-width="3">
        <line x1="70" y1="198" x2="80" y2="208"/><line x1="110" y1="198" x2="120" y2="208"/><line x1="150" y1="198" x2="160" y2="208"/>
        <line x1="190" y1="198" x2="200" y2="208"/><line x1="230" y1="198" x2="240" y2="208"/><line x1="270" y1="198" x2="280" y2="208"/>
        <line x1="310" y1="198" x2="320" y2="208"/><line x1="350" y1="198" x2="358" y2="206"/>
      </g>
      <path d="M36 168 L46 98 Q52 66 88 70 L124 76 Q146 80 156 98 L182 120 Q206 136 246 140 L312 146 Q372 152 384 170 Z" fill="${base}"/>
      <path d="M36 168 L46 98 Q52 66 88 70 L124 76 Q146 80 156 98 L182 120 Q206 136 246 140 L312 146 Q372 152 384 170 Z" fill="none" stroke="#000" stroke-opacity=".25" stroke-width="3"/>
      <path d="M300 146 Q368 150 384 170 L304 168 Q292 156 300 146 Z" fill="${accent}" opacity=".85"/>
      <path d="M40 140 L46 98 Q50 80 64 76 L70 140 Z" fill="${accent}"/>
      <path d="M58 86 Q90 74 128 88 Q118 104 76 104 Z" fill="#111" opacity=".85"/>
      <path d="M96 160 Q190 104 330 118 Q330 124 322 126 Q206 132 112 166 Z" fill="${accent}"/>
      <g fill="${lace}" stroke="#000" stroke-opacity=".2" stroke-width="1">
        <rect x="140" y="92" width="26" height="6" rx="3" transform="rotate(32 153 95)"/>
        <rect x="156" y="104" width="26" height="6" rx="3" transform="rotate(32 169 107)"/>
        <rect x="172" y="115" width="26" height="6" rx="3" transform="rotate(30 185 118)"/>
        <rect x="190" y="124" width="26" height="6" rx="3" transform="rotate(24 203 127)"/>
      </g>
      <path d="M60 110 Q140 96 230 132" stroke="#fff" stroke-opacity=".28" stroke-width="5" fill="none" stroke-linecap="round"/>
    </svg>`;
  }
  const shoeMarkup = (p) => (p.img ? `<img src="${p.img}" alt="${p.name}" loading="lazy" />` : sneakerSVG(p.c));
  const isDark = (hex) => {
    const n = parseInt(hex.slice(1), 16);
    return ((n >> 16) * 299 + ((n >> 8) & 255) * 587 + (n & 255) * 114) / 1000 < 110;
  };

  /* ---------- Tarjeta compacta (pasarelas y carrusel) ---------- */
  function railCard(p) {
    const fg = isDark(p.c.bg) ? "#f5f3ec" : "#0b0b0b";
    return `<article class="rcard" style="--bg:${p.c.bg};--fg:${fg}">
      ${p.tag ? `<span class="rcard__tag">${p.tag}</span>` : "<span></span>"}
      <div class="rcard__shoe">${shoeMarkup(p)}</div>
      <div class="rcard__info">
        <div><div class="rcard__name">${p.name}</div><div class="rcard__price">${money(p.price)}</div></div>
        <button class="rcard__add" data-add="${p.id}" aria-label="Añadir ${p.name} al carrito">+</button>
      </div>
    </article>`;
  }

  /* ---------- Pasarelas verticales ---------- */
  const lanes = $$(".lane__track");
  lanes.forEach((track, i) => {
    // Cada pasarela recibe un orden distinto de productos
    const list = PRODUCTS.filter((_, idx) => idx % lanes.length === i).concat(PRODUCTS.filter((_, idx) => idx % lanes.length !== i).slice(i, i + 2));
    const html = list.map(railCard).join("");
    track.innerHTML = html + html; // duplicado para el bucle infinito
  });

  /* ---------- Carrusel horizontal ---------- */
  const belt = $("#belt");
  const best = [...PRODUCTS].reverse();
  belt.innerHTML = (best.map(railCard).join("")).repeat(2);

  /* ---------- Catálogo ---------- */
  const grid = $("#grid");
  grid.innerHTML = PRODUCTS.map((p) => `
    <article class="card" data-cat="${p.cat}" data-id="${p.id}">
      <div class="card__media" style="--bg:${p.c.bg}" data-word="${p.line}">
        ${p.tag ? `<span class="card__tag" ${p.oldPrice ? "data-sale" : ""}>${p.tag}</span>` : ""}
        <div class="card__shoe">${shoeMarkup(p)}</div>
      </div>
      <div class="card__body">
        <div class="card__top">
          <div><div class="card__line">${p.line}</div><h3 class="card__name">${p.name}</h3></div>
          <div class="card__price">${p.oldPrice ? `<s>${money(p.oldPrice)}</s>` : ""}${money(p.price)}</div>
        </div>
        <div class="sizes" role="radiogroup" aria-label="Talla">
          ${SIZES.map((s) => `<button class="size${s === 42 ? " is-active" : ""}" data-size="${s}" role="radio" aria-checked="${s === 42}">${s}</button>`).join("")}
        </div>
        <button class="btn btn--primary btn--block card__add" data-add="${p.id}">Añadir al carrito</button>
      </div>
    </article>`).join("");

  // Selección de talla
  grid.addEventListener("click", (e) => {
    const s = e.target.closest(".size");
    if (!s) return;
    $$(".size", s.parentElement).forEach((b) => { b.classList.remove("is-active"); b.setAttribute("aria-checked", "false"); });
    s.classList.add("is-active"); s.setAttribute("aria-checked", "true");
  });

  // Filtros
  function applyFilter(f) {
    $$(".chip").forEach((c) => c.classList.toggle("is-active", c.dataset.filter === f));
    $$(".card", grid).forEach((card, i) => {
      const show = f === "all" || card.dataset.cat === f;
      card.classList.toggle("is-hidden", !show);
      card.classList.remove("pop");
      if (show) { void card.offsetWidth; card.style.animationDelay = `${(i % 8) * 40}ms`; card.classList.add("pop"); }
    });
  }
  $("#filters").addEventListener("click", (e) => { const c = e.target.closest(".chip"); if (c) applyFilter(c.dataset.filter); });
  $$(".cat").forEach((a) => a.addEventListener("click", () => applyFilter(a.dataset.cat)));

  // Efecto 3D al pasar el ratón
  if (matchMedia("(hover: hover)").matches) {
    grid.addEventListener("pointermove", (e) => {
      const card = e.target.closest(".card"); if (!card) return;
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      card.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
    });
    grid.addEventListener("pointerout", (e) => {
      const card = e.target.closest(".card");
      if (card && !card.contains(e.relatedTarget)) card.style.transform = "";
    });
  }

  /* ---------- Drop ---------- */
  $("#dropShoe").innerHTML = sneakerSVG(DROP.c);
  $("#dropName").textContent = DROP.name;
  $("#dropLine").textContent = DROP.line;
  $("#dropPrice").textContent = money(DROP.price);
  $("#dropAdd").dataset.add = DROP.id;
  const target = new Date(DROP.date).getTime();
  const units = { d: 86400000, h: 3600000, m: 60000, s: 1000 };
  function tick() {
    let diff = Math.max(0, target - Date.now());
    for (const [u, ms] of Object.entries(units)) {
      const v = Math.floor(diff / ms); diff -= v * ms;
      const el = $(`[data-unit="${u}"]`); const txt = String(v).padStart(2, "0");
      if (el.textContent !== txt) el.textContent = txt;
    }
  }
  tick(); setInterval(tick, 1000);

  /* ---------- Carrito ---------- */
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { cart = []; }
  cart = cart.filter((i) => byId(i.id));
  const save = () => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); } catch {} };

  const cartEl = $("#cart"), overlay = $("#overlay"), cartBtn = $("#cartBtn");
  $("#emptyShoe").innerHTML = sneakerSVG({ base: "#d4ff00", accent: "#ff2e88", sole: "#111", lace: "#111" });

  function openCart() { cartEl.classList.add("is-open"); overlay.classList.add("is-open"); cartEl.setAttribute("aria-hidden", "false"); document.body.classList.add("no-scroll"); $("#cartClose").focus(); }
  function closeCart() { cartEl.classList.remove("is-open"); overlay.classList.remove("is-open"); cartEl.setAttribute("aria-hidden", "true"); document.body.classList.remove("no-scroll"); }
  cartBtn.addEventListener("click", openCart);
  $("#cartClose").addEventListener("click", closeCart);
  overlay.addEventListener("click", closeCart);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeCart(); });
  $$("[data-close-cart]").forEach((a) => a.addEventListener("click", closeCart));

  function addToCart(id, size = 42, qty = 1) {
    const line = cart.find((i) => i.id === id && i.size === size);
    if (line) line.qty += qty; else cart.push({ id, size, qty });
    save(); renderCart();
  }

  function renderCart() {
    const count = cart.reduce((a, i) => a + i.qty, 0);
    const subtotal = cart.reduce((a, i) => a + byId(i.id).price * i.qty, 0);
    const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING ? 0 : SHIPPING_COST;

    $("#cartCount").textContent = count;
    $("#cartHeadCount").textContent = count;
    cartEl.classList.toggle("is-empty", count === 0);

    $("#cartItems").innerHTML = cart.map((i, idx) => {
      const p = byId(i.id);
      return `<li class="citem" data-idx="${idx}">
        <div class="citem__img" style="--bg:${p.c.bg}">${shoeMarkup(p)}</div>
        <div>
          <p class="citem__name">${p.name}</p>
          <div class="citem__meta">Talla
            <select data-size-idx="${idx}" aria-label="Talla">${SIZES.map((s) => `<option${s === i.size ? " selected" : ""}>${s}</option>`).join("")}</select>
          </div>
          <div class="qty">
            <button data-qty="-1" data-idx="${idx}" aria-label="Quitar uno">−</button>
            <span>${i.qty}</span>
            <button data-qty="1" data-idx="${idx}" aria-label="Añadir uno">+</button>
          </div>
        </div>
        <div class="citem__side">
          <span class="citem__price">${money(p.price * i.qty)}</span>
          <button class="citem__remove" data-remove="${idx}">Eliminar</button>
        </div>
      </li>`;
    }).join("");

    $("#cartSubtotal").textContent = money(subtotal);
    $("#cartShipping").textContent = shipping ? money(shipping) : "Gratis";
    $("#cartTotal").textContent = money(subtotal + shipping);

    const left = FREE_SHIPPING - subtotal;
    $("#shipMsg").innerHTML = left > 0 ? `Te faltan <b>${money(left)}</b> para el envío gratis` : "🔥 ¡Tienes envío gratis!";
    $("#shipBar").style.width = `${Math.min(100, (subtotal / FREE_SHIPPING) * 100)}%`;
  }

  $("#cartItems").addEventListener("click", (e) => {
    const q = e.target.closest("[data-qty]");
    const r = e.target.closest("[data-remove]");
    if (q) {
      const line = cart[+q.dataset.idx];
      line.qty += +q.dataset.qty;
      if (line.qty <= 0) return removeLine(+q.dataset.idx);
      save(); renderCart();
    }
    if (r) removeLine(+r.dataset.remove);
  });
  function removeLine(idx) {
    const li = $(`.citem[data-idx="${idx}"]`);
    const done = () => { cart.splice(idx, 1); save(); renderCart(); };
    if (li) { li.classList.add("leaving"); li.addEventListener("animationend", done, { once: true }); } else done();
  }
  $("#cartItems").addEventListener("change", (e) => {
    const sel = e.target.closest("[data-size-idx]"); if (!sel) return;
    const idx = +sel.dataset.sizeIdx, size = +sel.value, line = cart[idx];
    const dup = cart.findIndex((i, k) => k !== idx && i.id === line.id && i.size === size);
    if (dup > -1) { cart[dup].qty += line.qty; cart.splice(idx, 1); } else line.size = size;
    save(); renderCart();
  });

  $("#checkout").addEventListener("click", () => toast("Demo: aquí se conectaría la pasarela de pago 💳"));

  // Añadir desde cualquier botón [data-add]
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-add]"); if (!btn) return;
    const p = byId(btn.dataset.add);
    const card = btn.closest(".card");
    const size = card ? +$(".size.is-active", card).dataset.size : 42;
    const source = btn.closest(".rcard, .card, .drop__inner");
    flyToCart(source && $(".rcard__shoe, .card__shoe, .drop__shoe", source), p);
    addToCart(p.id, size);
    toast(`✔ ${p.name} · talla ${size} añadida`);
  });

  /* ---------- Animación "vuela al carrito" ---------- */
  function flyToCart(from, p) {
    const cartRect = cartBtn.getBoundingClientRect();
    const bump = () => { cartBtn.classList.remove("bump"); void cartBtn.offsetWidth; cartBtn.classList.add("bump"); };
    if (!from || matchMedia("(prefers-reduced-motion: reduce)").matches) return bump();
    const r = from.getBoundingClientRect();
    const fly = document.createElement("div");
    fly.className = "flyer"; fly.innerHTML = shoeMarkup(p);
    fly.style.left = `${r.left + r.width / 2 - 60}px`; fly.style.top = `${r.top + r.height / 2 - 35}px`;
    document.body.appendChild(fly);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const dx = cartRect.left + cartRect.width / 2 - (r.left + r.width / 2);
      const dy = cartRect.top + cartRect.height / 2 - (r.top + r.height / 2);
      fly.style.transform = `translate(${dx}px, ${dy}px) scale(.15) rotate(-40deg)`;
      fly.style.opacity = ".4";
    }));
    setTimeout(() => { fly.remove(); bump(); }, 800);
  }

  /* ---------- Toast ---------- */
  let toastT;
  function toast(msg) {
    const t = $("#toast"); t.textContent = msg; t.classList.add("is-show");
    clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("is-show"), 2200);
  }

  /* ---------- Newsletter ---------- */
  $("#clubForm").addEventListener("submit", (e) => { e.preventDefault(); e.target.reset(); toast("¡Bienvenido al Club! Revisa tu email 📬"); });

  /* ---------- Cabecera, menú móvil y revelados ---------- */
  const header = $("#header");
  addEventListener("scroll", () => header.classList.toggle("is-scrolled", scrollY > 40), { passive: true });
  const burger = $("#burger"), nav = $("#nav");
  burger.addEventListener("click", () => { burger.classList.toggle("is-open"); nav.classList.toggle("is-open"); });
  $$("a", nav).forEach((a) => a.addEventListener("click", () => { burger.classList.remove("is-open"); nav.classList.remove("is-open"); }));

  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
  }), { threshold: .15 });
  $$(".reveal").forEach((el, i) => { el.style.transitionDelay = `${(i % 4) * 80}ms`; io.observe(el); });

  // Contadores del hero
  $$("[data-count]").forEach((el) => {
    const end = +el.dataset.count, t0 = performance.now(), dur = 1400;
    const step = (t) => { const k = Math.min(1, (t - t0) / dur); el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  });

  $("#year").textContent = new Date().getFullYear();
  renderCart();
})();
