var state="close";

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


var listener = function (event) {
    if(scrollY>300){
        var top_btn = document.querySelector('#to_top');
        top_btn.style.display='block';

    }
    else{
        var top_btn = document.querySelector('#to_top');
        top_btn.style.display='none'; 
    };
};

window.addEventListener("scroll", listener, false);

