const radio1 = document.querySelector('.custom-control-input#radiobutton1');
const radio2 = document.querySelector('.custom-control-input#radiobutton2');



radio1.checked = false;
radio2.checked = false;


radio1.addEventListener('change', function(e){
    const collapse1 = document.querySelector("#collapse1");
    const myModal = document.querySelector(".modal");
    // const collapse2 = document.querySelector("#collapse2");
    // const notification = document.querySelector("#notification");
    // notification.style.display = "none";
    if(this.checked){
        collapse1.style.display = "block";
        myModal.style.display = "none"
    } else {
        collapse1.style.display = "none";
        myModal.style.display = "block";
    }
    

})


// document.querySelector(".custom-control-input#radiobutton1").addEventListener("click", function(e){
//     const collapse1 = document.querySelector("#collapse1");

//     collapse1.style.display = "block";
// })



// disabled currently

radio2.addEventListener('change', function(e){

    const collapse1 = document.querySelector("#collapse1");
    const myModal = document.querySelector(".modal");
    // const collapse2 = document.querySelector("#collapse2");
    // const notification = document.querySelector("#notification");
    if(this.checked){
            myModal.style.display = "block"; // change from block to none
            collapse1.style.display = "none";
            // notification.style.display = "block";

        } else {
            myModal.style.display = "none";
            collapse1.style.display = "block";
            // notification.style.display = "none";
        }
   
   
})


