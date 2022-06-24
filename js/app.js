export function generateSpans(container, text, createParent){
    for(const word of text){

        const child_span = document.createElement('span')
        child_span.innerHTML = word;
        child_span.className = word == ' ' ? 'animated-span line-break' : 'animated-span'

        if(createParent){
            const parent_span = document.createElement('span');
            parent_span.className = 'item' 

            parent_span.appendChild(child_span)
            container.appendChild(parent_span)
        }
        else{
            container.appendChild(child_span)
        }
    }
}

export async function sleep(ms){
    return await new Promise(resolve => setTimeout(resolve, ms));
}

export function toggleClass(children, className){
    children.forEach(child => {
        child.classList.toggle(className)
    })
}

export function checkForClass(children, className){
    return children.every(node => node.classList.contains(className));
}

const allProjects = document.getElementById('projects');

export function appendProjects(projects){
    
    for(const project of projects){
        const project_container = document.createElement('div')
        project_container.className = 'project'

        const image_container = document.createElement('div')
        image_container.className = 'image-container'

        const image = document.createElement('img')
        image.src = project.src;
        image.className = 'project-image link'
        image.setAttribute('data-to', project.link)

        const project_title = document.createElement('span')
        project_title.className = 'project-title item'

        allProjects.appendChild(project_container)
        project_container.appendChild(project_title)
        project_container.appendChild(image_container)
        image_container.appendChild(image)
        
        generateSpans(project_title, project.name.split(''), false)
    }
}

export function scrollPastElement(condition, options){
    const active = options.checkActive ? checkForClass(options.children, 'show') : true;
    
    if(condition && !active) options.children.forEach(child => child.classList.add('show'))
    else if(!condition && active) options.children.forEach(child => child.classList.remove('show'))
    
}

const menu_panel = document.getElementById('menu-panel')
const burgerBtn = document.getElementById('burgerBtn')

export function toggleMenu(){
    if(menu_panel.classList.contains('show')){
        menu_panel.classList.remove('show')
        menu_panel.classList.add('hide')
    }
    else{
        menu_panel.classList.add('show')
        menu_panel.classList.remove('hide')
    }
    burgerBtn.classList.toggle('click')
}

function resizeProjectTitle(){
    
    const lineBreaks = [...document.getElementsByClassName('line-break')];
    
    if(window.innerWidth < 576){
        const filtered = lineBreaks.filter(node => node.innerHTML === ' ');
        if(filtered.length > 0){
            filtered.forEach(node => {
                node.classList.add('single-line')
                node.innerHTML = '&nbsp'
            })
        }
    }
    else{
        const filtered = lineBreaks.filter(node => node.innerHTML !== ' ');

        if(filtered.length > 0){
            filtered.forEach(node => {
                node.classList.remove('single-line')
                node.innerHTML = ''
            })
        }
    }
}

window.addEventListener('resize', resizeProjectTitle)

window.addEventListener('load', resizeProjectTitle)