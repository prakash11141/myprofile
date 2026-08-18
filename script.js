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
