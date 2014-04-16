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
    $scope.team1Score = 0;
    $scope.team2Score = 0;
    $scope.form1 = {};
    $scope.form2 = {};

    // $scope.tmp1Score = 0;
    // $scope.tmp2Score = 0;

    $scope.plusTeam1Score = function(){
        if (Number($scope.form1.score)) {
            $scope.team1Score = $scope.team1Score + Number($scope.form1.score);
            $scope.form1.score = '';
        }
        else {
            $scope.form1.score = '';
        }
    };

    $scope.minusTeam1Score = function(){
        if (Number($scope.form1.score)) {
            $scope.team1Score = $scope.team1Score - Number($scope.form1.score);
            $scope.form1.score = '';
        }
        else {
            $scope.form1.score = '';
        }
    };

    $scope.plusTeam2Score = function(){
        if (Number($scope.form2.score)) {
            $scope.team2Score = $scope.team2Score + Number($scope.form2.score);
            $scope.form2.score = '';
        }
        else {
            $scope.form2.score = '';
        }
    };

    $scope.minusTeam2Score = function(){
        if (Number($scope.form2.score)) {
            $scope.team2Score = $scope.team2Score - Number($scope.form2.score);
            $scope.form2.score = '';
        }
        else {
            $scope.form2.score = '';
        }
    };
});
