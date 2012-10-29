var m = new L.Map("map", {
	center: new L.LatLng(42.2, -71),
	zoom: 8,
	attributionControl: true
});
var h = new L.Hash(m);
var points;
m.addLayer(L.tileLayer.mapQuestOpen.osm());
$.get("path.json", addJG);
function addJG(d){
    L.geoJson(d).addTo(m);
}   
$.get("ss.json", addss);
function addss(d){
    L.geoJson(d,{style:sStyle,onEachFeature: onEachFeature}).addTo(m);
}
function sStyle(feature) {
	styleOpt = {stroke:false,fillOpacity:0.8}
    if(feature.properties.TCSRG9010&&feature.properties.TCSRG9010<1) {
		styleOpt.fillColor="#00f"
	}else if (feature.properties.TCSRG9010&&feature.properties.TCSRG9010<1.7) {
		styleOpt.fillColor="#0f0"
	}else if (feature.properties.TCSRG9010&&feature.properties.TCSRG9010<2.5) {
		styleOpt.fillColor="#ff0"
	}else if (feature.properties.TCSRG9010&&feature.properties.TCSRG9010<3.3) {
		styleOpt.fillColor="#f80"
	}else{
		styleOpt.fillColor="#f00"
	}
	return styleOpt;
}
function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.TCSRG9010) {
        layer.bindPopup("10% Chance of storm surge being exceding:"+feature.properties.TCSRG9010+"ft");
    }
}
