const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector("#mobile-menu");
const backToTop = document.querySelector(".back-to-top");
const revealElements = document.querySelectorAll(".reveal");
const navLinks = document.querySelectorAll(".top-nav a, .mobile-menu a");

menuButton.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 600);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.18 }
);

revealElements.forEach((element) => revealObserver.observe(element));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        link.classList.toggle("active", link.hash === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-40% 0px -50% 0px" }
);

document.querySelectorAll("section[id]").forEach((section) => {
  sectionObserver.observe(section);
});

const modal = document.querySelector("#image-modal");
const modalImage = document.querySelector("#modal-image");
const modalTitle = document.querySelector("#modal-title");
const closeModal = document.querySelector(".modal-close");

document.querySelectorAll(".image-button").forEach((button) => {
  button.addEventListener("click", () => {
    modalImage.src = button.dataset.modalImage;
    modalImage.alt = button.querySelector("img").alt;
    modalTitle.textContent = button.dataset.modalTitle;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  });
});

function hideModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  modalImage.src = "";
}

closeModal.addEventListener("click", hideModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    hideModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("open")) {
    hideModal();
  }
});

const exhibitSteps = [
  {
    panicTitle: "Slave-backed mortgage bonds",
    panicText: "Caused by speculation in slave-backed mortgage bonds.",
    crashTitle: "Subprime home mortgage bonds",
    crashText: "Caused by speculation in subprime home mortgage bonds."
  },
  {
    panicTitle: "Risky loans became securities",
    panicText: "Banks bundled risky loans on enslaved people and sold them as securities.",
    crashTitle: "Risky loans became CDOs",
    crashText: "Banks bundled risky home loans and sold them as collateralized debt obligations."
  },
  {
    panicTitle: "Cotton prices collapsed",
    panicText: "Planters defaulted, banks failed, and investors lost fortunes.",
    crashTitle: "Housing prices collapsed",
    crashText: "Homeowners defaulted, banks failed, and global markets froze."
  },
  {
    panicTitle: "Human beings as collateral",
    panicText: "Enslaved people were collateral; when prices dropped, their market value was destroyed.",
    crashTitle: "Homes as collateral",
    crashText: "Homes were collateral; when prices dropped, millions lost their homes."
  },
  {
    panicTitle: "Bailouts and impunity",
    panicText: "States bailed out planters, and few planters or bankers faced consequences.",
    crashTitle: "Bailouts and impunity",
    crashText: "The federal government bailed out banks, and few Wall Street executives went to jail."
  },
  {
    panicTitle: "A long depression",
    panicText: "The Panic of 1837 led to a depression lasting nearly seven years.",
    crashTitle: "The Great Recession",
    crashText: "The 2008 crisis led to the Great Recession, with long-term effects."
  }
];

let currentStep = 0;
const stepText = document.querySelector("#step-text");
const panicTitle = document.querySelector("#panic-title");
const panicText = document.querySelector("#panic-text");
const crashTitle = document.querySelector("#crash-title");
const crashText = document.querySelector("#crash-text");
const progressBar = document.querySelector("#progress-bar");
const nextButton = document.querySelector("#next");
const restartButton = document.querySelector("#restart");

function updateInteractiveStep() {
  const step = exhibitSteps[currentStep];
  if (stepText) {
    stepText.textContent = "";
  }
  panicTitle.textContent = step.panicTitle;
  panicText.textContent = step.panicText;
  crashTitle.textContent = step.crashTitle;
  crashText.textContent = step.crashText;
  const progress = ((currentStep + 1) / exhibitSteps.length) * 100;
  progressBar.style.width = `${progress}%`;
}

nextButton.addEventListener("click", () => {
  currentStep = (currentStep + 1) % exhibitSteps.length;
  updateInteractiveStep();
});

restartButton.addEventListener("click", () => {
  currentStep = 0;
  updateInteractiveStep();
});

updateInteractiveStep();
