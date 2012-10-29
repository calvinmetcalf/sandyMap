var m = new L.Map("map", {
	center: new L.LatLng(42.2, -71),
	zoom: 8,
	attributionControl: true
});
var hpath= L.geoJson().addTo(m);
var ssEx= L.geoJson('',{style:sStyle,onEachFeature: onEachFeature}).addTo(m);
var h = new L.Hash(m);
var advisory="28a";
var mq=L.tileLayer.mapQuestOpen.osm();
var osm=L.tileLayer.openStreetMap.mapnik()
m.addLayer(mq);
$.get(advisory+"/path.json", addJG);
function addJG(d){
   hpath.addData(d)
}   
$.get(advisory+"/sse.json", addss);
function addss(d){
   
 ssEx.addData(d)
}
var baseMaps = {
    "Map Quest": mq,
    "OSM": osm
};

var overlayMaps = {
    "Path": hpath,
    "Storm Surge Excedence": ssEx
};
var lc=L.control.layers(baseMaps, overlayMaps);
lc.addTo(m);
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
