# Danh sách ảnh trong dự án — SoundWave

Dự án đang dùng **21 ảnh thật tải từ Unsplash** trong thư mục `images/`. Nếu muốn thay bằng ảnh khác, chỉ cần **ghi đè ảnh mới với đúng tên tệp** (giữ nguyên định dạng `.jpg`), không phải sửa HTML/CSS.

Nguồn ảnh chi tiết: [`IMAGE_CREDITS.md`](IMAGE_CREDITS.md).

## Yêu cầu chung

- **Định dạng:** `.jpg` (khuyến nghị) hoặc `.png` / `.webp` — nếu đổi đuôi, cần sửa đường dẫn trong HTML.
- **Dung lượng:** dưới ~400KB/ảnh để GitHub Pages tải nhanh.
- **Ảnh chân dung:** để khuôn mặt ở giữa khung, vì ảnh ca sĩ được cắt thành **hình tròn**.
- **Ảnh bìa album:** nên là ảnh vuông, không có chữ nhỏ ở sát mép (bị cắt khi thu nhỏ).

---

## Bảng ảnh chi tiết (21 ảnh)

### 1. Hero & bài viết (4 ảnh)

| # | Tệp | Kích thước | Tỉ lệ | Dùng ở | Nội dung gợi ý khi thay |
| --- | --- | --- | --- | --- | --- |
| 1 | `images/hero.jpg` | 1600 × 900 | 16:9 | `index.html` — nền hero | Ảnh concert / sân khấu ánh tím–hồng, không chữ, tối để chữ trắng nổi bật |
| 2 | `images/article-1.jpg` | 1600 × 900 | 16:9 | `detail.html` — ảnh bìa bài viết | Chân dung nghệ sĩ / phòng thu / sân khấu, tông trầm |
| 3 | `images/article-2.jpg` | 800 × 450 | 16:9 | `detail.html` — ảnh trong bài & thumbnail | Ảnh album, guitar, phòng thu |
| 4 | `images/article-3.jpg` | 800 × 450 | 16:9 | `detail.html` — thumbnail bài liên quan | Ảnh tai nghe, bàn học, không gian Lo-Fi |

### 2. Ảnh bìa album / single (8 ảnh)

| # | Tệp | Kích thước | Tỉ lệ | Gắn với | Nội dung gợi ý khi thay |
| --- | --- | --- | --- | --- | --- |
| 5 | `images/cover-1.jpg` | 800 × 800 | 1:1 | Single “Đường Về Nhà” — Mây Lang Thang | Phố chiều, tông tím–hồng |
| 6 | `images/cover-2.jpg` | 800 × 800 | 1:1 | Album “Đêm Sài Gòn” — Hà Anh | Phố đêm Sài Gòn, tông xanh–navy |
| 7 | `images/cover-3.jpg` | 800 × 800 | 1:1 | Album “Tia Nắng” — The Lighters | Nắng, bầu trời, tông cam–đỏ |
| 8 | `images/cover-4.jpg` | 800 × 800 | 1:1 | Album “Sáng Tối” — Bùi Lan | Cà phê, cửa sổ, tông nâu–vàng |
| 9 | `images/cover-5.jpg` | 800 × 800 | 1:1 | Album “Neon City” — DJ Kaze | Đèn neon, thành phố đêm, tông xanh–tím |
| 10 | `images/cover-6.jpg` | 800 × 800 | 1:1 | Album “Phố Cũ” — Mây Lang Thang | Phố cổ Hà Nội, tông tím–nâu |
| 11 | `images/cover-7.jpg` | 800 × 800 | 1:1 | Single “Bình Yên Nơi Em” — Hà Anh | Hoàng hôn, tông hồng–tím |
| 12 | `images/cover-8.jpg` | 800 × 800 | 1:1 | Album “Tập Trung” — Lo-Fi Club | Bàn học, đèn ngủ, tông xanh–cyan |

> **Mẹo:** `cover-6.jpg` là bìa album “Phố Cũ” nên xuất hiện nhiều nhất (trang album, tracklist, sidebar). Hãy chọn ảnh đẹp nhất cho tệp này.

### 3. Ảnh ca sĩ (4 ảnh — cắt hình tròn)

| # | Tệp | Kích thước | Dùng ở | Nội dung gợi ý khi thay |
| --- | --- | --- | --- | --- |
| 13 | `images/artist-1.jpg` | 800 × 800 | Mây Lang Thang — `artist-songs.html`, sidebar, album | Chân dung nam, phong cách indie, mặt ở giữa |
| 14 | `images/artist-2.jpg` | 800 × 800 | Hà Anh — danh sách gợi ý | Chân dung nữ, tông hồng |
| 15 | `images/artist-3.jpg` | 800 × 800 | The Lighters — danh sách gợi ý | Ảnh nhóm nhạc 3–4 người |
| 16 | `images/artist-4.jpg` | 800 × 800 | DJ Kaze — danh sách gợi ý | Chân dung DJ, phông neon |

### 4. Nhạc sĩ (1 ảnh)

| # | Tệp | Kích thước | Dùng ở | Nội dung gợi ý khi thay |
| --- | --- | --- | --- | --- |
| 17 | `images/composer-1.jpg` | 800 × 800 | `composer-songs.html` — hồ sơ nhạc sĩ | Chân dung nhạc sĩ bên piano/guitar |

### 5. Đội ngũ (4 ảnh)

| # | Tệp | Kích thước | Dùng ở | Nội dung gợi ý khi thay |
| --- | --- | --- | --- | --- |
| 18 | `images/avatar-1.jpg` | 600 × 600 | `about.html` — Đinh Nhật Phong | Chân dung thành viên |
| 19 | `images/avatar-2.jpg` | 600 × 600 | `about.html` — Nguyễn Thu Hà | Chân dung thành viên |
| 20 | `images/avatar-3.jpg` | 600 × 600 | `about.html` — Trần Quốc Bảo | Chân dung thành viên |
| 21 | `images/avatar-4.jpg` | 600 × 600 | `about.html` — Lê Minh Anh; `detail.html` — tác giả bài viết | Chân dung thành viên |

---

## Cách thay nhanh

1. Chuẩn bị ảnh đúng tên như bảng trên (có thể dùng công cụ như Squoosh/TinyPNG để nén).
2. Mở thư mục `images/`, kéo ảnh mới vào và chọn **Replace** khi Windows hỏi.
3. Tải lại trang (`Ctrl + F5`) để xoá cache ảnh cũ.

## Nếu muốn dùng ít ảnh hơn

Có thể dùng cùng một ảnh cho nhiều tệp bằng cách copy và đổi tên, ví dụ dùng chung một ảnh phòng thu cho `cover-1.jpg` … `cover-8.jpg`. Website vẫn chạy bình thường, chỉ kém đa dạng về hình ảnh.

## Thay ảnh / khôi phục

- **Thay ảnh:** ghi đè tệp cùng tên trong `images/`, sau đó nhấn `Ctrl + F5`.
- **Tải lại bộ ảnh Unsplash hiện tại:** chạy `tools/fetch-images.ps1`.
- **Tạo lại ảnh placeholder gradient (nếu muốn):** chạy `tools/generate-images.ps1`.

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File tools/fetch-images.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File tools/generate-images.ps1
```
