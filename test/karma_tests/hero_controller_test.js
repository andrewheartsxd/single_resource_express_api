'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('hero controller', function() {
  var $ControllerConstructor;
  var $httpBackend;
  var $scope;

  beforeEach(angular.mock.module('heroApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var heroController = $ControllerConstructor('heroController', {$scope: $scope});
    expect(typeof heroController).toBe('object');
    expect(Array.isArray($scope.heroes)).toBe(true);
  });

  describe('REST requests', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should have a getAll function', function() {
      $httpBackend.expectGET('/api/v1/heroes').respond(200, [{hero: 'cyclops'}]);

      var heroController = $ControllerConstructor('heroController', {$scope: $scope});
      $scope.getAll();
      $httpBackend.flush();

      expect($scope.heroes[0].hero).toBe('cyclops');
    });

    it('should be able to save', function() {
      $httpBackend.expectPOST('/api/v1/heroes').respond(200, {_id: 1, hero: 'cyclops'});

      $ControllerConstructor('heroController', {$scope: $scope});
      $scope.create({hero: 'cyclops'});
      $httpBackend.flush();

      expect($scope.heroes[0]._id).toBe(1);
    });

    it('should be able save hero changes', function() {
      $httpBackend.expectPUT('/api/v1/heroes/1').respond(200);

      var heroController = $ControllerConstructor('heroController', {$scope: $scope});
      var hero = {hero: 'cable', _id: 1, editing: true}; 
      $scope.save(hero);
      $httpBackend.flush();

      expect(hero.editing).toBe(false);
    });

    it('should be able to delete a hero', function() {
      $httpBackend.expectDELETE('/api/v1/heroes/1').respond(200);

      $ControllerConstructor('heroController', {$scope: $scope});
      var hero = {hero: 'cable', _id: 1};
      $scope.heroes.push(hero);
      $scope.remove(hero);
      $httpBackend.flush();
      
      expect($scope.heroes.length).toBe(0);
    });
  });
});
