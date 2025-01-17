function toggleDropdown(toggle, open) {
  const parentElement = toggle.parentNode;
  const dropdown = document.getElementById(
    toggle.getAttribute("aria-controls")
  );
  dropdown.setAttribute("aria-hidden", !open);

  if (open) {
    parentElement.classList.add("is-active");
  } else {
    parentElement.classList.remove("is-active");
  }
}

function closeAllDropdowns(toggles) {
  toggles.forEach((toggle) => {
    toggleDropdown(toggle, false);
  });
}

function handleClickOutside(toggles, containerClass) {
  document.addEventListener("click", (event) => {
    const target = event.target;

    if (target.closest) {
      if (!target.closest(containerClass)) {
        closeAllDropdowns(toggles);
      }
    }
  });
}

function initNavDropdowns(containerClass) {
  const toggles = [].slice.call(
    document.querySelectorAll(containerClass + " [aria-controls]")
  );

  handleClickOutside(toggles, containerClass);

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();

      const isOpen = e.target.parentNode.classList.contains("is-active");

      closeAllDropdowns(toggles);
      toggleDropdown(toggle, !isOpen);
    });
  });
}

initNavDropdowns(".p-navigation__item--dropdown-toggle");
