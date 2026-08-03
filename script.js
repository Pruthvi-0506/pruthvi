// Reveal cards gently as they enter view (skipped if reduced motion is on)
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  const cards = document.querySelectorAll(".card, .about-page, .stamp-card");

  cards.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(12px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  cards.forEach((el) => observer.observe(el));
}

// Highlight the active nav link based on scroll position
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".site-header nav a");

if (sections.length && navLinks.length && "IntersectionObserver" in window) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = document.querySelector(`.site-header nav a[href="#${entry.target.id}"]`);
        if (link) link.style.color = entry.isIntersecting ? "var(--accent-2)" : "";
      });
    },
    { rootMargin: "-40% 0px -50% 0px" }
  );

  sections.forEach((s) => navObserver.observe(s));
}
