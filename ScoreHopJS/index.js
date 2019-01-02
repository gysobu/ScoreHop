// Set starting coordinates
var map1 = L.map('map').setView([37.0902, -95.7129], 4);

// Dont touch
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoib3NjYXI2IiwiYSI6ImNqcHc0Nm1iejAxYmozeGxzcDM3MmQ1ZmYifQ.SpDPryg7o1dzi6sgVlO0GQ',

}).addTo(map1);

map1.locate({
    setView: true,
    maxZoom: 12
});

// Locates user 
function onLocationFound(e) {
    var radius = e.accuracy / 1;

    L.marker(e.latlng).addTo(map1)
        .bindPopup("You are here").openPopup();

    L.circle(e.latlng, radius).addTo(map1);
}

map1.on('locationfound', onLocationFound);

// Blue marker. Iniate on search function.
function venueMarker(lat, log, name) {
    L.marker([lat, log], {
        bounceOnAdd: true
    }).
    bindPopup(`<b>${name}</b>`).
    openPopup().addTo(map1);
}
// 

// Beer Icon styling
var beerIcon = L.icon({
    iconUrl: '../icons/colormug.jpg',
    iconSize: [30, 30],
    // color: rgb(255,69,0),
    iconAnchor: [15, 15],
    popupAnchor: [0, -10],
    // shadowSize: [68, 95],
    // shadowAnchor: [22, 94]
});

// Hard coded brewery examples
function addBreweryMarkers(lat, long, name) {
    L.marker([lat, long], {
        icon: beerIcon,
        bounceOnAdd: true
    }).bindPopup(`<b>${name}</b>`).openPopup().addTo(map1);
}

function openBreweryApi(city){
                ///john brewery api code
                var openBreweryDB = `https://api.openbrewerydb.org/breweries?page=1&per_page=50&by_city=${city}`;
                
                var coord = []
                // console.log(coord)
                $.get(openBreweryDB)
                    .done((result) => {
                        $.each(result, function (key, value) {

                            if (value.longitude == null) {

                                return;
                            } else {

                                var set = {}

                                // var city = value.city

                                // var state = value.state

                                // var websiteUrl = value.website_url

                                set["lat"] = value.latitude

                                set["lng"] = value.longitude

                                set["brewery"] = value.name
                                // console.log(set['brewery'])
                                coord.push(set)
                                // console.log(set)

                            };

                        });
                        coord.map(function (arr, index) {
                        addBreweryMarkers(arr['lat'], arr['lng'], arr['brewery'])

                    })
                    
                    });
                    
                    
                    
                }

// Logo Watermark
// logo position: bottomright, topright, topleft, bottomleft
L.Control.Watermark = L.Control.extend({
    onAdd: function () {
        var img = L.DomUtil.create('img');

        img.src = '../icons/logofinal.png';
        img.style.width = '200px';

        return img;
    },

    onRemove: function (map) {
        // Nothing to do here
    }
});

L.control.watermark = function (opts) {
    return new L.Control.Watermark(opts);
}

L.control.watermark({
    position: 'topleft'
}).addTo(map1);


//Search bar js 
$(function () {

    $('#button-addon2').click(function () {
        $('li').remove()
        var coordsarr = [];

        var interest = $('#event').val()
        var usercity = $("#city").val()
        var $unorder = $("#unorder-list")
        //   $.get(`https://api.seatgeek.com/2/events?client_id=MTQ0OTYyNTZ8MTU0NTI2OTM2NS4yNg`)
        $.get(`https://api.seatgeek.com/2/events?q=${interest}&client_id=MTQ0OTYyNTZ8MTU0NTI2OTM2NS4yNg`)
            .done(result => {
                // console.log(result)
                $.each(result.events, function (index, value) {
                    //    if(value.venue.city==usercity){    
                    // console.log(value.title)
                    // console.log(value.venue.name)
                    // console.log(new Date(value.datetime_utc))
                    //  console.log(new Date(value.datetime_local))
                    date = new Date(value.datetime_local)
                    // console.log(value.venue.address + " " + value.venue.extended_address)
                    // console.log(value.venue.id)
                    // console.log(`lat=` + value.venue.location.lat)
                    // console.log(`lon=` + value.venue.location.lon)
                    $unorder.append("<li><div class='card bg-info text-white'>" +
                        "<div class='card-body'>" + "<a style='color:white' id=" + value.venue.id + " href='#'>" +
                        "<p>" + value.title + "</p>" +
                        "<p>" + new Date(value.datetime_utc) + "</p>" +
                        "<p>" + value.venue.address + " " + value.venue.extended_address + "</p>" +
                        "</a></div></div><br></li>") // end of append
                    var coords = {}
                    coords['lat'] = value.venue.location.lat
                    coords['lon'] = value.venue.location.lon
                    coords['id'] = value.venue.id
                    coords['venue'] = value.venue.name
                    coords['city'] = value.venue.city
                    coordsarr.push(coords)
                    // console.log(coords)
                    // console.log(coordsarr)
                    //    }
                }) // end of each

                $("a").click(function (event) {
                    event.preventDefault()

                    // console.log(coordsarr)
                    // console.log(event)
                    //var idval=this.id
                    var idval = $(this).attr('id');

                    
                    coordsarr.map(function (arr, index) {
                        if (arr['id'] == idval) {
                            venueMarker(arr['lat'], arr['lon'], arr['venue'])
                            $('li').remove()
                            // console.log(arr['lat'])
                            // console.log(arr['lon'])
                            // console.log(arr['venue'])
                            // console.log([arr['city']])
                            openBreweryApi(arr['city'])
                        }
                        // coord.map(function (arr, index) {
                        //     addBreweryMarkers(arr['lat'], arr['lng'], arr['brewery'])
                        // })

                        map1.panTo(new L.LatLng(arr['lat'], arr['lon'], arr['venue'], 8));
                    })
                })
            }) //end of done


    }) //end of click   

}) //end of Jquery