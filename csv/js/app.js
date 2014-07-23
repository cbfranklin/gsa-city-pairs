var originAirport = 'MCO',
    destinationAirport = 'MUC';

$(function() {

    initCPP();
    bindings();

});

function bindings() {
    $('#cpp-origin').on('change', function() {
        var origin = $(this).val();
        findCPPdestinations(origin);
    });

    $('#cpp-search').on('click', function() {
        var origin = $('#cpp-origin').val(),
            destination = $('#cpp-destination').val();
        findCPPrate(origin, destination);
    });
}

function initCPP() {
    var origins = [],
        html;
    //COLLECT ALL ORIGINS
    for (var i = 0; i < cpp.length; i++) {
        origins.push(cpp[i][2]);
    }
    //FILTER FOR UNIQUE ORIGINS
    originsUnique = origins.filter(function(elem, pos) {
        return origins.indexOf(elem) == pos;
    });
    var originsSorted = originsUnique.sort();
    //TEMPLATE
    for (var i = 0; i < originsSorted.length; i++) {
        var option = '<option val="' + originsSorted[i] + '">' + originsSorted[i] + '</option>';
        html += option;
    }
    //APPEND
    $('#cpp-origin').append(html);
    findCPPdestinations(originsSorted[0], false);
}

function findCPPrate(origin, destination) {
    var html,
        // horizontal: //template = '<table class="table"><thead><tr><th>Origin</th><th>Destination</th><th>Airline</th><th>Service</th><th>YCA Fare</th><th>-CA</th><th>-CB</th><th>Effective</th><th>Expires</th></tr></thead><tbody><tr class="odd"><td>{{origin}}</td><td>{{destination}}</td><td>{{airline}}</td><td>{{service}}</td><td>{{yca}}</td><td>{{ca}}</td><td>{{cb}}</td><td>{{effective}}</td><td>{{expiration}}</td><tr></tbody></table>';
        template = '<h4>{{origin}} to {{destination}}</h4><table class="table"><tr><th>Origin</th><td>{{origin}}</td></tr><tr><th>Destination</th><td>{{destination}}</td></tr><tr><th>Airline</th><td>{{airline}}</td></tr><tr><th>Service</th><td>{{service}}</td></tr><tr><th>YCA Fare</th><td>${{yca}}</td></tr><tr><th>-CA</th><td>${{ca}}</td></tr><tr><th>-CB</th><td>${{cb}}</td></tr><tr><th>Effective</th><td>{{effective}}</td></tr><tr><th>Expires</th><td>{{expiration}}</td></tr></table>';
    //FIND THE RATE
    for (var i = 0; i < cpp.length; i++) {
        if (cpp[i][2] === origin && cpp[i][3] === destination) {
            //TEMPLATE
            var effective = cpp[i][15].replace(' 0:00', ''),
                expiration = cpp[i][16].replace(' 0:00', '');
            html = template
                .replace(/{{origin}}/g, origin)
                .replace(/{{destination}}/g, destination)
                .replace(/{{airline}}/g, cpp[i][10])
                .replace(/{{service}}/g, cpp[i][11])
                .replace(/{{yca}}/g, cpp[i][12])
                .replace(/{{ca}}/g, cpp[i][13])
                .replace(/{{cb}}/g, cpp[i][14])
                .replace(/{{effective}}/g, effective)
                .replace(/{{expiration}}/g, expiration);
            break;
        };
    };
    //APPEND
    $('#cpp-rate').html('').append(html);
};

function findCPPdestinations(originAirport, animate) {
    var destinations = [];
    //FIND DESTINATIONS
    for (var i = 0; i < cpp.length; i++) {
        if (cpp[i][2] === originAirport) {
            destinations.push(cpp[i][3])
        }
    }
    var destinationsSorted = destinations.sort(),
        html;
    //TEMPLATE
    for (var i = 0; i < destinationsSorted.length; i++) {
        var option = '<option val="' + destinationsSorted[i] + '">' + destinationsSorted[i] + '</option>';
        html += option;
    }
    //APPEND
    $('#cpp-destination').html('').append(html);
    if (animate !== false) {
        $('#cpp-destination').addClass('animated pulse');
    }
    $('#cpp-search').removeAttr('disabled');
};