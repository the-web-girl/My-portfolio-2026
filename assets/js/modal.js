const modals = document.querySelectorAll(".jc-usa-modal");
const showModalButtons = document.querySelectorAll(
  'a[href^="#modal-"], button[data-open-modal]'
);
const closeModalButtons = document.querySelectorAll("[data-close-modal]");

showModalButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const modalId = button.getAttribute("href")
      ? button.getAttribute("href").substring(1)
      : button.getAttribute("data-open-modal");
    const modal = document.getElementById(modalId);
    if (modal) {
      const currentVerticalScroll = window.scrollY;
      modal.showModal();
      document.body.classList.add("usa-js-modal--active");
      window.scrollTo(0, currentVerticalScroll);
      trapFocus(modal);
    }
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".jc-usa-modal");
    if (modal) {
      modal.close();
      document.body.classList.remove("usa-js-modal--active");
    }
  });
});

modals.forEach((modal) => {
  modal.addEventListener("close", () => {
    document.body.classList.remove("usa-js-modal--active");
  });
});

/* Let's add a focus trap function */
function trapFocus(element) {
  const focusableEls = element.querySelectorAll(
    'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])'
  );
  const firstFocusableEl = focusableEls[0];
  const lastFocusableEl = focusableEls[focusableEls.length - 1];

  function handleKeyDown(e) {
    const isTabPressed = e.key === "Tab";

    if (!isTabPressed) {
      return;
    }

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstFocusableEl) {
        lastFocusableEl.focus();
        e.preventDefault();
      }
    } else {
      // Tab
      if (document.activeElement === lastFocusableEl) {
        firstFocusableEl.focus();
        e.preventDefault();
      }
    }
  }

  element.addEventListener("keydown", handleKeyDown);

  // Optional: Set initial focus to the first focusable element
  if (firstFocusableEl) {
    firstFocusableEl.focus();
  }

  // Return a function to remove the event listener and release the trap
  return () => {
    element.removeEventListener("keydown", handleKeyDown);
  };
}