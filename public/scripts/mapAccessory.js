// export function mapLegend(emdate) {
//     // set up array for dates to show on the legend
    
//     const dateLegend = [];
//     const emDate = new Date(emdate);
//     const emDateCopy = new Date(emDate.valueOf())
//     // const currDate = new Date('2019-05-07');
//     // Take the difference between the dates and divide by milliseconds per day.
//     // const numDays = (currDate - emDate)/(1000*60*60*24);

//     dateLegend.push(emDate);
//     // forecast for 7 days 
//     for(let i = 0; i<7; i++){
//         const newDate = new Date(emDateCopy.setDate(emDateCopy.getDate() + 1));
//         dateLegend.push(newDate);
//     }

//     const newLegend = dateLegend.map(x=>x.toISOString())
//     return newLegend;
// }


export function mapLegend(emdate, hvdate) {
    // set up array for dates to show on the legend
    
    const dateLegend = [];
    const emDate = new Date(emdate);
    const hvDate = new Date(hvdate);
    const emDateCopy = new Date(emDate.valueOf());
    // const currDate = new Date('2019-05-07');
    // Take the difference between the dates and divide by milliseconds per day.
    // const numDays = (currDate - emDate)/(1000*60*60*24);
    const dayInterval = (hvDate - emDate)/(24*60*60*1000);

    dateLegend.push(emDate);
    // forecast for 7 days 
    for(let i = 0; i< dayInterval; i++){
        const newDate = new Date(emDateCopy.setDate(emDateCopy.getDate() + 1));
        dateLegend.push(newDate);
    }

    const newLegend = dateLegend.map(x=>x.toISOString())
    return newLegend;
}


export function setMapLegend(dateStringArr) {
    
    // set min and max value in #sliderInput
    const queryTicks = document.querySelector("#tickmarks");
    const querySliderInput = document.querySelector("#sliderInput")

    querySliderInput.min = 0;
    querySliderInput.max = dateStringArr.length - 1;

    const optionTag = document.querySelector("option");
    if(optionTag){
        // clear out old input        
        while(queryTicks.hasChildNodes()){
            queryTicks.removeChild(queryTicks.firstChild)
        }
    }


    // add <option> to queryTicks
    dateStringArr.forEach((date, ind)=>{
        const optiontags = document.createElement("option");
        const dateSplit = date.split("-");

        if(ind === 0 || ind === dateStringArr.length - 1){
            optiontags.innerHTML = parseInt(dateSplit[1]) + "/" + parseInt(dateSplit[2]);
            queryTicks.appendChild(optiontags);
        } else {
            optiontags.innerHTML = '&#183';
            queryTicks.appendChild(optiontags);
        }

    })


}


