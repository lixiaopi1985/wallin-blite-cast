let infoMarker = document.querySelector("#infoMarker");




infoMarker.addEventListener('click', function(e){
    e.preventDefault();
    let win = window.open("/html/inforMarker.html", '_blank');
    win.focus();
})