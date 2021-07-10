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

