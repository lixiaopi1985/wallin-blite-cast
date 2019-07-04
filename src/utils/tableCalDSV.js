
function assignScore(avgTemp, hourCount, version="simple"){

    let score;

    if(version == "simple"){
        if(avgTemp < 45){
            score = 0;
        } else if(avgTemp <= 53 && avgTemp >= 45){
            if(hourCount <= 15){
                score = 0;
            } else if (hourCount <= 18 && hourCount > 15){
                score = 1;
            }else if (hourCount <= 21 && hourCount > 18){
                score = 2;
            }else if (hourCount <= 24 && hourCount > 21){
                score = 3;
            }else if (hourCount > 24){
                score = 4
            } else {
                score = -4 + Math.round((hourCount - 1)/3);
            }
        } else if(avgTemp <= 59 && avgTemp > 53){
            if(hourCount <= 12){
                score = 0;
            } else if (hourCount <= 15 && hourCount > 13){
                score = 1;
            }else if (hourCount <= 18 && hourCount > 15){
                score = 2;
            }else if (hourCount <= 21 && hourCount > 18){
                score = 3;
            }else if(hourCount > 21){
                score = 4
            }else {
                score = -3 + Math.round((hourCount - 1)/3);
            }
        } else if(avgTemp <= 80 && avgTemp > 59){
            if(hourCount <= 9){
                score = 0;
            } else if (hourCount <= 12 && hourCount > 9){
                score = 1;
            }else if (hourCount <= 15 && hourCount > 12){
                score = 2;
            }else if (hourCount <= 18 && hourCount > 15){
                score = 3;
            }else if (hourCount > 18){
                score = 4
            }else {
                score = -2 + Math.round((hourCount - 1)/3);
            }}
    } else if (version == "original"){
        if(avgTemp < 45){
            score = 0;
        } else if(avgTemp <= 53 && avgTemp >= 45){
            if(hourCount <= 15){
                score = 0;
            } else if (hourCount <= 18 && hourCount > 15){
                score = 1;
            }else if (hourCount <= 21 && hourCount > 18){
                score = 2;
            }else if (hourCount <= 24 && hourCount > 21){
                score = 3;
            }else if (hourCount <= 27 && hourCount > 24){
                score = 4;
            } else if (hourCount <= 30 && hourCount > 27){
                score = 5;
            }else if (hourCount <= 33 && hourCount > 30){
                score = 6;
            }else {
                score = -4 + Math.round((hourCount - 1)/3);
            }
        } else if(avgTemp <= 59 && avgTemp > 53){
            if(hourCount <= 12){
                score = 0;
            } else if (hourCount <= 15 && hourCount > 12){
                score = 1;
            }else if (hourCount <= 18 && hourCount > 15){
                score = 2;
            }else if (hourCount <= 21 && hourCount > 18){
                score = 3;
            }else if (hourCount <= 24 && hourCount > 21){
                score = 4;
            }else if (hourCount <= 27 && hourCount > 24){
                score = 5;
            } else if (hourCount <= 30 && hourCount > 27){
                score = 6;
            }else {
                score = -3 + Math.round((hourCount - 1)/3);
            }
        } else if(avgTemp <= 80 && avgTemp > 59){
            if(hourCount <= 9){
                score = 0;
            } else if (hourCount <= 12 && hourCount > 9){
                score = 1;
            }else if (hourCount <= 15 && hourCount > 12){
                score = 2;
            }else if (hourCount <= 18 && hourCount > 15){
                score = 3;
            }else if (hourCount <= 21 && hourCount > 18){
                score = 4;
            }else if (hourCount <= 24 && hourCount > 21){
                score = 5;
            }else if (hourCount <= 27 && hourCount > 24){
                score = 6;
            }else {
                score = -2 + Math.round((hourCount - 1)/3);
            }
        }
    }


    return score;
}



function calDSV(selectedDates, periods){

    let { periodStarts, periodEnds } = periods;

    let dailyDSV = new Object();

    

    // slice out periods
    for(let i=0;i<periodStarts.length;i++){


        let newSlice = selectedDates.slice(periodStarts[i], periodEnds[i]+1)

        // calculate periodDSV for each period
        
        let OB = newSlice.map((val)=>parseFloat(val.OB));
        let avgTemp = OB.reduce((a, b)=>a+b)/(OB.length);
        let score = assignScore(avgTemp, newSlice.length);
        let datePrint = selectedDates[periodStarts[i]].Date.split("T")[0];

        dailyDSV[datePrint] = ( dailyDSV[datePrint] || 0 ) + score;

        
    }

    

    // aggregate periods to date


    return dailyDSV;

}


module.exports = calDSV;