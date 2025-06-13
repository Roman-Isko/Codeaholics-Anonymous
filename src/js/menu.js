const iconBurger = document.querySelector('.burger-icon');
const iconBurgerX = document.querySelector('.burger-icon-x');
const menuList = document.querySelector('.header-nav-list');
const body = document.body;
const svgBurger = document.querySelector('.burger-svg');



iconBurger.addEventListener('click', openMenu);
iconBurgerX.addEventListener('click', openMenu);
menuList.addEventListener('click', (evt) => {
    

    if(evt.target.nodeName === 'A') {
        
        menuList.classList.remove('active');
        iconBurgerX.classList.remove('active');
        iconBurger.classList.remove('active');
        body.classList.remove('lock');


    }
    return;
});


function openMenu(){
    
    menuList.classList.toggle('active');
    iconBurger.classList.toggle('active');
    iconBurgerX.classList.toggle('active');

    if(menuList.classList.contains('active')){
        
        body.classList.add('lock');
    }else{
        
        body.classList.remove('lock');
    }

    return

}