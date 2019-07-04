let accumCell = document.querySelectorAll(".accumCell");



accumCell.forEach((val)=>{
    let cellVal = parseInt(val.textContent);

    if(cellVal > 20){
        val.style.backgroundColor = '#c0392b';
    } else if(cellVal > 15 && cellVal <= 20){
        val.style.backgroundColor = '#e74c3c';
    } else if(cellVal > 10 && cellVal <= 15){
        val.style.backgroundColor = '#f39c12';
    } else if(cellVal > 4 && cellVal <= 10){
        val.style.backgroundColor = '#2ecc71';
    } else {
        val.style.backgroundColor = '#3498db';
    }
})
