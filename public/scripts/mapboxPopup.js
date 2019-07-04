export function mapboxPopup(popup, lngLat, map, popArea, maxW = '1100px'){
    popup.setLngLat(lngLat);
    popup.setDOMContent(popArea);
    popup.setMaxWidth(maxW);
    popup.addTo(map);
}



