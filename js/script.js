// Quotazione Casa Immobiliare — interazioni landing page
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
  // I form inviano i dati via fetch all'endpoint Formspree impostato nell'attributo
  // action del tag <form> (vedi README.md per come cambiarlo/collegarne uno nuovo).
  var forms = document.querySelectorAll("#form-valutazione, #form-valutazione-2");

  forms.forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var fields = form.querySelector(".form-fields");
      var success = form.querySelector(".form-success");
      var error = form.querySelector(".form-error");
      var submitBtn = form.querySelector("button[type=submit]");

      if (error) error.classList.remove("show");
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.dataset.originalText = submitBtn.dataset.originalText || submitBtn.textContent;
        submitBtn.textContent = "Invio in corso…";
      }

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (response) {
          if (!response.ok) throw new Error("Formspree error " + response.status);

          // Evento per Google Analytics / Google Ads (se GA4 è installato)
          if (typeof window.gtag === "function") {
            window.gtag("event", "generate_lead", {
              form_id: form.id,
              value: 1,
              currency: "EUR"
            });
          }

          if (fields) fields.style.display = "none";
          if (success) success.classList.add("show");
          form.reset();
        })
        .catch(function () {
          if (error) error.classList.add("show");
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = submitBtn.dataset.originalText;
          }
        });
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
