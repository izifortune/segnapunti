'use strict';

angular.module('starter.controllers', [])

.factory('DatiPartita', function () {
    return {
        Giocatori:     [ {giocatore:'Pippo'}, {giocatore:'pluto' } ],
        GetNomi: function () {
            return this.Giocatori;
        },
    }
})

.controller('AppCtrl', function($scope) {
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
  ];

  $scope.newGame = function() {
    console.log('new game');
  };
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('GameDataCtrl', function($scope, $stateParams) {
    $scope.names = [];

    // se nello storage non c'è nulla inizializziamo
    // in caso contrario...
    $scope.giocatore1 = {};
    $scope.giocatore2 = {};
    $scope.data = {}; // per la data credo occorra il date picker

    $scope.addNames = function() {

        if ( typeof $scope.giocatore1.text != 'undefined'  && typeof $scope.giocatore2.text != 'undefined' )  {
            $scope.names.push({
                'nome1' : $scope.giocatore1.text,
                'nome2' : $scope.giocatore2.text,
                'data'  : $scope.data,
            });
            // buttare names nello storage
            console.log($scope.names);
        }else{
            alert('Inserisci i nomi');
        }
    };
})


.controller('NewgameCtrl', function($scope, $stateParams) {
    $scope.p1Score = 0;
    $scope.p2Score = 0;

    $scope.p1SetCount = 0;
    $scope.p2SetCount = 0;

    $scope.form1 = {};
    $scope.form2 = {};

    $scope.sets = [];

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

    $scope.finalScore = function() {
        if($scope.p1Score > $scope.p2Score) {
            $scope.p1SetCount = $scope.p1SetCount +1;
        }else if ($scope.p2Score > $scope.p1Score){
            $scope.p2SetCount = $scope.p2SetCount +1;
        }else{
            return;
        }

        $scope.sets.push({
            p1Score: $scope.p1Score,
            p2Score: $scope.p2Score,
            //win: true,
        });

        $scope.p1Score = 0;
        $scope.form1.score = '';
        $scope.p2Score = 0;
        $scope.form2.score = '';
    }

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
