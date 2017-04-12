# ionic-simple-map
Implement simple map in ionic cordova
----------------Create an Ionic Project------------
ionic start IonicExample blank
cd IonicExample
ionic platform add android
ionic platform add ios
Remember, if you’re not on a Mac, you cannot build for iOS.

Since we are using maps, it is probably a good idea to add geolocation functionality to your application.  You can add the Apache Cordova Geolocation API by running the following command:

cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-geolocation.git

We are going to be using the Google Maps JavaScript SDK, which requires us to have an API key for use in our application.  Go into your Google API Console and register a new Google Maps application.

When you have your key, crack open your www/index.html file because we need to add the JavaScript library to our project.

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
        <title></title>
        <link href="lib/ionic/css/ionic.css" rel="stylesheet">
        <link href="css/style.css" rel="stylesheet">
        <script src="lib/ionic/js/ionic.bundle.js"></script>
        <script src="cordova.js"></script>
        <script src="js/app.js"></script>
    </head>
    <body ng-app="starter">
        <ion-pane>
            <ion-header-bar class="bar-stable">
                <h1 class="title">Ionic Blank Starter</h1>
            </ion-header-bar>
            <ion-content>
            </ion-content>
        </ion-pane>
        <script src="http://maps.googleapis.com/maps/api/js?key=[YOUR_KEY_HERE]&sensor=true"></script>
    </body>
</html>

Please note that the Google Maps JavaScript library cannot be downloaded, so there will always be a small delay during the initial setup when you launch your application.

Now that the SDK is included we need to add some custom CSS for displaying it on the screen.  Open your www/css/style.css file and add the following code:


.scroll {
    height: 100%;
}
 
#map {
    width: 100%;
    height: 100%;
}

Next we get to start doing the fun stuff.  Open your www/app.js file because we want to add a controller that handles the Google Map

exampleApp.controller('MapController', function($scope, $ionicLoading) {
 
    google.maps.event.addDomListener(window, 'load', function() {
        var myLatlng = new google.maps.LatLng(37.3000, -120.4833);
 
        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
 
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
 
        navigator.geolocation.getCurrentPosition(function(pos) {
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
                title: "My Location"
            });
        });
 
        $scope.map = map;
    });
 
});

The above code will register the map to a DOM element with a map id.  It will center the map in Merced, California and then attempt to center the map around your current location.  If it finds your current location it will place a marker.

We are not quite done yet.  We need to add some code to our www/index.html file for containing the map.

<ion-content ng-controller="MapController">
    <div id="map" data-tap-disabled="true"></div>
</ion-content>

Now, the depth of Google Maps can go far beyond the simplistic nature I demonstrated in my article.  Have some fun with the official API docs and use Google Maps to its full power.
