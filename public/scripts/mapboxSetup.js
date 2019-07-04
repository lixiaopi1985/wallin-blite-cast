import { graphSetup } from '/scripts/plotlySetup.js';
import { mapboxPopup } from '/scripts/mapboxPopup.js';
import { buildTable } from '/scripts/buildTable.js';
import { estiMate } from '/scripts/interpolateGrid.js';
import { buildTableGrid } from '/scripts/buildTableGrid.js' 

export function mapboxSetup (jsondata, newLegend) {

    // generate class rightPlot, id plot


    const querySliderInput = document.querySelector("#sliderInput");
    querySliderInput.value = 0; // set to 0
    const querySelectMode = document.querySelector(".modeForm");
    const loader = document.querySelector('.loader');

    mapboxgl.accessToken = 'pk.eyJ1IjoieHBpbmdsaSIsImEiOiJjanRoZ2hubnYwcGZvNDlwanY3MDNtaTV0In0.tV1awL0ijm1xgsiwq0d5QA'


    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center:[-119.292641, 45.845543], // starting position hermiston
        zoom:5
    });


    // initial grid
    // get all interpolation data

    // featureCollection -> grid -> date: []

    let hexObj = new Object();
    let accumArr = [];

    newLegend.forEach((eachdate, bigIndex)=>{

        let hex = estiMate(jsondata, eachdate);
        // hex is an object (FeatureCollection) contains features in an array
        // each element in that array is an json object
        // date: daily dsv (not accumulative);
        let featureArray = hex.features;

        featureArray.forEach((each, ind)=>{

            const dsv = each.properties[eachdate];

            if(bigIndex === 0){
                accumArr.push(dsv);
                each.properties['accumVal'] = dsv;
            } else {
                const preVal = accumArr[ind];
                const accum = preVal + dsv;
                each.properties['accumVal'] = accum;
                accumArr[ind] = accum;
            }

            each.properties['gridIndex'] = ind;
        })
        // attach estimate value to each date
        hexObj[eachdate]=hex;

    })


    
    
    // let hexgrid = estiMate(jsondata, newLegend[0]);
    let queryInitial = querySliderInput.value;
    let initialDate = newLegend[queryInitial];
    let circleFilter = ["number", ["at", 0, ["get", "accumDSV"]]]; // for circles

    
    
    let fillColor = ()=>{
        return [
        "interpolate",
        ["linear"],
        ["number", ["get", "accumVal"]],
        0, '#3498db',
        4, '#3498db',
        5, '#2ecc71',
        10, '#2ecc71',
        11, '#f39c12',
        15, '#f39c12',
        16, '#e74c3c',
        20, '#e74c3c',
        21, '#c0392b',
        100, '#c0392b'  
        ]
    }


    map.on('load', function(){

        // reset slider to 0 every time and mode selection
        querySliderInput.value = 0;
        querySelectMode.mode.value = "0";
        // hide loader
        loader.style.visibility = "hidden";

        // add hex data (for each date)
        map.addSource('hexSource', {
            type: 'geojson',
            data: hexObj[initialDate],
        });

        map.addLayer({
            id: "hexLayer",
            type: 'fill',
            source: 'hexSource',
            layout:{
                "visibility": "visible"
            },
            paint: {
                "fill-color": fillColor(),
                "fill-opacity": 0.6
            }
        });


        
        map.addSource('sites', {
            type: 'geojson',
            data: jsondata
        })

        
        // site map
        map.addLayer({
            id: "siteMap",
            type: "circle",
            source: "sites",
            layout:{
                "visibility": "none"
            },
            paint: {
                "circle-radius":8,
                'circle-color':[
                    'interpolate',
                    ['linear'],
                    circleFilter,
                    0, '#3498db',
                    4, '#3498db',
                    5, '#2ecc71',
                    10, '#2ecc71',
                    11, '#f39c12',
                    15, '#f39c12',
                    16, '#e74c3c',
                    20, '#e74c3c',
                    21, '#c0392b',
                    100, '#c0392b'  

                ],
                'circle-opacity': 0.6
            }
        });

        querySelectMode.addEventListener('change', function(e){
            const modeNumber = e.target.value;
            const parent = document.querySelector('.mapboxgl-map');
            const child = document.querySelector('.mapboxgl-popup');
            const selectVal =  document.querySelector("#sliderInput").value;


            
            if(child){
                parent.removeChild(child);
            }

            // hexLayer
            if(modeNumber === "0"){
                map.setLayoutProperty("hexLayer", "visibility", "visible");
                map.setLayoutProperty("siteMap", "visibility", "none");

                let dateSelected_m = newLegend[selectVal];
                map.getSource('hexSource').setData(hexObj[dateSelected_m]); 



            // sites
            } else if (modeNumber === "1"){
                map.setLayoutProperty("hexLayer", "visibility", "none");
                map.setLayoutProperty("siteMap", "visibility", "visible");


                circleFilter = ["number", ["at", parseInt(selectVal), ["get", "accumDSV"]]];

                let new_colorValue = [
                    'interpolate',
                    ['linear'],
                    circleFilter,
                    0, '#3498db',
                    4, '#3498db',
                    5, '#2ecc71',
                    10, '#2ecc71',
                    11, '#f39c12',
                    15, '#f39c12',
                    16, '#e74c3c',
                    20, '#e74c3c',
                    21, '#c0392b',
                    100, '#c0392b'  
    
                ];

                map.setPaintProperty('siteMap', 'circle-color', new_colorValue); 
            }
        });

        

        querySliderInput.addEventListener('input', function(e){


            // grid or sites?
            // remove popup div .mapbox-gl-popup
            const parent = document.querySelector('.mapboxgl-map');
            const child = document.querySelector('.mapboxgl-popup');

            if(child){
                parent.removeChild(child);
            }
            
            const select = e.target.value;
            let modeSelected = document.querySelector('input[name=mode]:checked').value;

            if(modeSelected === "0"){
                // hexgrid

                let dateSelected = newLegend[select];
                // hexgrid = estiMate(jsondata, dateSelected);
                map.getSource('hexSource').setData(hexObj[dateSelected]);                
                // map.setPaintProperty('hexLayer', 'fill-color', fillColor());

            } else if(modeSelected === "1") {
                // site layer

                circleFilter = ["number", ["at", parseInt(select), ["get", "accumDSV"]]];

                let colorValue = [
                    'interpolate',
                    ['linear'],
                    circleFilter,
                    0, '#3498db',
                    4, '#3498db',
                    5, '#2ecc71',
                    10, '#2ecc71',
                    11, '#f39c12',
                    15, '#f39c12',
                    16, '#e74c3c',
                    20, '#e74c3c',
                    21, '#c0392b',
                    100, '#c0392b'  
    
                ];
    
                map.setPaintProperty('siteMap', 'circle-color', colorValue);   
                

            }
        });

        // mouse shape
        map.on('mouseenter', 'hexLayer', function(e){
            map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseenter', 'siteMap', function(e){
            map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', 'hexLayer', function(e){
            map.getCanvas().style.cursor = '';
        });
        map.on('mouseleave', 'siteMap', function(e){
            map.getCanvas().style.cursor = '';
        });

        // click and popup 
        var popup = new mapboxgl.Popup({anchor: 'top'});

        map.on('click', 'hexLayer', function(e){

    
            let features = map.queryRenderedFeatures(e.point);
            let coordinates = [e.lngLat.lng, e.lngLat.lat];
            // get grid index
            let gridIndex = features[0].properties.gridIndex;
                        
            // get date array
            let currentDateSlice = newLegend.slice(0, parseInt(querySliderInput.value)+1);
            let DSVobj = new Object()
            let DSV = [];
            let DSVaccum = [];

            for(let i=0;i<currentDateSlice.length;i++){
                // get DSV value from each date selected and each grid feature
                // !!! dsv: accumulated dsv values 
                const dsv = hexObj[currentDateSlice[i]].features[gridIndex].properties[currentDateSlice[i]];
                const accumscore =   hexObj[currentDateSlice[i]].features[gridIndex].properties["accumVal"];
                DSV.push(dsv);
                DSVaccum.push(accumscore);
            }
            
            DSVobj['Dates'] = currentDateSlice;
            DSVobj['accumDSV'] = DSVaccum;
            DSVobj['DSV'] = DSV;
            DSVobj['total'] = DSVaccum[DSVaccum.length - 1];
            DSVobj['lng'] = coordinates[0];
            DSVobj['lat'] = coordinates[1];
    
            

            let displayArea = document.querySelector(".displayArea");
            let popArea = document.querySelector(".vis");
            let tableWrapper = document.querySelector(".tableWrapper2");
            let tableDiv = document.querySelector("#mytable2");


        
            if(!popArea){
                
                popArea = document.createElement("div");
                popArea.className = "vis";
                tableWrapper = document.createElement("div");
                tableWrapper.className = "tableWrapper2";
                popArea.appendChild(tableWrapper);
                displayArea.appendChild(popArea);
                

            } else {
                // remove old table
                if(tableDiv){
                    tableWrapper.removeChild(tableDiv);
                }

            }

            buildTableGrid(tableWrapper, DSVobj);
            mapboxPopup(popup, coordinates, map, popArea, '500px');            
        })


        map.on('click', 'siteMap', function(e){

            
            let features = map.queryRenderedFeatures(e.point);
            let jsonObj = features[0];                
            let coordinates = [e.lngLat.lng, e.lngLat.lat];

                    
            // recreating data structure for each site so that it shows for each date selected
            // let dateSelected = newLegend[parseInt(querySliderInput.value)];
            let dateRange = newLegend.slice(0, parseInt(querySliderInput.value)+1);
            let DSVobj = new Object();
            let dailyDSV = [];
            let DSVaccum = [];            
            let datetimeArr = JSON.parse(jsonObj.properties.DateTimes);// array of string of ISO date time format
            let datetimeArr2 = [];
            let obArr = JSON.parse(jsonObj.properties.OB);
            let tuArr = JSON.parse(jsonObj.properties.TU);
            let firstIndex;

            datetimeArr.forEach((e)=>{
                let date = e.split("T")[0];
                datetimeArr2.push(date)
            })
            
            let missingDateInd_before;
            dateRange.forEach((e, ind)=>{
                if(!datetimeArr2.includes(e)){
                    missingDateInd_before = ind - 1;
                    return missingDateInd_before;
                }
            })


            
            if(missingDateInd_before !== undefined){
                let missingVal = dateRange[missingDateInd_before];
                firstIndex = datetimeArr2.lastIndexOf(missingVal);
            } else {
                
                firstIndex = datetimeArr2.lastIndexOf(dateRange[dateRange.length - 1]);
            }

            let newDateTimeArr = datetimeArr.slice(0, firstIndex+1);              
            let OB = obArr.slice(0, firstIndex+1);
            let TU = tuArr.slice(0, firstIndex+1);

            let total = 0;
            dateRange.forEach((val, ind)=>{

                const daily_dsv = jsonObj.properties[val]
                
                if(daily_dsv !== "null"){
                    dailyDSV.push(daily_dsv);
                    total += daily_dsv;
                    DSVaccum.push( total );
                } else {
                    dailyDSV.push(0);
                    total += 0;
                    DSVaccum.push( total );
                }
                

            })


            DSVobj['Dates'] = dateRange;
            DSVobj['DSV'] = dailyDSV;
            DSVobj['accumDSV'] = DSVaccum;
            DSVobj['total'] = DSVaccum[DSVaccum.length - 1];
            DSVobj['lng'] = coordinates[0];
            DSVobj['lat'] = coordinates[1];
            DSVobj['DateTimes'] = newDateTimeArr;
            DSVobj['OB'] = OB;
            DSVobj['TU'] = TU;
            DSVobj['Description'] = jsonObj.properties.Description;

            // for popup
            // parent
            let displayArea = document.querySelector(".displayArea");
            let popArea = document.querySelector(".vis");
            let plotDiv  = document.createElement("div");
            let tableWrapper = document.querySelector(".tableWrapper");
            let tableDiv = document.querySelector("#mytable");
                        
            if(!popArea){
                
                popArea = document.createElement("div");
                popArea.className = "vis";
                tableWrapper = document.createElement("div");
                tableWrapper.className = "tableWrapper";
                popArea.appendChild(tableWrapper);
                plotDiv.className = "rightPlot";
                plotDiv.id = "plot";
                popArea.appendChild(plotDiv);
                displayArea.appendChild(popArea);

            } else {
                // remove old table
                if(tableDiv){
                    tableWrapper.removeChild(tableDiv);
                }
            }
            
            if("TU" in jsonObj.properties){
                
                // const tuVals = JSON.parse(features[0].properties.TU);
                // const dateTimes = JSON.parse(features[0].properties.DateTimes);
                // const obVals = JSON.parse(features[0].properties.OB)
                // generate plot div
                buildTable(tableWrapper, DSVobj);
                graphSetup(DSVobj, "DateTime", "Relative Humidity", "Temperature(F)");
                mapboxPopup(popup, coordinates, map, popArea);

            } else {
                popup.setLngLat(coordinates);
                popup.setHTML('<p>Data is not available</p>');
                popup.addTo(map);
            }
        })

    })

}