console.log("map.js here");

function createMap(mapOptions)
{
    console.log("createMap() here");
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
    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map($('#map_canvas'), mapOptions);
}
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



