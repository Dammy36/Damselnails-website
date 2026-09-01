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

(function () {
  // 👇 PASTE YOUR REAL N8N PRODUCTION WEBHOOK URL BELOW 👇
  var WEBHOOK_URL =
    "https://victoria-dammy.app.n8n.cloud/webhook/11db0b0f-b438-40d3-99fd-e46202fefe13";

  var bubble = document.getElementById("nails-chat-bubble");
  var win = document.getElementById("nails-chat-window");
  var closeBtn = document.getElementById("nails-chat-close");
  var messages = document.getElementById("nails-chat-messages");
  var input = document.getElementById("nails-chat-input");
  var sendBtn = document.getElementById("nails-chat-send");

  // Each visitor gets one sessionId that stays the same for their whole
  // visit (until they close the browser tab), so the AI remembers the
  // conversation. A new tab/visitor gets a brand new sessionId.
  function getSessionId() {
    var existing = sessionStorage.getItem("nailsChatSessionId");
    if (existing) return existing;
    var fresh =
      "session-" + Date.now() + "-" + Math.random().toString(36).slice(2, 10);
    sessionStorage.setItem("nailsChatSessionId", fresh);
    return fresh;
  }
  var sessionId = getSessionId();

  bubble.addEventListener("click", function () {
    win.classList.toggle("open");
    if (win.classList.contains("open")) {
      bubble.classList.add("hidden");
      setTimeout(function () {
        input.focus();
      }, 100);
    }
  });
  closeBtn.addEventListener("click", function () {
    win.classList.remove("open");
    bubble.classList.remove("hidden");
    input.blur();
  });

  function addMessage(text, sender) {
    var div = document.createElement("div");
    div.className = "nails-msg " + sender;
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    return div;
  }

  function sendMessage() {
    var text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";
    sendBtn.disabled = true;

    var typingDiv = addMessage("typing...", "typing");

    fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text, sessionId: sessionId }),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (reply) {
        typingDiv.remove();

        addMessage(reply.message || "Sorry, I didn't catch that.", "bot");
      })

      .catch(function () {
        typingDiv.remove();
        addMessage(
          "Something went wrong reaching our assistant. Please try again in a moment.",
          "bot",
        );
      })
      .finally(function () {
        sendBtn.disabled = false;
      });
  }

  sendBtn.addEventListener("click", sendMessage);
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") sendMessage();
  });
})();

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
