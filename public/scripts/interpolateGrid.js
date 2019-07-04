export function estiMate(featureCollection, dateSelect, exponent=2, cellSize=10) {

    var options = {gridType: "square", property: dateSelect, units: "miles", weight:exponent};
    var grid = turf.interpolate(featureCollection, cellSize, options);
    return grid; // feature collection
}

