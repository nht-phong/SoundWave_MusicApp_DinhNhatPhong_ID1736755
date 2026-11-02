/* =========================================================
   SoundWave — shared interactions
   Author: Dinh Nhat Phong (ID1736755)
   ========================================================= */
(function () {
  "use strict";

  const $ = (sel, scope) => (scope || document).querySelector(sel);
  const $$ = (sel, scope) => Array.prototype.slice.call((scope || document).querySelectorAll(sel));

  /* ---------- 1. Mobile navigation ---------- */
  const navToggle = $(".nav-toggle");
  const navLinks = $(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      const open = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Đóng menu" : "Mở menu");
    });

    navLinks.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Mở menu");
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Mở menu");
        navToggle.focus();
      }
    });
  }

  /* ---------- 2. Highlight the current page in the navbar ---------- */
  const currentFile = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  $$(".nav-links a").forEach(function (link) {
    const href = (link.getAttribute("href") || "").toLowerCase();
    if (href === currentFile) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  /* ---------- 3. Music player with real audio ---------- */
  const player = $("#player");

  if (player && $("#audioEl")) {
    const audio = $("#audioEl");
    const playlist = [
      {
        title: "Out of the Mountain",
        artist: "JAPANDEE",
        cover: "images/cover-1.jpg",
        src: "audio/track-1.mp3?v=20261030"
      },
      {
        title: "Mind the Pot",
        artist: "Duzme",
        cover: "images/cover-2.jpg",
        src: "audio/track-2.mp3?v=20261030"
      },
      {
        title: "Jingwei",
        artist: "JAPANDEE",
        cover: "images/cover-6.jpg",
        src: "audio/track-3.mp3?v=20261030"
      },
      {
        title: "Rain Love",
        artist: "Rainie Yang",
        cover: "images/cover-3.jpg",
        src: "audio/track-4.mp3?v=20261030"
      }
    ];

    let trackIndex = 0;
    let currentSeconds = 0;
    let duration = 0;

    const playBtn = $("#playBtn");
    const seek = $("#seek");
    const volume = $("#volume");
    const currentTimeEl = $("#currentTime");
    const durationEl = $("#duration");
    const playerCover = $(".player-cover", player);
    const playerTitle = $(".player-title", player);
    const playerArtist = $(".player-artist", player);
    const likeBtn = $("#likeBtn");

    function formatTime(total) {
      const safe = Math.max(0, Math.floor(total));
      const minutes = Math.floor(safe / 60);
      const seconds = safe % 60;
      return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }

    function paintProgress() {
      const percent = duration ? Math.min(100, (currentSeconds / duration) * 100) : 0;
      seek.value = String(percent);
      seek.style.setProperty("--progress", percent + "%");
      currentTimeEl.textContent = formatTime(currentSeconds);
      durationEl.textContent = duration ? formatTime(duration) : "--:--";
    }

    function syncPlayButton() {
      const playing = !audio.paused && !audio.ended;
      player.classList.toggle("is-playing", playing);
      playBtn.textContent = playing ? "❚❚" : "▶";
      playBtn.setAttribute("aria-label", playing ? "Tạm dừng" : "Phát nhạc");
      playBtn.setAttribute("aria-pressed", String(playing));
    }

    function loadTrack(index, autoplay) {
      trackIndex = (index + playlist.length) % playlist.length;
      const track = playlist[trackIndex];
      duration = 0;
      currentSeconds = 0;
      playerTitle.textContent = track.title;
      playerTitle.setAttribute("href", "song-detail.html");
      playerArtist.textContent = track.artist;
      playerCover.src = track.cover;
      playerCover.alt = "Ảnh bìa " + track.title;
      audio.src = track.src;
      audio.load();
      paintProgress();
      if (autoplay) {
        const request = audio.play();
        if (request && request.catch) {
          request.catch(function () {
            syncPlayButton();
          });
        }
      }
    }

    function nextTrack(step) {
      loadTrack(trackIndex + step, !audio.paused);
    }

    audio.addEventListener("loadedmetadata", function () {
      if (Number.isFinite(audio.duration) && audio.duration > 0) {
        duration = audio.duration;
        paintProgress();
      }
    });

    audio.addEventListener("timeupdate", function () {
      currentSeconds = audio.currentTime;
      paintProgress();
    });

    audio.addEventListener("play", syncPlayButton);
    audio.addEventListener("pause", syncPlayButton);

    audio.addEventListener("ended", function () {
      loadTrack(trackIndex + 1, true);
    });

    audio.addEventListener("error", function () {
      durationEl.textContent = "--:--";
      syncPlayButton();
    });

    playBtn.addEventListener("click", function () {
      if (audio.paused || audio.ended) {
        const request = audio.play();
        if (request && request.catch) {
          request.catch(function () {
            syncPlayButton();
          });
        }
      } else {
        audio.pause();
      }
    });

    seek.addEventListener("input", function () {
      if (!duration) return;
      const target = (Number(seek.value) / 100) * duration;
      currentSeconds = target;
      if (Number.isFinite(audio.duration)) {
        audio.currentTime = target;
      }
      paintProgress();
    });

    $$("[data-skip]").forEach(function (button) {
      button.addEventListener("click", function () {
        nextTrack(Number(button.getAttribute("data-skip")) || 1);
      });
    });

    if (volume) {
      audio.volume = Math.min(1, Math.max(0, Number(volume.value) / 100));
      volume.addEventListener("input", function () {
        const level = Number(volume.value) / 100;
        audio.volume = Math.min(1, Math.max(0, level));
        volume.style.setProperty("--progress", volume.value + "%");
      });
    }

    if (likeBtn) {
      likeBtn.addEventListener("click", function () {
        const liked = likeBtn.classList.toggle("liked");
        likeBtn.setAttribute("aria-pressed", String(liked));
        likeBtn.textContent = liked ? "♥" : "♡";
      });
    }

    function audioFileFor(title) {
      const exactTracks = {
        "Out of the Mountain": "audio/track-1.mp3?v=20261030",
        "Mind the Pot": "audio/track-2.mp3?v=20261030",
        Jingwei: "audio/track-3.mp3?v=20261030",
        "Rain Love": "audio/track-4.mp3?v=20261030"
      };
      if (exactTracks[title]) return exactTracks[title];

      let hash = 0;
      for (let i = 0; i < title.length; i += 1) {
        hash = (hash * 31 + title.charCodeAt(i)) >>> 0;
      }
      return "audio/track-" + ((hash % 4) + 1) + ".mp3?v=20261030";
    }

    /* Any "play" button on the page loads its song into the fixed player */
    $$("[data-play]").forEach(function (trigger) {
      trigger.addEventListener("click", function (event) {
        event.preventDefault();
        const title = trigger.getAttribute("data-title");
        const artist = trigger.getAttribute("data-artist");
        const cover = trigger.getAttribute("data-cover");

        if (title && artist) {
          const existingIndex = playlist.findIndex(function (track) {
            return track.title === title;
          });

          if (existingIndex !== -1) {
            loadTrack(existingIndex, true);
          } else {
            playlist.unshift({
              title: title,
              artist: artist,
              cover: cover || "images/cover-1.jpg",
              src: trigger.getAttribute("data-audio") || audioFileFor(title)
            });
            loadTrack(0, true);
          }
        } else if (audio.paused) {
          const request = audio.play();
          if (request && request.catch) {
            request.catch(function () {
              syncPlayButton();
            });
          }
        } else {
          audio.pause();
        }
      });
    });

    loadTrack(0, false);
    syncPlayButton();
  }

  /* ---------- 4. Search page filters & sorting ---------- */
  const searchInput = $("#songSearch");
  const resultGrid = $("#resultGrid");

  if (searchInput && resultGrid) {
    const genreFilter = $("#genreFilter");
    const yearFilter = $("#yearFilter");
    const sortFilter = $("#sortFilter");
    const searchForm = $("#searchForm");
    const countEl = $("#resultCount");
    const emptyState = $("#emptyState");
    const cards = $$(".result-card", resultGrid);

    function applyFilters() {
      const keyword = searchInput.value.trim().toLowerCase();
      const genre = genreFilter ? genreFilter.value : "";
      const year = yearFilter ? yearFilter.value : "";
      let visible = 0;

      cards.forEach(function (card) {
        const haystack = (
          card.getAttribute("data-title") +
          " " +
          card.getAttribute("data-artist") +
          " " +
          card.getAttribute("data-album")
        ).toLowerCase();
        const matchKeyword = !keyword || haystack.indexOf(keyword) !== -1;
        const matchGenre = !genre || card.getAttribute("data-genre") === genre;
        const matchYear = !year || card.getAttribute("data-year") === year;
        const show = matchKeyword && matchGenre && matchYear;

        card.hidden = !show;
        if (show) visible += 1;
      });

      if (countEl) {
        countEl.innerHTML = "Tìm thấy <strong>" + visible + "</strong> bài hát phù hợp";
      }
      if (emptyState) {
        emptyState.classList.toggle("show", visible === 0);
      }
    }

    function applySort() {
      if (!sortFilter) return;
      const mode = sortFilter.value;
      const sorted = cards.slice().sort(function (a, b) {
        if (mode === "views") {
          return Number(b.getAttribute("data-views")) - Number(a.getAttribute("data-views"));
        }
        if (mode === "title") {
          return a.getAttribute("data-title").localeCompare(b.getAttribute("data-title"), "vi");
        }
        return Number(b.getAttribute("data-date")) - Number(a.getAttribute("data-date"));
      });
      sorted.forEach(function (card) {
        resultGrid.appendChild(card);
      });
    }

    searchInput.addEventListener("input", applyFilters);
    if (genreFilter) genreFilter.addEventListener("change", applyFilters);
    if (yearFilter) yearFilter.addEventListener("change", applyFilters);

    if (sortFilter) {
      sortFilter.addEventListener("change", function () {
        applySort();
        applyFilters();
      });
    }

    if (searchForm) {
      searchForm.addEventListener("submit", function (event) {
        event.preventDefault();
        applyFilters();
        const firstVisible = cards.filter(function (card) {
          return !card.hidden;
        })[0];
        if (firstVisible) {
          firstVisible.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      });

      searchForm.addEventListener("reset", function () {
        window.setTimeout(function () {
          applySort();
          applyFilters();
        }, 0);
      });
    }

    applySort();
    applyFilters();
  }

  /* ---------- 5. Follow / save buttons ---------- */
  $$(".follow-btn").forEach(function (button) {
    const originalLabel = button.textContent.replace(/^[+✓]\s*/, "").trim();

    button.addEventListener("click", function () {
      const following = button.classList.toggle("is-following");
      button.setAttribute("aria-pressed", String(following));
      button.textContent = (following ? "✓ " : "+ ") + originalLabel;
    });
  });

  /* ---------- 6. Copy lyrics & share ---------- */
  $$("[data-copy-lyrics]").forEach(function (button) {
    button.addEventListener("click", function () {
      const lyrics = $(".lyrics");
      if (!lyrics) return;
      const text = lyrics.innerText.trim();
      const done = function () {
        const original = button.textContent;
        button.textContent = "✓ Đã sao chép";
        window.setTimeout(function () {
          button.textContent = original;
        }, 1800);
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(done).catch(function () {});
      } else {
        const area = document.createElement("textarea");
        area.value = text;
        area.style.position = "fixed";
        area.style.opacity = "0";
        document.body.appendChild(area);
        area.select();
        try {
          document.execCommand("copy");
          done();
        } catch (error) {
          /* clipboard unavailable */
        }
        document.body.removeChild(area);
      }
    });
  });

  $$("[data-share]").forEach(function (button) {
    button.addEventListener("click", function () {
      const original = button.textContent;
      const done = function () {
        button.textContent = "✓";
        window.setTimeout(function () {
          button.textContent = original;
        }, 1600);
      };
      if (navigator.share) {
        navigator.share({ title: document.title, url: window.location.href }).catch(function () {});
        return;
      }
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(window.location.href).then(done).catch(function () {});
      }
    });
  });

  /* ---------- 7. Contact form validation ---------- */
  const contactForm = $("#contactForm");

  if (contactForm) {
    const statusBox = $("#formStatus");

    function markField(input, valid, message) {
      const field = input.closest(".field");
      if (!field) return valid;
      field.classList.toggle("has-error", !valid);
      const error = $(".error-msg", field);
      if (error && message) error.textContent = message;
      return valid;
    }

    const validators = {
      name: function (input) {
        const ok = input.value.trim().length >= 2;
        return markField(input, ok, "Vui lòng nhập họ tên (ít nhất 2 ký tự).");
      },
      email: function (input) {
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value.trim());
        return markField(input, ok, "Email chưa đúng định dạng.");
      },
      requestType: function (input) {
        const ok = input.value !== "";
        return markField(input, ok, "Vui lòng chọn loại yêu cầu.");
      },
      message: function (input) {
        const ok = input.value.trim().length >= 10;
        return markField(input, ok, "Nội dung cần ít nhất 10 ký tự.");
      }
    };

    Object.keys(validators).forEach(function (name) {
      const input = contactForm.elements[name];
      if (!input) return;
      input.addEventListener("blur", function () {
        if (input.value.trim() !== "") validators[name](input);
      });
      input.addEventListener("input", function () {
        const field = input.closest(".field");
        if (field && field.classList.contains("has-error")) validators[name](input);
      });
    });

    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      let valid = true;

      Object.keys(validators).forEach(function (name) {
        const input = contactForm.elements[name];
        if (input && !validators[name](input)) valid = false;
      });

      if (!valid) {
        const firstError = $(".field.has-error input, .field.has-error select, .field.has-error textarea");
        if (firstError) firstError.focus();
        return;
      }

      if (statusBox) {
        statusBox.textContent =
          "Cảm ơn bạn! SoundWave đã nhận được lời nhắn và sẽ phản hồi trong 1–2 ngày làm việc.";
        statusBox.classList.add("show");
      }
      contactForm.reset();
      $$(".field", contactForm).forEach(function (field) {
        field.classList.remove("has-error");
      });
      statusBox.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  /* ---------- 8. Premium pricing toggle ---------- */
  const pricingToggle = $(".pricing-toggle");

  if (pricingToggle) {
    const amounts = $$(".price .amount");
    const periods = $$(".price .period");
    const buttons = $$("button", pricingToggle);

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        const plan = button.getAttribute("data-plan");
        buttons.forEach(function (item) {
          item.classList.toggle("active", item === button);
          item.setAttribute("aria-pressed", String(item === button));
        });

        amounts.forEach(function (amount) {
          amount.textContent = amount.getAttribute("data-" + plan) || amount.textContent;
        });

        periods.forEach(function (period) {
          period.textContent = plan === "yearly" ? "/ năm" : "/ tháng";
        });
      });
    });
  }

  /* ---------- 9. Footer year ---------- */
  $$("[data-current-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
