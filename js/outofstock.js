async function loadOutOfStock() {
  const res = await fetch(ENV.API_URL);
  const data = await res.json();
  const list = document.getElementById("out-of-stock-list");

  const outOfStock = data.filter(item => parseInt(item.stok) === 0);

  if (outOfStock.length === 0) {
    list.innerHTML = `<p class="text-muted">Tidak ada barang habis saat ini.</p>`;
    return;
  }

  outOfStock.forEach(product => {
    const img = (product.galeri && product.galeri[0]?.file_path)
      ? ENV.IMAGE_BASE_URL + product.galeri[0].file_path
      : ENV.PLACEHOLDER_IMAGE;

    const col = document.createElement("div");
    col.className = "col-md-3 mb-4";
    col.innerHTML = `
      <div class="card h-100 border bg-light text-center">
        <img src="${img}" class="card-img-top" alt="${product.nama_barang}" style="height: 180px; object-fit: contain; background-color: white;">
        <div class="card-body">
          <h6 class="card-title">${product.nama_barang}</h6>
          <p class="text-danger mb-1 fw-bold">Stok Habis</p>
          <p class="text-muted small">Kategori: ${product.kategori || '-'}</p>
          <p class="text-muted small">Terjual: ${product.terjual || 0}</p>
        </div>
      </div>
    `;
    list.appendChild(col);
  });
}

document.addEventListener("DOMContentLoaded", loadOutOfStock);