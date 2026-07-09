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