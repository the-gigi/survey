markericon = 'img/nphome.png';

$(document).ready(function(){
    geocoder = new google.maps.Geocoder();
    cali = new google.maps.LatLng(36.6,-120.1);

    var mapOptions = {
        zoom: 6,
        center: cali,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scaleControl: true
    };

    map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

    // set up places autocomplete
    var placesinput = $("#address")[0];
    var placesoptions = {
        componentRestrictions: {country: 'us'}
    };

    var autocomplete = new google.maps.places.Autocomplete(placesinput,placesoptions);
    var mapbounds = map.getBounds();
    autocomplete.setBounds(mapbounds);
    autocomplete.bindTo('bounds', map);

    // add listener
    google.maps.event.addListener(autocomplete, 'place_changed', function()
    {
        $('#address').blur();
        var place = autocomplete.getPlace();

        if (place.geometry) {
            cancontinue = true;

            // store data in object
            data = new Object();
            data.placeslat = place.geometry.location.lat();
            data.placeslng = place.geometry.location.lng();
            data.placesresult = String(place.formatted_address).slice(0,-5);

            addmarker(place);
        } else {
            codeaddress();
        }

    });

});

function nextpage() {
    if (cancontinue) {
        $(window).unbind('beforeunload');
        $.ajax({
            type: "POST",
            url: 'php/ajax/submitmapanswers.php',
            data: {jsondata: JSON.stringify(data)}
        });
    } else {
        alert('Please input your location and "check address" or "drop marker in map center"');
    }
}