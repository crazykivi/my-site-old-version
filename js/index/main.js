const toggleButtons = document.querySelectorAll(".toggle-button");
const collapseBlocks = document.querySelectorAll(".collapse");

toggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector(
      button.getAttribute("data-bs-target")
    );

    if (target.classList.contains("show")) {
      button.textContent = "Подробнее о проекте";
      button.setAttribute("aria-expanded", "false");
    } else {
      button.textContent = "Закрыть подробности";
      button.setAttribute("aria-expanded", "true");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  if (window.location.hash) {
    history.replaceState(
      null,
      null,
      window.location.pathname + window.location.search
    );
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const toggleButton = document.getElementById("toggleMenu");

  const adjustSidebarPosition = () => {
    const buttonRect = toggleButton.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    let sidebarTop = buttonRect.top - 320;

    if (sidebarTop < 0) {
      sidebarTop = 0;
    } else if (sidebarTop + sidebar.offsetHeight > viewportHeight) {
      sidebarTop = viewportHeight - sidebar.offsetHeight;
    }

    sidebar.style.transform = `translateY(${sidebarTop}px)`;
  };

  adjustSidebarPosition();
  window.addEventListener("resize", adjustSidebarPosition);
});

document.addEventListener("DOMContentLoaded", function () {
  const lazyContainers = document.querySelectorAll(".lazy-load-container");
  const lazyImages = document.querySelectorAll(".lazy-load");
  const lazyTexts = document.querySelectorAll(".lazy-load-text");
  const lazyBlocks = document.querySelectorAll(".lazy-load-block");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        const target = entry.target;

        if (entry.isIntersecting) {
          if (target.classList.contains("lazy-load")) {
            target.src = target.dataset.src;
            target.classList.add("visible");
          }
          else if (
            target.classList.contains("lazy-load-text") ||
            target.classList.contains("lazy-load-block") ||
            target.classList.contains("lazy-load-container")
          ) {
            target.classList.add("visible");
          }
        } else {
          target.classList.remove("visible");
        }
      });
    },
    {
      threshold: 0.3,
    }
  );

  lazyContainers.forEach((container) => {
    observer.observe(container);
  });

  lazyImages.forEach((img) => {
    observer.observe(img);
  });

  lazyTexts.forEach((text) => {
    observer.observe(text);
  });

  lazyBlocks.forEach((block) => {
    observer.observe(block); 
  });
});

/*
document.addEventListener("DOMContentLoaded", function () {
  const lazyContainers = document.querySelectorAll(".lazy-load-container");
  const lazyImages = document.querySelectorAll(".lazy-load");
  const lazyTexts = document.querySelectorAll(".lazy-load-text");
  const lazyBlocks = document.querySelectorAll(".lazy-load-block");
  const toggleButton = document.getElementById("toggleAnimations");

  let animationsEnabled = true;

  function toggleAnimations() {
    animationsEnabled = !animationsEnabled;
    if (animationsEnabled) {
      toggleButton.textContent = "Отключить анимации";

      lazyImages.forEach((img) => {
        img.classList.add("lazy-load");
        img.classList.remove("no-animations");
        img.style.opacity = 0;
      });
      lazyTexts.forEach((text) => {
        text.classList.add("lazy-load-text");
        text.classList.remove("no-animations");
        text.style.opacity = 0;
      });
      lazyBlocks.forEach((block) => {
        block.classList.add("lazy-load-block");
        block.classList.remove("no-animations");
        и;
        block.style.opacity = 0;
      });

      setObserver();
    } else {
      toggleButton.textContent = "Включить анимации";

      lazyImages.forEach((img) => {
        img.classList.remove("lazy-load");
        img.classList.add("no-animations");
        img.style.opacity = 1;
      });
      lazyTexts.forEach((text) => {
        text.classList.remove("lazy-load-text");
        text.classList.add("no-animations");
        text.style.opacity = 1;
      });
      lazyBlocks.forEach((block) => {
        block.classList.remove("lazy-load-block");
        block.classList.add("no-animations");
        block.style.opacity = 1;
      });
    }
  }

  function setObserver() {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          const target = entry.target;

          if (entry.isIntersecting && animationsEnabled) {
            if (target.classList.contains("lazy-load")) {
              target.src = target.dataset.src;
              target.classList.add("visible");
            } else if (
              target.classList.contains("lazy-load-text") ||
              target.classList.contains("lazy-load-block") ||
              target.classList.contains("lazy-load-container")
            ) {
              target.classList.add("visible");
            }
          } else {
            target.classList.remove("visible");
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    lazyContainers.forEach((container) => {
      observer.observe(container);
    });

    lazyImages.forEach((img) => {
      observer.observe(img);
    });

    lazyTexts.forEach((text) => {
      observer.observe(text);
    });

    lazyBlocks.forEach((block) => {
      observer.observe(block);
    });
  }

  if (animationsEnabled) {
    setObserver();
  }

  toggleButton.addEventListener("click", toggleAnimations);
});
*/