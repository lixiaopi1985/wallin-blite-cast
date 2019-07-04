
export function graphSetup(DSVobj, xlabel, ylabel, ylabel2, type='scatter'){


    const timeSeries = DSVobj.DateTimes;
    const tu = DSVobj.TU;
    const ob = DSVobj.OB;
    const title = DSVobj.Description;

    let traceA = {
        x: timeSeries,
        y: tu,
        type: type,
        name: "RH"
    };

    let traceB = {
        x: timeSeries,
        y: ob,
        type: type,
        yaxis: "y2",
        name: "Temperature",
    };
    let traceC = {
        x: [timeSeries[20]],
        y: [90+0.75],
        mode:"text",
        text: "RH threshold",
        showlegend: false
    }

    
    let layout = {
        title: title,
        xaxis:{
            title:xlabel
        },
        yaxis: {
            title:ylabel
        },
        yaxis2:{
            title: ylabel2,
            side: 'right',
            overlaying: 'y'
        },
        shapes: [{
            x0: timeSeries[0],
            y0: 90,
            x1: timeSeries[timeSeries.length - 1],
            y1: 90,
            type: 'line',
            line: {
                color: 'red',
                width: 1,
                dash: 'dot'
            },
        }, {
            type: "rect",
            yref: "y2",
            x0: timeSeries[0],
            y0: 45,
            x1: timeSeries[timeSeries.length - 1],
            y1: 80,
            fillcolor: "#d3d3d3",
            opacity: 0.2,
            line:{
                width:0
            }
        }],
        legend: {
            x: 1,
            y: 1.2,
            bgcolor: '#E2E2E2'
        },
        autosize: false,
        height: 500,
        width: 800

    };

    let data = [traceA, traceB, traceC];
    let myDiv = document.getElementById('plot');
    Plotly.newPlot(myDiv, data, layout); 
};




// function getBar(startDate, endDate){

//     const traceBar = new Object();
    
//     for(let i=0;i<startDate.length;i++){

//     }

//     return shapeObj;

// }