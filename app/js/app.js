'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute'
]).value('categoryList', ["Food", "Fuel", "Grocery", "Entertainment"]).factory('expService', [function () {
        var prefix = 'exp-mgr';
        return {
            saveExpense: function (data) {
                var timeStamp = Math.round(new Date().getTime());
                var key = prefix + timeStamp;

                data = JSON.stringify(data);
                localStorage[key] = data;
            },

                getExpense: function () {
                var expenses = [];
                var prefixLength = prefix.length;
                Object.keys(localStorage)
                    .forEach(function (key) {
                        if (key.substring(0, prefixLength) == prefix) {
                            var item = window.localStorage[key];
                            item = JSON.parse(item);
                            expenses.push(item);
                        }
                    });

                return expenses;
            }


        };
}])
    .controller('HomeCtrl', function () {

    }).controller('AddExpenseCtrl', ['$scope', 'categoryList', 'expService', function ($scope, categoryList, expService) {
            $scope.categories = categoryList;
            $scope.submit = function () {

                expService.saveExpense($scope.expense);
            };
    }
]).controller('ViewSummaryCtrl', ['$scope', 'expService', function ($scope, expService) {
            $scope.expenses = expService.getExpense();

    }
])
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