import { appendProjects, writeAboutMe, sleep, toggleMenu } from "./app.js";

const navItems = [...document.getElementsByClassName('nav-item')]

let animationPlaying = false;

const box = document.getElementById('invisible-box');
const projectsBox = document.getElementById('main-title')

function scrollToHome(){
    box.scrollIntoView({behavior: "smooth"}), {passive: true}
}

function scrollToProjects(){
    projectsBox.scrollIntoView({behavior: "smooth"}), {passive: true}
}

export async function showNavItems(array, className){
    let i = 0;
    for(let i = 0; i < array.length; i++){
        array[i].className = 'nav-item ' + className
        
        await sleep(100)

        if(i == array.length - 1) animationPlaying = false  
    }
}

const menu = document.getElementById('menu');




window.onwheel = e => {//controls nav bar
    let filteredNavItems = (window.innerWidth < 576) ? navItems : navItems.filter(node => node.id !== 'menu')
    if(!animationPlaying){
        animationPlaying = true
        if(e.deltaY > 0){
            showNavItems(filteredNavItems.slice().reverse(), 'hide', true)
        }
        
        else showNavItems(filteredNavItems, 'show')
    }
}

const navItem_container = document.getElementById('nav-items')


async function checkResize(){
    const menuActive = menu.classList.contains('show')

    if(window.innerWidth < 576){

        navItem_container.classList.add('noDisplay')

        if(!menuActive){
            menu.classList.add('show')
        }
    }
    if(window.innerWidth > 576){
        navItem_container.classList.remove('noDisplay')

        if(menuActive){
            menu.classList.remove('show')
        }
    }
}



document.getElementById('burgerBtn').onclick = toggleMenu

window.onload = () => {
    let filteredNavItems = (window.innerWidth < 576) ? navItems : navItems.filter(node => node.id !== 'menu')
    showNavItems(filteredNavItems, 'show');
    checkResize()
}



const text_about_me = 'I am a young developer from New York City, I started my passion of web development in 7th grade, currently interested in HTML, CSS, JS.'

const span_container = document.getElementById('span-container');
writeAboutMe(span_container, text_about_me)

export const projects = [
    {
        name: 'wordle',
        src: './images/wordle.png',
        link: 'https://wordle.felixx-h.repl.co/',
    },
    {
        name: 'lmgtfy',
        src: './images/lmgtfy.png',
        link: 'https://lmgtfy.felixx-h.repl.co/'
    },
    {
        name: 'Fractal Tree',
        src: './images/fractal.png',
        link: 'https://fractal-tree.felixx-h.repl.co/'
    },
    {
        name: 'clock',
        src: './images/clock.png',
        link: 'https://clock.felixx-h.repl.co/'
    }
]

appendProjects(projects)



window.onresize = () => {
    checkResize()
}   


[...document.getElementsByClassName('link')].forEach(link => {
    link.addEventListener('click', () => {
        const destination = link.getAttribute('data-to');
        
        if(menu.classList.contains('show')) toggleMenu()

        if(destination == 'github') window.open('https://github.com/rreconix')
        if(destination == 'home') scrollToHome()
        else if(destination == 'projects') scrollToProjects()
        else{
            window.open(destination)
        }

    })
})
