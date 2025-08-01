    let products = [], filteredProducts = [], currentPage = 1;
    const productsPerPage = 12;

    function renderProducts(list) {
      const container = document.getElementById("product-list");
      const resultCount = document.getElementById("result-count");
      container.innerHTML = "";
      resultCount.textContent = `Menampilkan ${list.length} produk`;

      const start = (currentPage - 1) * productsPerPage;
      const paginated = list.slice(start, start + productsPerPage);
      if (paginated.length === 0) {
        container.innerHTML = `<p class="text-center text-muted">Data tidak ditemukan.</p>`;
        resultCount.textContent = "";
        document.getElementById("pagination").innerHTML = "";
        return;
      }

      paginated.forEach(product => {
        const linkGalery = "https://gudang.skytama.com/storage/"
        const img = product.galeri?.[0]?.file_path
          ? product.galeri[0].file_path
          : "https://via.placeholder.com/280x180?text=No+Image";
        const kategori = product.kategori || "Tanpa kategori";

        const card = `
          <div class="col-12 col-sm-4 col-md-4 col-lg-4 d-flex"
                onclick='showProductDetail(${JSON.stringify(product)})'
                style="cursor: pointer;" >
            <div class="product-card w-100 d-flex flex-column">
              <img src="${linkGalery}${img}" alt="${product.nama_barang}" class="product-image mb-1">
              <h5>${product.nama_barang}</h5>
              <p><strong>Harga:</strong> Rp ${parseInt(product.harga_jual).toLocaleString()}</p>
              <p><strong>Stok:</strong> ${product.stok}</p>
            </div>
          </div>`;
        container.innerHTML += card;
      });

      renderPagination(list.length);
    }

    function renderPagination(total) {
      const totalPages = Math.ceil(total / productsPerPage);
      const pagination = document.getElementById("pagination");
      pagination.innerHTML = "";

      if (totalPages <= 1) return;

      const ul = document.createElement("ul");
      ul.className = "pagination justify-content-center flex-wrap";

      const createItem = (text, page, disabled = false, active = false) => {
        const li = document.createElement("li");
        li.className = `page-item ${disabled ? "disabled" : ""} ${active ? "active" : ""}`;

        const a = document.createElement("a");
        a.className = "page-link";
        a.href = "#";
        a.textContent = text;

        a.onclick = (e) => {
          e.preventDefault();
          if (!disabled && !active) {
            currentPage = page;
            renderProducts(filteredProducts);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        };

        li.appendChild(a);
        return li;
      };

      ul.appendChild(createItem("Previous", currentPage - 1, currentPage === 1));

      for (let i = 1; i <= totalPages; i++) {
        if (
          i === 1 || 
          i === totalPages || 
          (i >= currentPage - 1 && i <= currentPage + 1)
        ) {
          ul.appendChild(createItem(i, i, false, i === currentPage));
        } else if (
          i === currentPage - 2 || 
          i === currentPage + 2
        ) {
          const li = document.createElement("li");
          li.className = "page-item disabled";
          li.innerHTML = `<span class="page-link">...</span>`;
          ul.appendChild(li);
        }
      }

      ul.appendChild(createItem("Next", currentPage + 1, currentPage === totalPages));
      pagination.appendChild(ul);
    }

    function showProductDetail(product) {
      const modalTitle = document.getElementById("productDetailTitle");
      window.currentDetailProduct = product;
      const modalBody = document.getElementById("productDetailBody");

      const img = (product.galeri && product.galeri.length > 0 && product.galeri[0].file_path)
        ? `https://gudang.skytama.com/storage/${product.galeri[0].file_path}`
        : "https://via.placeholder.com/280x180?text=No+Image";

      const stokLabel = parseInt(product.stok) <= 3
        ? `<span class="badge bg-danger">Stok hampir habis!</span>`
        : `${product.stok}`;

      modalTitle.textContent = product.nama_barang;

      modalBody.innerHTML = `
        <div class="row g-3">
          <div class="col-md-5">
            ${product.galeri && product.galeri.length > 1 ? `
              <div id="carouselDetail" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                  ${product.galeri.map((g, i) => `
                    <div class="carousel-item ${i === 0 ? 'active' : ''}">
                      <img src="https://gudang.skytama.com/storage/${g.file_path}" 
                          class="d-block w-100 rounded img-fluid" 
                          alt="Foto ${i + 1}">
                    </div>
                  `).join('')}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselDetail" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Sebelumnya</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselDetail" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Berikutnya</span>
                </button>
              </div>
            ` : `
              <img src="${img}" class="img-fluid rounded" alt="${product.nama_barang}">
            `}
          </div>
          <div class="col-md-7">
            <p><strong>Nama Barang:</strong> ${product.nama_barang}</p>
            <p><strong>Deskripsi:</strong><br>${product.deskripsi || '-'}</p>
            <p><strong>Kategori:</strong> ${product.kategori || 'Tanpa kategori'}</p>
            <p><strong>Harga:</strong> Rp ${parseInt(product.harga_jual).toLocaleString()}</p>
            <p><strong>Stok:</strong> ${stokLabel}</p>
            
          <div class="d-flex justify-content-between align-items-center my-2">
            <div class="input-group" style="width: 130px; max-width: 100%;">
              <button class="btn btn-outline-secondary btn-sm" onclick="adjustQty(-1)">−</button>
              <input type="number" id="detailQty" value="1" class="form-control text-center" min="1">
              <button class="btn btn-outline-secondary btn-sm" onclick="adjustQty(1)">+</button>
            </div>
            <button class="btn btn-success flex-grow-1 ms-2" onclick='addDetailToCart()'>
              <i class="fas fa-cart-plus"></i> Tambah ke Keranjang
            </button>
          </div>
          </div>
        </div>
      `;

      const modal = new bootstrap.Modal(document.getElementById('productDetailModal'));
      modal.show();
    }

    function adjustQty(amount) {
      const qtyInput = document.getElementById("detailQty");
      let qty = parseInt(qtyInput.value);
      if (isNaN(qty)) qty = 1;
      qty += amount;
      if (qty < 1) qty = 1;
      qtyInput.value = qty;
    }

    function addDetailToCart() {
      const qtyInput = document.getElementById("detailQty");
      let qty = parseInt(qtyInput.value);
      if (isNaN(qty) || qty < 1) qty = 1;

      const product = window.currentDetailProduct;
      const stok = parseInt(product.stok);
      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      const existing = cart.find(item => item.id === product.id);
      const jumlahSekarang = existing ? existing.jumlah : 0;

      if (jumlahSekarang + qty > stok) {
        showToast("Jumlah melebihi stok!", true);
        return;
      }

      if (existing) {
        existing.jumlah += qty;
      } else {
        const gambar = (product.galeri && product.galeri[0]?.file_path)
        ? `https://gudang.skytama.com/storage/${product.galeri[0].file_path}`
        : "https://via.placeholder.com/50";

        cart.push({
          id: product.id,
          nama_barang: product.nama_barang,
          harga_jual: parseInt(product.harga_jual),
          jumlah: qty,
          stok: stok,
          gambar: gambar
        });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      showToast(`${product.nama_barang} ditambahkan ke keranjang!`);
    }

    function updateCartCount() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const totalQty = cart.reduce((sum, item) => sum + item.jumlah, 0);
      document.getElementById("cart-count").textContent = totalQty;
    }

    function showToast(message, isError = false) {
      const toastBody = document.getElementById('cartToastBody');
      toastBody.textContent = message;

      const toastEl = document.getElementById('cartToast');
      toastEl.className = `toast align-items-center text-white border-0 bg-${isError ? 'danger' : 'success'}`;

      const toast = bootstrap.Toast.getOrCreateInstance(toastEl, {
        delay: 1500,
        autohide: true
      });

      toast.show();
    }

    function showCart() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const modalBody = document.getElementById("cartModalBody");

      if (cart.length === 0) {
        modalBody.innerHTML = "<p class='text-muted'>Keranjang masih kosong.</p>";
      } else {
        let total = 0;
        let list = cart.map(item => {
          const subtotal = item.harga_jual * item.jumlah;
          total += subtotal;

          return `
            <tr>
              <td>${item.nama_barang}</td>
              <td>
                <div class="d-flex align-items-center gap-2 cart-item-controls">
                  <button class="btn btn-sm btn-outline-secondary" onclick="decreaseQuantity(${item.id})">−</button>
                  <input type="number" min="1" class="form-control form-control-sm text-center" 
                    value="${item.jumlah}" style="width: 60px;" 
                    onchange="updateQuantityManual(${item.id}, this.value)">
                  <button class="btn btn-sm btn-outline-secondary" onclick="increaseQuantity(${item.id})">+</button>
                  <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
              </td>
              <td>Rp ${item.harga_jual.toLocaleString()}</td>
              <td>Rp ${subtotal.toLocaleString()}</td>
            </tr>`;
        }).join("");

        modalBody.innerHTML = `
          <table class="table table-sm align-middle">
            <thead>
              <tr>
                <th>Nama Barang</th>
                <th>Jumlah</th>
                <th>Harga</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>${list}</tbody>
            <tfoot>
              <tr>
                <td colspan="3"><strong>Total</strong></td>
                <td><strong>Rp ${total.toLocaleString()}</strong></td>
              </tr>
            </tfoot>
          </table>
        `;
      }

      const modal = new bootstrap.Modal(document.getElementById("cartModal"));
      modal.show();

      document.querySelectorAll('.modal-backdrop').forEach(b => b.remove());
    }

    function updateQuantityManual(id, value) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const item = cart.find(p => p.id === id);
      const stok = item.stok || 99;
      let jumlah = parseInt(value);
      if (isNaN(jumlah) || jumlah < 1) jumlah = 1;

      if (jumlah > stok ) {
        showToast("Jumlah melebihi stok!", true);
        showCart();
        return;
      }

      item.jumlah = jumlah;
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      showCart();
    }

  function increaseQuantity(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(p => p.id === id);
    const stok = item.stok || 99;

    if (item.jumlah + 1 > stok) {
      showToast("Jumlah melebihi stok!", true);
      return;
    }

    item.jumlah += 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showCart();
    clearModalBackdrop();
  }

  function decreaseQuantity(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const index = cart.findIndex(p => p.id === id);
    if (index > -1) {
      cart[index].jumlah -= 1;
      if (cart[index].jumlah <= 0) {
        cart.splice(index, 1); 
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      showCart();
      clearModalBackdrop();
    }
  }

  function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showCart();
    clearModalBackdrop();
  }

    function clearCart() {
      localStorage.removeItem('cart');
      updateCartCount();

      const modalEl = document.getElementById('cartModal');
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      modalInstance.hide();

      setTimeout(() => {
        document.getElementById("cartModalBody").innerHTML = "<p class='text-muted'>Keranjang masih kosong.</p>";
        clearModalBackdrop();
      }, 300); 
    }

    function clearModalBackdrop() {
      document.querySelectorAll('.modal-backdrop').forEach(b => b.remove());
      document.body.classList.remove('modal-open');
      document.body.style = '';
    }

    function handleLogin() {
      const name = document.getElementById("name-input").value.trim();
      const phone = document.getElementById("phone-input").value.trim();
      const email = document.getElementById("email-input").value.trim();

      if (!name || !phone || !email) {
        showToast("Semua kolom wajib diisi!", true);
        return;
      }

      localStorage.setItem("pelanggan", JSON.stringify({ name, phone, email }));

      const loginModal = bootstrap.Modal.getInstance(document.getElementById("loginModal"));
      loginModal.hide();

      showToast("Login berhasil!");
      proceedToCheckout();
    }

    function proceedToCheckout() {
      const pelanggan = JSON.parse(localStorage.getItem("pelanggan"));
      const cart = JSON.parse(localStorage.getItem('cart')) || [];

      if (!pelanggan || !pelanggan.name || !pelanggan.phone || !pelanggan.email) {
        showToast("Login dulu yuk baru checkout!", true);
        const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        loginModal.show();
        return;
      }

      for (const item of cart) {
        if (item.jumlah > (item.stok || 99)) {
          showToast(`Stok ${item.nama_barang} tidak mencukupi!`, true);
          return;
        }
      }

      showCheckoutModal(pelanggan);
    }

    function showCheckoutModal(pelanggan) {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      if (cart.length === 0) {
        showToast("Keranjang kosong!", true);
        return;
      }

      let total = 0;
      let daftarProduk = cart.map(item => {
        const subtotal = item.harga_jual * item.jumlah;
        total += subtotal;
        return `
          <tr>
            <td><img src="${item.gambar || 'https://via.placeholder.com/50'}" alt="${item.nama_barang}" style="width: 50px; height: 50px; object-fit: cover;"></td>
            <td>${item.nama_barang}</td>
            <td>${item.jumlah}</td>
            <td>Rp ${item.harga_jual.toLocaleString()}</td>
            <td>Rp ${(item.harga_jual * item.jumlah).toLocaleString()}</td>
          </tr>
        `;
      }).join("");

      const html = `
        <h5 class="mb-1">Informasi Pelanggan</h5>
        <div class="mb-1"><strong>Nama:</strong> ${pelanggan.name}</div>
        <div class="mb-1"><strong>Nomor WA:</strong> ${pelanggan.phone}</div>
        <div class="mb-1"><strong>Email:</strong> ${pelanggan.email}</div>
        <div class="mb-2">
          <label for="alamatCheckout" class="form-label"><strong>Alamat Lengkap</strong></label>
          <textarea class="form-control" id="alamatCheckout" rows="2" placeholder="Tulis alamat pengiriman..."></textarea>
        </div>

        <hr>
        <h5>Daftar Produk</h5>
        <div class="table-responsive">
          <table class="table table-sm align-middle">
            <thead>
              <tr>
                <th>Gambar</th>
                <th>Nama Barang</th>
                <th>Jumlah</th>
                <th>Harga</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>${daftarProduk}</tbody>
          </table>
        </div>

        <div class="mb-3">
          <label for="catatanCheckout" class="form-label"><strong>Catatan untuk Penjual</strong></label>
          <textarea class="form-control" id="catatanCheckout" rows="2" placeholder="(Opsional) Tambahan catatan..."></textarea>
        </div>

        <div class="row g-3 mb-3">
          <div class="col-md-6">
            <label for="jasaKirim" class="form-label"><strong>Opsi Pengiriman</strong></label>
            <select id="jasaKirim" class="form-select">
              <option value="" disabled selected>Pilih Jasa Kirim</option>
              <option value="JNE">JNE</option>
              <option value="J&T">J&T</option>
            </select>
          </div>
          <div class="col-md-6">
            <label for="pembayaran" class="form-label"><strong>Metode Pembayaran</strong></label>
            <select id="pembayaran" class="form-select">
              <option value="" disabled selected>Pilih Metode Pembayaran</option>
              <option value="COD">COD (Bayar di Tempat)</option>
              <option value="Transfer Bank">Transfer Bank</option>
              <option value="E-Wallet">E-Wallet (Dana/OVO/Gopay)</option>
            </select>
          </div>
        </div>

        <hr>
        <h5>Total Pembayaran</h5>
        <p class="fs-5"><strong>Total:</strong> Rp ${total.toLocaleString()}</p>

        <div class="d-flex justify-content-between">
          <button class="btn btn-outline-secondary" onclick="backToCart()">← Kembali ke Keranjang</button>

          <button id="submitOrderBtn" class="btn btn-primary" onclick="submitOrder()">
            Konfirmasi Pesanan
          </button>
        </div>
      `;

      const modalBody = document.getElementById("checkoutModalBody");
      modalBody.innerHTML = html;

      const modal = new bootstrap.Modal(document.getElementById("checkoutModal"));
      modal.show();
    }
 
    function backToCart() {
      const checkoutModal = bootstrap.Modal.getInstance(document.getElementById("checkoutModal"));
      if (checkoutModal) checkoutModal.hide();

      setTimeout(() => {
        showCart();
      }, 300);
    }

    function submitOrder() {
      const alamat = document.getElementById("alamatCheckout")?.value.trim();
      const catatan = document.getElementById("catatanCheckout")?.value.trim() || "-";
      const jasaKirim = document.getElementById("jasaKirim")?.value;
      const pembayaran = document.getElementById("pembayaran")?.value;

      if (!alamat || !jasaKirim || !pembayaran) {
        showToast("Mohon lengkapi semua data checkout!", true);
        return;
      }

      const pelanggan = JSON.parse(localStorage.getItem("pelanggan")) || {};
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      for (const item of cart) {
        if (item.jumlah > (item.stok || 99)) {
          showToast(`Stok ${item.nama_barang} tidak mencukupi saat checkout!`, true);
          return;
        }
      }

      let pesan = `Halo Admin, saya ingin melakukan pemesanan:\n\n`;
      pesan += `*Nama:* ${pelanggan.name}\n`;
      pesan += `*No. WhatsApp:* ${pelanggan.phone}\n`;
      pesan += `*Email:* ${pelanggan.email}\n`;
      pesan += `*Alamat:* ${alamat}\n`;
      pesan += `*Catatan:* ${catatan}\n\n`;
      pesan += `*Daftar Pesanan:*\n`;

      let total = 0;
      cart.forEach(item => {
        const subtotal = item.harga_jual * item.jumlah;
        total += subtotal;
        pesan += `- ${item.nama_barang} x${item.jumlah} = Rp ${subtotal.toLocaleString()}\n`;
      });

      pesan += `\n*Total Pembayaran:* Rp ${total.toLocaleString()}\n`;
      pesan += `*Pengiriman:* ${jasaKirim}\n`;
      pesan += `*Pembayaran:* ${pembayaran}\n`;

      window.latestOrderMessage = pesan;

      let htmlSummary = `
        <h5 class="mb-3">Informasi Pelanggan</h5>
        <div class="mb-1"><strong>Nama:</strong> ${pelanggan.name}</div>
        <div class="mb-1"><strong>No. WhatsApp:</strong> ${pelanggan.phone}</div>
        <div class="mb-1"><strong>Email:</strong> ${pelanggan.email}</div>
        <div class="mb-1"><strong>Alamat:</strong> ${alamat}</div>
        <div class="mb-3"><strong>Catatan:</strong> ${catatan}</div>

        <h5 class="mb-3">Daftar Produk</h5>
        <div class="table-responsive">
          <table class="table table-bordered align-middle text-center">
            <thead class="table-light">
              <tr>
                <th>Gambar</th>
                <th>Nama Barang</th>
                <th>Jumlah</th>
                <th>Harga Satuan</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
      `;

      cart.forEach(item => {
        const subtotal = item.harga_jual * item.jumlah;
        htmlSummary += `
          <tr>
            <td><img src="${item.gambar || 'https://via.placeholder.com/50'}" style="width: 50px; height: 50px; object-fit: cover;" alt="gambar produk"></td>
            <td>${item.nama_barang}</td>
            <td>${item.jumlah}</td>
            <td>Rp ${item.harga_jual.toLocaleString()}</td>
            <td>Rp ${subtotal.toLocaleString()}</td>
          </tr>
        `;
      });

      htmlSummary += `
            </tbody>
            <tfoot>
              <tr>
                <td colspan="4"><strong>Total</strong></td>
                <td><strong>Rp ${total.toLocaleString()}</strong></td>
              </tr>
              <tr>
                <td colspan="2"><strong>Pengiriman</strong>: ${jasaKirim}</td>
                <td colspan="3"><strong>Pembayaran</strong>: ${pembayaran}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      `;

      const checkoutModal = bootstrap.Modal.getInstance(document.getElementById("checkoutModal"));
      if (checkoutModal) checkoutModal.hide();

      document.getElementById("alamatCheckout").value = "";
      document.getElementById("catatanCheckout").value = "";
      document.getElementById("jasaKirim").selectedIndex = 0;
      document.getElementById("pembayaran").selectedIndex = 0;

      const cartModal = bootstrap.Modal.getInstance(document.getElementById("cartModal"));
      if (cartModal) cartModal.hide();

      document.getElementById("summaryModalBody").innerHTML = htmlSummary;
      const summaryModal = new bootstrap.Modal(document.getElementById("summaryModal"));
      summaryModal.show();
          }

      function lanjutWhatsApp() {
        const encoded = encodeURIComponent(window.latestOrderMessage || "");
        const waUrl = `https://wa.me/6285608902857?text=${encoded}`;
        window.open(waUrl, "_blank");
        setTimeout(() => {
          btn.disabled = false;
          spinner.classList.add("d-none");
          btnText.textContent = "Konfirmasi Pesanan";
        }, 500);


        localStorage.removeItem("cart");
        updateCartCount();
        document.getElementById("checkoutModalBody").innerHTML = "";

        const modal = bootstrap.Modal.getInstance(document.getElementById("summaryModal"));
        if (modal) modal.hide();

        showToast("Pesanan dikirim ke WhatsApp!");
      }

    function resetToHome() {
      const summaryModal = bootstrap.Modal.getInstance(document.getElementById("summaryModal"));
      if (summaryModal) summaryModal.hide();
      showToast("Yuk lanjut belanja lagi!");
    }

    function populateCategoryFilter(data) {
      const select = document.getElementById("category-filter");
      const kategoriSet = new Set();
      data.forEach(p => p.kategori && kategoriSet.add(p.kategori));
      kategoriSet.forEach(kat => {
        const opt = document.createElement("option");
        opt.value = kat;
        opt.textContent = kat;
        select.appendChild(opt);
      });
    }

    function populateSubcategoryFilter(data) {
      const select = document.getElementById("subcategory-filter");
      const subkategoriSet = new Set();
      data.forEach(p => {
        const sub = p.deskripsi?.split(" ")[0];
        if (sub) subkategoriSet.add(sub);
      });
      select.innerHTML = `<option value="">Semua Sub Kategori</option>`;
      subkategoriSet.forEach(sub => {
        const opt = document.createElement("option");
        opt.value = sub;
        opt.textContent = sub;
        select.appendChild(opt);
      });
    }

    function filterProducts() {
      const keyword = document.getElementById("search-input").value.toLowerCase();
      const category = document.getElementById("category-filter").value;
      const subCategory = document.getElementById("subcategory-filter").value;
      const minPrice = parseInt(document.getElementById("min-price").value) || 0;
      const maxPrice = parseInt(document.getElementById("max-price").value) || Infinity;

      filteredProducts = products.filter(p => {
        const name = p.nama_barang?.toLowerCase() || "";
        const kode = (p.kode_barang || "").toLowerCase();
        const harga = parseInt(p.harga_jual) || 0;
        const kategori = p.kategori || "";
        const deskripsi = p.deskripsi?.toLowerCase() || "";

        const matchKeyword = name.includes(keyword) || kode.includes(keyword);
        const matchCategory = category === "" || kategori === category;
        const matchSubCategory = subCategory === "" || deskripsi.includes(subCategory.toLowerCase());
        const matchPrice = harga >= minPrice && harga <= maxPrice;

        return matchKeyword && matchCategory && matchPrice && matchSubCategory;
      });

      const sortBy = document.getElementById("sort-filter").value;
      filteredProducts = sortProducts(filteredProducts, sortBy);

      currentPage = 1;
      renderProducts(filteredProducts);
    }

    function sortProducts(list, sortBy) {
      switch (sortBy) {
        case "az":
          return list.sort((a, b) => a.nama_barang.toLowerCase().localeCompare(b.nama_barang.toLowerCase()));
        case "za":
          return list.sort((a, b) => b.nama_barang.toLowerCase().localeCompare(a.nama_barang.toLowerCase()));
        case "harga_asc":
          return list.sort((a, b) => parseInt(a.harga_jual) - parseInt(b.harga_jual));
        case "harga_desc":
          return list.sort((a, b) => parseInt(b.harga_jual) - parseInt(a.harga_jual));
        default:
          return list;
      }
    }

    function resetFilters() {
      document.getElementById("search-input").value = "";
      document.getElementById("category-filter").value = "";
      document.getElementById("subcategory-filter").value = "";
      document.getElementById("min-price").value = "";
      document.getElementById("max-price").value = "";
      document.getElementById("sort-filter").value = "";
      filteredProducts = [...products];
      currentPage = 1;
      renderProducts(filteredProducts);
    }

    document.getElementById("search-input").addEventListener("input", filterProducts);
    document.getElementById("loginForm").addEventListener("submit", function(e) {
      e.preventDefault();
      handleLogin();
    });


    fetch('https://gudang.skytama.com/api/public-barang')
      .then(res => {
        if (!res.ok) throw new Error("Gagal memuat Barang.json");
        return res.json();
      })
      .then(data => {
        products = data;
        filteredProducts = [...products];
        populateCategoryFilter(products);
        populateSubcategoryFilter(products);
        renderProducts(filteredProducts);
        updateCartCount();

      })
      .catch(error => {
        console.error("Error:", error);
        document.getElementById("product-list").innerHTML = `<p class="text-danger text-center mt-4">Gagal memuat data produk.</p>`;
      });