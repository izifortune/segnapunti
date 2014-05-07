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
    $scope.$storage = $localStorage;
    var aa = [];
    var bb = [];
    for(var p in $localStorage.partita.sets) {
            aa.push({ p1: $localStorage.partita.sets[p]['p1'] });
            bb.push({ p2: $localStorage.partita.sets[p]['p2'] });
    }
    $scope.punteggi1 = aa;
    $scope.punteggi2 = bb;
})


.controller('NewgameCtrl', function($scope, $stateParams, $localStorage, $sessionStorage) {

    console.log($localStorage);
    // inizializzo una nuova partita solo se già non ne esiste una

        $localStorage.partita = [];

        $localStorage.partita.push({
            giocatore1 : "",
            giocatore2 : ""
        });

        $localStorage.partita.sets = [];

    $scope.tipopunteggio = [
        {"id": 1,"group": "1", "label":'Accosto'},
        {"id": 2,"group": "2", "label":'Acchitto'},
        {"id": 3,"group": "3", "label":'Bocciata'},
        {"id": 4,"group": "4", "label":'Calcio'},
    ];

    $scope.giocatore1 = {};
    $scope.giocatore2 = {};
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
    $scope.addNames = function() {
        if ( typeof $scope.giocatore1.text != 'undefined'  && typeof $scope.giocatore2.text != 'undefined' )  {
            // buttare names nello storage
             $localStorage.partita[0]['giocatore1'] = $scope.giocatore1.text;
             $localStorage.partita[0]['giocatore2'] = $scope.giocatore2.text;
        }else{
             $localStorage.partita[0]['giocatore1'] = $scope.giocatore1.text;
             $localStorage.partita[0]['giocatore2'] = $scope.giocatore2.text;
        }
        console.log($localStorage);
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

    // Pulsante di fine set
    $scope.finalScore = function() {
        if($scope.p1Score > $scope.p2Score) {
            $scope.p1SetCount = $scope.p1SetCount +1;
        }else if ($scope.p2Score > $scope.p1Score){
            $scope.p2SetCount = $scope.p2SetCount +1;
        }else{
            return;
        }

        console.log($localStorage.partita.sets);
        $localStorage.partita.sets.push({
            p1 : $scope.p1Score,
            p2 : $scope.p2Score
        });

        $scope.p1Score = 0;
        $scope.form1.score = '';
        $scope.p2Score = 0;
        $scope.form2.score = '';

    }

    // Fine della partita verifichiamo cosa c'è nello storage
    $scope.endGame = function() {
        console.log($localStorage);
    };

    // distrugge il localstorage.*
    $scope.resetGame = function() {
        $localStorage.$reset();
        console.log($localStorage);
    }

});
