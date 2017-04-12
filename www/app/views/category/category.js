(function() {
  'use strict';
  angular.module('starter').config(function($stateProvider) {
    $stateProvider.state('app.category', {
      url: '/category',
      views: {
        'menuContent': {
          templateUrl: 'app/views/category/category.html',
          controller: 'CategoryCtrl'
        }
      }
    });
  });

  'use strict';

  angular.module('starter').controller('CategoryCtrl', function($scope ) {
    google.maps.event.addDomListener(window, 'load', function() {
      var myLatlng = new google.maps.LatLng(37.3000, -120.4833);

      var mapOptions = {
        center: myLatlng,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.TERRAIN
      };

      var map = new google.maps.Map(document.getElementById("map"), mapOptions);

      navigator.geolocation.getCurrentPosition(function (pos) {
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

}).call(this);
