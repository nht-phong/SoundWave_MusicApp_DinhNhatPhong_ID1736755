# XÂY DỰNG NỀN TẢNG ÂM NHẠC "SOUNDWAVE"

---

## 1. TỔNG QUAN

Đóng vai trò là Frontend Developer xây dựng giao diện website **SoundWave** — một Nền tảng Âm nhạc Trực tuyến hiện đại dành cho giới trẻ (tương tự mô hình kết hợp giữa Spotify và SoundCloud). Trang web giúp người dùng tìm kiếm bài hát, khám phá kho nhạc theo Nghệ sĩ, Tác giả, Album, xem lời bài hát và tra cứu thông tin vận hành dịch vụ.

---

## 2. CẤU TRÚC CHI TIẾT 10 TRANG BẮT BUỘC

Trang web bao gồm **10 trang giao diện riêng biệt**, đảm bảo tính liên kết điều hướng đồng bộ qua Thanh Menu (Navbar) và Chân trang (Footer):

1. **Trang Chủ (index.html):**
    * **Hero Section:** Banner giới thiệu thông điệp âm nhạc truyền cảm hứng, nút "Khám phá ngay" và "Đăng ký Premium".
    * **Bảng xếp hạng (Top Charts):** Danh sách các bài hát hot nhất tuần.
    * **Chuyên mục nổi bật:** Thẻ danh mục (Indie, Lo-Fi Học bài, EDM, Acoustic,...).


2. **Trang Tìm Kiếm Bài Hát (search.html):**
    * **Thanh tìm kiếm nâng cao:** Ô nhập từ khóa kết hợp bộ lọc (Filter) theo thể loại, năm phát hành, sắp xếp (Mới nhất, Nghe nhiều nhất).
    * **Khu vực kết quả:** Hiển thị danh sách bài hát tìm được dạng Lưới (Grid) hoặc Bảng (Table), kèm thông báo số lượng kết quả tìm thấy.


3. **Trang Bài Hát Chi Tiết (song-detail.html):**
    * **Thông tin ca khúc:** Banner hiển thị Ảnh bìa ca khúc, Tiêu đề bài hát, Tên Ca sĩ trình bày, Tên Tác giả sáng tác, Album thuộc về, Lượt nghe và nút Play/Pause.
    * **Trình bày Lời bài hát (Lyrics):** Định dạng khối hiển thị lời bài hát rõ ràng, dễ đọc.
    * **Danh sách bài hát gợi ý:** Các bài hát cùng thể loại ở cột phụ (Sidebar).


4. **Trang Bài Hát Theo Ca Sĩ (artist-songs.html):**
    * **Thông tin Ca sĩ (Artist Profile):** Ảnh đại diện nghệ sĩ, Tiểu sử ngắn, Số lượng người theo dõi (Followers), nút "Theo dõi".
    * **Danh sách ca khúc:** Bảng (`<table>`) hoặc danh sách các bài hát do ca sĩ đó thể hiện, có thông số lượt nghe và thời lượng.


5. **Trang Bài Hát Theo Tác Giả / Nhạc Sĩ (composer-songs.html):**
    * **Thông tin Nhạc sĩ (Composer Profile):** Giới thiệu phong cách sáng tác và các giải thưởng âm nhạc nổi bật.
    * **Gia tài sáng tác:** Danh sách toàn bộ các tác phẩm do nhạc sĩ này sáng tác (hiển thị rõ ca sĩ nào đã thể hiện từng bài).


6. **Trang Bài Hát Theo Album (album-songs.html):**
    * **Thông tin Album (Album Header):** Ảnh bìa Album kích thước lớn, Ngày phát hành, Tổng số bài hát, Tổng thời lượng.
    * **Danh sách Tracklist:** Bảng danh sách thứ tự các bài hát trong Album (STT, Tên bài, Ca sĩ kết hợp, Thời lượng).


7. **Trang Chi Tiết Tổng Hợp / Tin Tức (detail.html):**
    * Trang bài viết chuyên sâu về đời tư nghệ sĩ, đánh giá (Review) Album mới ra mắt hoặc bài phỏng vấn âm nhạc.


8. **Trang Về Chúng Tôi (about.html):**
    * **Sứ mệnh SoundWave:** "Kết nối nghệ sĩ Indie độc lập với hàng triệu tâm hồn yêu âm nhạc".
    * **Đội ngũ phát triển (Meet Our Team):** Thẻ thông tin thành viên dự án (Hình ảnh, Chức danh, Social links).


9. **Trang Liên Hệ & Đóng Góp (contact.html):**
    * **Form liên hệ:** Gửi thông tin dành cho nghệ sĩ hợp tác hoặc người dùng góp ý (Họ tên, Email, Loại yêu cầu, Nội dung).
    * **Thông tin hỗ trợ:** Nhúng bản đồ Google Maps trụ sở Studio và thông tin liên hệ Hotline/Email.


10. **Trang Chính Sách & Điều Khoản (policy-terms.html):**
    * Trình bày rõ quy định bản quyền tác giả (DMCA), bảo mật thông tin người nghe và điều khoản dịch vụ Premium.


---

## 3. THANG ĐIỂM CHI TIẾT (THANG ĐIỂM 10)

**1. Cấu trúc HTML & Semantic (1.5 điểm)**
- Sử dụng chuẩn các thẻ Semantic (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`).<br>
- Khai báo đúng `doctype`, `meta viewport`, thẻ `title` riêng cho từng trang.
- Mã nguồn sạch đẹp, định dạng thụt lề chuẩn xác.

**2. Đầy đủ 10 trang & Điều hướng (2.5 điểm)** 
- Hoàn thiện đủ **10 trang giao diện** theo đúng danh sách yêu cầu.
- Hệ thống liên kết chuyển trang giữa Bài hát $\rightarrow$ Ca sĩ $\rightarrow$ Tác giả $\rightarrow$ Album liên kết qua lại mượt mà, không dính lỗi 404. 

**3. Thiết kế CSS & Thẩm mỹ (2.0 điểm)**
- Giao diện hiện đại (khuyên dùng Tone màu tối - Dark Theme đặc trưng của các ứng dụng âm nhạc).
- Sử dụng thành thạo Flexbox và CSS Grid để chia bố cục danh sách nhạc, Album, trang Tìm kiếm.
- Hiệu ứng mượt mà khi di chuột (`:hover`, `:focus`) trên các nút Play, thẻ Album, ô nhập liệu. 

**4. Responsive (2.0 điểm)** 
- Hiển thị tối ưu trên 3 kích thước: Mobile ($< 768\text{px}$), Tablet ($768\text{px} - 1024\text{px}$), Desktop ($\ge 1024\text{px}$).

**5. Triển khai GitHub Pages (1.0 điểm)**
- Đẩy mã nguồn lên GitHub thành công.
- Triển khai link trực tuyến chạy tốt trên GitHub Pages.
- Repository có file `README.md` giới thiệu dự án.

**6. Sáng tạo & Điểm cộng (1.0 điểm)**
- Đổi mới ý tưởng giao diện (Ví dụ: Thiết kế thanh nhạc đang phát Fake Player cố định ở đáy màn hình bằng `position: fixed`).
- Giao diện bộ lọc tìm kiếm hoặc bảng chọn gói cước (Pricing Table) đẹp mắt. | 

---

## 4. QUY TRÌNH NỘP BÀI & QUY ĐỊNH TRUNG THỰC

1. **Source Code & Link:**
    * Tạo Repository công khai trên GitHub với tên: `SoundWave_MusicApp_[HoTen]_[MSSV]`.
    * Đẩy toàn bộ tệp `.html`, `.css` và thư mục ảnh lên nhánh `main`.
    * Kích hoạt **GitHub Pages** trong phần `Settings > Pages` để nhận đường link xuất bản trực tuyến.


2. **Video mô tả sản phẩm**
* Quay màn hình và mô tả ngắn gọn các chức năng và page đã làm được.
