import { scrollPastElement, checkForClass } from "./app.js";

const about_me = document.getElementById('about-me')
const about_me_children = [...about_me.getElementsByTagName('*')].filter(node => node.classList.contains('animated-span'))


const switchSpan = [...document.getElementsByClassName('switch')[0].children]


window.addEventListener('scroll', () => {//everything up to projects
    
    const pos = window.scrollY;//programmer -> student
    
    if(pos > 5 && !checkForClass(switchSpan.slice(1), 'hidden')){
        switchSpan[0].classList.remove('hidden')
        switchSpan[1].classList.add('hidden')
    }

    if(pos < 5 && !checkForClass(switchSpan.slice(0), 'hidden')){
        switchSpan[0].classList.add('hidden')
        switchSpan[1].classList.remove('hidden')
    }


    //about me

    const aboutMeBounding = document.getElementById('span-container').getBoundingClientRect();
    const aboutMeCondition = (
        (aboutMeBounding.top + aboutMeBounding.height/2) < window.innerHeight && 
        aboutMeBounding.bottom > aboutMeBounding.height/2
    );

    scrollPastElement(aboutMeCondition, {
        checkActive: true,
        children: about_me_children
    })

})


const project_list = [...document.getElementsByClassName('project')]
const main_title = document.getElementById('main-title')
const title_children = [...main_title.querySelectorAll('.item .animated-span')];


const image_containers = document.getElementsByClassName('image-container')
const images = document.getElementsByClassName('project-image')
function assignHeight(){
    const imageWidth = window.getComputedStyle(image_containers[0]).width;
    for(const image of images){
        image.style.height = imageWidth.slice(0, -2)/1.8  + 'px'
    }
}
assignHeight()
window.addEventListener('resize', assignHeight)



window.addEventListener('scroll', () => {

    const titleBounding = main_title.getBoundingClientRect();
    const titleCondition = (titleBounding.top < window.innerHeight * 3/5);

    scrollPastElement(titleCondition, {
        checkActive: true,
        children: title_children
    })

    project_list.forEach(project => {
        const project_title_spans = [...project.children[0].children]
        const image = [project.children[1].children[0]]

        const projectBounding = project.getBoundingClientRect();
        const title_condition = (projectBounding.top < window.innerHeight * 2.5/5)

        scrollPastElement(title_condition, {
            checkActive: true,
            children: project_title_spans.concat(image)
        })
    })

})

