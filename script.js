var m= L.map('map').setView([42.2, -71], 8);
new L.Hash(m);
var mapQuestAttr = 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; ';
var osmDataAttr = 'Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
var opt = {
    url: 'http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.jpeg',
    urla: 'http://oatile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpeg',
    options: {attribution:mapQuestAttr + osmDataAttr, subdomains:'1234'}
  };
var mq=L.tileLayer(opt.url,opt.options);
var mqa=L.tileLayer(opt.urla,opt.options);
mq.addTo(m);
function mt(date){
var sandy=L.tileLayer("http://storms.ngs.noaa.gov/storms/sandy/imagery/"+date+"/tilefilter.php?z={z}&x={x}&&y={y}.png",{opacity:1,attribution:"Satalite photos from <a href='http://storms.ngs.noaa.gov/storms/sandy/'>NOAA</a>"})
    sandy.addTo(m);
    return sandy;
};
 var a= mt("3052012flt1");
 var e= mt("3052012flt2");
 var f= mt("3052012flt3");
  var b =mt("3062012flt1");
 var c = mt("3062012flt4");
 var d=mt("3062012flt2");
  var baseMaps = {
    "Map Quest": mq,
    "Map Quest Open Aerials":mqa
  
};

var overlayMaps = {
"October 31 flight 1":a,
"October 31 flight 2":e,
"October 31 flight 3":f,
"November 1 flight 1":b,
"November 1 flight 2":d,
"November 1 flight 4":c
};
var lc=L.control.layers(baseMaps, overlayMaps);
lc.addTo(m);