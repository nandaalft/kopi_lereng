// Data produk. Day 4 nanti dipindah ke js/products.js
const products = [
  { id: 1, name: "Ungaran Honey", origin: "Ungaran, Jawa Tengah", roast: "Light", price: 85000, color: "#c98f4b" },
  { id: 2, name: "Temanggung Natural", origin: "Temanggung, Jawa Tengah", roast: "Medium", price: 78000, color: "#6b3f1d" },
  { id: 3, name: "Gayo Wine", origin: "Aceh Tengah", roast: "Dark", price: 92000, color: "#2a1a12" },
];

const formatRupiah = (n) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);

const grid = document.getElementById("productGrid");
const cartCount = document.getElementById("cartCount");
const toast = document.getElementById("toast");
let count = 0; // sementara di memori, Day 7 diganti localStorage
let toastTimer;

function renderProducts() {
  grid.innerHTML = products
    .map(
      (p) => `
      <article class="card">
        <div class="swatch" style="background:${p.color}" aria-hidden="true"></div>
        <h3>${p.name}</h3>
        <p class="meta">${p.origin} &bull; Roast ${p.roast}</p>
        <div class="row">
          <span class="price">${formatRupiah(p.price)}</span>
          <button class="add" data-id="${p.id}">Tambah</button>
        </div>
      </article>`
    )
    .join("");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2000);
}

grid.addEventListener("click", (e) => {
  const btn = e.target.closest(".add");
  if (!btn) return;
  const product = products.find((p) => p.id === Number(btn.dataset.id));
  count += 1;
  cartCount.textContent = count;
  showToast(`${product.name} masuk keranjang`);
});

renderProducts();