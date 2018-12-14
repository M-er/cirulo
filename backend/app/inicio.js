// var app = angular.module('inicioApp', ['ngMaterial','ngRoute']);
// app.config(['routeProvider', function($routeProvider) {
//   $routeProvider.when("/aranceles", {templateUrl: "templates/aranceles.html"});
//   $routeProvider.when("/liquidaciones", {templateUrl: "templates/liquidaciones.html"});
//   $routeProvider.when("/remitos", {templateUrl: "templates/remitos.html"});
//   $routeProvider.otherwise({redirectTo: "/aranceles"});
// }]);
// app.controller('inicioCtrl', function($scope, $q, $http, $location, $log) {
//   $scope.selectedIndex = 0;
//   $scope.$watch('selectedIndex', function(current, old) {
//     switch(current) {
//       case 0: $location.url("/aranceles"); break;
//       case 1: $location.url("/liquidaciones"); break;
//       case 2: $location.url("/remitos"); break;
//     }
//     $scope.init = function(){};
//   });
// });
// $(document).ready(function() {
//   init();
// });
// function init(){
//   console.log("Inicio cargado")
// }

(function(angular, undefined){
  "use strict";
  angular.module('inicioApp', ['ngMaterial', "ngRoute"])
  .config(["$routeProvider", function($routeProvider) {
    $routeProvider.when("/aranceles", {templateUrl: "templates/aranceles.html"});
    $routeProvider.when("/liquidaciones", {templateUrl: "templates/liquidaciones.html"});
    $routeProvider.when("/remitos", {templateUrl: "templates/remitos.html"});
    $routeProvider.when("/404", {templateUrl: "templates/404.html"});
    $routeProvider.otherwise({redirectTo: "/aranceles"});
  }])
  /**
  *  Simple controller to build a `user` data model
  *  that will be used to databinding with `<tf-float>` directives
  */
  .controller('inicioCtrl',function($scope, $location, $log){
    $scope.selectedIndex = 0;
    $scope.cambio = function(donde){
      switch (donde) {
        case 'aranceles':
        $location.url("/aranceles");
        break;
        case 'liquidaciones':
        $location.url("/liquidaciones");
        break;
        case 'remitos':
        $location.url("/remitos");
        break;
        default:
        $location.url("/404");
        break;
      }
    }
    $scope.querySearch = function(query) {
      var deferred;
      deferred = $q.defer();

      $http.get('../api/registros/busca/'+query).then( function(resultado){
        deferred.resolve( resultado['data']['data'] );
      }
    ).catch(function(resultado){
      deferred.reject(resultado);
    });
    return deferred.promise;
  }
  $scope.searchTextChange = function(text) {}
  $scope.selectedItemChange = function(item) {
    if(item && $scope.companias){
      var quiero = parseInt(item.ciaID);
      var tengo = "";
      var sigo = true;
      for(var j=0; j<$scope.companias.length && sigo; j++){
        tengo = parseInt($scope.companias[j].CompaniaId);
        if(tengo == quiero){
          sigo = false;
          selectedUser = item;
          selectedUser.ciaTxt = $scope.companias[j].Denominacion;
        }
      }
    }
  }
  
});

})(angular);
