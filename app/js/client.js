'use strict';

require('angular/angular');

var heroApp = angular.module('heroApp', []);

require('./heroes/controllers/heroes_controller')(heroApp);
