'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute'
]).controller('HomeCtrl', function () {

    })
    .config(['$routeProvider',
  function ($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: 'partials/home.html',
                controller: 'HomeCtrl'
            });
            $routeProvider.when('/add-expense', {
                templateUrl: 'partials/add-expense.html',
                controller: 'AddExpenseCtrl'
            });
            $routeProvider.when('/view-summary', {
                templateUrl: 'partials/view-summary.html',
                controller: 'ViewSummaryCtrl'
            });
            $routeProvider.otherwise({
                redirectTo: '/'
            });
  }
]);