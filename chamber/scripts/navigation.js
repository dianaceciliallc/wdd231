const menuButton = document.querySelector('#menu');
const navOptions = document.querySelector('.navigation__options');

menuButton.addEventListener('click', () => {
    
    navOptions.classList.toggle('show');

    if (navOptions.classList.contains('show')) {
        menuButton.innerHTML = '&times;';
    } else {
        menuButton.innerHTML = '&#9776;';
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";

    const navLinks = document.querySelectorAll(".navigation__options a");

    navLinks.forEach(link => {
        const linkHref = link.getAttribute("href");

        if (linkHref === currentPath) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
});