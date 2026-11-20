// Authentic Starbucks Indonesia Coffee & Merchandise Catalog
const products = [
  {
    id: 1,
    name: "Sumatra Single-Origin",
    roast: "Dark Roast",
    weight: "250g",
    price: 165000,
    notes: "Earthy • Herbal • Rempah Hangat",
    isCoffee: true,
    image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&w=800&q=85",
    description: "Kopi single-origin legendaris dari pegunungan Sumatra dengan tubuh penuh (full-bodied), keasaman rendah, serta aroma rempah dan tanah vulkanik yang mendalam."
  },
  {
    id: 2,
    name: "Pike Place® Roast",
    roast: "Medium Roast",
    weight: "250g",
    price: 155000,
    notes: "Cokelat Halus • Kacang Panggang",
    isCoffee: true,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=85",
    description: "Racikan ikonik yang diciptakan untuk dinikmati setiap hari. Seimbang dengan sentuhan lembut cokelat dan kacang sangrai yang hangat."
  },
  {
    id: 3,
    name: "Starbucks® Blonde Espresso Roast",
    roast: "Blonde Roast",
    weight: "250g",
    price: 160000,
    notes: "Lembut • Manis Karamel • Sitrus",
    isCoffee: true,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=85",
    description: "Disangrai lebih singkat untuk menghasilkan profil espresso yang lembut, manis alami, dan berpadu sempurna dengan susu maupun es."
  },
  {
    id: 4,
    name: "Caffè Verona®",
    roast: "Dark Roast",
    weight: "250g",
    price: 165000,
    notes: "Dark Cocoa • Roasty Sweet",
    isCoffee: true,
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=85",
    description: "Paduan biji Amerika Latin dan Asia/Pasifik yang kaya rasa, menghadirkan nuansa dark chocolate yang sangat serasi dipadukan dengan hidangan penutup."
  },
  {
    id: 5,
    name: "Kenya Single-Origin",
    roast: "Medium Roast",
    weight: "250g",
    price: 175000,
    notes: "Grapefruit • Blackcurrant • Segar",
    isCoffee: true,
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=85",
    description: "Kopi eksotis asal Afrika Timur dengan keasaman cerah dan karakter buah sitrus serta beri merah yang menyegarkan, ideal untuk seduhan dingin maupun V60."
  },
  {
    id: 6,
    name: "House Blend",
    roast: "Medium Roast",
    weight: "250g",
    price: 150000,
    notes: "Toffee • Kacang • Seimbang",
    isCoffee: true,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=85",
    description: "Racikan pertama Starbucks sejak 1971. Biji kopi Amerika Latin pilihan yang menghasilkan aroma kaya dengan keseimbangan rasa manis toffee."
  },
  {
    id: 7,
    name: "Starbucks VIA® Colombia",
    roast: "Merchandise",
    weight: "12 Sachet",
    price: 135000,
    notes: "Kopi Instan Microground • Nutty",
    isCoffee: false,
    image: "https://images.unsplash.com/photo-1521302080334-4bebac2763a6?auto=format&fit=crop&w=800&q=85",
    description: "100% kopi Arabika Kolombia microground yang praktis diseduh di mana saja dalam hitungan detik tanpa mengorbankan karakter kopi segar."
  },
  {
    id: 8,
    name: "Reserve Stainless Tumbler 16oz",
    roast: "Merchandise",
    weight: "473 ml",
    price: 385000,
    notes: "Matte Espresso • Double-Wall Vacuum",
    isCoffee: false,
    image: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=800&q=85",
    description: "Tumbler stainless steel berdinding ganda dengan balutan warna cokelat espresso elegan untuk menjaga suhu kopi panas hingga 6 jam."
  }
];

let cart = [];
let currentFilter = 'all';
let searchQuery = '';
const FREE_SHIPPING_THRESHOLD = 250000;

function formatIDR(amount) {
  return 'Rp ' + amount.toLocaleString('id-ID');
}

// Render Products Grid
function renderProducts() {
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  const filtered = products.filter(p => {
    const matchesFilter = currentFilter === 'all' || p.roast === currentFilter;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.roast.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full text-center py-12 bg-cream rounded-2xl border border-espresso/10">
        <p class="font-serif text-xl text-espresso">Produk tidak ditemukan</p>
        <p class="text-sm text-muted mt-1">Coba kata kunci pencarian lain atau atur ulang filter kategori.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(product => `
    <div class="group bg-cream rounded-2xl overflow-hidden border border-espresso/10 hover:border-bronze/60 transition-all flex flex-col justify-between shadow-xs hover:shadow-lg">
      <div>
        <div onclick="openModal(${product.id})" class="relative aspect-square overflow-hidden bg-latte cursor-pointer">
          <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <span class="absolute top-3 left-3 bg-espresso/90 text-bronze text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
            ${product.roast}
          </span>
        </div>
        <div class="p-5">
          <div class="flex items-center justify-between text-xs text-muted mb-1">
            <span>${product.weight}</span>
            <span class="text-chestnut font-medium">${product.notes.split('•')[0]}</span>
          </div>
          <h3 onclick="openModal(${product.id})" class="font-serif text-lg font-bold text-espresso group-hover:text-chestnut transition-colors cursor-pointer">
            ${product.name}
          </h3>
          <p class="text-xs text-muted mt-1 line-clamp-2">${product.notes}</p>
        </div>
      </div>
      
      <div class="px-5 pb-5 pt-2 flex items-center justify-between border-t border-espresso/5">
        <span class="font-serif text-base font-bold text-espresso">${formatIDR(product.price)}</span>
        <button 
          onclick="openModal(${product.id})" 
          class="bg-roast hover:bg-espresso text-paper text-xs font-semibold px-3.5 py-2 rounded-full transition-colors"
        >
          + Pilih
        </button>
      </div>
    </div>
  `).join('');
}

// Filter Buttons Event Listeners
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.remove('active', 'bg-espresso', 'text-paper');
      b.classList.add('bg-cream', 'text-espresso', 'border', 'border-espresso/15');
    });
    btn.classList.add('active', 'bg-espresso', 'text-paper');
    btn.classList.remove('bg-cream', 'text-espresso', 'border', 'border-espresso/15');
    currentFilter = btn.dataset.filter;
    renderProducts();
  });
});

// Search Inputs
const searchInput = document.getElementById('searchInput');
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderProducts();
  });
}

const mobileSearchInput = document.getElementById('mobileSearchInput');
if (mobileSearchInput) {
  mobileSearchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderProducts();
  });
}

// Modal Logic
function openModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  document.getElementById('modalImage').src = product.image;
  document.getElementById('modalRoast').textContent = `${product.roast} • ${product.weight}`;
  document.getElementById('modalTitle').textContent = product.name;
  document.getElementById('modalNotes').textContent = product.notes;
  document.getElementById('modalPrice').textContent = formatIDR(product.price);
  document.getElementById('modalDesc').textContent = product.description;

  const grindContainer = document.getElementById('grindSelectorContainer');
  grindContainer.style.display = product.isCoffee ? 'block' : 'none';

  const addBtn = document.getElementById('modalAddBtn');
  addBtn.onclick = () => {
    const grind = product.isCoffee ? document.getElementById('modalGrindSelect').value : 'Standard Edition';
    addToCart(product, grind);
    closeModal();
  };

  const modal = document.getElementById('productModal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeModal() {
  const modal = document.getElementById('productModal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

// ==========================================
// FOOD & BEVERAGE FORM LOGIC
// ==========================================
function toggleOrderLocation() {
  const orderType = document.getElementById('orderType').value;
  const container = document.getElementById('locationFieldContainer');
  const label = document.getElementById('locationLabel');
  const input = document.getElementById('orderLocation');

  if (orderType.includes('Dine-In')) {
    container.style.display = 'block';
    label.textContent = 'Nomor Meja';
    input.placeholder = 'Contoh: Meja 07 — Lantai 1';
  } else if (orderType.includes('Delivery')) {
    container.style.display = 'block';
    label.textContent = 'Alamat Pengantaran Lengkap';
    input.placeholder = 'Contoh: Jl. Jenderal Sudirman No. 45, Jakarta';
  } else {
    container.style.display = 'none';
  }
}

function adjustFormQty(inputId, delta) {
  const input = document.getElementById(inputId);
  let val = parseInt(input.value, 10) || 1;
  val = Math.max(1, Math.min(20, val + delta));
  input.value = val;
  updateOrderSummary();
}

function getCafeOrderData() {
  const drinkSelect = document.getElementById('drinkSelect');
  const drinkOpt = drinkSelect.options[drinkSelect.selectedIndex];
  const drinkBasePrice = parseInt(drinkOpt.value, 10);
  const drinkName = drinkOpt.dataset.name;
  const drinkQty = parseInt(document.getElementById('drinkQty').value, 10) || 1;

  const sizeSelect = document.getElementById('drinkSize');
  const sizeOpt = sizeSelect.options[sizeSelect.selectedIndex];
  const sizePrice = parseInt(sizeOpt.value, 10);
  const sizeLabel = sizeOpt.dataset.label;

  const milkSelect = document.getElementById('drinkMilk');
  const milkOpt = milkSelect.options[milkSelect.selectedIndex];
  const milkPrice = parseInt(milkOpt.value, 10);
  const milkLabel = milkOpt.dataset.label;

  const drinkTemp = document.getElementById('drinkTemp').value;
  const sugarLevel = document.getElementById('sugarLevel').value;
  const extraShot = document.getElementById('extraShot').checked;
  const extraShotPrice = extraShot ? 8000 : 0;

  const foodSelect = document.getElementById('foodSelect');
  const foodOpt = foodSelect.options[foodSelect.selectedIndex];
  const foodPrice = parseInt(foodOpt.value, 10);
  const foodName = foodOpt.dataset.name;
  const foodQty = parseInt(document.getElementById('foodQty').value, 10) || 1;
  const warmUpFood = document.getElementById('warmUpFood').checked;

  const drinkUnitTotal = drinkBasePrice > 0 ? (drinkBasePrice + sizePrice + milkPrice + extraShotPrice) : 0;
  const drinkTotal = drinkUnitTotal * drinkQty;
  const foodTotal = foodPrice > 0 ? (foodPrice * foodQty) : 0;

  const subtotal = drinkTotal + foodTotal;
  const tax = Math.round(subtotal * 0.10);
  const grandTotal = subtotal + tax;

  return {
    drinkBasePrice,
    drinkName,
    drinkQty,
    drinkUnitTotal,
    drinkTotal,
    drinkDetails: `${drinkTemp} • ${sizeLabel} • ${milkLabel} • ${sugarLevel}${extraShot ? ' • +Extra Shot' : ''}`,
    foodPrice,
    foodName,
    foodQty,
    foodTotal,
    foodDetails: warmUpFood ? 'Dihangatkan (Warmed Up)' : 'Suhu Ruang',
    subtotal,
    tax,
    grandTotal
  };
}

function updateOrderSummary() {
  const drinkSelect = document.getElementById('drinkSelect');
  if (!drinkSelect) return;

  const data = getCafeOrderData();
  const customOptions = document.getElementById('drinkCustomOptions');
  const extrasRow = document.getElementById('drinkExtrasRow');

  customOptions.style.opacity = data.drinkBasePrice > 0 ? '1' : '0.45';
  extrasRow.style.opacity = data.drinkBasePrice > 0 ? '1' : '0.45';

  const container = document.getElementById('liveSummaryItems');
  let html = '';

  if (data.drinkBasePrice > 0) {
    html += `
      <div class="bg-roast/70 p-3.5 rounded-xl border border-bronze/20">
        <div class="flex justify-between font-semibold text-paper">
          <span>${data.drinkQty}x ${data.drinkName}</span>
          <span class="text-bronze">${formatIDR(data.drinkTotal)}</span>
        </div>
        <p class="text-[11px] text-paper/75 mt-1">${data.drinkDetails}</p>
      </div>
    `;
  }

  if (data.foodPrice > 0) {
    html += `
      <div class="bg-roast/70 p-3.5 rounded-xl border border-bronze/20">
        <div class="flex justify-between font-semibold text-paper">
          <span>${data.foodQty}x ${data.foodName}</span>
          <span class="text-bronze">${formatIDR(data.foodTotal)}</span>
        </div>
        <p class="text-[11px] text-paper/75 mt-1">${data.foodDetails}</p>
      </div>
    `;
  }

  if (!html) {
    html = `<p class="text-xs text-paper/60 italic py-2">Silakan pilih minimal satu menu minuman atau makanan pada formulir di samping.</p>`;
  }

  container.innerHTML = html;
  document.getElementById('summaryTax').textContent = formatIDR(data.tax);
  document.getElementById('summaryTotal').textContent = formatIDR(data.grandTotal);
}

// Add Cafe Order to Slide-Over Cart
function addCafeOrderToCart() {
  const data = getCafeOrderData();
  if (data.subtotal === 0) {
    alert('Silakan pilih minimal satu menu minuman atau makanan terlebih dahulu.');
    return;
  }

  if (data.drinkBasePrice > 0) {
    const existingDrink = cart.findIndex(item => item.name === data.drinkName && item.grind === data.drinkDetails);
    if (existingDrink > -1) {
      cart[existingDrink].qty += data.drinkQty;
    } else {
      cart.push({
        id: 'drink-' + Date.now(),
        name: data.drinkName,
        price: data.drinkUnitTotal,
        image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=400&q=80',
        grind: data.drinkDetails,
        qty: data.drinkQty
      });
    }
  }

  if (data.foodPrice > 0) {
    const existingFood = cart.findIndex(item => item.name === data.foodName && item.grind === data.foodDetails);
    if (existingFood > -1) {
      cart[existingFood].qty += data.foodQty;
    } else {
      cart.push({
        id: 'food-' + Date.now(),
        name: data.foodName,
        price: data.foodPrice,
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80',
        grind: data.foodDetails,
        qty: data.foodQty
      });
    }
  }

  updateCartUI();
  toggleCart(true);
}

// Submit Direct Cafe Order (Generates Barista Queue Ticket)
const cafeOrderForm = document.getElementById('cafeOrderForm');
if (cafeOrderForm) {
  cafeOrderForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const data = getCafeOrderData();
    if (data.subtotal === 0) {
      alert('Silakan pilih minimal satu menu minuman atau makanan terlebih dahulu.');
      return;
    }

    const name = document.getElementById('customerName').value.trim();
    const orderType = document.getElementById('orderType').value;
    const location = document.getElementById('orderLocation').value.trim();
    const notes = document.getElementById('orderNotes').value.trim();
    const randomQueue = '#SB-' + Math.floor(100 + Math.random() * 899);

    document.getElementById('receiptCustomer').textContent = `Atas Nama: ${name}`;
    document.getElementById('receiptQueueNumber').textContent = randomQueue;

    let detailsHtml = `<p><strong>Layanan:</strong> ${orderType}${location ? ' (' + location + ')' : ''}</p>`;
    if (data.drinkBasePrice > 0) {
      detailsHtml += `<p>• <strong>${data.drinkQty}x ${data.drinkName}</strong> — ${data.drinkDetails}</p>`;
    }
    if (data.foodPrice > 0) {
      detailsHtml += `<p>• <strong>${data.foodQty}x ${data.foodName}</strong> — ${data.foodDetails}</p>`;
    }
    if (notes) {
      detailsHtml += `<p class="italic text-muted">Catatan: "${notes}"</p>`;
    }
    detailsHtml += `<p class="pt-1 font-bold text-espresso">Total Dibayar (termasuk PB1): ${formatIDR(data.grandTotal)}</p>`;

    document.getElementById('receiptDetails').innerHTML = detailsHtml;
    const receiptCard = document.getElementById('directReceiptCard');
    receiptCard.classList.remove('hidden');
    receiptCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}

// ==========================================
// SHOPPING CART DRAWER LOGIC
// ==========================================
function addToCart(product, grind) {
  const existingIndex = cart.findIndex(item => item.id === product.id && item.grind === grind);
  if (existingIndex > -1) {
    cart[existingIndex].qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      grind: grind,
      qty: 1
    });
  }
  updateCartUI();
  toggleCart(true);
}

function updateQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  updateCartUI();
}

function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  document.getElementById('cartBadge').textContent = totalItems;
  document.getElementById('cartSubtotal').textContent = formatIDR(subtotal);

  // Update Free Shipping Progress Bar
  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  document.getElementById('shippingBar').style.width = `${progress}%`;

  const shippingText = document.getElementById('shippingText');
  if (subtotal >= FREE_SHIPPING_THRESHOLD) {
    shippingText.innerHTML = `🎉 Selamat! Anda mendapatkan <strong>Gratis Ongkir</strong> ke seluruh Indonesia.`;
  } else {
    const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
    shippingText.innerHTML = `Tambah <strong>${formatIDR(remaining)}</strong> lagi untuk mendapatkan <strong>Gratis Ongkir</strong>.`;
  }

  const container = document.getElementById('cartItemsContainer');
  const checkoutBtn = document.getElementById('checkoutBtn');

  if (cart.length === 0) {
    checkoutBtn.disabled = true;
    container.innerHTML = `
      <div class="text-center py-12 space-y-2">
        <p class="font-serif text-lg text-espresso">Keranjang Anda masih kosong</p>
        <p class="text-xs text-muted">Pilih biji kopi atau pesan makanan & minuman favorit Anda.</p>
      </div>
    `;
    return;
  }

  checkoutBtn.disabled = false;
  container.innerHTML = cart.map((item, idx) => `
    <div class="flex gap-4 bg-cream p-3.5 rounded-xl border border-espresso/10">
      <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded-lg object-cover shrink-0" />
      <div class="flex-1 min-w-0">
        <h4 class="font-serif text-sm font-bold text-espresso truncate">${item.name}</h4>
        <p class="text-[11px] text-chestnut mt-0.5 line-clamp-2">${item.grind}</p>
        <p class="text-xs font-bold text-espresso mt-1">${formatIDR(item.price)}</p>
      </div>
      <div class="flex flex-col items-end justify-between">
        <div class="flex items-center gap-2 bg-paper border border-espresso/15 rounded-full px-2 py-0.5">
          <button onclick="updateQty(${idx}, -1)" class="text-xs font-bold text-espresso hover:text-chestnut px-1">−</button>
          <span class="text-xs font-semibold text-espresso">${item.qty}</span>
          <button onclick="updateQty(${idx}, 1)" class="text-xs font-bold text-espresso hover:text-chestnut px-1">+</button>
        </div>
      </div>
    </div>
  `).join('');
}

function toggleCart(forceOpen = null) {
  const drawer = document.getElementById('cartDrawer');
  document.getElementById('checkoutMessage').classList.add('hidden');
  if (forceOpen === true) {
    drawer.classList.remove('hidden');
  } else if (forceOpen === false) {
    drawer.classList.add('hidden');
  } else {
    drawer.classList.toggle('hidden');
  }
}

function checkoutOrder() {
  if (cart.length === 0) return;
  cart = [];
  updateCartUI();
  document.getElementById('checkoutMessage').classList.remove('hidden');
}

function subscribeClub() {
  document.getElementById('subscribeFeedback').classList.remove('hidden');
}

// Initialize Page
renderProducts();
updateOrderSummary();
updateCartUI();