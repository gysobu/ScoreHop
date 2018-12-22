// mapboxgl.accessToken = 'pk.eyJ1Ijoib3NjYXI2IiwiYSI6ImNqcHc0Nm1iejAxYmozeGxzcDM3MmQ1ZmYifQ.SpDPryg7o1dzi6sgVlO0GQ';
// var map = new mapboxgl.Map({
//     container: 'searchbox',
//     style: 'mapbox://styles/mapbox/light-v9',
//     center: [-79.4512, 43.6568],
//     zoom: 13
// });

// map.addControl(new MapboxGeocoder({
//     accessToken: mapboxgl.accessToken
// }));

// Set starting coordinates
// var map1 = L.map('map').setView([29.7604, -95.3698], 12);

// Dont touch
// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox.streets',
//     accessToken: 'pk.eyJ1Ijoib3NjYXI2IiwiYSI6ImNqcHc0Nm1iejAxYmozeGxzcDM3MmQ1ZmYifQ.SpDPryg7o1dzi6sgVlO0GQ',
        
// }).addTo(map1);

// Blue marker. Iniate on search function.
// L.marker([29.7522, -95.3524], {bounceOnAdd: false}).bindPopup("<b>BBVA Compass Stadium</b>").openPopup().addTo(map1);

// Beer Icon styling
// var beerIcon = L.icon({
//     iconUrl: '../icons/beermug.svg',
//     iconSize: [25, 60],
    // color: rgb(255,69,0),
    // iconAnchor: [3, 50],
    // popupAnchor: [0, -10]
    // shadowSize: [68, 95],
    // shadowAnchor: [22, 94]
// });

// Hard coded brewery examples
// L.marker([29.7487, -95.3560], {icon: beerIcon, bounceOnAdd: true}).bindPopup("<b>8th Wonder Brewery</b>").openPopup().addTo(map1);
// L.marker([29.7492, -95.3435], {icon: beerIcon, bounceOnAdd: true}).bindPopup("<b>Sigma Brewing Company</b>").openPopup().addTo(map1);
// L.marker([29.8058, -95.4608], {icon: beerIcon, bounceOnAdd: true}).bindPopup("<b>Karbach Brewing Co.</b>").openPopup().addTo(map1);
// L.marker([29.7711, -95.3486], {icon: beerIcon, bounceOnAdd: true}).bindPopup("<b>Saint Arnold Brewing Company</b>").openPopup().addTo(map1);














// USE CODE BELOW TO CONTINUE UPDATING. FEEL FREE TO REMOVE CODE ABOVE ONCE YOU HAVE MADE THE CHANGES NEEDED.

mapboxgl.accessToken = 'pk.eyJ1Ijoib3NjYXI2IiwiYSI6ImNqcHc0Nm1iejAxYmozeGxzcDM3MmQ1ZmYifQ.SpDPryg7o1dzi6sgVlO0GQ'; // replace this with your access token

// Coordinates longitude - latitude
var geojson = {
    type: 'FeatureCollection',
    features: [{
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [-95.3560, 29.7487]
        },
        properties: {
            title: '8th Wonder Brewery',
            // description: 'Near you',
            "iconSize": [25, 25]
        }
    },
    {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [-95.3435, 29.7492]
        },
        properties: {
            title: 'Sigma Brewing Company',
            // description: 'Near you',
            "iconSize": [25, 25]
        }
    },
    {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [-95.4608, 29.8058]
        },
        properties: {
            title: 'Karbach Brewing Co.',
            // description: 'Near you',
            "iconSize": [25, 25]
        }
    },
    {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [-95.3486, 29.7711]
        },
        properties: {
            title: 'Saint Arnold Brewing Company',
            // description: 'Near you',
            "iconSize": [25, 25]
        }
    }]
};

// Start Location
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [-95.3698, 29.7604],
    zoom: 11
});

map.addControl(new mapboxgl.NavigationControl());

var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
});

document.getElementById('geocoder').appendChild(geocoder.onAdd(map))

var popup = new mapboxgl.Popup({ offset: 38 })
    .setText('Houston, Texas');
    

var marker = new mapboxgl.Marker({color:'red'})
    .setLngLat([-95.3698, 29.7604])
    .setPopup(popup)
    .addTo(map);




geojson.features.forEach(function(marker) {
    // create a DOM element for the marker
    var popup = new mapboxgl.Popup({offset: 10})
    .setHTML('<b>' + marker.properties.title + '</b>');

    var beer = document.createElement('div');
    beer.className = 'beerIcon';
    beer.style.backgroundImage = 'url(../icons/beermug.svg)' + marker.properties.iconSize;
    beer.style.width = marker.properties.iconSize[0] + 'px';
    beer.style.height = marker.properties.iconSize[1] + 'px';

    // beer.addEventListener('click', function() {
    //     window.alert(marker.properties.message);
    // });

    // add marker to map
    new mapboxgl.Marker(beer)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(popup)
        .addTo(map);
});





