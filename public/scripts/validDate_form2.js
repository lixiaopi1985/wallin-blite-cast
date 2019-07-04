// const form2 = document.querySelector("form2"); declared
const userDate = document.querySelector("#datepicker_form2");
const validMsg2 = document.querySelector('#validMsg2');
const dateNotification2 = document.querySelector('#dateValid2');
const submitButton = document.querySelector('#drop__button');


userDate.value = "";


const newDate = new Date();
let dateMsg="Error: Selected date is beyond current date";


form2.addEventListener('change', (e)=>{

    let targetForm2 = e.target.id;

    if(targetForm2 === "datepicker_form2"){
        let emDateform2 = new Date(e.target.value);
        if(emDateform2 > newDate){
            dateNotification2.style.display = "block";
            userDate.style.border = "1px solid red";
            validMsg2.textContent = dateMsg;
            submitButton.disabled = true;
        } else {
            dateNotification2.style.display = "none";
            userDate.style.border = "";
            validMsg2.textContent = "";
            submitButton.disabled = false;
        }
    }
})










