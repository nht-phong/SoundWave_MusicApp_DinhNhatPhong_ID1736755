# SoundWave — Nền tảng Âm nhạc Trực tuyến

> **Đồ án Frontend** · Sinh viên: **Đinh Nhật Phong** — MSSV: **ID1736755**

## Live Demo

> 🔗 **GitHub Pages:** https://nht-phong.github.io/SoundWave_MusicApp_DinhNhatPhong_ID1736755/
>
> 💻 **Repository:** https://github.com/nht-phong/SoundWave_MusicApp_DinhNhatPhong_ID1736755
>
> 🎬 **Video demo:** [`video/SoundWave_Demo_DinhNhatPhong_ID1736755.mp4`](video/SoundWave_Demo_DinhNhatPhong_ID1736755.mp4)

## Code annotations

> For the purpose of future learning I have included many annotations throughout the HTML files.

SoundWave là giao diện website nghe nhạc hiện đại dành cho giới trẻ, lấy cảm hứng từ sự kết hợp giữa Spotify và SoundCloud. Dự án được xây dựng hoàn toàn bằng **HTML5 Semantic + CSS3 + JavaScript thuần**, không dùng framework, tối ưu cho GitHub Pages.

## 1. Tính năng chính

| Nhóm | Chi tiết |
| --- | --- |
| Giao diện | Dark theme, gradient tím–hồng, glassmorphism, font Be Vietnam Pro + Outfit |
| Bố cục | CSS Grid + Flexbox cho bảng xếp hạng, lưới album, trang tìm kiếm, pricing |
| Responsive | Mobile `< 768px`, Tablet `768–1024px`, Desktop `≥ 1024px` |
| Audio Player | Thanh phát nhạc cố định `position: fixed` ở đáy, phát MP3 thật, play/pause, tua, âm lượng, chuyển bài, yêu thích |
| Tìm kiếm | Lọc theo từ khóa, thể loại, năm phát hành; sắp xếp mới nhất / nghe nhiều / A–Z; đếm kết quả |
| Liên kết chéo | Bài hát → Ca sĩ → Nhạc sĩ → Album → Tin tức → Premium |
| Tương tác | Menu mobile, nút theo dõi, form liên hệ có validate, bảng giá tháng/năm, FAQ accordion |
| Bonus | Trang Premium với bảng so sánh gói cước và toggle giá; trang chính sách có mục lục sticky |

## 2. Danh sách trang (11 trang)

| # | Tệp | Nội dung |
| --- | --- | --- |
| 1 | `index.html` | Trang chủ: hero, bảng xếp hạng tuần, chuyên mục, album mới, banner Premium |
| 2 | `search.html` | Tìm kiếm nâng cao + bộ lọc + lưới kết quả |
| 3 | `song-detail.html` | Chi tiết ca khúc “Out of the Mountain”: banner, metadata, lời tiếng Anh, gợi ý |
| 4 | `artist-songs.html` | Hồ sơ JAPANDEE + bảng ca khúc + album |
| 5 | `composer-songs.html` | Hồ sơ producer Kai Nguyen + gia tài sáng tác + giải thưởng |
| 6 | `album-songs.html` | Album “Neon District”: ảnh bìa lớn, thông tin, tracklist 8 bài |
| 7 | `detail.html` | Bài phỏng vấn/review chuyên sâu kèm sidebar tác giả và bài liên quan |
| 8 | `about.html` | Sứ mệnh, giá trị, thống kê, đội ngũ phát triển |
| 9 | `contact.html` | Form liên hệ có validate + hotline/email + Google Maps |
| 10 | `policy-terms.html` | DMCA, bảo mật, điều khoản dịch vụ, điều khoản Premium, quy tắc cộng đồng |
| 11 | `premium.html` | **Bonus:** bảng giá 3 gói, so sánh quyền lợi, FAQ |

## 3. Cấu trúc thư mục

```text
big assignment/
├── index.html
├── search.html
├── song-detail.html
├── artist-songs.html
├── composer-songs.html
├── album-songs.html
├── detail.html
├── about.html
├── contact.html
├── policy-terms.html
├── premium.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── audio/                ← 4 bài nhạc dùng cho player (track-1..4.mp3)
├── video/                ← video demo sản phẩm (MP4)
├── images/               ← 21 ảnh thật từ Unsplash (xem IMAGES.md)
├── tools/                ← script build, tải ảnh & tạo placeholder (không bắt buộc nộp)
├── IMAGES.md             ← danh sách 21 ảnh và cách thay
├── IMAGE_CREDITS.md      ← nguồn ảnh & âm thanh
├── VIDEO_SCRIPT.md       ← kịch bản quay video mô tả sản phẩm
├── assignment.md         ← đề bài gốc
├── .nojekyll             ← tắt Jekyll khi deploy GitHub Pages
└── README.md
```

## 4. Chạy dự án

Mở trực tiếp `index.html` bằng trình duyệt là đủ. Nếu muốn chạy qua local server:

```bash
# Python
python -m http.server 4321

# hoặc Node.js
npx serve .
```

Sau đó mở `http://localhost:4321`.

## 5. Ảnh trong dự án

Toàn bộ ảnh nằm trong `images/` và hiện tại là **21 ảnh thật tải từ Unsplash** (miễn phí, theo Unsplash License). Ảnh đã được cắt đúng tỉ lệ cho từng vị trí: hero 16:9, bìa album 1:1, chân dung 1:1.

> **Muốn đổi ảnh?** Chỉ cần ghi đè ảnh mới với đúng tên tệp — không cần sửa HTML/CSS.
> Chi tiết kích thước, tỉ lệ và nội dung gợi ý cho từng ảnh: xem [`IMAGES.md`](IMAGES.md).
> Nguồn ảnh đầy đủ: [`IMAGE_CREDITS.md`](IMAGE_CREDITS.md).

Mẹo: nén ảnh JPEG dưới ~400KB/ảnh để GitHub Pages tải nhanh.

## 6. Âm thanh

Player sử dụng thẻ `<audio>` của HTML5 và phát 4 bài nhạc trong thư mục `audio/`:

| Tệp | Bài hát gốc (audio) | Tên hiển thị trên website | Thời lượng | Bitrate |
| --- | --- | --- | --- | --- |
| `audio/track-1.mp3` | Xuất Sơn [出山] — JAPANDEE Remix | Out of the Mountain | 5:58 | 192 kbps |
| `audio/track-2.mp3` | Ăn Trông Nồi Ngồi Trông Hướng — Duzme Remix | Mind the Pot | 3:50 | 139 kbps |
| `audio/track-3.mp3` | Tinh Vệ (精卫) — JAPANDEE Remix | Jingwei | 4:18 | 192 kbps |
| `audio/track-4.mp3` | 雨爱DJ — 杨丞琳 (XiaoXu Music) | Rain Love | 3:17 | 192 kbps |

- Toàn bộ bài hát được phát đầy đủ; thời lượng hiển thị lấy trực tiếp từ metadata MP3.
- Mọi nút Play trên trang đều phát một trong 4 bài này; tiêu đề/ảnh bìa trên player vẫn đổi theo bài hát hư cấu được chọn.
- Tên bài/ảnh bìa hiển thị trên player là nội dung hư cấu của website; 4 file audio là các bài thật do chủ dự án cung cấp.
- Muốn thay nhạc: ghi đè `audio/track-1.mp3` … `track-4.mp3` bằng file MP3 cùng tên. Player tự đọc thời lượng mới, không cần sửa code.
- Lưu ý: trình duyệt chỉ cho phép phát audio sau khi người dùng bấm Play (chính sách autoplay), nên hãy bấm nút ▶ ở thanh player hoặc nút Play trên thẻ bài hát.
- Bản quyền 4 bài nhạc thuộc về các tác giả/nghệ sĩ gốc; dự án chỉ dùng cho mục đích học tập. Nếu repository được công khai, cân nhắc thay bằng nhạc bạn có quyền phân phối.

## 7. Triển khai GitHub Pages

1. Tạo repository công khai tên **`SoundWave_MusicApp_DinhNhatPhong_ID1736755`**.
2. Đưa toàn bộ mã nguồn lên nhánh `main`:

```bash
git init
git add .
git commit -m "feat: SoundWave music platform"
git branch -M main
git remote add origin https://github.com/<username>/SoundWave_MusicApp_DinhNhatPhong_ID1736755.git
git push -u origin main
```

3. Vào **Settings → Pages**, chọn:
   - **Source:** Deploy from a branch
   - **Branch:** `main` · **Folder:** `/ (root)`
4. Chờ 1–2 phút, link sẽ có dạng:
   `https://<username>.github.io/SoundWave_MusicApp_DinhNhatPhong_ID1736755/`
5. Dán link vào phần đầu README này (mục _Live Demo_).

## 8. Kiểm thử đã thực hiện

- [x] 11/11 trang mở thành công, không lỗi console.
- [x] 21 ảnh thật từ Unsplash đúng kích thước/tỉ lệ, không ảnh lỗi.
- [x] Kiểm tra toàn bộ liên kết nội bộ và ảnh (không có 404).
- [x] Audio player: phát MP3 thật, play/pause, tua, âm lượng, chuyển bài, thanh tiến trình theo thời gian thực.
- [x] Tìm kiếm: lọc kết hợp + sắp xếp + đếm kết quả + trạng thái rỗng.
- [x] Form liên hệ: validate họ tên, email, loại yêu cầu, nội dung.
- [x] Pricing toggle tháng/năm; FAQ accordion.
- [x] Responsive tại 390px, 768px, 1024px, 1440px.
- [x] Điều hướng bàn phím, skip-link, `aria-*`, `prefers-reduced-motion`.

## 9. Công nghệ

- HTML5 Semantic (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`, `table`, `dl`)
- CSS3: Custom Properties, Grid, Flexbox, `clamp()`, `aspect-ratio`, `backdrop-filter`, media queries
- JavaScript ES6 thuần: DOM, event delegation, form validation, HTMLAudioElement
- Google Fonts: Be Vietnam Pro + Outfit
- Hình ảnh: 21 ảnh từ Unsplash; âm thanh: 4 bài nhạc do chủ dự án cung cấp

## 10. Ghi công

Thiết kế và lập trình: **Đinh Nhật Phong (ID1736755)**.
Phần lớn nội dung, tiểu sử, bài viết và các bài hát không nằm trong danh sách audio là **hư cấu**, phục vụ mục đích học tập. Bốn bài nhạc trong thư mục `audio/` và tên các nghệ sĩ tương ứng lấy cảm hứng từ các bản remix có thật; bản quyền thuộc về tác giả gốc.
Ảnh: [Unsplash](https://unsplash.com/license) · Nhạc: 4 bài do chủ dự án cung cấp, bản quyền thuộc tác giả/nghệ sĩ gốc.
Danh sách nguồn chi tiết: [`IMAGE_CREDITS.md`](IMAGE_CREDITS.md).
