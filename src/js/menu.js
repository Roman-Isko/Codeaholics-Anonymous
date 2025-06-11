// alert('menu')
const menuBtn = document.querySelector('.burger-btn');
const menuList = document.querySelector('.header-nav-list');
const body = document.body;
const svgBurger = document.querySelector('.burger-svg');




menuBtn.addEventListener('click', openMenu);
menuList.addEventListener('click', (evt) => {
    

    if(evt.target.nodeName === 'A') {
        
        menuList.classList.remove('active');
        svgBurger.setAttribute('href', '/images/symbol-defs.svg#icon-menu-alt-right');
        body.classList.remove('lock');

    }
    return;
});


function openMenu(){
    
    menuList.classList.toggle('active');

    if(menuList.classList.contains('active')){
        svgBurger.setAttribute('href', '/images/symbol-defs.svg#icon-x');
        body.classList.add('lock');
    }else{
        svgBurger.setAttribute('href', '/images/symbol-defs.svg#icon-menu-alt-right');
        body.classList.remove('lock');
    }

    return

}