//show the hidden faq answer
const faqs = document.querySelectorAll('.faq');
faqs.forEach(faq => {
    faq.addEventListener('click', () => {
        faq.classList.toggle('open');

        // changing the icon
        const icon = faq.querySelector('.faq__icon i');
        if (icon.className === 'uil uil-plus') {
            icon.className = 'uil uil-minus'
        }
        else {
            icon.className = 'uil uil-plus'
        }
    })
})


// Toggle the menu bar// Show  the hidden menu bar//
const menu = document.querySelector(".nav__menu");
const menuButton = document.querySelector("#open-menu-button");
const closeButton1 = document.querySelector("#close-menu-button");

menuButton.addEventListener('click',()=>{
    menu.style.display="flex";
    closeButton1.style.display="inline-block";
    menuButton.style.display="none";
})

// close the navigation menu

const closeNav= () => {
    menu.style.display = "none";
    closeButton1.style.display = "none";
    menuButton.style.display = "inline-block";
}

closeButton1.addEventListener('click',closeNav)

