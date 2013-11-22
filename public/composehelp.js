/* 
    * Help messages
    *
    * These are the variables and functions 
    * for toggling the extra help
    */

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