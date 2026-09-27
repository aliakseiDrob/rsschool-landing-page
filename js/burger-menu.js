const menu = document.querySelector(".header_menu_wrapper");
const menuBtn = document.querySelector(".burger_menu");
const body = document.body;

function closeMenu() {
  menu.classList.remove("active");
  menuBtn.classList.remove("active");
  body.classList.remove("lock");
}

if (menu && menuBtn) {
  menuBtn.addEventListener("click", () => {
    menu.style.display = "flex";
    menu.classList.toggle("active");
    menuBtn.classList.toggle("active");
    body.classList.toggle("lock");
  });

  menu.querySelectorAll(".nav_link").forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");

      if (targetId && targetId.startsWith("#")) {
        e.preventDefault();
        closeMenu();

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          setTimeout(() => {
            targetElement.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }, 700);
        }
      }
    });
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("active")) {
      closeMenu();
    }
  });
}
