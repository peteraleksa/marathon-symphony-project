angular.module('symphonyApp.symphonies').controller('ComposeController', ['$scope', '$filter', '$routeParams', '$location', 'Global', 'Symphonies', 'Years', 'Users', 'MySymphonies', 'MyFavorites', function ($scope, $filter, $routeParams, $location, Global, Symphonies, Years, Users, MySymphonies, MyFavorites) {
    $scope.create = function() {
        var symphony = new Symphonies(
            {
                title: this.title,
                composer: this.composer,
                year: this.year.value,
                runnerRange: this.runnerRange,
                timingLocations: {
                    locations: this.markerSelection
                },
                musicalStyle: {
                    melodyType: this.selectedMelodyTypes,
                    notes: []
                },
                user: this.user
            }
        );

        symphony.$save(function(response) {
            console.log(response);
            $location.path("symphonies/" + response._id);
        });

    };

  /*  Help messages and toggling */

    // Selects
    $scope.yearMoreHelp = false;
    $scope.runnerMoreHelp = false;
    $scope.locationsMoreHelp = false;
    $scope.instrumentsMoreHelp = false;

    // Toggle functions
    $scope.toggleYearMoreHelp = function toggleYearMoreHelp() {
      $scope.yearMoreHelp = !($scope.yearMoreHelp);
    };
    $scope.toggleRunnerMoreHelp = function toggleRunnerMoreHelp() {
      $scope.runnerMoreHelp = !($scope.runnerMoreHelp);
    };
    $scope.toggleLocationsMoreHelp = function toggleLocationsMoreHelp() {
      $scope.locationsMoreHelp = !($scope.locationsMoreHelp);
    };
    $scope.toggleInstrumentsMoreHelp = function toggleInstrumentsMoreHelp() {
      $scope.instrumentsMoreHelp = !($scope.instrumentsMoreHelp);
    };


/* Create Form Interaction Controls  */

    // Runner Range Select Part

    //Year Select
    $scope.yearOptions = [ {"value":"2013"}, {"value":"2011"}, {"value":"2010"}];
    //$scope.yearOptions = $scope.getYears();
    $scope.year = $scope.yearOptions[0];

    //Runner Range High Level Select
    $scope.rangeoptions = [ {"value":"Pros", "id": 2}, {"value":"All", "id": 1 }, {"value":"Custom", "id": 0} ];
    $scope.rangeValueOpt = $scope.rangeoptions[$scope.rangeoptions.length - 2];

    // Custom Options
    $scope.ranges = ['Pro Men', 'Pro Women', '0 - 9,999', '10,000 - 19,999', '20,000 - 29,999', '30,000 - 39,999', '40,000 - 49,999'];
    $scope.runnerRange = ['Pro Men', 'Pro Women', '0 - 9,999', '10,000 - 19,999', '20,000 - 29,999', '30,000 - 39,999', '40,000 - 49,999'];

    // toggle selection for a given range
    $scope.toggleSelection = function toggleRangeSelection(rangeValue) {
        console.log("selection toggled");
      var idx = $scope.runnerRange.indexOf(rangeValue);
      // is currently selected
      if (idx > -1) {
        $scope.runnerRange.splice(idx, 1);
      }
      // is newly selected
      else {
        $scope.runnerRange.push(rangeValue);
      }
    };

    // Location Select part

    // Location High Level Select
    $scope.locations = [ {"value":"Start", "id": 5 }, {"value":"Finish", "id": 4 }, {"value":"Odd Miles", "id": 3 }, {"value":"Even Miles", "id": 2 }, {"value":"All", "id": 1 }, {"value":"Custom", "id": 0} ];
    $scope.selectedLocations = $scope.locations[$scope.locations.length - 2];

    // Custom Options
    $scope.markers = ['Start', 'Mile 1', 'Mile 2', 'Mile 3', 'Mile 4', 'Mile 5', 'Mile 6', 'Mile 7', 'Mile 8', 'Mile 9', 'Mile 10', 'Mile 11', 'Mile 12', 'Mile 13', 'Mile 14', 'Mile 15', 'Mile 16', 'Mile 17', 'Mile 18', 'Mile 19', 'Mile 20', 'Mile 21', 'Mile 22', 'Mile 23', 'Mile 24', 'Mile 25', 'Mile 26', 'Finish'];
    $scope.markerSelection = ['Start', 'Mile 1', 'Mile 2', 'Mile 3', 'Mile 4', 'Mile 5', 'Mile 6', 'Mile 7', 'Mile 8', 'Mile 9', 'Mile 10', 'Mile 11', 'Mile 12', 'Mile 13', 'Mile 14', 'Mile 15', 'Mile 16', 'Mile 17', 'Mile 18', 'Mile 19', 'Mile 20', 'Mile 21', 'Mile 22', 'Mile 23', 'Mile 24', 'Mile 25', 'Mile 26', 'Finish'];
    
    // toggle selection for a given range
    $scope.toggleSelection = function toggleMarkerSelection(markerValue) {
      var idx = $scope.markerSelection.indexOf(markerValue);
      // is currently selected
      if (idx > -1) {
        $scope.markerSelection.splice(idx, 1);
      }
      // is newly selected
      else {
        $scope.markerSelection.push(markerValue);
      }
    };

    // Speed Select
    $scope.speed = 100;

    // Instrument High Level Select
    $scope.instrumentTypes = [ {"value":"Default", "id": 1 }, {"value":"Custom", "id": 0} ];
    $scope.selectedInstrumentTypes = $scope.instrumentTypes[$scope.instrumentTypes.length - 2];

    // Custom Options
    $scope.instruments = [ {"name":'Violin', "id": 0}, {"name":'Guitar', "id": 1}, {"name":'Harp', "id": 2}, {"name":'Trumpet', "id": 3}, {"name":'Timpani', "id": 4}, {"name":'Piano', "id": 5} ];
    $scope.selectedInstrument = $scope.instruments[5];

    // Melody High Level Select
    $scope.melodyTypes = [ {"value":"Harmonic", "id": 2 }, {"value":"Dissonant", "id": 1}, {"value":"Custom", "id":0} ];
    $scope.selectedMelodyTypes = $scope.melodyTypes[0];

    // Custom Options
    $scope.lastnums = [0,1,2,3,4,5,6,7,8,9];
    $scope.notes = [ {"name":"A", "id": 0}, {"name":"A#", "id":1}, {"name":"B", "id":2}, {"name":"C", "id":3}, {"name":"C#", "id":4}, {"name":"D", "id":5}, {"name":"D#", "id":6}, {"name":"E", "id":7}, {"name":"F", "id":8}, {"name":"F#", "id":9}, {"name":"G", "id":10}, {"name":"G#", "id":11}];
    $scope.selectedNote = $scope.notes[3];
  
}]);