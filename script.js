const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  revealItems.forEach((item) => {
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const parallaxItems = document.querySelectorAll("[data-parallax]");

if (parallaxItems.length && !prefersReducedMotion.matches) {
  let scheduled = false;

  const updateParallax = () => {
    const scrollOffset = window.scrollY;

    parallaxItems.forEach((item) => {
      const speed = Number(item.dataset.parallax || 0);
      item.style.setProperty(
        "--parallax-offset",
        `${(scrollOffset * speed).toFixed(1)}px`
      );
    });

    scheduled = false;
  };

  const requestParallaxUpdate = () => {
    if (scheduled) {
      return;
    }

    scheduled = true;
    window.requestAnimationFrame(updateParallax);
  };

  updateParallax();

  window.addEventListener("scroll", requestParallaxUpdate, { passive: true });
  window.addEventListener("resize", requestParallaxUpdate);
}
