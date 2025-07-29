# Webpage Katalog Produk

Katalog produk interaktif berbasis web yang dibangun untuk kebutuhan proyek PKL. Website ini menampilkan daftar barang dengan fitur pencarian, filter, dan keranjang belanja. Dibuat dengan fokus pada pengalaman pengguna yang responsif dan sederhana.

---

## 🚀 Demo

🔗 [Lihat versi demo online](https://blacklillyy.github.io/Webpage-Katalog/)

---

## ✨ Fitur Utama

- 🔍 Pencarian produk real-time berdasarkan nama atau kode
- 🗂️ Filter berdasarkan harga, kategori, dan subkategori
- 💸 Sort harga termurah/termahal di dalam modal filter
- 📷 Carousel untuk produk dengan lebih dari 1 gambar
- 🛒 Tambah ke keranjang dengan jumlah stok real-time
- 🔔 Notifikasi toast (termasuk validasi saat belum login)
- 📱 Tampilan responsive di semua ukuran layar

---

## ⚙️ Teknologi yang Digunakan

- HTML5
- CSS3
- JavaScript (vanilla)
- [Bootstrap 5](https://getbootstrap.com/)
- [Font Awesome](https://fontawesome.com/)
- API publik dari [gudang.skytama.com](https://gudang.skytama.com)

---

## 📁 Struktur Folder

/
├── index.html
├── style.css
├── script.js
├── /assets
│ └── gambar dan ikon

---

## 🛠️ Cara Menjalankan Secara Lokal

> ⚠️ Jangan buka file langsung lewat `file:///` karena `fetch()` akan gagal.

1. Clone repo:
   ```bash
   git clone https://github.com/BlackLillyy/Webpage-Katalog.git
Jalankan lokal dengan:

Ekstensi Live Server (jika pakai VSCode), atau

Jalankan di server lokal:
npx serve
# atau
python3 -m http.server
Akses di browser melalui http://localhost:PORT/

📝 Progress PKL 29/7/2025
✅ Bug Fix
✅ Penyesuaian harga jual
✅ Responsive layout
✅ Penghapusan tombol detail
✅ Carousel untuk foto ganda
✅ Penataan ulang search + filter + cart
✅ Visual pagination dan notifikasi toast
✅ Hapus & ubah sistem sort ke dalam modal

📬 Kontak & Kredit
Dibuat oleh: Alhayu Navisa
📧 GitHub - @BlackLillyy
🎓 Untuk keperluan PKL (Praktik Kerja Lapangan)
— feel free to fork or ask! 🙌