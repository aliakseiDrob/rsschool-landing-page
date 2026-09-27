const menu = document.querySelector(".header_menu_wrapper");
const menuBtn = document.querySelector(".burger_menu");
const body = document.body;

if (menu && menuBtn) {
    menuBtn.addEventListener('click', () => {
        menu.style.display = "flex";
        menu.classList.toggle("active");
        menuBtn.classList.toggle("active");
        body.classList.toggle("lock");

        menu.querySelectorAll(".nav_link").forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove("active");
                menuBtn.classList.remove("active");
                body.classList.remove("lock");
            })
        })

    })
}
