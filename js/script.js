var state="close";
var posts;

//Mobile selector animation
function open_menu(){
    var menu_list=document.querySelector("#menu_list");
    var selector_1=document.querySelector("#selector_1");
    var selector_2=document.querySelector("#selector_2");
    var selector_3=document.querySelector("#selector_3");
    
    if (state=="close"){
        selector_1.style.animation="selector_1_open 0.5s ease-in-out forwards";
        selector_2.style.animation="close_list 0.5s ease-in-out forwards";
        selector_3.style.animation="selector_3_open 0.5s ease-in-out forwards";
        menu_list.style.animation="open_list 0.5s ease-in-out forwards";
        menu_list.style.display="block";
        state="open";
    } else {
        selector_1.style.animation="selector_1_close 0.5s ease-in-out forwards";
        selector_2.style.animation="open_list 0.5s ease-in-out forwards";
        selector_3.style.animation="selector_3_close 0.5s ease-in-out forwards";
        menu_list.style.animation="close_list 0.5s ease-in-out forwards";
        state="close";
    }
}

//Scroll to top button
var listener = function (event) {
    if(scrollY>300){
        var top_btn = document.querySelector('#to_top');
        top_btn.style.display='block';
        top_btn.style.animation="base 0.5s";

    }
    else{
        var top_btn = document.querySelector('#to_top');
        top_btn.style.display='none'; 
        top_btn.style.animation="base 0.5s reverse";
    };
};

window.addEventListener("scroll", listener, false);

//Projects load
function show_projects(more){
    var project_list = document.querySelector("#project_list");
    var template = document.querySelector('#post');
    var total = document.querySelectorAll('.project_cell').length;
    var final = total + more;
    var proj=posts["projects"];

    for (var i = total; i < final; i++) {
        total++;
        var clone = template.content.cloneNode(true);
        clone.querySelector("a").href=proj[i]["link"];
        clone.querySelector("img").src="img/"+proj[i]["img"];
        clone.querySelector("h3").textContent=proj[i]["title"];
        clone.querySelector("p").textContent=proj[i]["text"];
        project_list.appendChild(clone);

        if (total===posts["projects"].length){
            document.querySelector("#more_btn").style.display="none";
            return;
        }
    }
}

function get_posts(){
    var requestURL = 'js/posts.json';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        posts = request.response;
        show_projects(2);
    }
}

document.addEventListener("DOMContentLoaded", get_posts);

