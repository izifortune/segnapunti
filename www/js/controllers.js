'use strict';


angular.module('starter.controllers', ['ngStorage', 'angles', 'ngTable'] )

.controller('StorageCtrl', function(
    $scope,
    $localStorage,
    $sessionStorage
){
    $scope.$storage = $localStorage;
})

.controller('AppCtrl', function($scope) {
})

.controller('PlaylistsCtrl', function($scope, $localStorage, $sessionStorage) {
    $scope.$storage = $localStorage;
    $scope.partite = $localStorage.partita;
    //console.log($localStorage.partita);

    $scope.newGame = function() {
        //console.log('new game');
    };
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

// passo anche i parametri dello storage
.controller('BrowseGamesCtrl', function($scope, $stateParams, $localStorage, $sessionStorage, ngTableParams) {
    var aa = [];
    var bb = [];
    var sets = [];

    //console.log($localStorage.sets)
    if($localStorage.sets.length > 0) {
        for(var p in $localStorage.sets) {
            aa.push({ p1: $localStorage.sets[p]['p1'] });
            bb.push({ p2: $localStorage.sets[p]['p2'] });
            sets.push(
                {
                set:  ( Number(p)+1 ),
                p1 : $localStorage.sets[p]['p1'],
                p2 : $localStorage.sets[p]['p2']
            }
            );
        }
        $scope.giocatore1 = $localStorage.partita[0]['giocatore1'];
        $scope.giocatore2 = $localStorage.partita[0]['giocatore2'];
        $scope.tableParams = new ngTableParams(
            {
            page: 1,            // show first page
            count: sets.length+1
        }, {
            total: sets.length, // length of data
            getData: function($defer, params) {
                $defer.resolve(sets.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            },
            counts : []
        });

        var tipi =  [];
        var dati = _.groupBy($localStorage.p1ScoreByType, 'type');
        //console.log(dati)
        var dati1 = {acchitto: 0, accosto : 0, bocciata : 0, calcio : 0, bevuti: 0};
        for(var i in dati.Acchitto) { dati1.acchitto = dati1.acchitto + dati.Acchitto[i].pts; }
        for(var i in dati.Accosto) { dati1.accosto = dati1.accosto + dati.Accosto[i].pts; }
        for(var i in dati.Bocciata) { dati1.bocciata = dati1.bocciata + dati.Bocciata[i].pts; }
        for(var i in dati.Calcio) { dati1.calcio = dati1.calcio +dati.Calcio[i].pts; }
        for(var i in dati.Bevuti) { dati1.bevuti = dati1.bevuti +dati.Bevuti[i].pts; }
        //tipi1.push({ accosto: dati1.accosto, acchitto: dati1.acchitto, bocciata: dati1.bocciata, calcio: dati1.calcio, bevuti: dati1.bevuti});
        var dati = _.groupBy($localStorage.p2ScoreByType, 'type');
        var dati2 = {acchitto: 0, accosto : 0, bocciata : 0, calcio : 0, bevuti: 0};
        for(var i in dati.Acchitto) { dati2.acchitto = dati2.acchitto + dati.Acchitto[i].pts; }
        for(var i in dati.Accosto) { dati2.accosto = dati2.accosto + dati.Accosto[i].pts; }
        for(var i in dati.Bocciata) { dati2.bocciata = dati2.bocciata + dati.Bocciata[i].pts; }
        for(var i in dati.Calcio) { dati2.calcio = dati2.calcio +dati.Calcio[i].pts; }
        for(var i in dati.Bevuti) { dati2.bevuti = dati2.bevuti +dati.Bevuti[i].pts; }

        tipi.push({tipo: 'Acchitto', p1: dati1.acchitto, p2: dati2.acchitto})
        tipi.push({tipo: 'Accosto', p1: dati1.accosto, p2: dati2.accosto})
        tipi.push({tipo: 'Bocciata', p1: dati1.bocciata, p2: dati2.bocciata})
        tipi.push({tipo: 'Calcio', p1: dati1.calcio, p2: dati2.calcio})
        tipi.push({tipo: 'Bevuti', p1: dati1.bevuti, p2: dati2.bevuti})
        //console.log(tipi)

        $scope.tableParams1 = new ngTableParams(
            {
            page: 1,
            count: tipi.length+1
        },
            {
                total: tipi.length,
                getData: function($defer, params) {
                    $defer.resolve(tipi.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                },
                counts: []
            });

    }else{
        $scope.messaggio = "Non ci sono partite in corso da visualizzare";
    }

})

.controller('StatsCtrl2', function($scope, $stateParams, $localStorage, $sessionStorage) {
    //console.log($localStorage.sets.length);
    //if($localStorage.sets == 0) {
        //$scope.messaggio = "Non ci sono partite da visualizzare";
        //return ;
    //}
    $scope.giocatore1 = $localStorage.partita[0]['giocatore1'];
    $scope.giocatore2 = $localStorage.partita[0]['giocatore2'];

    var dati = _.groupBy($localStorage.p1ScoreByType, 'type');
    var dati1 = {acchitto: 0, accosto : 0, bocciata : 0, calcio : 0, bevuti: 0};
    for(var i in dati.Acchitto) { dati1.acchitto = dati1.acchitto + dati.Acchitto[i].pts; }
    for(var i in dati.Accosto) { dati1.accosto = dati1.accosto + dati.Accosto[i].pts; }
    for(var i in dati.Bocciata) { dati1.bocciata = dati1.bocciata + dati.Bocciata[i].pts; }
    for(var i in dati.Calcio) { dati1.calcio = dati1.calcio +dati.Calcio[i].pts; }
    for(var i in dati.Bevuti) { dati1.bevuti = dati1.bevuti +dati.Bevuti[i].pts; }

    var dati = _.groupBy($localStorage.p2ScoreByType, 'type');
    var dati2 = {acchitto: 0, accosto : 0, bocciata : 0, calcio : 0, bevuti: 0};
    for(var i in dati.Acchitto) { dati2.acchitto = dati2.acchitto + dati.Acchitto[i].pts; }
    for(var i in dati.Accosto) { dati2.accosto = dati2.accosto + dati.Accosto[i].pts; }
    for(var i in dati.Bocciata) { dati2.bocciata = dati2.bocciata + dati.Bocciata[i].pts; }
    for(var i in dati.Calcio) { dati2.calcio = dati2.calcio +dati.Calcio[i].pts; }
    for(var i in dati.Bevuti) { dati2.bevuti = dati2.bevuti +dati.Bevuti[i].pts; }

    $scope.chart = {
        labels : ["Accosto", "Acchitto", "Bocciata", "Calcio", "Bevuti"],
        datasets : [
            {
                fillColor : "rgba(220,0,0,0.7)", strokeColor : "rgba(0,0,0,0.5)",
                data : [dati1.accosto, dati1.acchitto, dati1.bocciata, dati1.calcio, dati1.bevuti]
            },
            {
                fillColor : "rgba(225,225,225,0.7)", strokeColor : "rgba(0,0,0,0.5)",
                data : [dati2.accosto, dati2.acchitto, dati2.bocciata, dati2.calcio, dati2.bevuti]
            }
        ]
    }

    $scope.chart1 = [
        { value : dati1.accosto, color: "#D97041" },
        { value : dati1.acchitto, color: "#C7604C" },
        { value : dati1.bocciata, color: "#21323D" },
        { value : dati1.calcio, color: "#9D9B7F" },
        { value : dati1.bevuti, color: "#000000" },
    ]

    $scope.chart2 = [
        { value : dati2.accosto, color: "#D97041" },
        { value : dati2.acchitto, color: "#C7604C" },
        { value : dati2.bocciata, color: "#21323D" },
        { value : dati2.calcio, color: "#9D9B7F" },
        { value : dati2.bevuti, color: "#000000" },
    ]

    $scope.barOptions = {
        scaleOverlay : false,
        scaleOverride : false,
        scaleStartValue : 0,
        scaleLineColor : "rgba(0,0,0,.1)",
        scaleLineWidth : 1,
        scaleShowLabels : true,
        scaleLabel : "<%=value%>",
        scaleFontFamily : "'Arial'",
        scaleFontSize : 12,
        scaleFontStyle : "normal",
        scaleFontColor : "#666",
        scaleShowGridLines : true,
        scaleGridLineColor : "rgba(0,0,0,.05)",
        scaleGridLineWidth : 1,
        barShowStroke : true,
        barStrokeWidth : 2,
        barValueSpacing : 5,
        barDatasetSpacing : 1,
        animation : false,
        animationSteps : 60,
        animationEasing : "easeOutQuart",
        onAnimationComplete : null
    }

    $scope.polarOptions =  {
        scaleOverride : false,
        scaleSteps : 6,
        scaleStartValue : 0,
        scaleShowLine : true,
        scaleLineColor : "rgba(0,0,0,.1)",
        scaleLineWidth : 1,
        scaleShowLabels : true,
        scaleLabel : "<%=value%>",
        scaleFontFamily : "'Arial'",
        scaleFontSize : 12,
        scaleFontStyle : "normal",
        scaleFontColor : "#666",
        scaleShowLabelBackdrop : true,
        scaleBackdropColor : "rgba(255,255,255,0.75)",
        scaleBackdropPaddingY : 2,
        scaleBackdropPaddingX : 2,
        segmentShowStroke : true,
        segmentStrokeColor : "#fff",
        segmentStrokeWidth : 2,
        animation : false,
        animationSteps : 100,
        animationEasing : "easeOutBounce",
        animateRotate : true,
        animateScale : false,
        onAnimationComplete : null
    };

})

.controller('NewgameCtrl', function($scope, $stateParams, $localStorage, $sessionStorage) {
    // inizializzo una nuova partita solo se già non ne esiste una
    if( $stateParams.gameId == '0' && $localStorage.partita !== undefined) {
        $scope.$storage = $localStorage;
    }else{
        $localStorage.partita = [];

        $localStorage.partita.push({
            giocatore1 : "", sets1: 0, score1: 0,
            giocatore2 : "", sets2: 0, score2: 0
        });

        $localStorage.sets = [];
        $localStorage.p1ScoreByType = [];
        $localStorage.p2ScoreByType = [];
    }

    $scope.tipopunteggio = [
        {id: 1, group: 1, label: 'Accosto'},
        {id: 2, group: 2, label: 'Acchitto'},
        {id: 3, group: 3, label: 'Bocciata'},
        {id: 4, group: 4, label: 'Calcio'},
        {id: 5, group: 5, label: 'Bevuti'}
    ];

    $scope.giocatore1 = ($localStorage.partita[0]['giocatore1'] != '') ? ({text: $localStorage.partita[0]['giocatore1'] }) : ({text: ''});
    $scope.giocatore2 = ($localStorage.partita[0]['giocatore2'] != '') ? ({text: $localStorage.partita[0]['giocatore2'] }) : ({text: ''});

    // sono i valori di default della select
    $scope.p1ScoreOrig = $scope.tipopunteggio[0];
    $scope.p2ScoreOrig = $scope.tipopunteggio[0];

    $scope.p1Score = $localStorage.partita[0]['score1'];
    $scope.p2Score = $localStorage.partita[0]['score2'];

    $scope.p1SetCount = $localStorage.partita[0]['sets1'];
    $scope.p2SetCount = $localStorage.partita[0]['sets2'];

    $scope.form1 = {};
    $scope.form2 = {};

    $scope.sets = [];

    // memorizza i metadati della partita, nomi giocatori
    $scope.addNames = function() {
             $localStorage.partita[0]['giocatore1'] = $scope.giocatore1.text;
             $localStorage.partita[0]['giocatore2'] = $scope.giocatore2.text;
    };

    //
    $scope.plusp1Score = function() {
        if (Number($scope.form1.score)) {
            $scope.p1Score = $scope.p1Score + Number($scope.form1.score);

            $localStorage.p1ScoreByType.push({
                type : this.p1ScoreOrig.label,
                pts : $scope.form1.score,
            });

            //$localStorage.p1ScoreByType = $scope.p1ScoreByType;
            $localStorage.partita[0]['score1'] = $scope.p1Score;

            if ($scope.p1Score < 0) {
                $scope.p1Score = 0;
            }
            $scope.form1.score = 0;
        }
        else {
            $scope.form1.score = 0;
        }
    };

    //
    $scope.plusp2Score = function(){
        if (Number($scope.form2.score)) {
            $scope.p2Score = $scope.p2Score + Number($scope.form2.score);

            $localStorage.p2ScoreByType.push({
                type : this.p2ScoreOrig.label,
                pts : $scope.form2.score,
            });

            //$localStorage.p2ScoreByType = $scope.p2ScoreByType;
            $localStorage.partita[0]['score2'] = $scope.p2Score;

            if ($scope.p2Score < 0) {
                $scope.p2Score = 0;
            }
            $scope.form2.score = 0;
        }
        else {
            $scope.form2.score = 0;
        }
    };

    // Pulsante di fine set
    $scope.finalScore = function() {
        // vediamo chi è il vincitore
        if($scope.p1Score > $scope.p2Score) {
            $scope.p1SetCount = $scope.p1SetCount +1;
        }else if ($scope.p2Score > $scope.p1Score){
            $scope.p2SetCount = $scope.p2SetCount +1;
        }else{
            return;
        }

        //console.log($localStorage);
        $localStorage.sets.push({
            p1 : $scope.p1Score,
            p2 : $scope.p2Score
        });

        $localStorage.partita[0].sets1 = Number( $scope.p1SetCount );
        $localStorage.partita[0].sets2 = Number( $scope.p2SetCount );
        $localStorage.partita[0]['score1'] = 0;
        $localStorage.partita[0]['score2'] = 0;

        $scope.p1Score = 0;
        $scope.form1.score = 0;
        $scope.p2Score = 0;
        $scope.form2.score = 0;

    }

    // Fine della partita verifichiamo cosa c'è nello storage
    $scope.endGame = function() {
        //console.log($localStorage);
        // qui verosimilmente archiviamo la partita anziché resettare
        $localStorage.$reset();
    };

    // distrugge il localstorage.*
    $scope.resetGame = function() {
        $localStorage.$reset();
        //console.log($localStorage);
    }

});
