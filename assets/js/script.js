(function () {
  "use strict";

  // ---------- Mobile sidebar toggle ----------
  var menuBtn = document.querySelector(".menu-btn");
  var sidebar = document.querySelector(".sidebar");
  var overlay = document.querySelector(".sidebar-overlay");

  function closeSidebar() {
    if (sidebar) sidebar.classList.remove("open");
    if (overlay) overlay.classList.remove("open");
  }

  if (menuBtn && sidebar) {
    menuBtn.addEventListener("click", function () {
      sidebar.classList.toggle("open");
      if (overlay) overlay.classList.toggle("open");
    });
  }
  if (overlay) overlay.addEventListener("click", closeSidebar);

  document.querySelectorAll(".sidebar a.nav-link").forEach(function (a) {
    a.addEventListener("click", closeSidebar);
  });

  // ---------- Scrollspy: highlight active sidebar link ----------
  var sections = Array.prototype.slice.call(document.querySelectorAll(".doc-section[id]"));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".sidebar a.nav-link"));

  function onScrollSpy() {
    var scrollPos = window.scrollY + 110;
    var current = null;
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].offsetTop <= scrollPos) current = sections[i];
    }
    navLinks.forEach(function (link) {
      link.classList.remove("active");
      if (current && link.getAttribute("href") === "#" + current.id) {
        link.classList.add("active");
      }
    });
  }
  if (sections.length && navLinks.length) {
    window.addEventListener("scroll", onScrollSpy, { passive: true });
    onScrollSpy();
  }

  // ---------- Lightbox for screenshots ----------
  var lightbox = document.querySelector(".lightbox");
  var lightboxImg = lightbox ? lightbox.querySelector("img") : null;

  function openLightbox(src, alt) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }
  document.querySelectorAll("figure.shot img").forEach(function (img) {
    img.addEventListener("click", function () {
      openLightbox(img.getAttribute("src"), img.getAttribute("alt"));
    });
  });
  if (lightbox) {
    lightbox.addEventListener("click", closeLightbox);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeLightbox();
    });
  }

  // ---------- FAQ accordion ----------
  document.querySelectorAll(".faq-item .faq-q").forEach(function (q) {
    q.addEventListener("click", function () {
      var item = q.closest(".faq-item");
      var wasOpen = item.classList.contains("open");
      item.parentElement.querySelectorAll(".faq-item.open").forEach(function (i) {
        if (i !== item) {
          i.classList.remove("open");
          i.querySelector(".faq-a").style.maxHeight = null;
        }
      });
      item.classList.toggle("open", !wasOpen);
      var answer = item.querySelector(".faq-a");
      answer.style.maxHeight = !wasOpen ? answer.scrollHeight + 24 + "px" : null;
    });
  });

  // ---------- Back to top ----------
  var backBtn = document.querySelector(".back-to-top");
  if (backBtn) {
    window.addEventListener("scroll", function () {
      backBtn.classList.toggle("show", window.scrollY > 600);
    }, { passive: true });
    backBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();
