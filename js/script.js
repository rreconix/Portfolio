import { appendProjects, generateSpans, sleep, toggleMenu } from "./app.js";

const navItems = [...document.getElementsByClassName('nav-item')]

let animationPlaying = false;

const scroll = {
    home: document.body,
    projects: document.getElementById('main-title')
}

function scrollTo(element){
    scroll[element].scrollIntoView({behavior: "smooth"}), {passive: true}
}

export const projects = [
    {
        name: 'wordle',
        src: './images/wordle.png',
        link: 'https://wordle.felixx-h.repl.co/',
    },
    {
        name: 'Fractal Tree',
        src: './images/fractal.png',
        link: 'https://fractal-tree.felixx-h.repl.co/'
    },
    {
        name: 'lmgtfy',
        src: './images/lmgtfy.png',
        link: 'https://lmgtfy.felixx-h.repl.co/'
    },
    {
        name: 'clock',
        src: './images/clock.png',
        link: 'https://clock.felixx-h.repl.co/'
    },
    {
        name: 'snake',
        src: './images/snake.png',
        link: 'https://snakegame.felixx-h.repl.co/'
    }
]

appendProjects(projects)

export async function showNavItems(array, className){
    let i = 0;
    for(let i = 0; i < array.length; i++){
        array[i].className = 'nav-item ' + className
        
        await sleep(100)

    }
    animationPlaying = false  
}

const menu_panel = document.getElementById('menu-panel')

window.addEventListener('wheel', e => {//controls nav bar
    if(!animationPlaying && !menu_panel.classList.contains('show')){
        let filteredNavItems = (window.innerWidth < 576) ? navItems : navItems.filter(node => node.id !== 'menu')
        animationPlaying = true
        if(e.deltaY > 0){
            showNavItems(filteredNavItems.slice().reverse(), 'hide')
        }
        
        else showNavItems(filteredNavItems, 'show')
    }
})

const navItem_container = document.getElementById('nav-items')
const menu = document.getElementById('menu');


async function checkResize(){
    const menuActive = menu.classList.contains('show')

    if(window.innerWidth < 576){

        if(!menuActive){
            navItem_container.classList.add('noDisplay')
            menu.classList.add('show')
            menu_panel.classList.add('show')
        }
    }
    else{

        if(menuActive){
            navItem_container.classList.remove('noDisplay')
            menu.classList.remove('show')
            menu_panel.classList.remove('show')
        }
    }
}

window.addEventListener('resize', checkResize);


document.getElementById('burgerBtn').onclick = toggleMenu

window.addEventListener('load', () => {
    let filteredNavItems = (window.innerWidth < 576) ? navItems : navItems.filter(node => node.id !== 'menu')
    checkResize()
    showNavItems(filteredNavItems, 'show');
})


const text_about_me = 'I am a young developer from New York City, I started my passion of web development in 7th grade, currently interested in HTML, CSS, JS.'

const span_container = document.getElementById('span-container');
generateSpans(span_container, text_about_me.split(' ').join('&nbsp ').split(' '), true);


[...document.getElementsByClassName('link')].forEach(link => {
    link.addEventListener('click', () => {
        const destination = link.getAttribute('data-to');
        
        if(menu.classList.contains('show')) toggleMenu()

        if(destination.startsWith('https')){
            window.open(destination)
        }
        else{
            scrollTo(destination)
        }
    })
})
