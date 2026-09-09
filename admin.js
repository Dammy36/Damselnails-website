// Damsel Nails — private image admin. Vanilla JS, no build step.
// Security note: hiding the UI behind a login check here is just UX —
// the real enforcement is Supabase Row Level Security (see schema.sql),
// so even someone who finds this page can't write anything unauthenticated.

var BUCKET = "damsel-images";

var SITE_IMAGE_SLOTS = [
  { group: "Global (every page)", key: "logo", label: "Logo" },

  { group: "Home Page", key: "hero", label: "Hero Photo" },
  { group: "Home Page", key: "signature_1", label: "Signature Look 1" },
  { group: "Home Page", key: "signature_2", label: "Signature Look 2" },
  { group: "Home Page", key: "signature_3", label: "Signature Look 3" },
  { group: "Home Page", key: "signature_4", label: "Signature Look 4" },
  { group: "Home Page", key: "service_home_manicure", label: "Service Card — Russian Manicure" },
  { group: "Home Page", key: "service_home_acrylic", label: "Service Card — Acrylic Nails" },
  { group: "Home Page", key: "service_home_biab", label: "Service Card — BIAB Nails" },
  { group: "Home Page", key: "testimonial_ayomide", label: "Testimonial Photo — Ayomide" },
  { group: "Home Page", key: "testimonial_ozioma", label: "Testimonial Photo — Ozioma" },
  { group: "Home Page", key: "testimonial_fadekemi", label: "Testimonial Photo — Fadekemi" },
  { group: "Home Page", key: "testimonial_emauella", label: "Testimonial Photo — Emauella" },
  { group: "Home Page", key: "testimonial_esther", label: "Testimonial Photo — Esther" },

  { group: "About Page", key: "about_photo", label: "Profile Photo" },

  { group: "Services Page", key: "service_page_pedicure", label: "Service Card — Pedicure" },
  { group: "Services Page", key: "service_page_polygel", label: "Service Card — Poly Gel Nails" },
  { group: "Services Page", key: "service_page_lashes", label: "Service Card — Lashes" },
  { group: "Services Page", key: "service_page_piercing", label: "Service Card — Piercing" },
  { group: "Services Page", key: "bridal_image", label: "Bridal Nails Photo" },
];

var loginView = document.getElementById("login-view");
var appView = document.getElementById("app-view");
var loginForm = document.getElementById("login-form");
var loginError = document.getElementById("login-error");
var logoutBtn = document.getElementById("logout-btn");
var slotsContainer = document.getElementById("slots-container");
var galleryGrid = document.getElementById("gallery-admin-grid");
var addPhotosInput = document.getElementById("add-photos-input");
var configWarning = document.getElementById("config-warning");

function fileExt(file) {
  var parts = file.name.split(".");
  return parts.length > 1 ? parts.pop().toLowerCase() : "jpg";
}

function uploadFile(file, path) {
  return damselSupabase.storage
    .from(BUCKET)
    .upload(path, file, { upsert: true })
    .then(function (res) {
      if (res.error) throw res.error;
      var pub = damselSupabase.storage.from(BUCKET).getPublicUrl(path);
      return pub.data.publicUrl;
    });
}

function storagePathFromUrl(url) {
  var marker = "/storage/v1/object/public/" + BUCKET + "/";
  var i = url.indexOf(marker);
  if (i === -1) return null;
  return decodeURIComponent(url.slice(i + marker.length));
}

// ── Auth ────────────────────────────────────────────────────────────────
function showApp() {
  loginView.classList.add("hidden");
  appView.classList.remove("hidden");
  loadSlots();
  loadGallery();
}

function showLogin() {
  appView.classList.add("hidden");
  loginView.classList.remove("hidden");
}

function init() {
  if (!damselSupabase) {
    configWarning.classList.remove("hidden");
    return;
  }
  damselSupabase.auth.getSession().then(function (res) {
    if (res.data.session) showApp();
    else showLogin();
  });
}

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  loginError.classList.add("hidden");
  var email = document.getElementById("login-email").value.trim();
  var password = document.getElementById("login-password").value;

  damselSupabase.auth
    .signInWithPassword({ email: email, password: password })
    .then(function (res) {
      if (res.error) {
        loginError.textContent = res.error.message;
        loginError.classList.remove("hidden");
        return;
      }
      showApp();
    });
});

logoutBtn.addEventListener("click", function () {
  damselSupabase.auth.signOut().then(showLogin);
});

// ── Site image slots ─────────────────────────────────────────────────────
function loadSlots() {
  damselSupabase
    .from("site_images")
    .select("key, url, alt")
    .then(function (res) {
      var rows = {};
      (res.data || []).forEach(function (r) {
        rows[r.key] = r;
      });
      renderSlots(rows);
    });
}

function renderSlots(rows) {
  var groups = {};
  SITE_IMAGE_SLOTS.forEach(function (slot) {
    if (!groups[slot.group]) groups[slot.group] = [];
    groups[slot.group].push(slot);
  });

  slotsContainer.innerHTML = "";
  Object.keys(groups).forEach(function (groupName) {
    var section = document.createElement("div");
    section.className = "mb-10";

    var heading = document.createElement("h2");
    heading.className = "font-semibold text-lg mb-4 text-ink";
    heading.textContent = groupName;
    section.appendChild(heading);

    var grid = document.createElement("div");
    grid.className = "grid gap-4 sm:grid-cols-2 lg:grid-cols-3";

    groups[groupName].forEach(function (slot) {
      var row = rows[slot.key];
      grid.appendChild(buildSlotCard(slot, row));
    });

    section.appendChild(grid);
    slotsContainer.appendChild(section);
  });
}

function buildSlotCard(slot, row) {
  var card = document.createElement("div");
  card.className = "border border-ink/10 rounded-xl p-4 flex flex-col gap-3";

  var img = document.createElement("img");
  img.className = "w-full h-32 object-cover rounded-lg bg-ink/5";
  img.src = (row && row.url) || "";
  img.alt = slot.label;

  var label = document.createElement("p");
  label.className = "text-sm font-medium text-ink";
  label.textContent = slot.label;

  var status = document.createElement("p");
  status.className = "text-xs text-ink/50";

  var input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.className = "text-xs";

  input.addEventListener("change", function () {
    var file = input.files[0];
    if (!file) return;
    status.textContent = "Uploading…";
    var path = "site/" + slot.key + "-" + Date.now() + "." + fileExt(file);

    uploadFile(file, path)
      .then(function (publicUrl) {
        return damselSupabase
          .from("site_images")
          .upsert({ key: slot.key, url: publicUrl, alt: slot.label })
          .then(function (res) {
            if (res.error) throw res.error;
            img.src = publicUrl;
            status.textContent = "Saved.";
          });
      })
      .catch(function (err) {
        status.textContent = "Error: " + err.message;
      });
  });

  card.appendChild(img);
  card.appendChild(label);
  card.appendChild(input);
  card.appendChild(status);
  return card;
}

// ── Gallery manager ───────────────────────────────────────────────────
function loadGallery() {
  damselSupabase
    .from("gallery_images")
    .select("id, url, alt, display_order")
    .order("display_order", { ascending: true })
    .then(function (res) {
      renderGallery(res.data || []);
    });
}

function renderGallery(items) {
  galleryGrid.innerHTML = "";
  items.forEach(function (item, index) {
    var card = document.createElement("div");
    card.className = "border border-ink/10 rounded-xl p-3 flex flex-col gap-2";

    var img = document.createElement("img");
    img.className = "w-full h-28 object-cover rounded-lg";
    img.src = item.url;
    img.alt = item.alt || "";
    card.appendChild(img);

    var controls = document.createElement("div");
    controls.className = "flex items-center justify-between text-xs";

    var moveWrap = document.createElement("div");
    moveWrap.className = "flex gap-1";

    var upBtn = document.createElement("button");
    upBtn.textContent = "↑";
    upBtn.className = "px-2 py-1 border border-ink/15 rounded disabled:opacity-30";
    upBtn.disabled = index === 0;
    upBtn.addEventListener("click", function () {
      swapOrder(items, index, index - 1);
    });

    var downBtn = document.createElement("button");
    downBtn.textContent = "↓";
    downBtn.className = "px-2 py-1 border border-ink/15 rounded disabled:opacity-30";
    downBtn.disabled = index === items.length - 1;
    downBtn.addEventListener("click", function () {
      swapOrder(items, index, index + 1);
    });

    moveWrap.appendChild(upBtn);
    moveWrap.appendChild(downBtn);

    var delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "text-red-600 hover:underline";
    delBtn.addEventListener("click", function () {
      deleteGalleryItem(item);
    });

    controls.appendChild(moveWrap);
    controls.appendChild(delBtn);
    card.appendChild(controls);
    galleryGrid.appendChild(card);
  });
}

function swapOrder(items, i, j) {
  var a = items[i];
  var b = items[j];
  Promise.all([
    damselSupabase.from("gallery_images").update({ display_order: b.display_order }).eq("id", a.id),
    damselSupabase.from("gallery_images").update({ display_order: a.display_order }).eq("id", b.id),
  ]).then(loadGallery);
}

function deleteGalleryItem(item) {
  if (!window.confirm("Delete this photo from the gallery?")) return;

  damselSupabase
    .from("gallery_images")
    .delete()
    .eq("id", item.id)
    .then(function (res) {
      if (res.error) return;
      var path = storagePathFromUrl(item.url);
      if (path) damselSupabase.storage.from(BUCKET).remove([path]);
      loadGallery();
    });
}

addPhotosInput.addEventListener("change", function () {
  var files = Array.prototype.slice.call(addPhotosInput.files);
  if (!files.length) return;

  damselSupabase
    .from("gallery_images")
    .select("display_order")
    .order("display_order", { ascending: false })
    .limit(1)
    .then(function (res) {
      var nextOrder = res.data && res.data.length ? res.data[0].display_order + 1 : 0;

      var uploads = files.map(function (file, i) {
        var path = "gallery/" + Date.now() + "-" + i + "." + fileExt(file);
        return uploadFile(file, path).then(function (publicUrl) {
          return damselSupabase.from("gallery_images").insert({
            url: publicUrl,
            alt: "Damsel Nails Studio nail set",
            display_order: nextOrder + i,
          });
        });
      });

      Promise.all(uploads).then(function () {
        addPhotosInput.value = "";
        loadGallery();
      });
    });
});

init();
