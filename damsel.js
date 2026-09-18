const hamburger = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  loop: true,
  spaceBetween: 20,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 3000,
  },
});

// Subtle fade/slide reveal for elements marked with data-reveal.
(function () {
  var items = document.querySelectorAll("[data-reveal]");
  if (!items.length) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  items.forEach(function (el) {
    observer.observe(el);
  });
})();

// Contact form -> n8n automation webhook, then pre-filled WhatsApp handoff
// (contact.html only). The webhook is fire-and-forget: if it's slow, down,
// or blocked by CORS, the visitor still gets handed off to WhatsApp.
(function () {
  var WEBHOOK_URL =
    "https://nayae-automation.app.n8n.cloud/webhook/61b661f3-7ed9-43fd-afbb-b70a60b7f91c";

  var form = document.getElementById("contact-form");
  if (!form) return;

  var status = document.getElementById("contact-form-status");
  var submitBtn = form.querySelector('button[type="submit"]');

  function openWhatsApp(name, phone, service, message) {
    var lines = [
      "Hi Damsel Nails! I'd like to book an appointment.",
      "Name: " + name,
      "Phone: " + phone,
      "Service: " + service,
    ];
    if (message) lines.push("Message: " + message);

    var url = "https://wa.me/2348034485794?text=" + encodeURIComponent(lines.join("\n"));
    window.open(url, "_blank", "noopener,noreferrer");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var name = form.elements["name"].value.trim();
    var phone = form.elements["phone"].value.trim();
    var email = form.elements["email"].value.trim();
    var service = form.elements["service"].value;
    var message = form.elements["message"].value.trim();

    if (submitBtn) submitBtn.disabled = true;
    if (status) status.textContent = "Sending…";

    fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        phone: phone,
        email: email,
        service: service,
        message: message,
        source: "contact-form",
        submittedAt: new Date().toISOString(),
      }),
    })
      .catch(function () {
        /* automation is best-effort — WhatsApp handoff still happens below */
      })
      .finally(function () {
        if (status) status.textContent = "Opening WhatsApp…";
        openWhatsApp(name, phone, service, message);
        form.reset();
        if (submitBtn) submitBtn.disabled = false;
      });
  });
})();

// Click-to-open lightbox for gallery images marked with data-lightbox.
(function () {
  var thumbs = document.querySelectorAll("[data-lightbox]");
  var lightbox = document.getElementById("lightbox");
  if (!thumbs.length || !lightbox) return;

  var lightboxImg = document.getElementById("lightbox-img");
  var closeBtn = document.getElementById("lightbox-close");

  function open(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightbox.classList.add("open");
  }
  function close() {
    lightbox.classList.remove("open");
    lightboxImg.src = "";
  }

  thumbs.forEach(function (thumb) {
    thumb.addEventListener("click", function () {
      var img = thumb.querySelector("img");
      open(img.src, img.alt);
    });
  });
  closeBtn.addEventListener("click", close);
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) close();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") close();
  });
})();
