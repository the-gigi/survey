console.log("map.js here");

function createMap(mapOptions, eventHandlers)
{
    var defaults = {
        zoom: 6,
        lat: 36.6,    // California Latitude
        lng: -120.1,  // California Longitude
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scaleControl: true
    };

    for (var key in defaults)
    {
        if (!(key in mapOptions))
        {
            mapOptions[key] = defaults[key];
        }
    }

    mapOptions['center'] = new google.maps.LatLng(mapOptions['lat'], mapOptions['lng']);

    console.log(mapOptions['center']);
    //geocoder = new google.maps.Geocoder();
    var map_canvas = $('#map-canvas')[0];
    var map = new google.maps.Map(map_canvas, mapOptions);

    // Bind event handlers
    if (eventHandlers === undefined){
        eventHandlers = {};
    }

    for (var key in eventHandlers) {
        if (eventHandlers.hasOwnProperty(key)) {
            google.maps.event.addListener(map, key, eventHandlers[key]);
        }
    }
    return map;
}

function placeMarker(map, lat, lng, title, icon)
{
    console.log('placeMarker @ ' + lat + ', ' + lng);
    // Adding a marker to the map
    var params = {
        position: new google.maps.LatLng(lat, lng),
        map: map
    };

    if (title !== undefined) {
        params['title'] = title;
    }

    if (icon !== undefined) {
        params['icon'] = icon;
    }

    var marker = new google.maps.Marker(params);

    return marker;
}

$(document).ready(function()
{
    console.log("Document ready. Calling createMap()");
    var lasVegas = {'lat': 36.10, 'lng': -115.08};
    var eventHandlers = {
//      click: function(event) {
//        placeMarker(this, event.latLng.lat(), event.latLng.lng());
//      }
    };
    var map = createMap(lasVegas, eventHandlers);
    placeMarker(
        map,
        lasVegas.lat,
        lasVegas.lng,
        'Yeah, it works!',
        'http://gmaps-samples.googlecode.com/svn/trunk/markers/blue/blank.png');

    // When place-marker button is clicked make map place marker when it's clicked
    $('#place-marker-button').click(function() {
        $('#place-marker-button').attr("disabled", true);
        var draggableCursor = map.get('draggableCursor');
        map.setOptions({draggable: false});
        map.setOptions({draggableCursor: 'pointer'});
        google.maps.event.addListenerOnce(map, 'click', function(event) {
            placeMarker(map, event.latLng.lat(), event.latLng.lng());
            map.setOptions({draggable: true});
            map.setOptions({draggableCursor: draggableCursor});
            $('#place-marker-button').attr("disabled", false);
        });
    });
});

//
//    map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
//
//    // set up places autocomplete
//    var placesinput = $("#address")[0];
//    var placesoptions = {
//        componentRestrictions: {country: 'us'}
//    };
//
//    var autocomplete = new google.maps.places.Autocomplete(placesinput,placesoptions);
//    var mapbounds = map.getBounds();
//    autocomplete.setBounds(mapbounds);
//    autocomplete.bindTo('bounds', map);
//
//    // add listener
//    google.maps.event.addListener(autocomplete, 'place_changed', function()
//    {
//        $('#address').blur();
//        var place = autocomplete.getPlace();
//
//        if (place.geometry) {
//            cancontinue = true;
//
//            // store data in object
//            data = new Object();
//            data.placeslat = place.geometry.location.lat();
//            data.placeslng = place.geometry.location.lng();
//            data.placesresult = String(place.formatted_address).slice(0,-5);
//
//            addmarker(place);
//        } else {
//            codeaddress();
//        }
//
//    });



