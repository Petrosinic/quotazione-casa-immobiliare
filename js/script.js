// Valore Immobiliare — interazioni landing page
(function () {
  "use strict";

  // ---- Mobile nav toggle ----
  var navToggle = document.getElementById("nav-toggle");
  var mainNav = document.getElementById("main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---- FAQ accordion ----
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var question = item.querySelector(".faq-question");
    question.addEventListener("click", function () {
      var wasOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(function (open) {
        if (open !== item) open.classList.remove("open");
      });
      item.classList.toggle("open", !wasOpen);
    });
  });

  // ---- Lead forms ----
  // NOTA: pagina statica per GitHub Pages. Per ricevere davvero le richieste,
  // collegare l'attributo action del <form> a un endpoint tipo Formspree/Netlify Forms
  // (vedi README.md). Qui gestiamo comunque UX, validazione base e tracking eventi.
  var forms = document.querySelectorAll("#form-valutazione, #form-valutazione-2");

  forms.forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // Evento per Google Analytics / Google Ads (se GA4 è installato)
      if (typeof window.gtag === "function") {
        window.gtag("event", "generate_lead", {
          form_id: form.id,
          value: 1,
          currency: "EUR"
        });
      }

      var fields = form.querySelector(".form-fields");
      var success = form.querySelector(".form-success");
      if (fields) fields.style.display = "none";
      if (success) success.classList.add("show");
      else {
        form.reset();
        window.location.href = "https://wa.me/390000000000?text=" +
          encodeURIComponent("Ciao, ho richiesto una valutazione gratuita dal sito.");
      }
    });
  });

  // ---- Header shadow on scroll ----
  var header = document.querySelector(".site-header");
  if (header) {
    window.addEventListener("scroll", function () {
      header.style.boxShadow = window.scrollY > 8 ? "0 4px 18px rgba(15,28,51,0.08)" : "none";
    });
  }
})();
