document.addEventListener("DOMContentLoaded", () => {

  /* ================= MOBILE MENU ================= */
  const menuBtn = document.querySelector(".menu-btn");
  const navbar  = document.querySelector(".navbar");

  menuBtn?.addEventListener("click", () => {
    navbar.classList.toggle("active");
  });

  
  navbar?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => navbar.classList.remove("active"));
  });

  /* ================= THEME TOGGLE ================= */
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon   = document.getElementById("theme-icon");
  const body        = document.body;

  
  if (localStorage.getItem("theme") === "light") {
    body.classList.add("light-mode");
    themeIcon?.classList.replace("fa-sun", "fa-moon");
  }

  themeToggle?.addEventListener("click", () => {
    body.classList.toggle("light-mode");

    if (body.classList.contains("light-mode")) {
      themeIcon?.classList.replace("fa-sun", "fa-moon");
      localStorage.setItem("theme", "light");
    } else {
      themeIcon?.classList.replace("fa-moon", "fa-sun");
      localStorage.setItem("theme", "dark");
    }
  });

  /* ================= SMOOTH SCROLL ================= */
  document.querySelectorAll("a[href^='#']").forEach(link => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href === "#") return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        window.scrollTo({ top: target.offsetTop - 70, behavior: "smooth" });
      }
    });
  });

  /* ================= TYPING NAME EFFECT ================= */
  const heroName = document.querySelector(".hero-name");
  const nameText = "Youssef Ghoneim";
  let ni = 0;

  function typeName() {
    if (!heroName) return;
    if (ni < nameText.length) {
      heroName.textContent += nameText.charAt(ni);
      ni++;
      setTimeout(typeName, 110);
    }
  }

  if (heroName) {
    heroName.textContent = "";
    typeName();
  }

  /* ================= TYPING TITLE EFFECT ================= */
  const typedEl = document.querySelector(".typed-text");
  const titles  = ["Frontend Developer"];
  let ti = 0, ci = 0, deleting = false;

  function typeTitle() {
    if (!typedEl) return;
    const current = titles[ti];

    if (!deleting) {
      typedEl.textContent = current.slice(0, ci + 1);
      ci++;
      if (ci === current.length) {
        deleting = true;
        setTimeout(typeTitle, 1800);
        return;
      }
    } else {
      typedEl.textContent = current.slice(0, ci - 1);
      ci--;
      if (ci === 0) {
        deleting = false;
        ti = (ti + 1) % titles.length;
      }
    }

    setTimeout(typeTitle, deleting ? 60 : 100);
  }

  typeTitle();

  /* ================= SCROLL REVEAL ================= */
  const sections = document.querySelectorAll(".section");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  }, { threshold: 0.15 });

  sections.forEach(sec => {
    sec.classList.add("hidden");
    observer.observe(sec);
  });

  /* ================= ACTIVE NAV LINK ================= */
  const navLinks    = document.querySelectorAll(".navbar a");
  const allSections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    let current = "";

    allSections.forEach(section => {
      if (scrollY >= section.offsetTop - 120) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  /* ================= CONTACT FORM ================= */
  const form = document.querySelector(".contact-form");

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector("button");
    btn.textContent = "✓ Message Sent!";
    btn.style.background = "#00c97a";
    setTimeout(() => {
      btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
      btn.style.background = "";
      form.reset();
    }, 3000);
  });

});
