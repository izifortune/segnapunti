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
    $scope.p1Score = 0;
    $scope.p2Score = 0;

    $scope.p1SetCount = 0;
    $scope.p2SetCount = 0;

    $scope.form1 = {};
    $scope.form2 = {};

    $scope.sets = [];

    // $scope.tmp1Score = 0;
    // $scope.tmp2Score = 0;

    $scope.plusp1Score = function(){
        if (Number($scope.form1.score)) {
            $scope.p1Score = $scope.p1Score + Number($scope.form1.score);
            if ($scope.p1Score < 0) {
                $scope.p1Score = 0;
            }
            $scope.form1.score = '';
        }
        else {
            $scope.form1.score = '';
        }
    };


    $scope.plusp2Score = function(){
        if (Number($scope.form2.score)) {
            $scope.p2Score = $scope.p2Score + Number($scope.form2.score);
            if ($scope.p2Score < 0) {
                $scope.p2Score = 0;
            }
            $scope.form2.score = '';
        }
        else {
            $scope.form2.score = '';
        }
    };

    $scope.addSetP1 = function() {
        $scope.p1SetCount = $scope.p1SetCount + 1;
        $scope.sets.push({
            p1Score: $scope.p1Score,
            p2Score: $scope.p2Score,
            win: true,
        });
    };

    $scope.addSetP2 = function() {
        $scope.p2SetCount = $scope.p2SetCount + 1;
        $scope.sets.push({
            p1Score: $scope.p1Score,
            p2Score: $scope.p2Score,
            win: false,
        });
    };

    $scope.endGame = function() {

    };

});
