'use strict';

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];

  $scope.newGame = function() {
    console.log('new game');
  };
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('NewgameCtrl', function($scope, $stateParams) {
});
