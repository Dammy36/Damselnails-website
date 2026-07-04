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
    "https://dammie.app.n8n.cloud/webhook/de39827a-8a89-4cd3-8909-15df84dc0874";

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
    if (win.classList.contains("open")) input.focus();
  });
  closeBtn.addEventListener("click", function () {
    win.classList.remove("open");
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
        return res.text();
      })
      .then(function (reply) {
        typingDiv.remove();
        addMessage(
          reply || "Sorry, I didn't catch that. Could you try again?",
          "bot",
        );
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
