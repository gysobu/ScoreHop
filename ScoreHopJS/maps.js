// Set starting coordinates
var map1 = L.map('map').setView([29.7604, -95.3698], 12);


// Dont touch
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoib3NjYXI2IiwiYSI6ImNqcHc0Nm1iejAxYmozeGxzcDM3MmQ1ZmYifQ.SpDPryg7o1dzi6sgVlO0GQ',
        
}).addTo(map1);

// Blue marker. Iniate on search function.
new L.marker([29.7522, -95.3524], {bounceOnAdd: false}).bindPopup("<b>BBVA Compass Stadium</b>").openPopup().addTo(map1);

// Beer Icon styling
var beerIcon = L.icon({
    iconUrl: '../icons/beermug.svg',
    iconSize: [25, 60],
    // color: rgb(255,69,0),
    // iconAnchor: [3, 50],
    // popupAnchor: [25, 60],
    // shadowSize: [68, 95],
    // shadowAnchor: [22, 94]
});

// Hard coded brewery examples
L.marker([29.7487, -95.3560], {icon: beerIcon, bounceOnAdd: true}).bindPopup("<b>8th Wonder Brewery</b>").openPopup().addTo(map1);
L.marker([29.7492, -95.3435], {icon: beerIcon, bounceOnAdd: true}).bindPopup("<b>Sigma Brewing Company</b>").openPopup().addTo(map1);
L.marker([29.8058, -95.4608], {icon: beerIcon, bounceOnAdd: true}).bindPopup("<b>Karbach Brewing Co.</b>").openPopup().addTo(map1);
L.marker([29.7711, -95.3486], {icon: beerIcon, bounceOnAdd: true}).bindPopup("<b>Saint Arnold Brewing Company</b>").openPopup().addTo(map1);






















