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

## 📂 Struktur Folder
```plaintext
📦 project-root/
├── 📄 index.html              # Halaman katalog utama
├── 📄 barang-habis.html       # Halaman daftar produk stok habis
│
├── 📂 js/
│   ├── 📄 script.js           # Script utama katalog
│   ├── 📄 outofstock.js       # Script khusus barang habis
│   ├── 📄 config.js           # Konfigurasi API & path gambar
│   └── 📄 config.sample.js    # Contoh file konfigurasi
│
├── 📂 css/
│   └── 📄 style.css           # Style global
│
├── 📄 README.md               # Dokumentasi proyek
└── 📄 CHANGELOG.md            # Catatan perubahan proyek

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

## 🛡️
File `js/config.js` tidak diikutsertakan karena berisi konfigurasi lokal.
Silakan salin `config.sample.js` menjadi `config.js` lalu isi sesuai kebutuhan:
$ cp js/config.sample.js js/config.js

## 🧑‍💻 Catatan PKL (Progress Harian)
Lihat changelog di CHANGELOG.md

## 📬 Kontak & Kredit
Dibuat oleh: Alhayu Navisa
- 📧 GitHub - @BlackLillyy
- 🎓 Untuk keperluan PKL (Praktik Kerja Lapangan)
— feel free to fork or ask! 🙌