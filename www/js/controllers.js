'use strict';

angular.module('starter.controllers', ['ngStorage', 'angles'] )

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
.controller('BrowseGamesCtrl', function($scope, $stateParams, $localStorage, $sessionStorage) {
    //$scope.$storage = $localStorage;
    //console.log($localStorage);
    var aa = [];
    var bb = [];
    for(var p in $localStorage.partita.sets) {
            aa.push({ p1: $localStorage.partita.sets[p]['p1'] });
            bb.push({ p2: $localStorage.partita.sets[p]['p2'] });
    }
    $scope.punteggi1 = aa;
    $scope.punteggi2 = bb;
})

.controller('StatsCtrl2', function($scope, $stateParams, $localStorage) {
    var dati = _.groupBy($localStorage.p1ScoreByType, 'type');
    var dati1 = {acchitto: 0, accosto : 0, bocciata : 0, calcio : 0};
    for(var i in dati.Acchitto) { dati1.acchitto = dati1.acchitto + dati.Acchitto[i].pts; }
    for(var i in dati.Accosto) { dati1.accosto = dati1.accosto + dati.Accosto[i].pts; }
    for(var i in dati.Bocciata) { dati1.bocciata = dati1.bocciata + dati.Bocciata[i].pts; }
    for(var i in dati.Calcio) { dati1.calcio = dati1.calcio +dati.Calcio[i].pts; }

    var dati = _.groupBy($localStorage.p2ScoreByType, 'type');
    var dati2 = {acchitto: 0, accosto : 0, bocciata : 0, calcio : 0};
    for(var i in dati.Acchitto) { dati2.acchitto = dati2.acchitto + dati.Acchitto[i].pts; }
    for(var i in dati.Accosto) { dati2.accosto = dati2.accosto + dati.Accosto[i].pts; }
    for(var i in dati.Bocciata) { dati2.bocciata = dati2.bocciata + dati.Bocciata[i].pts; }
    for(var i in dati.Calcio) { dati2.calcio = dati2.calcio +dati.Calcio[i].pts; }

    $scope.chart = {
        labels : ["Accosto", "Acchitto", "Bocciata", "Calcio"],
        datasets : [
            {
            fillColor : "rgba(220,220,220,0.5)",
            strokeColor : "rgba(220,220,220,1)",
            data : [dati1.accosto, dati1.acchitto, dati1.bocciata, dati1.calcio]
        },
        {
            fillColor : "rgba(151,187,205,0.5)",
            strokeColor : "rgba(151,187,205,1)",
            data : [dati2.accosto, dati2.acchitto, dati2.bocciata, dati2.calcio]
        }
        ]
    }

    $scope.chart1 = [
        {
        value : dati1.accosto,
        color: "#D97041"
    },
    {
        value : dati1.acchitto,
        color: "#C7604C"
    },
    {
        value : dati1.bocciata,
        color: "#21323D"
    },
    {
        value : dati1.calcio,
        color: "#9D9B7F"
    },
    ]

    $scope.chart2 = [
        {
        value : dati2.accosto,
        color: "#D97041"
    },
    {
        value : dati2.acchitto,
        color: "#C7604C"
    },
    {
        value : dati2.bocciata,
        color: "#21323D"
    },
    {
        value : dati2.calcio,
        color: "#9D9B7F"
    },
    ]

    $scope.barOptions = {
        //Boolean - If we show the scale above the chart data
        scaleOverlay : false,
        //Boolean - If we want to override with a hard coded scale
        scaleOverride : true,
        //** Required if scaleOverride is true **
        //Number - The number of steps in a hard coded scale
        scaleSteps : 10,
        //Number - The value jump in the hard coded scale
        scaleStepWidth : 5,
        //Number - The scale starting value
        scaleStartValue : 0,
        //String - Colour of the scale line
        scaleLineColor : "rgba(0,0,0,.1)",
        //Number - Pixel width of the scale line
        scaleLineWidth : 1,
        //Boolean - Whether to show labels on the scale
        scaleShowLabels : true,
        //Interpolated JS string - can access value
        scaleLabel : "<%=value%>",
        //String - Scale label font declaration for the scale label
        scaleFontFamily : "'Arial'",
        //Number - Scale label font size in pixels
        scaleFontSize : 12,
        //String - Scale label font weight style
        scaleFontStyle : "normal",
        //String - Scale label font colour
        scaleFontColor : "#666",
        ///Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines : true,
        //String - Colour of the grid lines
        scaleGridLineColor : "rgba(0,0,0,.05)",
        //Number - Width of the grid lines
        scaleGridLineWidth : 1,
        //Boolean - If there is a stroke on each bar
        barShowStroke : true,
        //Number - Pixel width of the bar stroke
        barStrokeWidth : 2,
        //Number - Spacing between each of the X value sets
        barValueSpacing : 5,
        //Number - Spacing between data sets within X values
        barDatasetSpacing : 1,
        //Boolean - Whether to animate the chart
        animation : false,
        //Number - Number of animation steps
        animationSteps : 60,
        //String - Animation easing effect
        animationEasing : "easeOutQuart",
        //Function - Fires when the animation is complete
        onAnimationComplete : null
    }

    $scope.polarOptions =  {
        //Boolean - If we want to override with a hard coded scale
        scaleOverride : true,
        //** Required if scaleOverride is true **
        //Number - The number of steps in a hard coded scale
        scaleSteps : 5,
        //Number - The value jump in the hard coded scale
        scaleStepWidth : 10,
        //Number - The centre starting value
        scaleStartValue : 0,
        //Boolean - Show line for each value in the scale
        scaleShowLine : true,
        //String - The colour of the scale line
        scaleLineColor : "rgba(0,0,0,.1)",
        //Number - The width of the line - in pixels
        scaleLineWidth : 1,
        //Boolean - whether we should show text labels
        scaleShowLabels : true,
        //Interpolated JS string - can access value
        scaleLabel : "<%=value%>",
        //String - Scale label font declaration for the scale label
        scaleFontFamily : "'Arial'",
        //Number - Scale label font size in pixels
        scaleFontSize : 12,
        //String - Scale label font weight style
        scaleFontStyle : "normal",
        //String - Scale label font colour
        scaleFontColor : "#666",
        //Boolean - Show a backdrop to the scale label
        scaleShowLabelBackdrop : true,
        //String - The colour of the label backdrop
        scaleBackdropColor : "rgba(255,255,255,0.75)",
        //Number - The backdrop padding above & below the label in pixels
        scaleBackdropPaddingY : 2,
        //Number - The backdrop padding to the side of the label in pixels
        scaleBackdropPaddingX : 2,
        //Boolean - Stroke a line around each segment in the chart
        segmentShowStroke : true,
        //String - The colour of the stroke on each segement.
        segmentStrokeColor : "#fff",
        //Number - The width of the stroke value in pixels
        segmentStrokeWidth : 2,
        //Boolean - Whether to animate the chart or not
        animation : false,
        //Number - Amount of animation steps
        animationSteps : 100,
        //String - Animation easing effect.
        animationEasing : "easeOutBounce",
        //Boolean - Whether to animate the rotation of the chart
        animateRotate : true,
        //Boolean - Whether to animate scaling the chart from the centre
        animateScale : false,
        //Function - This will fire when the animation of the chart is complete.
        onAnimationComplete : null
    };

})



// crea due grafici ma dipende da googlechart api e senza connessione non va
.controller('StatsCtrl', function($scope, $stateParams, $localStorage, $sessionStorage) {

    var grafico = function(dati) {
        var tmp = {acchitto: 0, accosto : 0, bocciata : 0, calcio : 0};
        for(var i in dati.Acchitto) { tmp.acchitto = tmp.acchitto + dati.Acchitto[i].pts; }
        for(var i in dati.Accosto) { tmp.accosto = tmp.accosto + dati.Accosto[i].pts; }
        for(var i in dati.Bocciata) { tmp.bocciata = tmp.bocciata + dati.Bocciata[i].pts; }
        for(var i in dati.Calcio) { tmp.calcio = tmp.calcio +dati.Calcio[i].pts; }

        var chart = {};
        chart.type = "PieChart";
        chart.data = [
            [ 'Tipo', 'punti' ],
            [ 'Acchitto', tmp.acchitto ],
            [ 'Bocciata', tmp.bocciata ],
            [ 'Accosto', tmp.accosto ],
            [ 'Calcio', tmp.calcio ]
        ];
        chart.options = {
            displayExactValues: true,
            width: 400,
            height: 200,
            chartArea: {left:5,top:5,bottom:0,height:"100%"}
        };
        chart.formatters = {
            number : [{
                columnNum: 1,
                pattern: "#0"
            }]
        };
        return chart;
    }

    var a = _.groupBy($localStorage.p1ScoreByType, 'type');
    $scope.chart1 = grafico(a);

    var b = _.groupBy($localStorage.p2ScoreByType, 'type');
    $scope.chart2 = grafico(b);
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
        //console.log($localStorage);
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
        //console.log($localStorage);
    }

});
