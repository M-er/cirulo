var app = angular.module('indexApp', ['ngMaterial']);
app.controller('indexCtrl', function($scope, $mdToast, $timeout, $q, $log, $http, $window) {
  
  $scope.closeToast = function() {
    $mdToast.hide();
  };
  $scope.tostado = function(texto,tipo) {
    $mdToast.show(
      $mdToast.simple()
      .toastClass('md-toast-'+tipo)
      .textContent(texto)
      .position('bottom left')
      .hideDelay(3000)
    );
  };
});
$(document).ready(function() {
  init();
});
function init(){
  console.log("index.html");
}
