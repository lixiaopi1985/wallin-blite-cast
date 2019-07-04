


function getPeriods(arr){

    
    // console.log("In getPeriods");
    
    const arrLen = arr.length;
    let interruptionStarts_all = [];
    let interruptionStarts = [];
    let interruptionEnds = [];

    // get interruptons
    for(let i=0;i<arrLen;i++){

        let start = i;
        let end = start + 1;
        let firstEle = arr[start];
        let secEle = arr[end];

        if( !firstEle && !secEle){

            // false true case
            let thirdEle = arr[end+1];
            
            // false false false false case
            if( (start - interruptionStarts_all[interruptionStarts_all.length - 1] !== 1) && (start !== arrLen - 1)){
                interruptionStarts.push(start)
            }

            // false true case and false at the end
            if(thirdEle || ( end === arrLen - 1) ){
                interruptionEnds.push(end);
                i ++;                
            }

            interruptionStarts_all.push(start)
        }
    }

    let periodStarts = [];
    let periodEnds =[];


    if(interruptionStarts.length !== interruptionEnds.length){
        throw new Error('Interruption lengths are not equal for start and end!')
    }
    const interLen = interruptionStarts.length;

    // case one interLen === 1 (two cases: take over all array or just a part)
    // case two interLen === 0
    // case three interLen > 1

    if(interLen === 0){
        // one case
        periodStarts.push(0);
        periodEnds.push(arrLen - 1);

    } else if (interLen === 1){
        // two more cases
        // 1: beginning of the arry
        if(interruptionStarts[0] === 0 && interruptionEnds[0] < arrLen - 1){
            periodStarts.push(interruptionEnds[0] + 1);
            periodEnds.push(arrLen - 1);
        } else if(interruptionStarts[0] === 0 && interruptionEnds[0] === arrLen - 1){
            // no period but interruptions
            periodStarts.push(undefined);
            periodEnds.push(undefined);
        } else if (interruptionStarts[0] > 0 && interruptionEnds[0] === arrLen - 1){
            periodStarts.push(0);
            periodEnds.push(interruptionStarts[0] - 1);
        } else {
            // two period ----> [ , , [interruption], , ]
            periodStarts.push(0);
            periodStarts.push(interruptionEnds[0] + 1);
            periodEnds.push(interruptionStarts[0] - 1);
            periodEnds.push(arrLen - 1);
        }
    } else {
        for(let i=0;i< interLen; i++){

            
            if( i === 0 && interruptionStarts[0] === 0){
                
                if(!periodStarts.includes(interruptionEnds[0] + 1 ) && !periodEnds.includes(interruptionStarts[i+1] - 1)){
                    periodStarts.push(interruptionEnds[0] + 1 );
                    periodEnds.push(interruptionStarts[i+1] - 1);
                }

            } else if (i === 0 && interruptionStarts[0] !== 0){

                if(!periodStarts.includes( 0 ) && !periodEnds.includes(interruptionStarts[0] - 1)){
                    periodStarts.push(0);
                    periodStarts.push(interruptionEnds[i] + 1);
                    periodEnds.push(interruptionStarts[0] - 1);
                    periodEnds.push(interruptionStarts[i+1] -1 );
                }

            } else if ( i === interLen - 1 && interruptionEnds[interLen-1] === arrLen - 1  ){


                if(!periodStarts.includes( interruptionEnds[i - 1] + 1 ) && !periodEnds.includes(interruptionStarts[i] - 1)){
                    periodStarts.push(interruptionEnds[i - 1] + 1);
                    periodEnds.push(interruptionStarts[i] - 1);
                }

            } else if ( i === interLen - 1 && interruptionEnds[interLen-1] < arrLen - 1){

                if( !periodStarts.includes( interruptionEnds[i] + 1) && !periodEnds.includes(arrLen - 1)){
                    // periodStarts.push(interruptionEnds[i - 1]+1);
                    periodStarts.push(interruptionEnds[i] + 1);
                    // periodEnds.push(interruptionStarts[i] - 1);
                    periodEnds.push(arrLen - 1);
                }

            } else {

                
                if(!periodStarts.includes(interruptionEnds[i] + 1) && !periodEnds.includes(interruptionStarts[i+1] - 1)){
                    periodStarts.push(interruptionEnds[i] + 1);
                    periodEnds.push(interruptionStarts[i+1] - 1);
                }
            } 
        }
    }


    return {
        periodStarts: periodStarts,
        periodEnds: periodEnds
    }

}


module.exports = getPeriods;