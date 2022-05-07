let state="close";
let posts;

//Mobile selector animation
function openMenu() {
    const menuList=document.querySelector("#menu_list")
    const selector1=document.querySelector("#selector_1")
    const selector2=document.querySelector("#selector_2")
    const selector3=document.querySelector("#selector_3")
    
    if (state=="close"){
        selector1.style.animation="selector_1_open 0.5s ease-in-out forwards"
        selector2.style.animation="close_list 0.5s ease-in-out forwards"
        selector3.style.animation="selector_3_open 0.5s ease-in-out forwards"
        menuList.style.animation="open_list 0.5s ease-in-out forwards"
        menuList.style.display="block"
        state="open"
    } else {
        selector1.style.animation="selector_1_close 0.5s ease-in-out forwards"
        selector2.style.animation="open_list 0.5s ease-in-out forwards"
        selector3.style.animation="selector_3_close 0.5s ease-in-out forwards"
        menuList.style.animation="close_list 0.5s ease-in-out forwards"
        state="close"
    }
}

//Scroll to top button
var listener = function (event) {
    const top_btn = document.querySelector('#to_top')
    if (scrollY > 300){
        top_btn.style.display='block'
        top_btn.style.animation="base 0.5s"

    } else {
        top_btn.style.display='none'
        top_btn.style.animation="base 0.5s reverse"
    }
}

//Projects load
function showProjects(more) {
    const projectList = document.querySelector("#project_list");
    const template = projectList.querySelector('#post');
    let total = document.querySelectorAll('.project_cell').length;
    const final = total + more;
    const projects=posts["projects"];

    for (var i = total; i < final; i++, total++) {
        const clone = template.content.cloneNode(true);
        clone.querySelector("a").href=projects[i]["link"];
        clone.querySelector("img").src="img/"+projects[i]["img"];
        clone.querySelector("h3").textContent=projects[i]["title"];
        clone.querySelector("p").textContent=projects[i]["text"];
        projectList.appendChild(clone);

        if (total===posts["projects"].length - 1){
            document.querySelector("#more_btn").style.display="none";
            return;
        }
    }
}

//Experiance load
function showExperience(experience) {
    const experienceList = document.querySelector("#experience_list");
    const template = experienceList.querySelector('#post');
    
    experience["experience"].map(item => {
        const clone = template.content.cloneNode(true);
        clone.querySelector("img").src="img/"+item["img"];
        clone.querySelector("h3").textContent=item["title"];
        clone.querySelector("h4").textContent=item["subtitle"];
        clone.querySelector("time").textContent=item["time"];
        clone.querySelector("p").textContent=item["text"];
        experienceList.appendChild(clone);
    });
}

function getRequest(name){
    let requestURL = 'json/' + name
    let request = new XMLHttpRequest()
    request.open('GET', requestURL)
    request.responseType = 'json'
    request.send()
    return request
}

//Get content from server
function getContent(){
    let postsRequest = getRequest("posts.json")
    postsRequest.onload = () => {
        posts = postsRequest.response;
        showProjects(2);
    }
    
    experienceRequest = getRequest("experience.json")
    experienceRequest.onload = () => {
        showExperience(experienceRequest.response);
    }
}

//Entry points
document.addEventListener("DOMContentLoaded", getContent);
window.addEventListener("scroll", listener, false);

