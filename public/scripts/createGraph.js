import {mapLegend} from '/scripts/mapAccessory.js';
import {setMapLegend} from '/scripts/mapAccessory.js';
import {mapboxSetup} from '/scripts/mapboxSetup.js';


// client side

///!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1

/* address has been disabled  in form1Router.js */

///!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const form1 = document.querySelector('#form1');
const queryDate = document.querySelector('#datepicker_form1');
const hvdateElem = document.querySelector("#datepicker_hvdate");
const queryState = document.querySelector("#selectState");
const querySlider = document.querySelector('.slider');
const loader = document.querySelector('.loader');
const validMsg = document.querySelector('#validMsg');
const dateNotification = document.querySelector('#dateValid');
const submitButton = document.querySelector('#submitButton');


let dateMsg="Error: Selected date is beyond current date";
let stateMsg = "Error: Please select a state";



const newDate = new Date();

dateNotification.style.display = "none";
validMsg.textContent = "";
hvdateElem.style.border = "";
queryDate.style.border = "";


queryDate.value = "";
queryState.value = "";
hvdateElem.value = "";

submitButton.disabled = true;

form1.addEventListener("change", (e)=>{
    let targetID = e.target.id;

    if(queryDate.value && hvdateElem.value && queryState.value ){
        submitButton.disabled = false;
    } 
    

    if(targetID === "datepicker_form1"){
        let emDate = new Date(e.target.value);
        if(emDate > newDate){
            dateNotification.style.display = "block";
            queryDate.style.border = "1px solid red";
            validMsg.textContent = dateMsg;
        } else {
            dateNotification.style.display = "none";
            queryDate.style.border = "";
            validMsg.textContent = "";
        }
    }  else if (targetID === "datepicker_hvdate"){
        let hvDate = new Date(e.target.value);

        if(hvDate > newDate){
            dateNotification.style.display = "block";
            validMsg.textContent = dateMsg;
            hvdateElem.style.border = "1px solid red";
        } else {
            dateNotification.style.display = "none";
            validMsg.textContent = "";
            hvdateElem.style.border = "";
        }
    } 
    
})

form1.addEventListener('submit', (e)=>{

    e.preventDefault();

    const emdate = queryDate.value;
    // const address = queryAddress.value;
    const states = queryState.value;
    const hvdate = hvdateElem.value;

    if(states === undefined){
        dateNotification.style.display = "block";
        validMsg.textContent = "State is empty";
        queryState.style.border = "1px solid red";
        return false
    } else {
        dateNotification.style.display = "none";
        validMsg.textContent = "";
        queryState.style.border = "";
    }
    

    if(new Date(hvdate) < new Date(emdate)){
        dateNotification.style.display = "block";
        validMsg.textContent = "Error: harvest date is beyond emergence date";
        hvdateElem.style.border = "1px solid red";
        queryDate.style.border = "1px solid red";
        return false

    } else {
        dateNotification.style.display = "none";
        validMsg.textContent = "";
        hvdateElem.style.border = "";
        queryDate.style.border = "";
    }
    
    
    if(emdate && states && hvdate){
        fetch('/form1', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                emdate: emdate,
                hvdate: hvdate,
                states: states,
            })
        }).then((response)=>{

            if(response.ok){
                return response
            } else {
                let fetchError = new Error(response.statusText);
                fetchError.response = response;
                throw fetchError;
            }

        }).then((response)=>{

            response.json().then((data)=>{
                const geojson = {
                    type: "FeatureCollection",
                    features:[]
                }
    
    
                const dateLegend = mapLegend(emdate, hvdate); // date ISOString()
                const dateLegendFormatted = dateLegend.map(x=>x.split("T")[0]); // date range in 2019-05-01 string
    
                
                data.forEach((e)=>{
                    // create arrays that carries all dates and dsv value when dates are missing, assigned null
                    const displayDSVs = e.features.properties.DSVs;
                    const displayDates = e.features.properties.datesWithDSV;
    
                    const outputDSV = [];
                    const accumDSV = [];
                    let totalDSV = 0;

                    dateLegendFormatted.forEach((val)=>{
    
                        if(!displayDates.includes(val)){
                            outputDSV.push(null);
                            totalDSV += 0;
                            accumDSV.push(totalDSV);

                        }else{
                            // find the value
                            const ind = displayDates.findIndex(x=>{
                                return x === val; 
                            });
                            outputDSV.push(displayDSVs[ind]);
                            totalDSV += displayDSVs[ind];
                            accumDSV.push(totalDSV);
                        }
                    })

                    // remove TU90 to less the load and flat outputDSV and dateLegendFormatted
                    delete e.features.properties.TU90;
    
                    dateLegendFormatted.forEach((date, ind)=>{
                            e.features.properties[date] = outputDSV[ind];
                    });

    
                    // 2019-05-01: DSV


                    

                    e.features.properties["outputDSV"] = outputDSV; // daily DSV
                    e.features.properties["outputDates"] = dateLegendFormatted;
                    e.features.properties["accumDSV"] = accumDSV;
                    geojson['features'].push(e.features) // some dates are missing. 
    
                })
                
                // const dataResult = barGraph(geojson.features, address);
                querySlider.style.display = "block";
                loader.style.visibility = "visible";

                
                setMapLegend(dateLegendFormatted);
                mapboxSetup(geojson, dateLegendFormatted);
    
            })
        }).catch((err)=>{
            console.log(err);
        })
    }
    
    
    
})



