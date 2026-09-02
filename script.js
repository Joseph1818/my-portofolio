function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", function () {
  const toggleButtons = document.querySelectorAll(".theme-toggle");
  if (!toggleButtons.length) return;

  function updateIcons() {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    toggleButtons.forEach((btn) => {
      const icon = btn.querySelector("i");
      if (icon) {
        icon.className = isLight ? "fa-solid fa-sun" : "fa-solid fa-moon";
      }
    });
  }

  updateIcons();

  toggleButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const isLight = document.documentElement.getAttribute("data-theme") === "light";
      const newTheme = isLight ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", newTheme);
      try {
        localStorage.setItem("theme", newTheme);
      } catch (e) {}
      updateIcons();
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.addEventListener("DOMContentLoaded", function () {
  const revealEls = document.querySelectorAll(".reveal");
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => observer.observe(el));
  }
});

function typeText(el, text, speed, callback) {
  let i = 0;
  function step() {
    if (i <= text.length) {
      el.textContent = text.slice(0, i);
      i++;
      setTimeout(step, speed);
    } else if (callback) {
      callback();
    }
  }
  step();
}

document.addEventListener("DOMContentLoaded", function () {
  const part1 = document.getElementById("typed-role-1");
  const part2 = document.getElementById("typed-role-2");
  if (!part1 || !part2) return;

  if (prefersReducedMotion) {
    part1.textContent = "Software";
    part2.textContent = " Engineer";
    return;
  }

  typeText(part1, "Software", 90, function () {
    typeText(part2, " Engineer", 90);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const skillTitles = [
    { el: document.getElementById("skills-title-1"), text: "Languages & Frameworks" },
    { el: document.getElementById("skills-title-2"), text: "Platforms & Practices" },
  ].filter((t) => t.el);
  if (!skillTitles.length) return;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    skillTitles.forEach(({ el, text }) => (el.textContent = text));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const match = skillTitles.find((t) => t.el === entry.target);
        if (match && entry.isIntersecting) {
          typeText(match.el, match.text, 45);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  skillTitles.forEach(({ el }) => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", function () {
  const backToTopBtn = document.getElementById("back-to-top");
  if (!backToTopBtn) return;

  function toggleVisibility() {
    if (window.scrollY > window.innerHeight * 0.6) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  }

  window.addEventListener("scroll", toggleVisibility, { passive: true });
  toggleVisibility();

  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  });
});

function formatDurationSince(startYear, startMonth) {
  const now = new Date();
  const totalMonths =
    (now.getFullYear() - startYear) * 12 + (now.getMonth() + 1 - startMonth) + 1;
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const parts = [];
  if (years > 0) {
    parts.push(years === 1 ? "1 yr" : `${years} yrs`);
  }
  if (months > 0 || years === 0) {
    parts.push(months === 1 ? "1 mo" : `${months} mos`);
  }
  return parts.join(" ");
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-start]").forEach((el) => {
    const [year, month] = el.dataset.start.split("-").map(Number);
    el.textContent = formatDurationSince(year, month);
  });
});
