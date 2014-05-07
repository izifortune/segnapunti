'use strict';

angular.module('starter.controllers', ['ngStorage', 'googlechart'])

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

.controller('StatsCtrl', function($scope, $stateParams, $localStorage, $sessionStorage){
    var a = _.groupBy($localStorage.p1ScoreByType, 'type');
    var Acchitto = 0;
    for(var t in a.Acchitto) {
        Acchitto = Acchitto + a.Acchitto[t].pts;
    }
    var Bocciata = 0;
    for(var t in a.Bocciata) {
        Bocciata = Bocciata + a.Bocciata[t].pts;
    }
    var Accosto = 0;
    for(var t in a.Accosto) {
        Accosto = Accosto + a.Accosto[t].pts;
    }
    var Calcio = 0;
    for(var t in a.Calcio) {
        Calcio = Accosto + a.Accosto[t].pts;
    }

    var chart1 = {};
    chart1.type = "PieChart";
    chart1.data = [
        [ 'Tipo', 'punti' ],
        [ 'Acchitto', Acchitto ],
        [ 'Bocciata', Bocciata ],
        [ 'Accosto', Accosto ]
    ];
    chart1.formatters = {
      number : [{
        columnNum: 1,
        pattern: "$ #,##0.00"
      }]
    };

    $scope.chart1 = chart1;


    var b = _.groupBy($localStorage.p2ScoreByType, 'type');
    var Acchitto = 0;
    for(var t in b.Acchitto) {
        Acchitto = Acchitto + b.Acchitto[t].pts;
        //console.log(b.Acchitto[t].pts);
    }
    var Bocciata = 0;
    for(var t in b.Bocciata) {
        Bocciata = Bocciata + b.Bocciata[t].pts;
    }
    var Accosto = 0;
    for(var t in b.Accosto) {
        Accosto = Accosto + b.Accosto[t].pts;
    }
    var Calcio = 0;
    for(var t in b.Calcio) {
        Calcio = Accosto + b.Accosto[t].pts;
    }

    var chart2 = {};
    chart2.type = "PieChart";
    chart2.data = [
        [ 'Tipo', 'punti' ],
        [ 'Acchitto', Acchitto ],
        [ 'Bocciata', Bocciata ],
        [ 'Accosto', Accosto ]
    ];
    chart2.formatters = {
      number : [{
        columnNum: 1,
        pattern: "$ #,##0.00"
      }]
    };
    $scope.giocatore1 = $localStorage.partita[0]['giocatore1'];
    $scope.giocatore2 = $localStorage.partita[0]['giocatore2'];
    $scope.chart2 = chart2;


})


.controller('NewgameCtrl', function($scope, $stateParams, $localStorage, $sessionStorage) {

    // inizializzo una nuova partita solo se già non ne esiste una

    if($stateParams.gameId === '0') {
        $scope.$storage = $localStorage;
    }else{
        $localStorage.partita = [];

        $localStorage.partita.push({
            giocatore1 : "", sets1: 0, score1: 0,
            giocatore2 : "", sets2: 0, score2: 0
        });

        $localStorage.partita.sets = [];
    }

    $scope.tipopunteggio = [
        {"id": 1,"group": "1", "label":'Accosto'},
        {"id": 2,"group": "2", "label":'Acchitto'},
        {"id": 3,"group": "3", "label":'Bocciata'},
        {"id": 4,"group": "4", "label":'Calcio'},
    ];

    $scope.giocatore1 = ({text: $localStorage.partita[0]['giocatore1'] });
    $scope.giocatore2 = ({text: $localStorage.partita[0]['giocatore2'] });

    $scope.p1ScoreOrig = $scope.tipopunteggio[0];
    $scope.p2ScoreOrig = $scope.tipopunteggio[0];

    $scope.p1ScoreByType = [];
    $scope.p2ScoreByType = [];

    $scope.p1Score = $localStorage.partita[0]['score1'];
    $scope.p2Score = $localStorage.partita[0]['score2'];

    $scope.p1SetCount = $localStorage.partita[0]['sets1'];
    $scope.p2SetCount = $localStorage.partita[0]['sets2'];

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
            $localStorage.partita[0]['score1'] = $scope.p1Score;

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
            $localStorage.partita[0]['score2'] = $scope.p2Score;

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

        $localStorage.partita.sets.push({
            p1 : $scope.p1Score,
            p2 : $scope.p2Score
        });

        $localStorage.partita[0].sets1 = Number( $scope.p1SetCount );
        $localStorage.partita[0].sets2 = Number( $scope.p2SetCount );

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
