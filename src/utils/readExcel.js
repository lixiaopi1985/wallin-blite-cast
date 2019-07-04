const XLSX = require('xlsx');
const getPeriods = require("./tableGetPeriods");
const calDSV = require("./tableCalDSV");
const moment = require("moment");

function convertFile(filepath, emdate, cutoff){

    const wk = XLSX.readFile(filepath, {type: "string", raw:true});
    const sheetNames = wk.SheetNames;
    const sheet = wk.Sheets[sheetNames[0]]

    let outJ = XLSX.utils.sheet_to_json(sheet, {dateNF: "YYYY-MM-DD'T'hh:mm:ss"});
    let selectedDates = outJ.filter((val)=>moment().format(val.Date)>=moment().format(emdate));
    let indexTU90 = []

    if(selectedDates.length === 0){
        throw new Error("No matching date found in the file")
    }
    
    
    selectedDates.forEach((val, ind)=>{
        if(parseFloat(val.TU) >= cutoff){
            indexTU90.push(true);
        } else {
            indexTU90.push(false);
        }
    })
    
    let periods = getPeriods(indexTU90);
    let dsv = calDSV(selectedDates, periods);


    // get accumulate value and assign it into dsv Object
    
    let output = [];
    // get distinct values
    let dateStr = selectedDates.map((x)=>x.Date.split("T")[0]);
    let distinctDates = [...new Set(dateStr)];
    let dsvKeys = Object.keys(dsv);


    let accumDSV = 0;

    // daily value and accumulated value
    distinctDates.forEach((x)=>{

        let dailyDSV = 0;
        
        if(dsvKeys.includes(x)){
            
            dailyDSV = dsv[x];
            accumDSV += dsv[x];

        } else {
            dailyDSV = 0;
            accumDSV += 0;
        }
        
        output.push({

                "Dates":x,
                "dailyDSV": dailyDSV,
                "accumDSV": accumDSV
            })
        
    })




    return output
    
}


module.exports = convertFile;