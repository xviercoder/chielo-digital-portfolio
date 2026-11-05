# UNESA Preloved — Premium Frontend Prototype

Prototype frontend statis untuk konsep marketplace barang preloved khusus mahasiswa UNESA.

## Halaman
- `index.html` — Landing page dengan sticky scroll transformation: barang → nilai → rupiah.
- `login.html` — Login/Register dengan validasi demo domain `@mhs.unesa.ac.id`.
- `marketplace.html` — Main marketplace, search, category filter, product cards.
- `detail.html` — Detail listing.
- `sell.html` — Form jual barang + upload preview.

## Menjalankan lokal
Bisa dibuka langsung dari `index.html`, tetapi disarankan memakai local server:

```bash
python -m http.server 8080
```

Lalu buka `http://localhost:8080`.

## Deployment Vercel
Karena ini static site, folder ini dapat di-push ke GitHub dan di-import langsung di Vercel tanpa build command.

## Tahap integrasi produksi
1. Supabase Auth: validasi email institusi pada server/auth layer, bukan hanya JavaScript frontend.
2. Supabase database: `profiles`, `items`, `transactions`, optional `favorites`, `messages`.
3. RLS: user hanya boleh update/delete item yang `seller_id = auth.uid()`.
4. Cloudinary: signed upload atau server-side signature. Jangan menyimpan API secret di frontend.
5. Marketplace: ganti dummy cards dengan query Supabase.
6. Detail: load item berdasarkan ID/slug.
7. Sell form: upload gambar → ambil secure_url Cloudinary → insert item ke Supabase.

## Catatan desain
Warna: navy + gold + warm cream. Landing page tidak sekadar katalog; inti naratifnya adalah transformasi barang yang tidak lagi digunakan menjadi nilai ekonomi yang kembali ke mahasiswa.
