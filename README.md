# Panduan Portfolio (untuk pemula)

## 1–2. Membuat folder & file
Buat folder `portfolio`. Di dalamnya: `index.html`, folder `assets` berisi `css/style.css`, `js/script.js`, dan `img/` (+ `img/portfolio/`). Salin isi tiap file dari paket ini ke file yang namanya sama (pakai Notepad / VS Code).

## 3. Ganti foto profil
Simpan fotomu sebagai `assets/img/profile.jpg` (rasio 3:4, vertikal, ±800×1066 px). Nama harus sama persis.

## 4. Foto mode Spider-Man
Buat foto transformasinya sendiri (pakai editor foto seperti Photoshop/Canva atau generator gambar AI dari fotomu sendiri), lalu simpan sebagai `assets/img/profile-spiderman.jpg` dengan rasio sama. Sebelum file ada, kartu menampilkan kotak placeholder.

## 5. Gambar portfolio
Simpan gambar di `assets/img/portfolio/` dengan nama: film-pendek.jpg, possma-v.jpg, teaser.jpg, lawu.jpg, film2.png, raung.jpg. Kecilkan ukuran (lebar ±1200 px, di bawah 300 KB) lewat squoosh.app agar web cepat.

## 6. Tambah project baru
Buka `assets/js/script.js`, cari `const projects = [`. Salin satu blok `{ ... }`, tempel di bawahnya (jangan lupa koma), ubah isinya. Kosongkan `link:""` jika belum ada link; tombol otomatis disembunyikan. Kategori baru perlu ditambahkan di daftar `const cats`.

## 7. Ganti playlist Spotify
Di `index.html` cari `open.spotify.com/embed/playlist/`. Ganti ID setelah `playlist/` (bagian sebelum tanda `?`) dengan ID playlist barumu.

## 8. Ganti media sosial
Di `index.html` cari `<section id="findme">`. Ubah `href` dan teks username. Nomor WhatsApp untuk form kontak ada di `script.js`: `WA_NUMBER`.

## 9. Menjalankan di komputer
Klik dua kali `index.html`. Atau di VS Code pasang ekstensi "Live Server", klik kanan `index.html` > Open with Live Server.

## 10. Upload online (gratis)
- **Netlify**: buka app.netlify.com/drop, tarik folder `portfolio` ke halaman itu.
- **GitHub Pages**: buat repo, upload semua isi folder, lalu Settings > Pages > pilih branch `main`.

## Komentar untuk semua pengunjung (Supabase)
Komentar sekarang tersimpan di browser pengunjung saja (localStorage). Agar terlihat semua orang: buat project di supabase.com, buat tabel `comments` (kolom `name`, `text`, `created_at`), aktifkan Row Level Security dengan policy insert + select untuk publik, lalu di `script.js` ganti fungsi `load` dan penyimpanan dengan `fetch` ke REST API Supabase memakai URL project dan anon key-mu.

## Bagian yang sering diubah
Teks hero/about/pendidikan: `index.html` · Warna: `:root` di `style.css` · Karya & nomor WA: `script.js`.

## Kartu ID 3D
Kartu memakai Three.js (dimuat dari internet, jadi perlu koneksi). Agar foto tampil di kartu, buka web lewat Live Server atau setelah di-upload online; membuka `index.html` langsung dengan klik dua kali membuat browser memblokir foto di kartu 3D (muncul tulisan "Buka lewat Live Server").
