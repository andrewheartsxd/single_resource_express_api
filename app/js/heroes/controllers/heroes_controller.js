'use strict';

module.exports = function(app) {
  app.controller('heroController', ['$scope', '$http',  function($scope, $http) {
    $scope.heroes = [];
    $scope.getAll = function() {
      $http({
        method: 'GET',
        url: '/api/v1/heroes'
      }) 
      .success(function(data) {
        $scope.heroes = data;
      })
      .error(function(data, status) {
        console.log(data);
      });
    };

    $scope.create = function(hero) {
      $http({
        method: 'POST',
        url: '/api/v1/heroes',
        data: hero
      })  
      .success(function(data) {
        $scope.heroes.push(data);
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.save = function(hero) {
      $http({
        method: 'PUT',
        url: '/api/v1/heroes/' + hero._id,
        data: hero
      })
      .success(function() {
        hero.editing = false;
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.remove = function(hero) {
      $http({
        method: 'DELETE',
        url: '/api/v1/heroes/' + hero._id,
      })
      .success(function() {
        $scope.heroes.splice($scope.heroes.indexOf(hero), 1);  
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.editToggle = function(hero) {
      if (hero.editing) {
        hero.hero = hero.oldHero;
        hero.editing = false;
      } else {
        hero.oldHero = hero.hero;
        hero.editing = true;
      }
    };

  }]);
};
