/* =========================================================
   SoundWave — static site generator
   Produces the 11 .html files from one shared layout.
   Run: node tools/build.mjs
   ========================================================= */
import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/* ---------------- data ---------------- */
const songs = [
  { title: "Out of the Mountain", artist: "JAPANDEE", composer: "Kai Nguyen", album: "Neon District", albumFile: "album-songs.html", genre: "Remix", year: "2026", views: "1,2M", viewsNum: 1200000, duration: "5:58", seconds: 358, cover: "cover-1.jpg", date: "2026-09-12", dateNum: 20260912 },
  { title: "Mind the Pot", artist: "Duzme", composer: "Kai Nguyen", album: "Paper Lanterns", albumFile: "album-songs.html", genre: "Future Bass", year: "2025", views: "860K", viewsNum: 860000, duration: "3:50", seconds: 230, cover: "cover-2.jpg", date: "2025-08-21", dateNum: 20250821 },
  { title: "Rain Love", artist: "Rainie Yang", composer: "Kai Nguyen", album: "After the Rain", albumFile: "album-songs.html", genre: "Mandopop", year: "2024", views: "1,5M", viewsNum: 1500000, duration: "3:17", seconds: 197, cover: "cover-3.jpg", date: "2024-06-10", dateNum: 20240610 },
  { title: "Night Drive", artist: "KAZE", composer: "Kai Nguyen", album: "Voltage", albumFile: "album-songs.html", genre: "EDM", year: "2024", views: "540K", viewsNum: 540000, duration: "3:51", seconds: 231, cover: "cover-4.jpg", date: "2024-11-05", dateNum: 20241105 },
  { title: "Neon District", artist: "JAPANDEE", composer: "Kai Nguyen", album: "Neon District", albumFile: "album-songs.html", genre: "Vinahouse", year: "2026", views: "2,1M", viewsNum: 2100000, duration: "3:42", seconds: 222, cover: "cover-5.jpg", date: "2026-01-18", dateNum: 20260118 },
  { title: "Jingwei", artist: "JAPANDEE", composer: "Kai Nguyen", album: "Neon District", albumFile: "album-songs.html", genre: "EDM", year: "2025", views: "980K", viewsNum: 980000, duration: "4:18", seconds: 258, cover: "cover-6.jpg", date: "2025-09-12", dateNum: 20250912 },
  { title: "Paper Lanterns", artist: "Duzme", composer: "Kai Nguyen", album: "Paper Lanterns", albumFile: "album-songs.html", genre: "Future Bass", year: "2024", views: "720K", viewsNum: 720000, duration: "4:20", seconds: 260, cover: "cover-7.jpg", date: "2024-07-15", dateNum: 20240715 },
  { title: "Afterglow", artist: "Duzme", composer: "Kai Nguyen", album: "Paper Lanterns", albumFile: "album-songs.html", genre: "Chill", year: "2025", views: "1,8M", viewsNum: 1800000, duration: "5:12", seconds: 312, cover: "cover-8.jpg", date: "2025-03-01", dateNum: 20250301 },
  { title: "Voltage", artist: "KAZE", composer: "Kai Nguyen", album: "Voltage", albumFile: "album-songs.html", genre: "EDM", year: "2025", views: "430K", viewsNum: 430000, duration: "3:36", seconds: 216, cover: "cover-4.jpg", date: "2025-08-22", dateNum: 20250822 },
  { title: "Summer Rain", artist: "Rainie Yang", composer: "Kai Nguyen", album: "After the Rain", albumFile: "album-songs.html", genre: "Mandopop", year: "2023", views: "1,1M", viewsNum: 1100000, duration: "4:14", seconds: 254, cover: "cover-3.jpg", date: "2023-12-01", dateNum: 20231201 },
  { title: "City Lights", artist: "Rainie Yang", composer: "Kai Nguyen", album: "After the Rain", albumFile: "album-songs.html", genre: "Mandopop", year: "2026", views: "1,3M", viewsNum: 1300000, duration: "3:30", seconds: 210, cover: "cover-7.jpg", date: "2026-04-12", dateNum: 20260412 },
  { title: "Moonlit Run", artist: "JAPANDEE", composer: "Kai Nguyen", album: "Neon District", albumFile: "album-songs.html", genre: "Vinahouse", year: "2026", views: "760K", viewsNum: 760000, duration: "3:08", seconds: 188, cover: "cover-5.jpg", date: "2026-02-14", dateNum: 20260214 }
];

const byTitle = (title) => songs.find((s) => s.title === title);

/* ---------------- shared fragments ---------------- */
const navItems = [
  ["index.html", "Trang chủ"],
  ["search.html", "Tìm kiếm"],
  ["artist-songs.html", "Ca sĩ"],
  ["composer-songs.html", "Nhạc sĩ"],
  ["album-songs.html", "Album"],
  ["detail.html", "Tin tức"],
  ["about.html", "Về chúng tôi"],
  ["contact.html", "Liên hệ"]
];

const logoSvg = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h2v6H4V9zm4-4h2v14H8V5zm4-1h2v16h-2V4zm4 4h2v8h-2V8zm4 3h2v2h-2v-2z"/></svg>`;

function header(file) {
  const links = navItems
    .map(([href, label]) => {
      const active = href === file;
      return `<li><a href="${href}"${active ? ' class="active" aria-current="page"' : ""}>${label}</a></li>`;
    })
    .join("\n          ");

  return `<!-- ============================================================
       HEADER / NAVBAR
       - SoundWave logo (click to return home)
       - Main menu: Home, Search, Artists, Composers, Albums, News, About, Contact
       - Premium button + mobile hamburger menu
       ============================================================ -->
  <header class="site-header">
    <div class="container nav">
      <!-- Brand logo -->
      <a class="brand" href="index.html" aria-label="SoundWave — Trang chủ">
        <span class="brand-mark">${logoSvg}</span>
        <span>Sound<em>Wave</em></span>
      </a>

      <!-- Main navigation menu -->
      <nav aria-label="Điều hướng chính">
        <ul class="nav-links" id="navLinks">
          ${links}
        </ul>
      </nav>

      <!-- Premium button and mobile menu toggle -->
      <div class="nav-actions">
        <a class="btn btn-primary btn-sm" href="premium.html">Premium</a>
        <button class="nav-toggle" type="button" aria-label="Mở menu" aria-controls="navLinks" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>`;
}

function footer() {
  return `<!-- ============================================================
       SHARED FOOTER
       - Brand column + social media
       - Link columns: Discover, Artists, Company
       - Copyright line + year updated by JS
       ============================================================ -->
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <!-- Column 1: logo, description, socials -->
        <div class="footer-brand">
          <a class="brand" href="index.html">
            <span class="brand-mark">${logoSvg}</span>
            <span>Sound<em>Wave</em></span>
          </a>
          <p>Nền tảng âm nhạc dành cho giới trẻ — nơi nghệ sĩ độc lập gặp gỡ hàng triệu tâm hồn yêu nhạc.</p>
          <div class="socials">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener" aria-label="FB — SoundWave trên Facebook">FB</a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener" aria-label="IG — SoundWave trên Instagram">IG</a>
            <a href="https://www.youtube.com/" target="_blank" rel="noopener" aria-label="YT — SoundWave trên YouTube">YT</a>
            <a href="https://www.tiktok.com/" target="_blank" rel="noopener" aria-label="TT — SoundWave trên TikTok">TT</a>
          </div>
        </div>

        <!-- Column 2: discover -->
        <div class="footer-col">
          <h3>Khám phá</h3>
          <ul>
            <li><a href="index.html">Trang chủ</a></li>
            <li><a href="search.html">Tìm kiếm bài hát</a></li>
            <li><a href="artist-songs.html">Nghệ sĩ nổi bật</a></li>
            <li><a href="album-songs.html">Album mới</a></li>
          </ul>
        </div>

        <!-- Column 3: artists -->
        <div class="footer-col">
          <h3>Nghệ sĩ</h3>
          <ul>
            <li><a href="artist-songs.html">Bài hát theo ca sĩ</a></li>
            <li><a href="composer-songs.html">Bài hát theo nhạc sĩ</a></li>
            <li><a href="song-detail.html">Chi tiết ca khúc</a></li>
            <li><a href="premium.html">Gói Premium</a></li>
          </ul>
        </div>

        <!-- Column 4: company -->
        <div class="footer-col">
          <h3>Công ty</h3>
          <ul>
            <li><a href="about.html">Về chúng tôi</a></li>
            <li><a href="contact.html">Liên hệ &amp; đóng góp</a></li>
            <li><a href="policy-terms.html">Chính sách &amp; điều khoản</a></li>
            <li><a href="detail.html">Tin tức âm nhạc</a></li>
          </ul>
        </div>
      </div>

      <!-- Bottom line: copyright, author, student ID -->
      <div class="footer-bottom">
        <span>© <span data-current-year>2026</span> SoundWave. Thiết kế bởi <strong>Đinh Nhật Phong</strong> · MSSV <strong>ID1736755</strong>.</span>
        <span>Made with <span class="heart">♥</span> for independent music.</span>
      </div>
    </div>
  </footer>`;
}

function player() {
  return `<!-- ============================================================
       FIXED MUSIC PLAYER (position: fixed)
       - Left: cover art, title, artist, like button
       - Center: previous, play/pause, next, seek bar
       - Right: equalizer, queue, volume
       - The <audio> tag is hidden by CSS but plays real audio
       ============================================================ -->
  <div class="player" id="player" aria-label="Trình phát nhạc SoundWave">
    <!-- Real audio element: JS changes src when a track is selected -->
    <audio id="audioEl" preload="metadata"></audio>
    <div class="container player-inner">
      <!-- Currently playing track info -->
      <div class="player-track">
        <img class="player-cover" src="images/cover-1.jpg" alt="Ảnh bìa Out of the Mountain" width="52" height="52">
        <div class="player-meta">
          <a class="player-title" href="song-detail.html">Out of the Mountain</a>
          <span class="player-artist">JAPANDEE</span>
        </div>
        <button class="icon-btn" id="likeBtn" type="button" aria-label="Yêu thích bài hát" aria-pressed="false">♡</button>
      </div>

      <!-- Controls and progress bar -->
      <div class="player-center">
        <div class="player-controls">
          <button class="p-btn" type="button" data-skip="-1" aria-label="Bài trước">⏮</button>
          <button class="p-play" id="playBtn" type="button" aria-label="Phát nhạc" aria-pressed="false">▶</button>
          <button class="p-btn" type="button" data-skip="1" aria-label="Bài tiếp theo">⏭</button>
        </div>
        <div class="player-progress">
          <span class="time" id="currentTime">0:00</span>
          <input class="range" id="seek" type="range" min="0" max="100" value="0" step="0.1" aria-label="Tiến trình bài hát">
          <span class="time" id="duration" title="Thời lượng bài hát">5:58</span>
        </div>
      </div>

      <!-- Volume, equalizer, queue button -->
      <div class="player-extra">
        <span class="eq" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
        <button class="icon-btn" type="button" aria-label="Danh sách phát">☰</button>
        <span aria-hidden="true" style="color:var(--muted);font-size:.85rem">🔊</span>
        <input class="range volume-range" id="volume" type="range" min="0" max="100" value="80" aria-label="Âm lượng" style="--progress:80%">
      </div>
    </div>
  </div>`;
}

const pagePurpose = {
  "index.html": "Home page: hero, charts, categories, new releases, Premium banner.",
  "search.html": "Song search: keyword, genre/year filters, sorting, and results grid.",
  "song-detail.html": "Song detail: banner, metadata, play button, lyrics, and suggestions.",
  "artist-songs.html": "JAPANDEE artist profile: bio, stats, tracklist, and albums.",
  "composer-songs.html": "Kai Nguyen producer profile: bio, song catalog, and awards.",
  "album-songs.html": "Neon District album: cover, release info, and 8-track list.",
  "detail.html": "JAPANDEE interview: article body, author, and related posts.",
  "about.html": "About SoundWave: mission, values, stats, team, and journey.",
  "contact.html": "Contact: message form, support details, and studio map.",
  "policy-terms.html": "Policies and terms: DMCA, privacy, service, and Premium.",
  "premium.html": "Premium pricing: 3 plans, feature comparison, FAQ, and CTA."
};

function layout(file, title, description, content) {
  return `<!DOCTYPE html>
<!--
  ============================================================
  SOUNDWAVE PROJECT
  File: ${file}
  Purpose: ${pagePurpose[file] || description}

  Page structure:
    1. HEAD       — meta, favicon, fonts, CSS
    2. HEADER     — logo, navigation, Premium button, mobile menu
    3. MAIN       — page-specific content
    4. FOOTER     — links, social media, copyright
    5. PLAYER     — fixed music player at the bottom
    6. SCRIPT     — js/main.js handles interactions

  Note: This file is generated automatically from tools/build.mjs.
  For permanent changes, edit tools/build.mjs and run:
      node tools/build.mjs
  ============================================================
-->
<html lang="vi">
<head>
  <!-- ===== 1. META / SEO / PAGE TITLE ===== -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${description}">
  <meta name="author" content="Đinh Nhật Phong — ID1736755">
  <meta name="theme-color" content="#08080e">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:type" content="website">
  <title>${title}</title>

  <!-- ===== 2. FAVICON, GOOGLE FONTS, CSS ===== -->
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' rx='6' fill='%23a855f7'/%3E%3Cpath d='M5 9h2v6H5zm4-4h2v14H9zm4-1h2v16h-2zm4 4h2v8h-2zm4 3h2v2h-2z' fill='white'/%3E%3C/svg%3E">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&family=Outfit:wght@600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css?v=20261103">
</head>
<body>
  <!-- ===== SKIP LINK: lets keyboard users jump straight to the content ===== -->
  <a class="skip-link" href="#main">Bỏ qua tới nội dung chính</a>

  ${header(file)}

  <!-- ============================================================
       MAIN: page-specific content for ${file}
       ============================================================ -->
  <main id="main">
${content}
  </main>

  ${footer()}

  ${player()}

  <!-- ===== JAVASCRIPT: mobile menu, player, search, form, pricing... ===== -->
  <script src="js/main.js?v=20261103"></script>
</body>
</html>
`;
}

/* ---------------- card helpers ---------------- */
function playButton(song, cls = "play-fab") {
  const label = cls === "mini-play" ? "▶" : "▶";
  return `<button class="${cls}" type="button" data-play data-title="${song.title}" data-artist="${song.artist}" data-cover="images/${song.cover}" data-duration="${song.seconds}" aria-label="Phát ${song.title}">${label}</button>`;
}

function songCard(song) {
  return `<article class="song-card">
            <div class="cover-wrap">
              <img src="images/${song.cover}" alt="Ảnh bìa ${song.title}" width="400" height="400" loading="lazy">
              ${playButton(song)}
            </div>
            <div class="card-body">
              <a class="card-title" href="song-detail.html">${song.title}</a>
              <p class="card-sub"><a href="artist-songs.html">${song.artist}</a></p>
              <div class="card-meta">
                <span class="tag">${song.genre}</span>
                <span>${song.year}</span>
              </div>
            </div>
          </article>`;
}

function chartRow(song, index, trend, direction) {
  return `<tr>
                <td class="num">${String(index).padStart(2, "0")}</td>
                <td>
                  <div class="track-title-cell">
                    <img class="thumb" src="images/${song.cover}" alt="Ảnh bìa ${song.title}" width="46" height="46" loading="lazy">
                    <div>
                      <strong><a href="song-detail.html">${song.title}</a></strong>
                      <span><a href="artist-songs.html">${song.artist}</a></span>
                    </div>
                  </div>
                </td>
                <td class="views">${song.views}</td>
                <td class="hide-sm"><span class="trend ${direction}">${direction === "up" ? "▲" : direction === "down" ? "▼" : "–"} ${trend}</span></td>
                <td class="hide-sm"><button class="mini-play" type="button" data-play data-title="${song.title}" data-artist="${song.artist}" data-cover="images/${song.cover}" data-duration="${song.seconds}" aria-label="Phát ${song.title}">▶</button></td>
              </tr>`;
}

function resultCard(song) {
  return `<article class="result-card" data-title="${song.title}" data-artist="${song.artist}" data-album="${song.album}" data-genre="${song.genre}" data-year="${song.year}" data-views="${song.viewsNum}" data-date="${song.dateNum}">
            <img src="images/${song.cover}" alt="Ảnh bìa ${song.title}" width="78" height="78" loading="lazy">
            <div class="rc-body">
              <h3><a href="song-detail.html">${song.title}</a></h3>
              <p class="rc-artist"><a href="artist-songs.html">${song.artist}</a></p>
              <div class="rc-meta">
                <span class="chip">${song.genre}</span>
                <span class="chip">${song.year}</span>
                <span class="chip">${song.views} lượt nghe</span>
              </div>
            </div>
          </article>`;
}

function breadcrumb(items) {
  return `<nav aria-label="Breadcrumb">
          <ol class="breadcrumb">
            ${items
              .map(([label, href], i) =>
                i === items.length - 1
                  ? `<li><span aria-current="page">${label}</span></li>`
                  : `<li><a href="${href}">${label}</a></li>`
              )
              .join("\n            ")}
          </ol>
        </nav>`;
}

/* ---------------- 1. HOME ---------------- */
const heroSong = byTitle("Out of the Mountain");

const indexContent = `<!-- ===== HERO: main banner, headline, CTA, and "now playing" card ===== -->
    <section class="hero" aria-labelledby="heroTitle">
      <div class="hero-bg">
        <img src="images/hero.jpg" alt="" width="1600" height="900">
      </div>
      <div class="container hero-inner">
        <div class="hero-copy">
          <span class="eyebrow"><span class="dot"></span>SoundWave · Âm nhạc không giới hạn</span>
          <h1 class="hero-title" id="heroTitle">Mỗi giai điệu,<br>một <span class="gradient-text">tâm hồn</span> riêng.</h1>
          <p class="hero-lead">Khám phá hàng triệu bài hát từ nghệ sĩ độc lập Việt Nam và thế giới. Nghe nhạc lossless, xem lời bài hát và ủng hộ nghệ sĩ bạn yêu — tất cả trong một nền tảng.</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="search.html">Khám phá ngay <span aria-hidden="true">→</span></a>
            <a class="btn btn-ghost" href="premium.html">Đăng ký Premium</a>
          </div>
          <div class="hero-stats">
            <div><strong>2,4M+</strong><span>Bài hát &amp; podcast</span></div>
            <div><strong>850K+</strong><span>Nghệ sĩ độc lập</span></div>
            <div><strong>120+</strong><span>Quốc gia &amp; vùng lãnh thổ</span></div>
          </div>
        </div>

        <aside class="hero-card" aria-label="Bài hát đang được đề xuất">
          <div class="hero-card-top">
            <span>Đang phát · SoundWave Select</span>
            <span class="eq" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
          </div>
          <div class="hero-cover">
            <img src="images/${heroSong.cover}" alt="Ảnh bìa ca khúc ${heroSong.title}" width="440" height="440">
          </div>
          <div class="hero-card-info">
            <h2>${heroSong.title}</h2>
            <p>${heroSong.artist} · Album ${heroSong.album}</p>
            <div class="hero-tags">
              <span class="chip">Remix</span>
              <span class="chip">2026</span>
              <span class="chip">Lossless</span>
            </div>
          </div>
          <div class="hero-card-foot">
            <span class="track-line" aria-hidden="true"><i></i></span>
            <small>2:17 / 5:58</small>
          </div>
        </aside>
      </div>
    </section>

    <!-- ===== CHARTS: top 5 songs + featured artists ===== -->
    <section class="section" aria-labelledby="chartsTitle">
      <div class="container">
        <div class="section-head">
          <div>
            <h2 id="chartsTitle">Bảng xếp hạng tuần này</h2>
            <p>Những ca khúc được nghe nhiều nhất trên SoundWave trong 7 ngày qua.</p>
          </div>
          <a class="link-arrow" href="search.html">Xem tất cả <span aria-hidden="true">→</span></a>
        </div>

        <div class="chart-layout">
          <div class="panel">
            <table class="track-table">
              <caption class="visually-hidden" hidden>Top 5 bài hát hot nhất tuần</caption>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Bài hát</th>
                  <th scope="col">Lượt nghe</th>
                  <th scope="col" class="hide-sm">Xu hướng</th>
                  <th scope="col" class="hide-sm"><span class="visually-hidden">Phát</span></th>
                </tr>
              </thead>
              <tbody>
                ${chartRow(byTitle("Neon District"), 1, "+12%", "up")}
                ${chartRow(byTitle("Afterglow"), 2, "+8%", "up")}
                ${chartRow(byTitle("Rain Love"), 3, "0%", "same")}
                ${chartRow(byTitle("City Lights"), 4, "+3%", "up")}
                ${chartRow(byTitle("Out of the Mountain"), 5, "-2%", "down")}
              </tbody>
            </table>
          </div>

          <aside class="panel" aria-labelledby="topArtists">
            <div class="panel-head">
              <div>
                <h2 id="topArtists">Nghệ sĩ nổi bật</h2>
                <p>Được yêu thích nhất tháng 10</p>
              </div>
            </div>
            <ul class="list-stack">
              <li><a class="list-item" href="artist-songs.html">
                <img src="images/artist-1.jpg" alt="Chân dung JAPANDEE" width="44" height="44" loading="lazy">
                <span class="li-text"><strong>JAPANDEE</strong><span>Vinahouse / Remix · 128K followers</span></span>
                <span class="li-dur">01</span>
              </a></li>
              <li><a class="list-item" href="artist-songs.html">
                <img src="images/artist-2.jpg" alt="Chân dung Rainie Yang" width="44" height="44" loading="lazy">
                <span class="li-text"><strong>Rainie Yang</strong><span>Mandopop · 210K followers</span></span>
                <span class="li-dur">02</span>
              </a></li>
              <li><a class="list-item" href="artist-songs.html">
                <img src="images/artist-4.jpg" alt="Chân dung Duzme" width="44" height="44" loading="lazy">
                <span class="li-text"><strong>Duzme</strong><span>Future Bass · 96K followers</span></span>
                <span class="li-dur">03</span>
              </a></li>
              <li><a class="list-item" href="artist-songs.html">
                <img src="images/artist-3.jpg" alt="Chân dung KAZE" width="44" height="44" loading="lazy">
                <span class="li-text"><strong>KAZE</strong><span>EDM · 74K followers</span></span>
                <span class="li-dur">04</span>
              </a></li>
            </ul>
          </aside>
        </div>
      </div>
    </section>

    <!-- ===== CATEGORIES: 6 genre cards, each links to the search page ===== -->
    <section class="section section-tight" aria-labelledby="catTitle">
      <div class="container">
        <div class="section-head">
          <div>
            <h2 id="catTitle">Chuyên mục nổi bật</h2>
            <p>Chọn đúng "vibe" cho từng khoảnh khắc trong ngày của bạn.</p>
          </div>
          <a class="link-arrow" href="search.html">Khám phá chuyên mục <span aria-hidden="true">→</span></a>
        </div>

        <div class="cat-grid">
          <a class="cat-card c-indie" href="search.html">
            <span class="cat-icon" aria-hidden="true">⚡</span>
            <span class="cat-arrow" aria-hidden="true">↗</span>
            <h3>Vinahouse</h3>
            <p>Nhịp club, chất Việt</p>
          </a>
          <a class="cat-card c-lofi" href="search.html">
            <span class="cat-icon" aria-hidden="true">🎧</span>
            <span class="cat-arrow" aria-hidden="true">↗</span>
            <h3>Future Bass</h3>
            <p>Bass mềm, cảm xúc</p>
          </a>
          <a class="cat-card c-edm" href="search.html">
            <span class="cat-icon" aria-hidden="true">🔥</span>
            <span class="cat-arrow" aria-hidden="true">↗</span>
            <h3>EDM</h3>
            <p>Bùng nổ năng lượng</p>
          </a>
          <a class="cat-card c-acoustic" href="search.html">
            <span class="cat-icon" aria-hidden="true">🌙</span>
            <span class="cat-arrow" aria-hidden="true">↗</span>
            <h3>Mandopop</h3>
            <p>Giai điệu Hoa ngữ</p>
          </a>
          <a class="cat-card c-pop" href="search.html">
            <span class="cat-icon" aria-hidden="true">🎛️</span>
            <span class="cat-arrow" aria-hidden="true">↗</span>
            <h3>Remix</h3>
            <p>Biến tấu mọi bản hit</p>
          </a>
          <a class="cat-card c-ballad" href="search.html">
            <span class="cat-icon" aria-hidden="true">🌿</span>
            <span class="cat-arrow" aria-hidden="true">↗</span>
            <h3>Chill</h3>
            <p>Thư giãn, tập trung</p>
          </a>
        </div>
      </div>
    </section>

    <!-- ===== NEW RELEASES: 4 song cards, play buttons load the player ===== -->
    <section class="section" aria-labelledby="newTitle">
      <div class="container">
        <div class="section-head">
          <div>
            <h2 id="newTitle">Mới phát hành</h2>
            <p>Cập nhật mỗi thứ Sáu — những bản nhạc vừa lên sóng.</p>
          </div>
          <a class="link-arrow" href="album-songs.html">Album mới <span aria-hidden="true">→</span></a>
        </div>
        <div class="song-grid">
          ${songCard(byTitle("Neon District"))}
          ${songCard(byTitle("City Lights"))}
          ${songCard(byTitle("Out of the Mountain"))}
          ${songCard(byTitle("Mind the Pot"))}
        </div>
      </div>
    </section>

    <!-- ===== PREMIUM BANNER: closing CTA on the home page ===== -->
    <section class="section section-tight" aria-labelledby="premiumTitle">
      <div class="container">
        <div class="mission">
          <div>
            <span class="eyebrow"><span class="dot"></span>SoundWave Premium</span>
            <h2 id="premiumTitle" style="margin-top:16px">Nghe không giới hạn.<br>Không quảng cáo.</h2>
            <p>Chất lượng Lossless 24-bit, tải nhạc offline, phát nhạc không chèn quảng cáo và ủng hộ trực tiếp nghệ sĩ bạn yêu thích chỉ với 59.000đ mỗi tháng.</p>
            <div class="hero-actions">
              <a class="btn btn-primary" href="premium.html">Xem bảng giá</a>
              <a class="btn btn-ghost" href="premium.html">Dùng thử 7 ngày</a>
            </div>
          </div>
          <blockquote>“Âm nhạc hay nhất khi được nghe trọn vẹn — không ngắt quãng, không giới hạn.”</blockquote>
        </div>
      </div>
    </section>`;

/* ---------------- 2. SEARCH ---------------- */
const searchContent = `<!-- ===== SEARCH PAGE TITLE ===== -->
    <section class="page-hero" aria-labelledby="searchTitle">
      <div class="container">
        ${breadcrumb([["Trang chủ", "index.html"], ["Tìm kiếm", "search.html"]])}
        <h1 id="searchTitle">Tìm kiếm bài hát</h1>
        <p class="lead">Tra cứu theo tên bài hát, ca sĩ hoặc album. Kết hợp bộ lọc thể loại, năm phát hành và sắp xếp để tìm đúng bản nhạc bạn cần.</p>
      </div>
    </section>

    <!-- ===== SEARCH AREA: filter form + results list ===== -->
    <section class="section section-tight" aria-label="Bộ lọc tìm kiếm">
      <div class="container">
        <!-- Search form: keyword, genre, year, sort, reset -->
        <form class="search-panel" id="searchForm" role="search" aria-label="Tìm kiếm bài hát nâng cao">
          <div class="search-bar">
            <span class="search-icon" aria-hidden="true">⌕</span>
            <label class="visually-hidden" for="songSearch" hidden>Từ khóa tìm kiếm</label>
            <input type="search" id="songSearch" name="q" placeholder="Nhập tên bài hát, ca sĩ hoặc album..." aria-label="Từ khóa tìm kiếm bài hát" autocomplete="off">
            <button class="btn btn-primary" type="submit">Tìm kiếm</button>
          </div>

          <div class="search-filters">
            <div>
              <label class="field-label" for="genreFilter">Thể loại</label>
              <div class="select-wrap">
                <select id="genreFilter" name="genre">
                  <option value="">Tất cả thể loại</option>
                  <option value="Vinahouse">Vinahouse</option>
                  <option value="Future Bass">Future Bass</option>
                  <option value="EDM">EDM</option>
                  <option value="Mandopop">Mandopop</option>
                  <option value="Remix">Remix</option>
                  <option value="Chill">Chill</option>
                </select>
              </div>
            </div>

            <div>
              <label class="field-label" for="yearFilter">Năm phát hành</label>
              <div class="select-wrap">
                <select id="yearFilter" name="year">
                  <option value="">Tất cả các năm</option>
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                </select>
              </div>
            </div>

            <div>
              <label class="field-label" for="sortFilter">Sắp xếp theo</label>
              <div class="select-wrap">
                <select id="sortFilter" name="sort">
                  <option value="newest">Mới nhất</option>
                  <option value="views">Nghe nhiều nhất</option>
                  <option value="title">Tên A → Z</option>
                </select>
              </div>
            </div>

            <button class="btn btn-ghost" type="reset">Xóa bộ lọc</button>
          </div>
        </form>

        <!-- Results heading + result count (updated by JS) -->
        <div class="search-results-head">
          <h2>Kết quả tìm kiếm</h2>
          <span class="result-count" id="resultCount" aria-live="polite">Tìm thấy <strong>12</strong> bài hát phù hợp</span>
        </div>

        <!-- Results grid: each card has data-* attributes for JS filtering and sorting -->
        <div class="result-grid" id="resultGrid">
          ${songs.map(resultCard).join("\n          ")}
        </div>

        <div class="empty-state" id="emptyState">
          <span class="empty-icon" aria-hidden="true">🎧</span>
          <strong>Không tìm thấy bài hát phù hợp</strong>
          <p>Thử từ khóa khác hoặc xóa bớt bộ lọc để xem toàn bộ kho nhạc.</p>
        </div>

        <!-- Quick search suggestions -->
        <div class="chip-row" style="margin-top:28px" aria-label="Gợi ý tìm kiếm">
          <span class="chip">Gợi ý:</span>
          <a class="chip" href="search.html">Vinahouse</a>
          <a class="chip" href="search.html">Future Bass</a>
          <a class="chip" href="search.html">EDM 2026</a>
          <a class="chip" href="search.html">Mandopop</a>
          <a class="chip" href="search.html">Chill</a>
        </div>
      </div>
    </section>`;

/* ---------------- 3. SONG DETAIL ---------------- */
const song = byTitle("Out of the Mountain");

const songContent = `<!-- ===== SONG BANNER: cover, title, artist, composer, album, play button ===== -->
    <section class="song-hero" aria-labelledby="songTitle">
      <div class="container">
        ${breadcrumb([["Trang chủ", "index.html"], ["Bài hát", "search.html"], [song.title, "song-detail.html"]])}
        <div class="song-hero-inner" style="margin-top:26px">
          <img class="song-cover" src="images/${song.cover}" alt="Ảnh bìa ca khúc ${song.title}" width="240" height="240">
          <!-- Song details: title, artist, composer, album -->
          <div class="song-hero-info">
            <span class="eyebrow"><span class="dot"></span>Single · Remix</span>
            <h1 id="songTitle">${song.title}</h1>
            <p class="song-byline">
              <span>Trình bày: <a href="artist-songs.html">${song.artist}</a></span>
              <span aria-hidden="true">•</span>
              <span>Sáng tác: <a href="composer-songs.html">${song.composer}</a></span>
              <span aria-hidden="true">•</span>
              <span>Album: <a href="album-songs.html">${song.album}</a></span>
            </p>

            <!-- Action buttons: play, save to library, share -->
            <div class="song-actions">
              <button class="btn btn-primary btn-play" id="songPlayBtn" type="button" data-play data-title="${song.title}" data-artist="${song.artist}" data-cover="images/${song.cover}" data-duration="${song.seconds}">
                <span aria-hidden="true">▶</span> Phát bài hát
              </button>
              <button class="btn btn-ghost follow-btn" type="button" aria-pressed="false">+ Thêm vào thư viện</button>
              <button class="icon-btn" type="button" data-share aria-label="Chia sẻ bài hát" style="border:1px solid var(--line-strong);width:44px;height:44px;border-radius:50%">↗</button>
            </div>

            <!-- Stats: plays, release date, duration, quality -->
            <dl class="meta-list">
              <div><dt>Lượt nghe</dt><dd>${song.views}</dd></div>
              <div><dt>Phát hành</dt><dd>12/09/2026</dd></div>
              <div><dt>Thời lượng</dt><dd>${song.duration}</dd></div>
              <div><dt>Chất lượng</dt><dd>Lossless 24-bit</dd></div>
            </dl>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== LYRICS + SUGGESTION SIDEBAR ===== -->
    <section class="section section-tight" aria-label="Lời bài hát và gợi ý">
      <div class="container content-grid">
        <!-- Lyrics block: heading, copy button, lyrics text -->
        <article class="lyrics-card" aria-labelledby="lyricsTitle">
          <div class="lyrics-head">
            <h2 id="lyricsTitle">Lời bài hát</h2>
            <div class="chip-row">
              <span class="chip">English</span>
              <button class="btn btn-ghost btn-sm" type="button" data-copy-lyrics>Sao chép lời</button>
            </div>
          </div>

          <div class="lyrics"><span class="chorus">[Verse 1]</span>
I've been walking through the static
Chasing echoes in the dark
Every mountain keeps a secret
Every fire leaves a spark
All the voices in the distance
Call me back to where I start

<span class="chorus">[Chorus]</span>
Out of the mountain, into the light
I'm not looking back tonight
Out of the mountain, feel the sky
Every step is burning bright

<span class="chorus">[Verse 2]</span>
Amber lights across the skyline
Paper lanterns on the road
I can hear the city breathing
In a language I still know
All the roads that I have travelled
Lead me back to where I go

<span class="chorus">[Chorus]</span>
Out of the mountain, into the light
I'm not looking back tonight
Out of the mountain, feel the sky
Every step is burning bright

<span class="chorus">[Bridge]</span>
If the night gets colder
Let the rhythm hold ya
If the road gets longer
I will keep on running

<span class="chorus">[Outro]</span>
Out of the mountain...
Into the light...
          </div>

          <p class="lyrics-note">Lời tiếng Anh nguyên bản do SoundWave biên soạn cho mục đích minh họa — không trích từ bản thu gốc. Vui lòng ghi nguồn khi chia sẻ.</p>
        </article>

        <!-- Sidebar: suggested songs, album, composer info -->
        <aside class="sidebar" aria-label="Thông tin bổ sung">
          <section class="panel" aria-labelledby="suggestTitle">
            <div class="panel-head">
              <div>
                <h2 id="suggestTitle">Có thể bạn thích</h2>
                <p>Cùng thể loại Remix / EDM</p>
              </div>
            </div>
            <ul class="list-stack">
              <li><a class="list-item" href="song-detail.html">
                <img src="images/cover-6.jpg" alt="Ảnh bìa Jingwei" width="44" height="44" loading="lazy">
                <span class="li-text"><strong>Jingwei</strong><span>JAPANDEE</span></span>
                <span class="li-dur">4:18</span>
              </a></li>
              <li><a class="list-item" href="song-detail.html">
                <img src="images/cover-2.jpg" alt="Ảnh bìa Mind the Pot" width="44" height="44" loading="lazy">
                <span class="li-text"><strong>Mind the Pot</strong><span>Duzme</span></span>
                <span class="li-dur">3:50</span>
              </a></li>
              <li><a class="list-item" href="song-detail.html">
                <img src="images/cover-7.jpg" alt="Ảnh bìa Paper Lanterns" width="44" height="44" loading="lazy">
                <span class="li-text"><strong>Paper Lanterns</strong><span>Duzme</span></span>
                <span class="li-dur">4:20</span>
              </a></li>
              <li><a class="list-item" href="song-detail.html">
                <img src="images/cover-3.jpg" alt="Ảnh bìa Rain Love" width="44" height="44" loading="lazy">
                <span class="li-text"><strong>Rain Love</strong><span>Rainie Yang</span></span>
                <span class="li-dur">3:17</span>
              </a></li>
            </ul>
          </section>

          <section class="sidebar-card" aria-labelledby="albumCardTitle">
            <h3 id="albumCardTitle">Thuộc album</h3>
            <a class="list-item" href="album-songs.html" style="padding:0">
              <img src="images/cover-5.jpg" alt="Ảnh bìa album Neon District" width="60" height="60" style="width:60px;height:60px" loading="lazy">
              <span class="li-text"><strong>Neon District</strong><span>JAPANDEE · 2026 · 8 bài</span></span>
            </a>
          </section>

          <section class="sidebar-card" aria-labelledby="composerCardTitle">
            <h3 id="composerCardTitle">Về tác giả</h3>
            <p>Kai Nguyen là producer/nhạc sĩ đứng sau nhiều bản remix và sáng tác cho JAPANDEE, Duzme, Rainie Yang và KAZE. Anh nổi tiếng với cách kết hợp chất liệu dân gian và giai điệu Hoa ngữ vào nhịp điện tử hiện đại.</p>
            <a class="link-arrow" href="composer-songs.html" style="margin-top:12px">Xem gia tài sáng tác <span aria-hidden="true">→</span></a>
          </section>
        </aside>
      </div>
    </section>`;

/* ---------------- 4. ARTIST ---------------- */
const artistSongs = [
  ["Out of the Mountain", "Neon District", "1,2M", "5:58", "cover-1.jpg", 358, "Remix"],
  ["Jingwei", "Neon District", "980K", "4:18", "cover-6.jpg", 258, "EDM"],
  ["Neon District", "Neon District", "610K", "3:42", "cover-5.jpg", 222, "Vinahouse"],
  ["Moonlit Run", "Neon District", "480K", "3:46", "cover-5.jpg", 226, "Vinahouse"],
  ["Neon District (VIP Mix)", "Neon District", "395K", "3:27", "cover-5.jpg", 207, "Remix"],
  ["Jingwei (Club Mix)", "Neon District", "320K", "3:33", "cover-6.jpg", 213, "EDM"]
];

const artistContent = `<!-- ===== ARTIST PROFILE: avatar, name, bio, followers, follow button ===== -->
    <section class="profile-hero" aria-labelledby="artistName">
      <div class="container">
        ${breadcrumb([["Trang chủ", "index.html"], ["Ca sĩ", "artist-songs.html"], ["JAPANDEE", "artist-songs.html"]])}
        <div class="profile-inner" style="margin-top:26px">
          <img class="profile-avatar" src="images/artist-1.jpg" alt="Chân dung nghệ sĩ JAPANDEE" width="190" height="190">
          <div class="profile-info">
            <span class="eyebrow"><span class="dot"></span>Nghệ sĩ · EDM / Remix</span>
            <h1 id="artistName">JAPANDEE <span class="verified" title="Nghệ sĩ đã xác minh" aria-label="Đã xác minh">✓</span></h1>
            <p class="profile-bio">JAPANDEE là producer/remixer Việt Nam, nổi bật với những bản remix kết hợp chất liệu dân gian, giai điệu Hoa ngữ và nhịp Vinahouse, future bass. Anh được biết đến qua “Out of the Mountain”, “Jingwei” và album “Neon District”.</p>
            <div class="profile-stats">
              <div><strong>128K</strong><span>Người theo dõi</span></div>
              <div><strong>42</strong><span>Bài hát đã phát hành</span></div>
              <div><strong>3,6M</strong><span>Lượt nghe / tháng</span></div>
            </div>
            <div class="profile-actions">
              <button class="btn btn-primary follow-btn" type="button" aria-pressed="false">+ Theo dõi</button>
              <button class="btn btn-ghost" type="button" data-play data-title="Out of the Mountain" data-artist="JAPANDEE" data-cover="images/cover-1.jpg" data-duration="358">▶ Phát tất cả</button>
              <a class="btn btn-ghost" href="composer-songs.html">Tác giả: Kai Nguyen</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== ARTIST TRACKLIST + ALBUMS/EPs ===== -->
    <section class="section" aria-labelledby="artistSongsTitle">
      <div class="container content-grid">
        <div>
          <div class="section-head">
            <div>
              <h2 id="artistSongsTitle">Danh sách ca khúc</h2>
              <p>Tất cả bài hát do JAPANDEE thể hiện, cập nhật mới nhất.</p>
            </div>
            <a class="link-arrow" href="album-songs.html">Xem album <span aria-hidden="true">→</span></a>
          </div>

          <div class="panel">
            <table class="track-table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Bài hát</th>
                  <th scope="col" class="hide-sm">Album</th>
                  <th scope="col">Lượt nghe</th>
                  <th scope="col">Thời lượng</th>
                  <th scope="col"><span class="visually-hidden" hidden>Phát</span></th>
                </tr>
              </thead>
              <tbody>
                ${artistSongs
                  .map(
                    ([title, album, views, duration, cover, seconds, genre], i) => `<tr>
                  <td class="num">${String(i + 1).padStart(2, "0")}</td>
                  <td>
                    <div class="track-title-cell">
                      <img class="thumb" src="images/${cover}" alt="Ảnh bìa ${title}" width="46" height="46" loading="lazy">
                      <div>
                        <strong><a href="song-detail.html">${title}</a></strong>
                        <span>${genre}</span>
                      </div>
                    </div>
                  </td>
                  <td class="views hide-sm"><a href="album-songs.html">${album}</a></td>
                  <td class="views">${views}</td>
                  <td class="duration">${duration}</td>
                  <td><button class="mini-play" type="button" data-play data-title="${title}" data-artist="JAPANDEE" data-cover="images/${cover}" data-duration="${seconds}" aria-label="Phát ${title}">▶</button></td>
                </tr>`
                  )
                  .join("\n                ")}
              </tbody>
            </table>
          </div>

          <!-- Artist albums & EPs -->
          <section class="section section-tight" aria-labelledby="discoTitle" style="padding-bottom:0">
            <div class="section-head">
              <h2 id="discoTitle" style="font-size:1.2rem">Album &amp; EP</h2>
            </div>
            <div class="discography">
              <a class="mini-album" href="album-songs.html">
                <img src="images/cover-5.jpg" alt="Ảnh bìa album Neon District" width="200" height="200" loading="lazy">
                <strong>Neon District</strong>
                <small>Album · 2026</small>
              </a>
              <a class="mini-album" href="album-songs.html">
                <img src="images/cover-1.jpg" alt="Ảnh bìa single Out of the Mountain" width="200" height="200" loading="lazy">
                <strong>Out of the Mountain</strong>
                <small>Single · 2026</small>
              </a>
              <a class="mini-album" href="album-songs.html">
                <img src="images/cover-6.jpg" alt="Ảnh bìa single Jingwei" width="200" height="200" loading="lazy">
                <strong>Jingwei</strong>
                <small>Single · 2025</small>
              </a>
            </div>
          </section>
        </div>

        <!-- Sidebar: biography, info, similar artists -->
        <aside class="sidebar" aria-label="Thông tin nghệ sĩ">
          <section class="sidebar-card">
            <h3>Tiểu sử</h3>
            <p>Ra mắt năm 2018 với các bản bootleg đăng tải trên mạng, JAPANDEE nhanh chóng tạo dấu ấn nhờ cách đưa làn điệu dân gian và giai điệu Hoa ngữ vào nhịp club hiện đại. Âm nhạc của anh lấy cảm hứng từ những đêm Hà Nội, ánh đèn Sài Gòn và những bản thu cũ trong gia đình.</p>
          </section>

          <section class="sidebar-card">
            <h3>Thông tin</h3>
            <p style="display:grid;gap:8px">
              <span>Quê quán: Hà Nội</span>
              <span>Thể loại: Vinahouse, Future Bass, EDM</span>
              <span>Hãng đĩa: SoundWave Records</span>
              <span>Hoạt động: 2018 — nay</span>
            </p>
          </section>

          <section class="panel">
            <div class="panel-head">
              <div><h3>Nghệ sĩ tương tự</h3></div>
            </div>
            <ul class="list-stack">
              <li><a class="list-item" href="artist-songs.html">
                <img src="images/artist-4.jpg" alt="Chân dung Duzme" width="44" height="44" loading="lazy">
                <span class="li-text"><strong>Duzme</strong><span>Future Bass</span></span>
              </a></li>
              <li><a class="list-item" href="artist-songs.html">
                <img src="images/artist-2.jpg" alt="Chân dung Rainie Yang" width="44" height="44" loading="lazy">
                <span class="li-text"><strong>Rainie Yang</strong><span>Mandopop</span></span>
              </a></li>
              <li><a class="list-item" href="artist-songs.html">
                <img src="images/artist-3.jpg" alt="Chân dung KAZE" width="44" height="44" loading="lazy">
                <span class="li-text"><strong>KAZE</strong><span>EDM</span></span>
              </a></li>
            </ul>
          </section>
        </aside>
      </div>
    </section>`;

/* ---------------- 5. COMPOSER ---------------- */
const composerWorks = [
  ["Out of the Mountain", "JAPANDEE", "2026", "Neon District", "1,2M", "cover-1.jpg", 358],
  ["Jingwei", "JAPANDEE", "2025", "Neon District", "980K", "cover-6.jpg", 258],
  ["Mind the Pot", "Duzme", "2025", "Paper Lanterns", "860K", "cover-2.jpg", 230],
  ["Rain Love", "Rainie Yang", "2024", "After the Rain", "1,5M", "cover-3.jpg", 197],
  ["Paper Lanterns", "Duzme", "2024", "Paper Lanterns", "720K", "cover-7.jpg", 260],
  ["Night Drive", "KAZE", "2024", "Voltage", "540K", "cover-4.jpg", 231],
  ["City Lights", "Rainie Yang", "2026", "After the Rain", "1,3M", "cover-7.jpg", 210]
];

const composerContent = `<!-- ===== COMPOSER / PRODUCER PROFILE: avatar, bio, stats ===== -->
    <section class="profile-hero" aria-labelledby="composerName">
      <div class="container">
        ${breadcrumb([["Trang chủ", "index.html"], ["Nhạc sĩ", "composer-songs.html"], ["Kai Nguyen", "composer-songs.html"]])}
        <div class="profile-inner" style="margin-top:26px">
          <img class="profile-avatar" src="images/composer-1.jpg" alt="Chân dung nhạc sĩ Kai Nguyen" width="190" height="190" style="border-radius:24px">
          <div class="profile-info">
            <span class="eyebrow"><span class="dot"></span>Nhạc sĩ · Producer</span>
            <h1 id="composerName">Kai Nguyen</h1>
            <p class="profile-bio">Producer/nhạc sĩ của những bản phối giàu chất liệu. Kai Nguyen kết hợp làn điệu dân gian Việt – Hoa với future bass, Vinahouse và EDM, tạo nên những bản remix vừa quen vừa mới. Anh là người đứng sau nhiều bản hit của JAPANDEE, Duzme, Rainie Yang và KAZE.</p>
            <div class="profile-stats">
              <div><strong>86</strong><span>Tác phẩm đã đăng ký</span></div>
              <div><strong>12</strong><span>Giải thưởng âm nhạc</span></div>
              <div><strong>15</strong><span>Năm hoạt động</span></div>
              <div><strong>4,8M</strong><span>Lượt nghe từ tác phẩm</span></div>
            </div>
            <div class="profile-actions">
              <button class="btn btn-primary follow-btn" type="button" aria-pressed="false">+ Theo dõi tác giả</button>
              <a class="btn btn-ghost" href="artist-songs.html">Nghệ sĩ thể hiện: JAPANDEE</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== SONG CATALOG: works, performing artist, year, album ===== -->
    <section class="section" aria-labelledby="worksTitle">
      <div class="container content-grid">
        <div>
          <div class="section-head">
            <div>
              <h2 id="worksTitle">Gia tài sáng tác</h2>
              <p>Toàn bộ tác phẩm tiêu biểu và nghệ sĩ đã thể hiện.</p>
            </div>
            <span class="chip">86 tác phẩm</span>
          </div>

          <div class="panel">
            <table class="track-table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Tác phẩm</th>
                  <th scope="col">Ca sĩ thể hiện</th>
                  <th scope="col" class="hide-sm">Album</th>
                  <th scope="col" class="hide-sm">Năm</th>
                  <th scope="col">Lượt nghe</th>
                </tr>
              </thead>
              <tbody>
                ${composerWorks
                  .map(
                    ([title, artist, year, album, views, cover, seconds], i) => `<tr>
                  <td class="num">${String(i + 1).padStart(2, "0")}</td>
                  <td>
                    <div class="track-title-cell">
                      <img class="thumb" src="images/${cover}" alt="Ảnh bìa ${title}" width="46" height="46" loading="lazy">
                      <div>
                        <strong><a href="song-detail.html">${title}</a></strong>
                        <span><button class="mini-play" type="button" data-play data-title="${title}" data-artist="${artist}" data-cover="images/${cover}" data-duration="${seconds}" aria-label="Phát ${title}" style="width:24px;height:24px;font-size:.5rem;margin-top:3px">▶</button> Nghe thử</span>
                      </div>
                    </div>
                  </td>
                  <td class="views"><a href="artist-songs.html">${artist}</a></td>
                  <td class="views hide-sm"><a href="album-songs.html">${album}</a></td>
                  <td class="duration hide-sm">${year}</td>
                  <td class="views">${views}</td>
                </tr>`
                  )
                  .join("\n                ")}
              </tbody>
            </table>
          </div>

          <!-- Writing-style description card -->
          <section class="sidebar-card" style="margin-top:20px" aria-labelledby="styleTitle">
            <h3 id="styleTitle">Phong cách sáng tác</h3>
            <p>Kai Nguyen xây dựng bản phối như một lớp lang của ký ức: mở đầu bằng một mẫu dân ca hoặc câu hát quen, dẫn vào nhịp club rồi bung ra ở phần drop. Anh chú trọng chi tiết nhỏ — tiếng đàn tranh, hơi thở trước micro, tiếng phố đêm — để bản điện tử vẫn giữ được cảm xúc con người.</p>
            <div class="chip-row" style="margin-top:14px">
              <span class="chip">Vinahouse</span>
              <span class="chip">Future Bass</span>
              <span class="chip">EDM</span>
              <span class="chip">Remix</span>
            </div>
          </section>
        </div>

        <!-- Sidebar: notable awards, signature works -->
        <aside class="sidebar" aria-label="Giải thưởng và thông tin">
          <section class="sidebar-card">
            <h3>Giải thưởng nổi bật</h3>
            <ul class="awards">
              <li><span class="year">2025</span><span>Giải Cống hiến — Producer của năm</span></li>
              <li><span class="year">2024</span><span>Top 10 producer được nghe nhiều nhất SoundWave</span></li>
              <li><span class="year">2023</span><span>Giải Mai Vàng — Ca khúc EDM xuất sắc</span></li>
              <li><span class="year">2021</span><span>Giải thưởng Âm nhạc độc lập — Hạng mục Biên soạn</span></li>
            </ul>
          </section>

          <section class="sidebar-card">
            <h3>Tác phẩm tiêu biểu</h3>
            <ul class="list-stack" style="padding:0">
              <li><a class="list-item" href="song-detail.html" style="padding-left:0;padding-right:0">
                <img src="images/cover-1.jpg" alt="Ảnh bìa Out of the Mountain" width="44" height="44" loading="lazy">
                <span class="li-text"><strong>Out of the Mountain</strong><span>JAPANDEE</span></span>
              </a></li>
              <li><a class="list-item" href="song-detail.html" style="padding-left:0;padding-right:0">
                <img src="images/cover-3.jpg" alt="Ảnh bìa Rain Love" width="44" height="44" loading="lazy">
                <span class="li-text"><strong>Rain Love</strong><span>Rainie Yang</span></span>
              </a></li>
              <li><a class="list-item" href="song-detail.html" style="padding-left:0;padding-right:0">
                <img src="images/cover-2.jpg" alt="Ảnh bìa Mind the Pot" width="44" height="44" loading="lazy">
                <span class="li-text"><strong>Mind the Pot</strong><span>Duzme</span></span>
              </a></li>
            </ul>
          </section>
        </aside>
      </div>
    </section>`;

/* ---------------- 6. ALBUM ---------------- */
const albumTracks = [
  ["Out of the Mountain", "JAPANDEE", "5:58", "cover-1.jpg", 358],
  ["Mind the Pot", "Duzme", "3:50", "cover-2.jpg", 230],
  ["Jingwei", "JAPANDEE", "4:18", "cover-6.jpg", 258],
  ["Rain Love", "Rainie Yang", "3:17", "cover-3.jpg", 197],
  ["Neon District", "JAPANDEE", "3:42", "cover-5.jpg", 222],
  ["Paper Lanterns", "Duzme", "4:20", "cover-7.jpg", 260],
  ["City Lights", "Rainie Yang", "3:30", "cover-7.jpg", 210],
  ["Moonlit Run", "JAPANDEE", "3:08", "cover-5.jpg", 188]
];

const albumContent = `<!-- ===== ALBUM HEADER: large cover, title, artist, release date, total duration ===== -->
    <section class="profile-hero" aria-labelledby="albumTitle">
      <div class="container">
        ${breadcrumb([["Trang chủ", "index.html"], ["Album", "album-songs.html"], ["Neon District", "album-songs.html"]])}
        <div class="album-head" style="margin-top:26px">
          <img class="album-cover" src="images/cover-5.jpg" alt="Ảnh bìa album Neon District" width="260" height="260">
          <div class="album-info">
            <span class="eyebrow"><span class="dot"></span>Album · 2026</span>
            <h1 id="albumTitle">Neon District</h1>
            <p class="song-byline" style="margin-bottom:16px">
              <a href="artist-songs.html">JAPANDEE &amp; Friends</a>
              <span aria-hidden="true">•</span>
              <span>SoundWave Records</span>
            </p>
            <ul class="album-meta">
              <li><strong>8</strong> bài hát</li>
              <li><strong>32:03</strong> tổng thời lượng</li>
              <li>Phát hành <strong>12/09/2026</strong></li>
              <li>Thể loại <strong>Vinahouse / EDM</strong></li>
            </ul>
            <div class="profile-actions">
              <button class="btn btn-primary" type="button" data-play data-title="Out of the Mountain" data-artist="JAPANDEE" data-cover="images/cover-5.jpg" data-duration="358">▶ Phát toàn bộ album</button>
              <button class="btn btn-ghost follow-btn" type="button" aria-pressed="false">+ Lưu album</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== TRACKLIST + ALBUM INFO ===== -->
    <section class="section" aria-labelledby="tracklistTitle">
      <div class="container content-grid">
        <div>
          <div class="section-head">
            <div>
              <h2 id="tracklistTitle">Danh sách tracklist</h2>
              <p>8 ca khúc trong album tổng hợp “Neon District” của JAPANDEE và các nghệ sĩ khách mời.</p>
            </div>
            <span class="chip">32:03</span>
          </div>

          <div class="panel">
            <table class="track-table">
              <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Tên bài</th>
                  <th scope="col" class="hide-sm">Ca sĩ kết hợp</th>
                  <th scope="col">Thời lượng</th>
                  <th scope="col"><span class="visually-hidden" hidden>Phát</span></th>
                </tr>
              </thead>
              <tbody>
                ${albumTracks
                  .map(
                    ([title, artist, duration, cover, seconds], i) => `<tr>
                  <td class="num">${String(i + 1).padStart(2, "0")}</td>
                  <td>
                    <div class="track-title-cell">
                      <img class="thumb" src="images/${cover}" alt="Ảnh bìa ${title}" width="46" height="46" loading="lazy">
                      <div>
                        <strong><a href="song-detail.html">${title}</a></strong>
                        <span>Album · 2026</span>
                      </div>
                    </div>
                  </td>
                  <td class="views hide-sm">${artist}</td>
                  <td class="duration">${duration}</td>
                  <td><button class="mini-play" type="button" data-play data-title="${title}" data-artist="${artist}" data-cover="images/${cover}" data-duration="${seconds}" aria-label="Phát ${title}">▶</button></td>
                </tr>`
                  )
                  .join("\n                ")}
              </tbody>
            </table>
          </div>

          <!-- Album description -->
          <section class="sidebar-card" style="margin-top:20px" aria-labelledby="aboutAlbumTitle">
            <h3 id="aboutAlbumTitle">Về album “Neon District”</h3>
            <p>“Neon District” là album tổng hợp đánh dấu chặng đường mới của JAPANDEE: tám track nối liền những làn điệu dân gian Việt – Hoa với nhịp Vinahouse, future bass và Mandopop. Album được hoàn thiện trong sáu tháng tại studio SoundWave, giữ lại tiếng phố đêm, tiếng đàn tranh và những đoạn field recording từ Hà Nội đến Sài Gòn.</p>
            <p style="margin-bottom:0">Album nhận 8,7/10 điểm từ SoundWave Review và lọt Top 10 Album điện tử xuất sắc nhất năm 2026.</p>
          </section>
        </div>

        <!-- Sidebar: release info, related singles, artist profile -->
        <aside class="sidebar" aria-label="Thông tin album">
          <section class="sidebar-card">
            <h3>Thông tin album</h3>
            <p style="display:grid;gap:8px">
              <span>Ngày phát hành: 12/09/2026</span>
              <span>Hãng: SoundWave Records</span>
              <span>Định dạng: Lossless 24-bit</span>
              <span>Producer: Kai Nguyen</span>
              <span>Mã album: SW-2026-014</span>
            </p>
          </section>

          <section class="panel">
            <div class="panel-head">
              <div><h3>Cùng nghệ sĩ</h3></div>
            </div>
            <ul class="list-stack">
              <li><a class="list-item" href="song-detail.html">
                <img src="images/cover-1.jpg" alt="Ảnh bìa Out of the Mountain" width="44" height="44" loading="lazy">
                <span class="li-text"><strong>Out of the Mountain</strong><span>Single · 2026</span></span>
              </a></li>
              <li><a class="list-item" href="song-detail.html">
                <img src="images/cover-6.jpg" alt="Ảnh bìa Jingwei" width="44" height="44" loading="lazy">
                <span class="li-text"><strong>Jingwei</strong><span>Single · 2025</span></span>
              </a></li>
            </ul>
          </section>

          <section class="sidebar-card">
            <h3>Nghệ sĩ</h3>
            <a class="list-item" href="artist-songs.html" style="padding:0">
              <img src="images/artist-1.jpg" alt="Chân dung JAPANDEE" width="52" height="52" style="width:52px;height:52px;border-radius:50%" loading="lazy">
              <span class="li-text"><strong>JAPANDEE</strong><span>128K người theo dõi</span></span>
            </a>
          </section>
        </aside>
      </div>
    </section>`;

/* ---------------- 7. ARTICLE ---------------- */
const articleContent = `<!-- ===== ARTICLE / NEWS ===== -->
    <article>
      <!-- Large cover + title + author + publish date -->
      <header class="article-hero">
        <img src="images/article-1.jpg" alt="JAPANDEE trên sân khấu với ánh đèn tím" width="1600" height="900">
        <div class="container article-head">
          ${breadcrumb([["Trang chủ", "index.html"], ["Tin tức", "detail.html"], ["Phỏng vấn", "detail.html"]])}
          <h1>JAPANDEE và hành trình trở về “Neon District”</h1>
          <p class="lead">Sau hai năm vắng bóng, producer/remixer Hà Nội trở lại với album “Neon District” — tám track kết hợp Vinahouse, future bass và Mandopop, có sự góp mặt của Duzme và Rainie Yang.</p>
          <div class="article-meta">
            <span>✍️ Lê Minh Anh</span>
            <span>📅 24/09/2026</span>
            <span>⏱ 8 phút đọc</span>
            <span>🏷 Phỏng vấn</span>
          </div>
        </div>
      </header>

      <!-- Two columns: article body on the left, sidebar on the right -->
      <div class="container article-layout">
        <!-- Main article content -->
        <div class="article-body">
          <p>Có một đêm, JAPANDEE ngồi trong studio nhìn ra con phố đã lên đèn và nhận ra mình đã remix quá nhiều bản nhạc về nơi này — nhưng chưa một lần thật sự kể câu chuyện của chính mình. “Neon District” ra đời từ khoảnh khắc đó.</p>

          <p>Album gồm 8 ca khúc, được hoàn thiện trong sáu tháng tại SoundWave Records. Không có dàn dây hoành tráng, không có bảng phối khí dày đặc. Chỉ có những mẫu dân ca, tiếng đàn tranh, analog synth và đôi khi là tiếng phố đêm được giữ nguyên trong bản thu.</p>

          <h2>“Tôi muốn giữ lại hơi thở của sân khấu”</h2>

          <p>Khi được hỏi vì sao không làm mới âm thanh bằng những bản phối hiện đại hơn, JAPANDEE cười: “Vì tôi không muốn những âm thanh đó biến mất. Mỗi lần thu, tôi đều yêu cầu kỹ thuật viên giữ lại tiếng đàn tranh, tiếng hát mộc và cả tiếng phố ngoài cửa sổ. Đó là bằng chứng rằng con người đã ở đó, đã chơi nhạc rất thật.”</p>

          <blockquote>
            “Tôi không viết nhạc để chứng minh mình hay. Tôi viết để nhớ mình đã từng ở đâu.”
            <footer>— JAPANDEE, trong buổi phỏng vấn tại studio SoundWave</footer>
          </blockquote>

          <p>Ca khúc mở đầu, “Out of the Mountain”, là bản remix được hoàn thiện chỉ trong một đêm. Giai điệu dân gian quen thuộc được đặt trên nền kick club và những lớp synth tối màu. Chính sự đối lập đó khiến nó trở thành bài hát được nghe nhiều nhất trong album, với hơn 1,2 triệu lượt nghe chỉ sau hai tuần phát hành.</p>

          <figure>
            <img src="images/article-2.jpg" alt="Bản thu album Neon District bên cạnh phím đàn" width="800" height="450" loading="lazy">
            <figcaption>“Neon District” kết hợp mẫu dân ca, đàn tranh và analog synth trong cùng một bản phối.</figcaption>
          </figure>

          <h2>Remix không có nghĩa là làm lại một cách máy móc</h2>

          <p>Với JAPANDEE, remix chưa bao giờ là chuyện “gắn thêm một đoạn drop”. Đó là cách chọn giữ lại linh hồn của bản gốc, nhưng vẫn mở ra một không gian mới. Album có sự góp mặt của Duzme trong “Mind the Pot” và Rainie Yang trong “Rain Love” — hai nghệ sĩ được anh mời sau khi nghe họ biểu diễn trong một buổi jam nhỏ ở Đà Lạt. “Jingwei” thì lấy cảm hứng từ truyền thuyết Trung Hoa về chú chim nhỏ lấp biển.</p>

          <p>“Tôi thích cảm giác ngồi trong phòng thu và nghe ai đó hát câu mình viết theo cách mình chưa từng nghĩ tới. Nó giống như nhìn thấy một phiên bản khác của chính mình,” anh chia sẻ.</p>

          <h3>Những điều còn lại sau album</h3>

          <ul>
            <li>Album phát hành trên SoundWave với định dạng Lossless 24-bit, kèm lời bài hát và phần bình luận của tác giả.</li>
            <li>Tour diễn “Neon District” dự kiến diễn ra tại Hà Nội, Đà Nẵng và TP.HCM vào tháng 12/2026.</li>
            <li>Toàn bộ lợi nhuận từ single “Out of the Mountain” trong tháng đầu được quyên góp cho quỹ hỗ trợ trẻ em vùng cao.</li>
          </ul>

          <p>Khi buổi phỏng vấn kết thúc, JAPANDEE đứng dậy, chỉnh lại tai nghe và bật lại đoạn drop một lần nữa. Ngoài cửa sổ, phố đã lên đèn. Có lẽ với anh, “Neon District” chưa bao giờ là một địa điểm — mà là cảm giác được ở lại với những âm thanh thân thuộc.</p>

          <div class="article-tags">
            <span class="chip">#JAPANDEE</span>
            <span class="chip">#NeonDistrict</span>
            <span class="chip">#Vinahouse</span>
            <span class="chip">#SoundWaveReview</span>
          </div>
        </div>

        <!-- Sidebar: author, related articles, album -->
        <aside class="sidebar" aria-label="Thông tin bài viết">
          <section class="author-card">
            <div class="author-top">
              <img src="images/avatar-4.jpg" alt="Ảnh đại diện tác giả Lê Minh Anh" width="50" height="50" loading="lazy">
              <div>
                <h3>Lê Minh Anh</h3>
                <small>Biên tập viên âm nhạc</small>
              </div>
            </div>
            <p>Phụ trách mảng âm nhạc điện tử và độc lập tại SoundWave. Theo dõi cô ấy để đọc những câu chuyện phía sau mỗi bản thu.</p>
          </section>

          <section class="sidebar-card">
            <h3>Bài viết liên quan</h3>
            <ul class="related-list">
              <li><a href="detail.html">
                <img src="images/article-2.jpg" alt="Ảnh minh họa bài review album Neon District" width="64" height="64" loading="lazy">
                <span><strong>Review: “Neon District” — khi nỗi nhớ được phối thành nhạc</strong><small>20/09/2026 · 6 phút đọc</small></span>
              </a></li>
              <li><a href="detail.html">
                <img src="images/article-3.jpg" alt="Ảnh minh họa bài viết về nhạc Chill" width="64" height="64" loading="lazy">
                <span><strong>Vì sao nhạc Chill giúp bạn học tập tốt hơn?</strong><small>14/09/2026 · 5 phút đọc</small></span>
              </a></li>
              <li><a href="detail.html">
                <img src="images/article-1.jpg" alt="Ảnh minh họa bài viết về tour diễn" width="64" height="64" loading="lazy">
                <span><strong>Tour “Neon District” chính thức mở bán vé</strong><small>02/10/2026 · 3 phút đọc</small></span>
              </a></li>
            </ul>
          </section>

          <section class="sidebar-card">
            <h3>Nghe album</h3>
            <a class="list-item" href="album-songs.html" style="padding:0">
              <img src="images/cover-5.jpg" alt="Ảnh bìa album Neon District" width="56" height="56" style="width:56px;height:56px" loading="lazy">
              <span class="li-text"><strong>Neon District</strong><span>JAPANDEE · 2026</span></span>
            </a>
            <a class="link-arrow" href="album-songs.html" style="margin-top:14px">Mở album <span aria-hidden="true">→</span></a>
          </section>
        </aside>
      </div>
    </article>`;

/* ---------------- 8. ABOUT ---------------- */
const aboutContent = `<!-- ===== INTRO: title and mission description ===== -->
    <section class="page-hero" aria-labelledby="aboutTitle">
      <div class="container">
        ${breadcrumb([["Trang chủ", "index.html"], ["Về chúng tôi", "about.html"]])}
        <span class="eyebrow" style="margin-top:20px"><span class="dot"></span>Về SoundWave</span>
        <h1 id="aboutTitle">Kết nối nghệ sĩ indie với<br><span class="gradient-text">hàng triệu tâm hồn</span> yêu nhạc.</h1>
        <p class="lead">SoundWave được sinh ra từ một niềm tin đơn giản: âm nhạc hay không cần phải đến từ những ông lớn. Chúng tôi xây dựng một sân chơi công bằng, nơi nghệ sĩ độc lập được lắng nghe và người nghe được tôn trọng.</p>
      </div>
    </section>

    <!-- ===== MISSION + KEY STATS ===== -->
    <section class="section" aria-labelledby="missionTitle">
      <div class="container">
        <div class="mission">
          <div>
            <span class="eyebrow"><span class="dot"></span>Sứ mệnh</span>
            <h2 id="missionTitle" style="margin-top:16px">Âm nhạc độc lập xứng đáng có một ngôi nhà tử tế.</h2>
            <p>Chúng tôi tin rằng mỗi nghệ sĩ đều xứng đáng được trả thù lao công bằng, mỗi người nghe đều xứng đáng có một trải nghiệm sạch và mỗi ca khúc đều xứng đáng được nghe đúng như cách nó được tạo ra.</p>
          </div>
          <blockquote>“Kết nối nghệ sĩ Indie độc lập với hàng triệu tâm hồn yêu âm nhạc.”</blockquote>
        </div>

        <div class="stat-grid" style="margin-top:20px">
          <div class="stat-box"><strong>2,4M+</strong><span>Bài hát trên nền tảng</span></div>
          <div class="stat-box"><strong>850K</strong><span>Nghệ sĩ độc lập</span></div>
          <div class="stat-box"><strong>12M</strong><span>Người nghe mỗi tháng</span></div>
          <div class="stat-box"><strong>70%</strong><span>Doanh thu trả cho nghệ sĩ</span></div>
        </div>
      </div>
    </section>

    <!-- ===== CORE VALUES: 3 cards ===== -->
    <section class="section section-tight" aria-labelledby="valuesTitle">
      <div class="container">
        <div class="section-head">
          <div>
            <h2 id="valuesTitle">Giá trị chúng tôi theo đuổi</h2>
            <p>Ba nguyên tắc định hình mọi quyết định của SoundWave.</p>
          </div>
        </div>
        <div class="value-grid">
          <article class="value-card">
            <span class="v-icon" aria-hidden="true">🎧</span>
            <h3>Nghe nhạc tử tế</h3>
            <p>Chất lượng lossless, trình phát mượt mà và không quảng cáo chen ngang giữa một bản nhạc đang hay.</p>
          </article>
          <article class="value-card">
            <span class="v-icon" aria-hidden="true">🤝</span>
            <h3>Công bằng với nghệ sĩ</h3>
            <p>Minh bạch doanh thu, trả 70% cho nghệ sĩ và cung cấp dữ liệu người nghe rõ ràng để họ phát triển.</p>
          </article>
          <article class="value-card">
            <span class="v-icon" aria-hidden="true">🌱</span>
            <h3>Nuôi dưỡng cộng đồng</h3>
            <p>Ưu tiên nghệ sĩ mới, tạo không gian an toàn cho người nghe và tôn trọng sự khác biệt trong âm nhạc.</p>
          </article>
        </div>
      </div>
    </section>

    <!-- ===== TEAM: 4 member cards + social links ===== -->
    <section class="section" aria-labelledby="teamTitle">
      <div class="container">
        <div class="section-head">
          <div>
            <h2 id="teamTitle">Đội ngũ phát triển</h2>
            <p>Những người đang xây SoundWave mỗi ngày.</p>
          </div>
          <a class="link-arrow" href="contact.html">Tham gia cùng chúng tôi <span aria-hidden="true">→</span></a>
        </div>
        <div class="team-grid">
          <article class="team-card">
            <img src="images/avatar-1.jpg" alt="Chân dung Đinh Nhật Phong" width="400" height="400" loading="lazy">
            <div class="team-body">
              <h3>Đinh Nhật Phong</h3>
              <p>Frontend Lead · ID1736755</p>
              <div class="socials">
                <a href="https://github.com/" target="_blank" rel="noopener" aria-label="GH — GitHub của Đinh Nhật Phong">GH</a>
                <a href="https://www.linkedin.com/" target="_blank" rel="noopener" aria-label="IN — LinkedIn của Đinh Nhật Phong">IN</a>
                <a href="mailto:phong@soundwave.vn" aria-label="@ — Email của Đinh Nhật Phong">@</a>
              </div>
            </div>
          </article>
          <article class="team-card">
            <img src="images/avatar-2.jpg" alt="Chân dung Nguyễn Thu Hà" width="400" height="400" loading="lazy">
            <div class="team-body">
              <h3>Nguyễn Thu Hà</h3>
              <p>UI/UX Designer</p>
              <div class="socials">
                <a href="https://www.behance.net/" target="_blank" rel="noopener" aria-label="BE — Behance của Nguyễn Thu Hà">BE</a>
                <a href="https://www.instagram.com/" target="_blank" rel="noopener" aria-label="IG — Instagram của Nguyễn Thu Hà">IG</a>
                <a href="mailto:ha@soundwave.vn" aria-label="@ — Email của Nguyễn Thu Hà">@</a>
              </div>
            </div>
          </article>
          <article class="team-card">
            <img src="images/avatar-3.jpg" alt="Chân dung Trần Quốc Bảo" width="400" height="400" loading="lazy">
            <div class="team-body">
              <h3>Trần Quốc Bảo</h3>
              <p>Fullstack Developer</p>
              <div class="socials">
                <a href="https://github.com/" target="_blank" rel="noopener" aria-label="GH — GitHub của Trần Quốc Bảo">GH</a>
                <a href="https://www.linkedin.com/" target="_blank" rel="noopener" aria-label="IN — LinkedIn của Trần Quốc Bảo">IN</a>
                <a href="mailto:bao@soundwave.vn" aria-label="@ — Email của Trần Quốc Bảo">@</a>
              </div>
            </div>
          </article>
          <article class="team-card">
            <img src="images/avatar-4.jpg" alt="Chân dung Lê Minh Anh" width="400" height="400" loading="lazy">
            <div class="team-body">
              <h3>Lê Minh Anh</h3>
              <p>Content Editor</p>
              <div class="socials">
                <a href="https://www.facebook.com/" target="_blank" rel="noopener" aria-label="FB — Facebook của Lê Minh Anh">FB</a>
                <a href="https://www.instagram.com/" target="_blank" rel="noopener" aria-label="IG — Instagram của Lê Minh Anh">IG</a>
                <a href="mailto:anh@soundwave.vn" aria-label="@ — Email của Lê Minh Anh">@</a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ===== JOURNEY + CAREERS ===== -->
    <section class="section section-tight" aria-labelledby="journeyTitle">
      <div class="container content-grid">
        <div class="sidebar-card">
          <h3 id="journeyTitle" style="font-size:1.2rem">Hành trình của chúng tôi</h3>
          <ul class="awards" style="margin-top:18px">
            <li><span class="year">2022</span><span>SoundWave ra mắt bản thử nghiệm với 500 nghệ sĩ indie đầu tiên.</span></li>
            <li><span class="year">2023</span><span>Đạt 1 triệu người dùng và ra mắt trình phát Lossless.</span></li>
            <li><span class="year">2024</span><span>Khởi động quỹ hỗ trợ nghệ sĩ trẻ SoundWave Seed.</span></li>
            <li><span class="year">2026</span><span>Mở rộng tới 120 quốc gia, hợp tác cùng 850.000 nghệ sĩ.</span></li>
          </ul>
        </div>
        <div class="mission" style="grid-template-columns:1fr;padding:30px">
          <div>
            <span class="eyebrow"><span class="dot"></span>Tuyển dụng</span>
            <h2 style="margin-top:16px;font-size:1.5rem">Bạn muốn xây âm nhạc cùng chúng tôi?</h2>
            <p style="margin-bottom:18px">SoundWave luôn tìm kiếm những người yêu âm nhạc và tin vào một nền tảng công bằng hơn.</p>
            <a class="btn btn-primary" href="contact.html">Gửi hồ sơ ứng tuyển</a>
          </div>
        </div>
      </div>
    </section>`;

/* ---------------- 9. CONTACT ---------------- */
const contactContent = `<!-- ===== CONTACT PAGE TITLE ===== -->
    <section class="page-hero" aria-labelledby="contactTitle">
      <div class="container">
        ${breadcrumb([["Trang chủ", "index.html"], ["Liên hệ", "contact.html"]])}
        <span class="eyebrow" style="margin-top:20px"><span class="dot"></span>Liên hệ &amp; đóng góp</span>
        <h1 id="contactTitle">Chúng tôi luôn muốn nghe bạn.</h1>
        <p class="lead">Dù bạn là nghệ sĩ muốn hợp tác, người nghe muốn góp ý hay cần hỗ trợ tài khoản — hãy để lại lời nhắn, đội ngũ SoundWave sẽ phản hồi trong 1–2 ngày làm việc.</p>
      </div>
    </section>

    <!-- ===== TWO-COLUMN LAYOUT: CONTACT FORM + SUPPORT INFO ===== -->
    <section class="section" aria-label="Liên hệ SoundWave">
      <div class="container contact-layout">
        <!-- Message form: name, email, request type, message -->
        <div class="form-card">
          <h2>Gửi lời nhắn</h2>
          <p>Các trường có dấu <span style="color:var(--accent-2)">*</span> là bắt buộc.</p>

          <form id="contactForm" novalidate>
            <div class="form-grid">
              <div class="field">
                <label for="name">Họ và tên <span class="req">*</span></label>
                <input type="text" id="name" name="name" placeholder="Nguyễn Văn A" autocomplete="name">
                <span class="error-msg">Vui lòng nhập họ tên.</span>
              </div>

              <div class="field">
                <label for="email">Email <span class="req">*</span></label>
                <input type="email" id="email" name="email" placeholder="ban@email.com" autocomplete="email">
                <span class="error-msg">Email chưa đúng định dạng.</span>
              </div>

              <div class="field full">
                <label for="requestType">Loại yêu cầu <span class="req">*</span></label>
                <div class="select-wrap">
                  <select id="requestType" name="requestType">
                    <option value="">— Chọn loại yêu cầu —</option>
                    <option value="artist">Hợp tác nghệ sĩ</option>
                    <option value="feedback">Góp ý người dùng</option>
                    <option value="copyright">Báo cáo bản quyền</option>
                    <option value="support">Hỗ trợ tài khoản</option>
                    <option value="other">Khác</option>
                  </select>
                </div>
                <span class="error-msg">Vui lòng chọn loại yêu cầu.</span>
              </div>

              <div class="field full">
                <label for="message">Nội dung <span class="req">*</span></label>
                <textarea id="message" name="message" placeholder="Hãy kể cho chúng tôi nghe bạn cần gì..."></textarea>
                <span class="hint">Tối thiểu 10 ký tự. Càng chi tiết, chúng tôi càng hỗ trợ nhanh hơn.</span>
                <span class="error-msg">Nội dung cần ít nhất 10 ký tự.</span>
              </div>
            </div>

            <div class="form-foot">
              <button class="btn btn-primary" type="submit">Gửi lời nhắn <span aria-hidden="true">→</span></button>
              <small>Bằng việc gửi form, bạn đồng ý với <a href="policy-terms.html" style="color:var(--accent-3)">chính sách bảo mật</a> của SoundWave.</small>
            </div>

            <div class="form-status" id="formStatus" role="status" aria-live="polite"></div>
          </form>
        </div>

        <div>
          <!-- Contact details: hotline, email, address, hours -->
          <div class="contact-cards">
            <div class="contact-item">
              <span class="ci-icon" aria-hidden="true">📞</span>
              <div>
                <h3>Hotline hỗ trợ</h3>
                <p><a href="tel:+842873001688">(028) 7300 1688</a> · 8:00 – 22:00 hằng ngày</p>
              </div>
            </div>
            <div class="contact-item">
              <span class="ci-icon" aria-hidden="true">✉️</span>
              <div>
                <h3>Email</h3>
                <p><a href="mailto:hello@soundwave.vn">hello@soundwave.vn</a> · <a href="mailto:artist@soundwave.vn">artist@soundwave.vn</a></p>
              </div>
            </div>
            <div class="contact-item">
              <span class="ci-icon" aria-hidden="true">📍</span>
              <div>
                <h3>Studio SoundWave</h3>
                <p>285 Cách Mạng Tháng 8, Phường 12, Quận 10, TP. Hồ Chí Minh</p>
              </div>
            </div>
            <div class="contact-item">
              <span class="ci-icon" aria-hidden="true">🕒</span>
              <div>
                <h3>Giờ làm việc</h3>
                <p>Thứ Hai – Thứ Sáu: 9:00 – 18:00 · Thứ Bảy: 9:00 – 12:00</p>
              </div>
            </div>
          </div>

          <!-- Studio Google Maps embed -->
          <div class="map-card" style="margin-top:16px">
            <iframe
              src="https://www.google.com/maps?q=285+Cach+Mang+Thang+Quan+10+Ho+Chi+Minh&output=embed"
              title="Bản đồ trụ sở Studio SoundWave tại Quận 10, TP. Hồ Chí Minh"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              allowfullscreen></iframe>
            <div class="map-foot">
              <span>Studio SoundWave · Quận 10, TP.HCM</span>
              <a class="link-arrow" href="https://maps.google.com/?q=285+Cach+Mang+Thang+Quan+10+Ho+Chi+Minh" target="_blank" rel="noopener">Chỉ đường <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </div>
      </div>
    </section>`;

/* ---------------- 10. POLICY ---------------- */
const policyContent = `<!-- ===== POLICY PAGE TITLE ===== -->
    <section class="page-hero" aria-labelledby="policyTitle">
      <div class="container">
        ${breadcrumb([["Trang chủ", "index.html"], ["Chính sách & điều khoản", "policy-terms.html"]])}
        <h1 id="policyTitle">Chính sách &amp; Điều khoản</h1>
        <p class="lead">SoundWave cam kết minh bạch về bản quyền, quyền riêng tư và quyền lợi của cả nghệ sĩ lẫn người nghe. Vui lòng đọc kỹ các quy định dưới đây.</p>
      </div>
    </section>

    <!-- ===== LAYOUT: TABLE OF CONTENTS LEFT + POLICY CONTENT RIGHT ===== -->
    <div class="container policy-layout">
      <!-- Sticky table of contents for quick section jumps -->
      <aside class="toc" aria-label="Mục lục trang chính sách">
        <h3>Nội dung</h3>
        <ol>
          <li><a href="#dmca">1. Bản quyền &amp; DMCA</a></li>
          <li><a href="#privacy">2. Bảo mật thông tin</a></li>
          <li><a href="#terms">3. Điều khoản dịch vụ</a></li>
          <li><a href="#premium-terms">4. Điều khoản Premium</a></li>
          <li><a href="#community">5. Quy tắc cộng đồng</a></li>
          <li><a href="#contact-policy">6. Liên hệ pháp lý</a></li>
        </ol>
        <a class="btn btn-ghost btn-block btn-sm" href="contact.html" style="margin-top:14px">Gửi yêu cầu hỗ trợ</a>
      </aside>

      <!-- Policy content: each section has an id for the table of contents -->
      <div class="policy-body">
        <span class="policy-updated">🕒 Cập nhật lần cuối: 01/10/2026 · Áp dụng cho toàn bộ người dùng SoundWave</span>

        <section class="policy-section" id="dmca">
          <h2><span class="n">01</span> Bản quyền tác giả &amp; quy trình DMCA</h2>
          <p>SoundWave tôn trọng tuyệt đối quyền sở hữu trí tuệ của nhạc sĩ, ca sĩ, nhà sản xuất và các chủ sở hữu bản quyền. Mọi nội dung được đăng tải lên nền tảng phải thuộc quyền sở hữu hợp pháp của người đăng hoặc đã được cấp phép rõ ràng.</p>

          <h3>Nghĩa vụ của nghệ sĩ</h3>
          <ul>
            <li>Chịu trách nhiệm về tính hợp pháp của bản thu, hình ảnh bìa và lời bài hát do mình tải lên.</li>
            <li>Không sử dụng mẫu nhạc (sample) chưa được cấp phép thương mại.</li>
            <li>Cung cấp thông tin tác giả, nhà sản xuất và chủ sở hữu quyền khi được yêu cầu.</li>
          </ul>

          <h3>Quy trình báo cáo xâm phạm</h3>
          <p>Nếu bạn là chủ sở hữu bản quyền và phát hiện nội dung xâm phạm, hãy gửi thông báo tới <a href="mailto:copyright@soundwave.vn" style="color:var(--accent-3)">copyright@soundwave.vn</a> với các thông tin sau:</p>
          <ul>
            <li>Thông tin liên hệ và tư cách chủ sở hữu quyền.</li>
            <li>Đường dẫn (URL) chính xác tới nội dung bị cho là xâm phạm.</li>
            <li>Bằng chứng về quyền sở hữu hoặc giấy ủy quyền hợp lệ.</li>
            <li>Tuyên bố về tính trung thực của thông tin cung cấp.</li>
          </ul>
          <div class="callout"><strong>Thời gian xử lý:</strong> SoundWave sẽ xem xét và tạm ẩn nội dung bị báo cáo trong vòng 48 giờ làm việc. Nghệ sĩ có quyền phản hồi trong 7 ngày trước khi quyết định cuối cùng được đưa ra.</div>
        </section>

        <section class="policy-section" id="privacy">
          <h2><span class="n">02</span> Bảo mật thông tin người nghe</h2>
          <p>Chúng tôi thu thập lượng dữ liệu tối thiểu cần thiết để vận hành dịch vụ và không bao giờ bán dữ liệu cá nhân cho bên thứ ba.</p>

          <h3>Dữ liệu chúng tôi thu thập</h3>
          <ul>
            <li><strong>Thông tin tài khoản:</strong> họ tên, email, ảnh đại diện và mật khẩu được mã hóa một chiều.</li>
            <li><strong>Dữ liệu sử dụng:</strong> lịch sử nghe nhạc, danh sách phát và tương tác với nội dung — dùng để cá nhân hóa gợi ý.</li>
            <li><strong>Dữ liệu thanh toán:</strong> được xử lý bởi đối tác thanh toán đạt chuẩn PCI-DSS; SoundWave không lưu số thẻ.</li>
          </ul>

          <h3>Quyền của bạn</h3>
          <p>Bạn có quyền truy cập, chỉnh sửa, tải xuống hoặc xóa toàn bộ dữ liệu cá nhân của mình bất kỳ lúc nào trong phần Cài đặt tài khoản. Yêu cầu xóa tài khoản sẽ được xử lý trong vòng 30 ngày.</p>
          <div class="callout"><strong>Cam kết:</strong> Dữ liệu người nghe không được chia sẻ với nhãn hàng quảng cáo. Nghệ sĩ chỉ nhận thống kê tổng hợp, ẩn danh về lượt nghe và khu vực địa lý.</div>
        </section>

        <section class="policy-section" id="terms">
          <h2><span class="n">03</span> Điều khoản sử dụng dịch vụ</h2>
          <p>Khi tạo tài khoản hoặc sử dụng SoundWave, bạn đồng ý tuân thủ các điều khoản dưới đây.</p>

          <h3>Tài khoản người dùng</h3>
          <ul>
            <li>Người dùng phải từ 13 tuổi trở lên; dưới 18 tuổi cần sự đồng ý của phụ huynh.</li>
            <li>Không chia sẻ tài khoản, mật khẩu hoặc bán quyền truy cập cho người khác.</li>
            <li>Chịu trách nhiệm về mọi hoạt động phát sinh từ tài khoản của mình.</li>
          </ul>

          <h3>Hành vi bị cấm</h3>
          <ul>
            <li>Tải xuống, sao chép hoặc phân phối nội dung trái phép khỏi nền tảng.</li>
            <li>Sử dụng công cụ tự động để thu thập dữ liệu hoặc tấn công hệ thống.</li>
            <li>Đăng tải nội dung kích động thù địch, xúc phạm hoặc vi phạm pháp luật Việt Nam.</li>
            <li>Giả mạo danh tính nghệ sĩ hoặc chủ sở hữu bản quyền.</li>
          </ul>
          <p>SoundWave có quyền tạm khóa hoặc chấm dứt tài khoản vi phạm mà không cần báo trước, tùy theo mức độ nghiêm trọng.</p>
        </section>

        <section class="policy-section" id="premium-terms">
          <h2><span class="n">04</span> Điều khoản dịch vụ Premium</h2>
          <p>Gói Premium mở khóa chất lượng Lossless, tải nhạc offline và trải nghiệm không quảng cáo. Các điều khoản thanh toán được quy định như sau:</p>

          <h3>Chu kỳ thanh toán</h3>
          <ul>
            <li>Gói tháng tự động gia hạn mỗi 30 ngày; gói năm gia hạn mỗi 12 tháng.</li>
            <li>Bạn có thể hủy gia hạn bất kỳ lúc nào; quyền lợi vẫn được giữ đến hết chu kỳ đã thanh toán.</li>
            <li>SoundWave gửi thông báo nhắc gia hạn qua email trước 3 ngày.</li>
          </ul>

          <h3>Hoàn tiền &amp; dùng thử</h3>
          <ul>
            <li>Người dùng mới được dùng thử 7 ngày miễn phí, mỗi tài khoản một lần.</li>
            <li>Yêu cầu hoàn tiền trong 7 ngày đầu tiên được chấp nhận nếu chưa sử dụng quá 10 giờ nghe nhạc.</li>
            <li>Chi phí đã thanh toán cho chu kỳ đang sử dụng không được hoàn lại sau thời hạn trên.</li>
          </ul>
          <div class="callout"><strong>Lưu ý:</strong> Gói Family cho phép tối đa 6 thành viên trong cùng hộ gia đình. Mỗi thành viên có tài khoản và thư viện riêng.</div>
        </section>

        <section class="policy-section" id="community">
          <h2><span class="n">05</span> Quy tắc cộng đồng</h2>
          <p>SoundWave là không gian dành cho âm nhạc. Mọi bình luận, đánh giá và nội dung do người dùng tạo ra cần tuân thủ các nguyên tắc sau:</p>
          <ul>
            <li>Tôn trọng nghệ sĩ và người nghe khác, kể cả khi không đồng tình.</li>
            <li>Không spam, quảng cáo dịch vụ bên ngoài hoặc chia sẻ liên kết độc hại.</li>
            <li>Không đăng nội dung khiêu dâm, bạo lực hoặc xâm phạm quyền riêng tư của người khác.</li>
            <li>Báo cáo nội dung vi phạm thay vì tự xử lý — đội ngũ kiểm duyệt sẽ xem xét.</li>
          </ul>
        </section>

        <section class="policy-section" id="contact-policy">
          <h2><span class="n">06</span> Liên hệ pháp lý</h2>
          <p>Mọi thắc mắc về chính sách, bản quyền hoặc điều khoản vui lòng liên hệ:</p>
          <ul>
            <li><strong>Email pháp lý:</strong> <a href="mailto:legal@soundwave.vn" style="color:var(--accent-3)">legal@soundwave.vn</a></li>
            <li><strong>Email bản quyền:</strong> <a href="mailto:copyright@soundwave.vn" style="color:var(--accent-3)">copyright@soundwave.vn</a></li>
            <li><strong>Địa chỉ:</strong> 285 Cách Mạng Tháng 8, Phường 12, Quận 10, TP. Hồ Chí Minh</li>
            <li><strong>Hotline:</strong> (028) 7300 1688</li>
          </ul>
          <p style="margin-top:18px">SoundWave có quyền cập nhật chính sách này và sẽ thông báo tới người dùng qua email trước 15 ngày đối với các thay đổi quan trọng.</p>
        </section>
      </div>
    </div>`;

/* ---------------- 11. PREMIUM ---------------- */
const premiumContent = `<!-- ===== PREMIUM TITLE + MONTHLY/YEARLY TOGGLE ===== -->
    <section class="page-hero" aria-labelledby="premiumTitle">
      <div class="container">
        ${breadcrumb([["Trang chủ", "index.html"], ["Premium", "premium.html"]])}
        <span class="eyebrow" style="margin-top:20px"><span class="dot"></span>SoundWave Premium</span>
        <h1 id="premiumTitle">Nghe trọn từng nốt nhạc.<br><span class="gradient-text">Không quảng cáo.</span></h1>
        <p class="lead">Chọn gói phù hợp để mở khóa Lossless 24-bit, tải nhạc offline và ủng hộ trực tiếp nghệ sĩ bạn yêu thích. Hủy bất kỳ lúc nào.</p>

        <div class="pricing-toggle" role="group" aria-label="Chọn chu kỳ thanh toán">
          <button type="button" data-plan="monthly" class="active" aria-pressed="true">Hàng tháng</button>
          <button type="button" data-plan="yearly" aria-pressed="false">Hàng năm <span class="save">-17%</span></button>
        </div>
      </div>
    </section>

    <!-- ===== PRICING: Free / Premium / Family plans ===== -->
    <section class="section" aria-label="Bảng giá">
      <div class="container">
        <!-- 3 plan cards; the middle Premium card is highlighted -->
        <div class="price-grid">
          <article class="price-card">
            <h2>Free</h2>
            <p class="price-desc">Dành cho người mới bắt đầu khám phá SoundWave.</p>
            <div class="price">
              <span class="amount" data-monthly="0đ" data-yearly="0đ">0đ</span>
              <span class="period">/ tháng</span>
            </div>
            <ul class="feature-list">
              <li>Nghe nhạc chất lượng 128kbps</li>
              <li>Kho nhạc 2,4 triệu bài hát</li>
              <li>Tạo tối đa 3 playlist</li>
              <li>Có quảng cáo giữa các bài</li>
              <li class="off">Chất lượng Lossless</li>
              <li class="off">Tải nhạc offline</li>
            </ul>
            <a class="btn btn-ghost" href="search.html">Bắt đầu miễn phí</a>
          </article>

          <article class="price-card featured">
            <span class="price-badge">Phổ biến nhất</span>
            <h2>Premium</h2>
            <p class="price-desc">Trải nghiệm âm nhạc trọn vẹn, không giới hạn.</p>
            <div class="price">
              <span class="amount" data-monthly="59.000đ" data-yearly="590.000đ">59.000đ</span>
              <span class="period">/ tháng</span>
            </div>
            <ul class="feature-list">
              <li>Lossless 24-bit, không quảng cáo</li>
              <li>Tải nhạc offline không giới hạn</li>
              <li>Playlist và thư viện không giới hạn</li>
              <li>Chuyển bài tức thì, âm thanh vòm</li>
              <li>Tải lời bài hát &amp; bìa độ phân giải cao</li>
              <li>Dùng thử 7 ngày miễn phí</li>
            </ul>
            <a class="btn btn-primary" href="contact.html">Dùng thử 7 ngày</a>
          </article>

          <article class="price-card">
            <h2>Family</h2>
            <p class="price-desc">Chia sẻ âm nhạc cùng tối đa 6 thành viên gia đình.</p>
            <div class="price">
              <span class="amount" data-monthly="149.000đ" data-yearly="1.490.000đ">149.000đ</span>
              <span class="period">/ tháng</span>
            </div>
            <ul class="feature-list">
              <li>Toàn bộ quyền lợi Premium</li>
              <li>6 tài khoản riêng biệt</li>
              <li>Thư viện và gợi ý độc lập</li>
              <li>Kiểm soát nội dung dành cho trẻ em</li>
              <li>Quản lý thành viên trong một ứng dụng</li>
              <li class="off">Không áp dụng cho hộ gia đình khác địa chỉ</li>
            </ul>
            <a class="btn btn-ghost" href="contact.html">Chọn gói Family</a>
          </article>
        </div>
      </div>
    </section>

    <!-- ===== PLAN FEATURE COMPARISON TABLE ===== -->
    <section class="section section-tight" aria-labelledby="compareTitle">
      <div class="container">
        <div class="section-head">
          <div>
            <h2 id="compareTitle">So sánh quyền lợi</h2>
            <p>Mọi gói đều có thể nâng cấp hoặc hủy bất kỳ lúc nào.</p>
          </div>
        </div>
        <!-- Comparison table: horizontal scroll on mobile -->
        <div class="compare-wrap">
          <table class="compare-table">
            <thead>
              <tr>
                <th scope="col">Tính năng</th>
                <th scope="col">Free</th>
                <th scope="col">Premium</th>
                <th scope="col">Family</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Chất lượng âm thanh</td><td>128kbps</td><td>Lossless 24-bit</td><td>Lossless 24-bit</td></tr>
              <tr><td>Nghe không quảng cáo</td><td class="no">—</td><td class="yes">✓</td><td class="yes">✓</td></tr>
              <tr><td>Tải nhạc offline</td><td class="no">—</td><td class="yes">✓</td><td class="yes">✓</td></tr>
              <tr><td>Số playlist tối đa</td><td>3</td><td>Không giới hạn</td><td>Không giới hạn</td></tr>
              <tr><td>Số tài khoản</td><td>1</td><td>1</td><td>6</td></tr>
              <tr><td>Âm thanh vòm</td><td class="no">—</td><td class="yes">✓</td><td class="yes">✓</td></tr>
              <tr><td>Kiểm soát nội dung trẻ em</td><td class="no">—</td><td class="no">—</td><td class="yes">✓</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- ===== FAQ: uses details/summary for open/close ===== -->
    <section class="section section-tight" aria-labelledby="faqTitle">
      <div class="container">
        <div class="section-head" style="justify-content:center;text-align:center">
          <div>
            <h2 id="faqTitle">Câu hỏi thường gặp</h2>
            <p>Những điều người nghe hay hỏi trước khi nâng cấp.</p>
          </div>
        </div>
        <!-- Frequently asked questions -->
        <div class="faq">
          <details open>
            <summary>Tôi có thể hủy gói Premium bất kỳ lúc nào không?</summary>
            <p>Có. Bạn có thể hủy gia hạn trong phần Cài đặt tài khoản. Quyền lợi Premium vẫn được giữ đến hết chu kỳ thanh toán hiện tại và bạn không bị tính thêm phí.</p>
          </details>
          <details>
            <summary>Dùng thử 7 ngày có bị trừ tiền ngay không?</summary>
            <p>Không. SoundWave chỉ bắt đầu tính phí sau khi kết thúc 7 ngày dùng thử. Bạn có thể hủy trước thời hạn để tránh bị trừ tiền.</p>
          </details>
          <details>
            <summary>Lossless 24-bit khác gì so với chất lượng thông thường?</summary>
            <p>Lossless 24-bit giữ nguyên toàn bộ dữ liệu âm thanh gốc từ bản thu, cho dải động rộng hơn và chi tiết nhạc cụ rõ hơn đáng kể so với định dạng nén 128kbps.</p>
          </details>
          <details>
            <summary>Gói Family có yêu cầu chung địa chỉ không?</summary>
            <p>Có. Gói Family dành cho các thành viên sống cùng hộ gia đình. SoundWave có thể yêu cầu xác minh địa chỉ trong một số trường hợp.</p>
          </details>
          <details>
            <summary>Tôi có thể chuyển từ gói tháng sang gói năm không?</summary>
            <p>Hoàn toàn được. Khi nâng cấp, số tiền chưa dùng của gói tháng sẽ được quy đổi thành tín dụng cho gói năm tiếp theo.</p>
          </details>
        </div>
      </div>
    </section>

    <!-- ===== CLOSING CTA: trial signup ===== -->
    <section class="section section-tight" aria-label="Kêu gọi nâng cấp">
      <div class="container">
        <div class="mission" style="text-align:center;grid-template-columns:1fr;padding:44px 30px">
          <div>
            <h2 style="font-size:clamp(1.6rem,3vw,2.2rem);margin-bottom:10px">Sẵn sàng nghe khác biệt?</h2>
            <p style="max-width:620px;margin:0 auto 24px">Tham gia cùng hơn 12 triệu người nghe đang trải nghiệm âm nhạc chất lượng cao trên SoundWave.</p>
            <a class="btn btn-primary" href="contact.html">Bắt đầu dùng thử miễn phí</a>
          </div>
        </div>
      </div>
    </section>`;

/* ---------------- write pages ---------------- */
const pages = [
  ["index.html", "SoundWave — Nền tảng âm nhạc cho giới trẻ", "SoundWave — khám phá hàng triệu bài hát Vinahouse, future bass, EDM và Mandopop. Bảng xếp hạng tuần, chuyên mục nổi bật và trải nghiệm nghe nhạc lossless.", indexContent],
  ["search.html", "Tìm kiếm bài hát — SoundWave", "Tìm kiếm bài hát trên SoundWave theo tên, ca sĩ, thể loại và năm phát hành. Bộ lọc nâng cao và sắp xếp thông minh.", searchContent],
  ["song-detail.html", "Out of the Mountain — JAPANDEE | SoundWave", "Chi tiết ca khúc Out of the Mountain của JAPANDEE: lời bài hát, thông tin sáng tác, album Neon District và danh sách bài hát gợi ý.", songContent],
  ["artist-songs.html", "JAPANDEE — Nghệ sĩ | SoundWave", "Hồ sơ nghệ sĩ JAPANDEE: producer/remixer Vinahouse, future bass, 128K người theo dõi và danh sách ca khúc với lượt nghe, thời lượng.", artistContent],
  ["composer-songs.html", "Kai Nguyen — Nhạc sĩ | SoundWave", "Gia tài sáng tác của producer Kai Nguyen: các tác phẩm tiêu biểu, nghệ sĩ thể hiện và giải thưởng âm nhạc nổi bật.", composerContent],
  ["album-songs.html", "Neon District — Album của JAPANDEE | SoundWave", "Album Neon District (2026) của JAPANDEE & Friends: 8 ca khúc, tổng thời lượng 32:03, tracklist đầy đủ và thông tin phát hành.", albumContent],
  ["detail.html", "JAPANDEE và hành trình trở về “Neon District” | SoundWave", "Bài phỏng vấn chuyên sâu với JAPANDEE về album Neon District, quá trình sản xuất và sự kết hợp cùng Duzme, Rainie Yang.", articleContent],
  ["about.html", "Về chúng tôi — SoundWave", "Sứ mệnh của SoundWave: kết nối nghệ sĩ indie độc lập với hàng triệu tâm hồn yêu âm nhạc. Gặp gỡ đội ngũ phát triển.", aboutContent],
  ["contact.html", "Liên hệ & Đóng góp — SoundWave", "Gửi lời nhắn hợp tác, góp ý hoặc yêu cầu hỗ trợ tới SoundWave. Hotline, email và bản đồ studio tại TP. Hồ Chí Minh.", contactContent],
  ["policy-terms.html", "Chính sách & Điều khoản — SoundWave", "Chính sách bản quyền DMCA, bảo mật thông tin người nghe, điều khoản dịch vụ và điều khoản gói Premium của SoundWave.", policyContent],
  ["premium.html", "SoundWave Premium — Bảng giá & Quyền lợi", "So sánh gói Free, Premium và Family của SoundWave. Nghe lossless 24-bit, tải nhạc offline, không quảng cáo, dùng thử 7 ngày.", premiumContent]
];

for (const [file, title, description, content] of pages) {
  writeFileSync(join(root, file), layout(file, title, description, content), "utf8");
  console.log("wrote " + file);
}
console.log("\nDone: " + pages.length + " pages generated.");
