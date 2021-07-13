var state="close";

function open_menu(){
    var menu_selector=document.querySelector("#menu_selector");
    var menu_list=document.querySelector("#menu_list");
    
    if (state=="close"){
        menu_selector.style.animation="open 0.5s ease-in-out forwards";
        menu_list.style.animation="open_list 0.5s ease-in-out forwards";
        menu_list.style.display="block";
        state="open";
    } else {
        menu_selector.style.animation="close 0.5s ease-in-out forwards";
        menu_list.style.animation="close_list 0.5s ease-in-out forwards";
        state="close";
    }
}


var listener = function (event) {
    if(pageYOffset>300){
        var top_btn = document.querySelector('#to_top');
        top_btn.style.display='block';

    }
    else{
        var top_btn = document.querySelector('#to_top');
        top_btn.style.display='none'; 
    };
};

window.addEventListener("scroll", listener, false);

