export function buildTable(parentDiv, DSVobj){

    // dsvDates
    const dsvDates = DSVobj.Dates;
    const dsvVals = DSVobj.DSV;
    const accumVals = DSVobj.accumDSV;
    const total = DSVobj.total;
    const lng = DSVobj.lng;
    const lat = DSVobj.lat;
    let tableDiv = document.querySelector("#mytable");


    if(!tableDiv){
        tableDiv = document.createElement("table");
        tableDiv.id = "mytable";
        parentDiv.appendChild(tableDiv);
    }

    
    // create header
    const thead = document.createElement('thead');
    const trHeader =  document.createElement('tr');
    trHeader.appendChild(document.createElement('th'));
    trHeader.appendChild(document.createElement('th'));
    trHeader.appendChild(document.createElement('th'));
    trHeader.cells[0].appendChild(document.createTextNode("Date"));
    trHeader.cells[1].appendChild(document.createTextNode("Daily SV"));
    trHeader.cells[2].appendChild(document.createTextNode("Accum DSV"));
    thead.appendChild(trHeader);


    const tb = document.createElement('tbody');

    for(let i=0;i<dsvDates.length;i++){
        var tr = document.createElement('tr');
        tr.appendChild(document.createElement('td'));
        tr.appendChild(document.createElement('td'));
        tr.appendChild(document.createElement('td'));

        tr.cells[0].appendChild(document.createTextNode(dsvDates[i]));
        tr.cells[1].appendChild(document.createTextNode(dsvVals[i]));
        tr.cells[2].appendChild(document.createTextNode(accumVals[i]));

        tb.appendChild(tr)

    }
    
    const tfoot = document.createElement('tfoot');
    const tfoot_tr = document.createElement('tr');
    const tfoot_lng = document.createElement('tr');
    const tfoot_lat = document.createElement('tr');
    tfoot_tr.appendChild(document.createElement('td'));
    tfoot_tr.appendChild(document.createElement('td'));
    tfoot_tr.appendChild(document.createElement('td'));
    tfoot_tr.cells[0].appendChild(document.createTextNode("Total"));
    tfoot_tr.cells[2].appendChild(document.createTextNode(total));
    if(total > 20){
        tfoot_tr.cells[2].style.backgroundColor = '#c0392b';
    } else if(total > 15 && total <= 20){
        tfoot_tr.cells[2].style.backgroundColor  = '#e74c3c';
    } else if(total > 10 && total <= 15){
        tfoot_tr.cells[2].style.backgroundColor  = '#f39c12';
    } else if(total > 4 && total <= 10){
        tfoot_tr.cells[2].style.backgroundColor  = '#2ecc71';
    } else {
        tfoot_tr.cells[2].style.backgroundColor  = '#3498db';
    }


    tfoot_lng.appendChild(document.createElement('td'));
    let lngSpan = tfoot_lng.appendChild(document.createElement('td'));
    lngSpan.colSpan = 2;
    tfoot_lat.appendChild(document.createElement('td'));
    let latSpan = tfoot_lat.appendChild(document.createElement('td'));
    latSpan.colSpan = 2;
    tfoot_lng.cells[0].appendChild(document.createTextNode("Lon"));
    tfoot_lng.cells[1].appendChild(document.createTextNode(lng));
    tfoot_lat.cells[0].appendChild(document.createTextNode("Lat"));
    tfoot_lat.cells[1].appendChild(document.createTextNode(lat));


    tfoot.appendChild(tfoot_tr);
    tfoot.appendChild(tfoot_lng);
    tfoot.appendChild(tfoot_lat);
    tableDiv.appendChild(thead);
    tableDiv.appendChild(tb);
    tableDiv.appendChild(tfoot);
    parentDiv.appendChild(tableDiv);

}