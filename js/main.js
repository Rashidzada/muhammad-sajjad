"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var root = document.documentElement;
  var topNav = document.getElementById("topNav");
  var mobileMenuButton = document.getElementById("mobileMenuButton");
  var mobileMenu = document.getElementById("mobileMenu");
  var menuOpenIcon = document.getElementById("menuOpenIcon");
  var menuCloseIcon = document.getElementById("menuCloseIcon");
  var themeButtons = Array.from(document.querySelectorAll("[data-theme-toggle]"));
  var navLinks = Array.from(document.querySelectorAll("[data-nav-link]"));
  var scrollLinks = Array.from(document.querySelectorAll("[data-scroll-link]"));
  var sections = Array.from(document.querySelectorAll("[data-section]"));
  var revealItems = Array.from(document.querySelectorAll("[data-reveal]"));
  var form = document.getElementById("contactForm");
  var formStatus = document.getElementById("formStatus");
  var currentYear = document.getElementById("currentYear");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
  }

  function isDarkMode() {
    return root.classList.contains("dark");
  }

  function updateThemeButtonUI() {
    var dark = isDarkMode();

    themeButtons.forEach(function (button) {
      var lightIcon = button.querySelector(".theme-icon-light");
      var darkIcon = button.querySelector(".theme-icon-dark");
      var label = button.querySelector(".theme-state-label");

      button.setAttribute("aria-pressed", dark ? "true" : "false");

      if (lightIcon) {
        lightIcon.classList.toggle("hidden", dark);
      }
      if (darkIcon) {
        darkIcon.classList.toggle("hidden", !dark);
      }
      if (label) {
        label.textContent = dark ? "Activate light mode" : "Activate dark mode";
      }
    });
  }

  function setTheme(theme) {
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    try {
      localStorage.setItem("theme", theme);
    } catch (error) {
      console.warn("Theme preference could not be saved.", error);
    }

    updateThemeButtonUI();
  }

  themeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      setTheme(isDarkMode() ? "light" : "dark");
    });
  });

  updateThemeButtonUI();

  function setMobileMenuState(open) {
    if (!mobileMenu || !mobileMenuButton) {
      return;
    }

    mobileMenu.classList.toggle("hidden", !open);
    mobileMenuButton.setAttribute("aria-expanded", open ? "true" : "false");
    mobileMenuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");

    if (menuOpenIcon) {
      menuOpenIcon.classList.toggle("hidden", open);
    }
    if (menuCloseIcon) {
      menuCloseIcon.classList.toggle("hidden", !open);
    }
  }

  if (mobileMenuButton) {
    mobileMenuButton.addEventListener("click", function () {
      var isOpen = mobileMenuButton.getAttribute("aria-expanded") === "true";
      setMobileMenuState(!isOpen);
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      setMobileMenuState(false);
    }
  });

  document.addEventListener("click", function (event) {
    if (!mobileMenu || !mobileMenuButton) {
      return;
    }

    var menuIsOpen = mobileMenuButton.getAttribute("aria-expanded") === "true";
    if (!menuIsOpen) {
      return;
    }

    var clickedInsideMenu = mobileMenu.contains(event.target);
    var clickedButton = mobileMenuButton.contains(event.target);
    if (!clickedInsideMenu && !clickedButton) {
      setMobileMenuState(false);
    }
  });

  scrollLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      var href = link.getAttribute("href");
      if (!href || href.charAt(0) !== "#") {
        return;
      }

      var target = document.querySelector(href);
      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start"
      });

      setMobileMenuState(false);
    });
  });

  function setActiveLink(sectionId) {
    navLinks.forEach(function (link) {
      var href = link.getAttribute("href");
      var isActive = href === "#" + sectionId;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function updateScrollState() {
    if (topNav) {
      topNav.classList.toggle("nav-scrolled", window.scrollY > 8);
    }

    if (sections.length === 0) {
      return;
    }

    var currentSectionId = sections[0].id;
    var checkpoint = window.scrollY + 180;

    sections.forEach(function (section) {
      if (checkpoint >= section.offsetTop) {
        currentSectionId = section.id;
      }
    });

    setActiveLink(currentSectionId);
  }

  window.addEventListener("scroll", updateScrollState, { passive: true });
  window.addEventListener("resize", updateScrollState);
  updateScrollState();

  if (reduceMotion) {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  } else if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -8% 0px"
      }
    );

    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }

  function clearFieldErrors() {
    if (!form) {
      return;
    }

    Array.from(form.querySelectorAll(".form-input")).forEach(function (input) {
      input.classList.remove("border-rose-400", "focus:border-rose-400", "focus:ring-rose-400/30");
    });
  }

  function markFieldError(field) {
    if (!field) {
      return;
    }

    field.classList.add("border-rose-400", "focus:border-rose-400", "focus:ring-rose-400/30");
  }

  function showFormStatus(type, message) {
    if (!formStatus) {
      return;
    }

    formStatus.classList.remove(
      "hidden",
      "border-rose-200",
      "bg-rose-50",
      "text-rose-700",
      "dark:border-rose-900/60",
      "dark:bg-rose-950/40",
      "dark:text-rose-300",
      "border-emerald-200",
      "bg-emerald-50",
      "text-emerald-700",
      "dark:border-emerald-900/60",
      "dark:bg-emerald-950/40",
      "dark:text-emerald-300"
    );

    if (type === "error") {
      formStatus.classList.add(
        "border-rose-200",
        "bg-rose-50",
        "text-rose-700",
        "dark:border-rose-900/60",
        "dark:bg-rose-950/40",
        "dark:text-rose-300"
      );
    } else {
      formStatus.classList.add(
        "border-emerald-200",
        "bg-emerald-50",
        "text-emerald-700",
        "dark:border-emerald-900/60",
        "dark:bg-emerald-950/40",
        "dark:text-emerald-300"
      );
    }

    formStatus.textContent = message;
  }

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      clearFieldErrors();

      var nameField = form.elements.namedItem("name");
      var emailField = form.elements.namedItem("email");
      var messageField = form.elements.namedItem("message");

      var nameValue = nameField && typeof nameField.value === "string" ? nameField.value.trim() : "";
      var emailValue = emailField && typeof emailField.value === "string" ? emailField.value.trim() : "";
      var messageValue = messageField && typeof messageField.value === "string" ? messageField.value.trim() : "";

      var errors = [];
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!nameValue) {
        errors.push("Please enter your name.");
        markFieldError(nameField);
      }

      if (!emailValue) {
        errors.push("Please enter your email address.");
        markFieldError(emailField);
      } else if (!emailPattern.test(emailValue)) {
        errors.push("Please enter a valid email address.");
        markFieldError(emailField);
      }

      if (!messageValue) {
        errors.push("Please enter your message.");
        markFieldError(messageField);
      } else if (messageValue.length < 10) {
        errors.push("Message should be at least 10 characters.");
        markFieldError(messageField);
      }

      if (errors.length > 0) {
        showFormStatus("error", errors[0]);
        return;
      }

      showFormStatus("success", "Thank you! Your message has been validated and is ready to send (frontend demo only).");
      form.reset();
    });
  }
});
