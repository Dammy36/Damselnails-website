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
