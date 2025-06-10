// alert('menu')
const menuBtn = document.querySelector('.burger-btn');
const menuList = document.querySelector('.header-nav-list');
const body = document.body;
const svgBurger = document.querySelector('.burger-icon');

console.log(svgBurger.hasAttribute('href'));


menuBtn.addEventListener('click', openMenu);
menuList.addEventListener('click', (evt) => {
    

    if(evt.target.nodeName === 'A') {
        
        menuList.classList.remove('active');
        // svgBurger.setAttribute('src', './svg/burger.svg');
        body.classList.remove('lock');

    }
    return;
});


function openMenu(){
    
    menuList.classList.toggle('active');

    if(menuList.classList.contains('active')){
        // svgBurger.setAttribute('src', './svg/close.svg');
        body.classList.add('lock');
    }else{
        // svgBurger.setAttribute('src', './svg/burger.svg');
        body.classList.remove('lock');
    }

    return

}