let modal = document.querySelector('.modal');
let closeTab = document.querySelector('#modalClose');
let warningMsg2 = document.querySelector('.warningMsg');
let dropZone2 = document.querySelector('.drop_zone');


window.onclick = function(ev){
    
    if(ev.target == modal){
        modal.style.display = "none";
        warningMsg2.innerHTML = "";
        dropZone2.classList.remove("warning");
    }
}


closeTab.addEventListener('click', function(e){
    modal.style.display = "none";
    warningMsg2.innerHTML = "";
    dropZone2.classList.remove("warning");
})