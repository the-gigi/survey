$.getScript("php/ajax/pgchk.php");

var map, geocoder, marker, data;
var results = new Array();
cancontinue = false;

function addmarker(place) {
    if(place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
    } else {
        map.setCenter(place.geometry.location);
//    map.setZoom(17);
    }

    if (typeof dropmarker != 'undefined') {
        dropmarker.set('map', '');
        dropmarker.set('animation', google.maps.Animation.DROP);
        dropmarker.set('position', place.geometry.location);
        dropmarker.set('map', map);
    } else {
        dropmarker = new Dropmarker(place.geometry.location);
    }

    updatedrpmkr();
}

function codeaddress() {
    cancontinue = true;
    var address = $('#address').val();
    geocoder.geocode( { 'address': address, 'region': 'US' }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {

            // store data in object
            data = new Object();
            data.inputaddress = address;
            data.geolat = results[0].geometry.location.lat();
            data.geolng = results[0].geometry.location.lng();
            data.georesult = results[0].formatted_address;

            addmarker(results[0]);

        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
}

function dropcenter() {
    $('#address').val('');
    cancontinue = true;

    // store the data in an object
    data = new Object();

    var place = new Object();
    place.geometry = new Object();
    place.geometry.location = map.getCenter();
    addmarker(place);

}

function Dropmarker(latnlng) {
    this.set('map', map);

    this.set('position', latnlng);
    this.set('animation', google.maps.Animation.DROP);

    var marker = new google.maps.Marker({
        draggable: true,
        icon: markericon
    });

    google.maps.event.addListener(marker, 'dragend', function() { updatedrpmkr(); });

    marker.bindTo('map', this);
    marker.bindTo('position', this);
    marker.bindTo('animation', this);
}
Dropmarker.prototype = new google.maps.MVCObject();

function updatedrpmkr() {
    var latnlng = dropmarker.get('position');

    data.home_movedlat = latnlng.lat();
    data.home_movedlng = latnlng.lng();
}
