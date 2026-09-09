// =========================================================
// NAFIL RIZQULLAH — MODERN PORTFOLIO JS
// =========================================================

// =========================================================
// 1. MOBILE NAVIGATION
// =========================================================

const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector("#navbar");

if (menuIcon && navbar) {
  menuIcon.addEventListener("click", () => {
    const isOpen = navbar.classList.toggle("open");

    document.body.classList.toggle("menu-open", isOpen);

    menuIcon.setAttribute("aria-expanded", isOpen ? "true" : "false");

    menuIcon.innerHTML = isOpen
      ? '<i class="bx bx-x"></i>'
      : '<i class="bx bx-menu"></i>';
  });
}

// =========================================================
// 2. CLOSE MOBILE MENU WHEN NAV LINK IS CLICKED
// =========================================================

const navLinks = document.querySelectorAll(".navbar a");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navbar) {
      navbar.classList.remove("open");
    }

    document.body.classList.remove("menu-open");

    if (menuIcon) {
      menuIcon.setAttribute("aria-expanded", "false");

      menuIcon.innerHTML = '<i class="bx bx-menu"></i>';
    }
  });
});

// =========================================================
// 3. ACTIVE NAVIGATION + HEADER SCROLL EFFECT
// =========================================================

const header = document.querySelector(".header");

const sections = document.querySelectorAll("main section[id]");

function updateNavigation() {
  const scrollPosition = window.scrollY + 180;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;

    const sectionBottom = sectionTop + section.offsetHeight;

    const id = section.getAttribute("id");

    const activeLink = document.querySelector(`.navbar a[href="#${id}"]`);

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
      });

      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  });

  // Header background ketika scrolling

  if (header) {
    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
}

// Jalankan ketika scrolling

window.addEventListener("scroll", updateNavigation, { passive: true });

// Jalankan pertama kali ketika halaman dibuka

updateNavigation();

// =========================================================
// 4. TYPING ANIMATION
// =========================================================

const typingText = document.querySelector("#typing-text");

const words = [
  "modern websites.",
  "responsive interfaces.",
  "clean UI designs.",
  "useful web solutions.",
];

let wordIndex = 0;

let charIndex = 0;

let deleting = false;

function typeLoop() {
  if (!typingText) {
    return;
  }

  const currentWord = words[wordIndex];

  // Menampilkan teks

  typingText.textContent = currentWord.substring(0, charIndex);

  // Jika sedang mengetik

  if (!deleting && charIndex < currentWord.length) {
    charIndex++;

    setTimeout(typeLoop, 75);
  }

  // Jika kata sudah selesai diketik
  else if (!deleting && charIndex === currentWord.length) {
    deleting = true;

    setTimeout(typeLoop, 1500);
  }

  // Jika sedang menghapus
  else if (deleting && charIndex > 0) {
    charIndex--;

    setTimeout(typeLoop, 40);
  }

  // Jika sudah selesai menghapus
  else {
    deleting = false;

    wordIndex = (wordIndex + 1) % words.length;

    setTimeout(typeLoop, 350);
  }
}

// Jalankan typing animation

typeLoop();

// =========================================================
// 5. SCROLL REVEAL ANIMATION
// =========================================================

const revealElements = document.querySelectorAll(
  `
        .timeline-item,
        .service-card,
        .project-card,
        .contact-card,
        .stats-strip
        `,
);

// Tambahkan class reveal

revealElements.forEach((element) => {
  element.classList.add("reveal");
});

// Observer untuk mendeteksi
// elemen yang masuk viewport

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");

        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
  },
);

// Jalankan observer

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

// =========================================================
// 6. CONTACT FORM — EMAILJS
// =========================================================

// Pastikan EmailJS sudah di-load
// melalui HTML:
//
// <script src="https://cdn.jsdelivr.net/npm/emailjs-com@2.4.1/dist/email.min.js"></script>
//
// dan sudah diinisialisasi:
//
// emailjs.init("BDAStKqWOsCE8fDyY");

const contactForm = document.getElementById("contact-form");

const formStatus = document.getElementById("form-status");

if (contactForm) {
  contactForm.addEventListener("submit", async function (event) {
    // Mencegah halaman refresh

    event.preventDefault();

    const submitButton = contactForm.querySelector(".submit-btn");

    const originalButtonText = submitButton
      ? submitButton.innerHTML
      : "Send Message";

    // Ambil data dari form

    const templateParams = {
      name: document.getElementById("name").value.trim(),

      email: document.getElementById("email").value.trim(),

      phone: document.getElementById("phone").value.trim(),

      subject: document.getElementById("subject").value.trim(),

      message: document.getElementById("message").value.trim(),
    };

    // Ubah tombol menjadi loading

    if (submitButton) {
      submitButton.disabled = true;

      submitButton.innerHTML = `
                    Sending...
                    <i class="bx bx-loader-alt bx-spin"></i>
                    `;
    }

    if (formStatus) {
      formStatus.textContent = "";
    }

    try {
      // Kirim menggunakan EmailJS

      await emailjs.send(
        "service_9xpenlm",

        "template_tnoaorl",

        templateParams,
      );

      // Reset form

      contactForm.reset();

      if (formStatus) {
        formStatus.textContent = "Message sent successfully. Thank you!";
      }

      // Redirect ke halaman
      // sending-message.html

      setTimeout(() => {
        window.location.href = "sending-message.html";
      }, 700);
    } catch (error) {
      console.error("EmailJS error:", error);

      if (formStatus) {
        formStatus.textContent =
          "Failed to send the message. Please try again.";
      }
    } finally {
      // Kembalikan tombol

      if (submitButton) {
        submitButton.disabled = false;

        submitButton.innerHTML = originalButtonText;
      }
    }
  });
}

// =========================================================
// 7. CURRENT YEAR — FOOTER
// =========================================================

const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

// =========================================================
// 8. SMOOTH SCROLL FALLBACK
// =========================================================

navLinks.forEach((link) => {
  link.addEventListener("click", function (event) {
    const targetId = this.getAttribute("href");

    // Hanya proses anchor internal

    if (targetId && targetId.startsWith("#")) {
      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        const headerHeight = header ? header.offsetHeight : 0;

        const targetPosition = target.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,

          behavior: "smooth",
        });
      }
    }
  });
});

// =========================================================
// END OF SCRIPT
// =========================================================
