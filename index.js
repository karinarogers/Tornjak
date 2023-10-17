const ui = {
    menu: null,
    menuItems: null,
    navItems: null,
    hamburger: null,
    closeIcon: null,
    menuIcon: null,
};

function toggleMenu() {
    if (ui.menu.classList.contains("show-menu")) {
        ui.menu.classList.remove("show-menu");
        ui.closeIcon.style.display = "none";
        ui.menuIcon.style.display = "block";
    } else {
        ui.menu.classList.add("show-menu");
        ui.closeIcon.style.display = "block";
        ui.menuIcon.style.display = "none";
    }
}

function main() {
    ui.menu = document.querySelector(".nav-wrapper");
    ui.menuItems = document.querySelectorAll(".nav-item");
    ui.navItems = document.querySelectorAll(".nav-item");
    ui.hamburger = document.querySelector(".hamburger");
    ui.closeIcon = document.querySelector(".close-icon");
    ui.menuIcon = document.querySelector(".menu-icon");

    ui.hamburger.addEventListener("click", toggleMenu);

    ui.menuItems.forEach(
        function (menuItem) {
            menuItem.addEventListener("click", toggleMenu);
        }
    );
}

main();