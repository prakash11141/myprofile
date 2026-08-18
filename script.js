const tablinks = document.getElementsByClassName("tab-links");
const tabcontents = document.getElementsByClassName("tab-contents");

// ====================
// Tabs
// ====================
function opentab(tabname, event) {
  for (const tablink of tablinks) {
    tablink.classList.remove("active-link");
  }

  for (const tabcontent of tabcontents) {
    tabcontent.classList.remove("active-tab");
  }

  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");
}

// ====================
// Mobile Menu
// ====================
const sidemenu = document.getElementById("sidemenu");

function openmenu() {
  sidemenu.classList.add("open");
}

function closemenu() {
  sidemenu.classList.remove("open");
}

// ====================
// Sticky Navbar
// ====================
const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

// ====================
// Contact Form
// ====================
const scriptURL =
  "https://script.google.com/macros/s/AKfycbxIKYCbt5DCaufhF5YOKNjb8MXrZtMQdHley2UQnnaKBSb2JFdJ0MwqW0Nh7_rEw_KwCw/exec";

const form = document.forms["submit-to-google-sheet"];
const msg = document.getElementById("msg");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    msg.innerHTML = "Sending...";

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        body: new FormData(form),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      msg.innerHTML = "Message sent successfully";

      form.reset();

      setTimeout(() => {
        msg.innerHTML = "";
      }, 3000);
    } catch (error) {
      console.error("Error!", error);

      msg.innerHTML = "Something went wrong. Please try again.";
    }
  });
}
// ====================
// GSAP - Services Animation
// ====================
// ====================
// GSAP - Services Animation
// ====================

gsap.registerPlugin(ScrollTrigger);

const servicesSection = document.querySelector("#services");
const servicesTitle = document.querySelector("#services .sub-title");
const serviceCards = document.querySelectorAll(
  "#services .services-list > div",
);

if (servicesSection && servicesTitle && serviceCards.length) {
  // =========================
  // My Services Title
  // Comes from above
  // =========================
  gsap.from(servicesTitle, {
    scrollTrigger: {
      trigger: servicesSection,
      start: "top 100%",
      toggleActions: "play none none reverse",
    },
    y: -120,
    opacity: 0,
    duration: 2,
    ease: "power4.out",
  });

  // =========================
  // Service Cards
  // Come from the sides
  // =========================

  serviceCards.forEach((card, index) => {
    let animation = {
      opacity: 0,
      duration: 1.2,
      delay: index * 0.15,
      ease: "power4.out",
      scrollTrigger: {
        trigger: servicesSection,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    };

    if (index === 0) {
      // Card 1 → from left
      animation.x = -100;
    } else if (index === 1) {
      // Card 2 → from bottom
      animation.y = 100;
    } else if (index === 2) {
      // Card 3 → from right
      animation.x = 100;
    }

    gsap.from(card, animation);
  });
}
// =========================
// Typing Animation
// =========================

const typingText = document.getElementById("typing-text");

const text = "Computer Engineer.";

let index = 0;
let isDeleting = false;

function typeEffect() {
  if (!typingText) return;

  if (!isDeleting) {
    // Typing
    typingText.textContent = text.substring(0, index + 1);
    index++;

    // Finished typing
    if (index === text.length) {
      setTimeout(() => {
        isDeleting = true;
        typeEffect();
      }, 1500);

      return;
    }

    setTimeout(typeEffect, 120);
  } else {
    // Deleting
    typingText.textContent = text.substring(0, index - 1);
    index--;

    // Finished deleting
    if (index === 0) {
      isDeleting = false;

      setTimeout(typeEffect, 500);

      return;
    }

    setTimeout(typeEffect, 70);
  }
}

typeEffect();
