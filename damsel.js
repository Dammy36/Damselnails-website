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

// Contact form -> n8n automation webhook (contact.html only).
(function () {
  var WEBHOOK_URL =
    "https://nayae-automation.app.n8n.cloud/webhook/61b661f3-7ed9-43fd-afbb-b70a60b7f91c";

  var form = document.getElementById("contact-form");
  if (!form) return;

  var status = document.getElementById("contact-form-status");
  var submitBtn = form.querySelector('button[type="submit"]');

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
      .then(function (res) {
        if (!res.ok) throw new Error("Webhook responded with status " + res.status);
        if (status) status.textContent = "Message sent! We'll be in touch soon.";
        form.reset();
      })
      .catch(function () {
        if (status) {
          status.textContent =
            "Something went wrong sending your message. Please try again.";
        }
      })
      .finally(function () {
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
