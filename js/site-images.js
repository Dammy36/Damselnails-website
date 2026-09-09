// Progressive-enhancement image loader.
//
// Every page ships with real, hardcoded <img> tags as the fallback. This
// script only OVERWRITES them after a successful Supabase fetch — if
// damselSupabase isn't configured yet, or the fetch fails, or a slot has no
// row, the hardcoded fallback image simply stays exactly as it is. The site
// must never show a broken image because of this script.
(function () {
  if (!damselSupabase) return;

  // ── Fixed image slots (hero, logo, service cards, etc.) ──────────────
  damselSupabase
    .from("site_images")
    .select("key, url, alt")
    .then(function (res) {
      if (res.error || !res.data) return;
      res.data.forEach(function (row) {
        if (!row.url) return;
        var els = document.querySelectorAll(
          '[data-img-key="' + row.key + '"]',
        );
        els.forEach(function (el) {
          el.src = row.url;
          if (row.alt) el.alt = row.alt;
        });
      });
    })
    .catch(function () {
      /* keep fallback images as-is */
    });

  // ── Gallery grid (only present on gallery.html) ───────────────────────
  var grid = document.getElementById("gallery-grid");
  if (!grid) return;

  damselSupabase
    .from("gallery_images")
    .select("id, url, alt")
    .eq("published", true)
    .order("display_order", { ascending: true })
    .then(function (res) {
      if (res.error || !res.data || !res.data.length) return;

      var lightbox = document.getElementById("lightbox");
      var lightboxImg = document.getElementById("lightbox-img");

      grid.innerHTML = "";
      res.data.forEach(function (row) {
        var item = document.createElement("div");
        item.className = "gallery-item mb-4 break-inside-avoid";
        item.setAttribute("data-lightbox", "");

        var img = document.createElement("img");
        img.loading = "lazy";
        img.src = row.url;
        img.alt = row.alt || "Damsel Nails Studio nail set";
        item.appendChild(img);

        if (lightbox && lightboxImg) {
          item.addEventListener("click", function () {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.classList.add("open");
          });
        }

        grid.appendChild(item);
      });
    })
    .catch(function () {
      /* keep the static gallery grid as-is */
    });
})();
