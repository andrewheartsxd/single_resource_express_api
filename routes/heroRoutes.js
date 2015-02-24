'use strict';
var Hero = require('../models/Hero');
var bodyparser = require('body-parser');



module.exports = function(app) {
  app.use(bodyparser.json());

  app.get('/heroes', function(request, response) {
    Hero.find({}, function(err, data) {
      if (err) return response.status(500).send({'msg': 'could not retrieve heroes'});
      
      response.json(data);
    });
  });

  app.post('/heroes', function(request, response) {
    var newHero = new Hero(request.body);
    newHero.save(function(err, hero) {
      if (err) return response.status(500).send({'msg': 'could not save hero'});
      
      response.json(hero);
    });
  });

  app.put('/heroes/:id', function(request, response) {
    var updatedHero = request.body;
    delete request.body._id;
    Hero.update({_id: request.params.id}, updatedHero, function(err, data) {
      if (err) return response.status(500).send({'msg': 'could not update hero'});

      response.json(request.body);
    });
  });

  app.delete('/heroes/:id', function(request, response) {
    Hero.remove({_id: request.params.id}, function(err) {
      console.log(request.params.id);
      if (err) {
        return response.status(500).send({'msg': 'could not delete hero'});
      } else {
        response.json({'msg': 'Deleted ' + request.params.id});
      }
    });
  });
};
