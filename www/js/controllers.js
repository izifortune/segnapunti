'use strict';

angular.module('starter.controllers', ['ngStorage'])

.controller('StorageCtrl', function(
    $scope,
    $localStorage,
    $sessionStorage
){
    $scope.$storage = $localStorage;
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

// passo anche i parametri dello storage
.controller('BrowseGamesCtrl', function($scope, $stateParams, $localStorage, $sessionStorage) {
    //$scope.names = [];
    $scope.$storage = $localStorage;
    $scope.punteggi1 = $localStorage.p1ScoreByType;
    $scope.punteggi2 = $localStorage.p2ScoreByType;
    console.log($localStorage);
})


.controller('NewgameCtrl', function($scope, $stateParams, $localStorage, $sessionStorage) {
    $localStorage.$reset();

    console.log($localStorage);
    $scope.names = [];
    $scope.giocatore1 = {};
    $scope.giocatore2 = {};

    $scope.tipopunteggio = [
        {"id": 1,"group": "1", "label":'Accosto'},
        {"id": 2,"group": "2", "label":'Acchitto'},
        {"id": 3,"group": "3", "label":'Bocciata'},
        {"id": 4,"group": "4", "label":'Calcio'},
    ];
    $scope.p1ScoreOrig = $scope.tipopunteggio[0];
    $scope.p2ScoreOrig = $scope.tipopunteggio[0];
    $scope.p1ScoreByType = [];
    $scope.p2ScoreByType = [];

    $scope.p1Score = 0;
    $scope.p2Score = 0;

    $scope.p1SetCount = 0;
    $scope.p2SetCount = 0;

    $scope.form1 = {};
    $scope.form2 = {};

    $scope.sets = [];

    // memorizza i metadati della partita, nomi giocatori
    // data
    $scope.addNames = function() {
        if ( typeof $scope.giocatore1.text != 'undefined'  && typeof $scope.giocatore2.text != 'undefined' )  {
            $scope.names.push({
                'nome1' : $scope.giocatore1.text,
                'nome2' : $scope.giocatore2.text,
                'data'  : $scope.data,
            });
            // buttare names nello storage
             $localStorage.names = $scope.names;
        }else{
            alert('Inserisci i nomi');
        }
        //console.log($scope.names);
    };

    //
    $scope.plusp1Score = function() {
        if (Number($scope.form1.score)) {
            $scope.p1Score = $scope.p1Score + Number($scope.form1.score);

            $scope.p1ScoreByType.push({
                type : this.p1ScoreOrig.label,
                pts : $scope.form1.score,
            });

            $localStorage.p1ScoreByType = $scope.p1ScoreByType;

            if ($scope.p1Score < 0) {
                $scope.p1Score = 0;
            }
            $scope.form1.score = '';
        }
        else {
            $scope.form1.score = '';
        }
    };

    //
    $scope.plusp2Score = function(){
        if (Number($scope.form2.score)) {
            $scope.p2Score = $scope.p2Score + Number($scope.form2.score);

            $scope.p2ScoreByType.push({
                type : this.p2ScoreOrig.label,
                pts : $scope.form2.score,
            });

            $localStorage.p2ScoreByType = $scope.p2ScoreByType;

            if ($scope.p2Score < 0) {
                $scope.p2Score = 0;
            }
            $scope.form2.score = '';
        }
        else {
            $scope.form2.score = '';
        }
    };

    /**
     *      Pulsante di fine set
     */
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
        });

        //console.log($scope.sets);
        $scope.p1Score = 0;
        $scope.form1.score = '';
        $scope.p2Score = 0;
        $scope.form2.score = '';

        $localStorage.sets = $scope.sets;
        $localStorage.p1 = p1ScoreByType;
        $localStorage.p2 = p2ScoreByType;
    }

    //
    $scope.endGame = function() {
        console.log($localStorage);
    };

});
