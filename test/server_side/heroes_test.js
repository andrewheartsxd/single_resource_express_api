'use strict';

process.env.MONGO_URI = 'mongodb://localhost/heroesapp_test';
require('../../server.js');
var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);

var expect = chai.expect;

describe('heroes api end points', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() { 
      done();
    });
  });

  it('should respond to a post request', function(done) {
    chai.request('localhost:3000/api/v1')
      .post('/heroes')
      .send({hero: 'cyclops', identity: 'scott summers'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('_id');
        expect(res.body.hero).to.eql('cyclops');
        expect(res.body.identity).to.eql('scott summers');
        done();
      });
  });

  it('should have a default identity', function(done) {
    chai.request('localhost:3000/api/v1')
      .post('/heroes')
      .send({hero: 'cyclops'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.identity).to.eql('Unknown');
        done();
      });
  });

  describe('already has data in database', function() {
    var id;
    before(function(done) {
      chai.request('localhost:3000/api/v1')
        .post('/heroes')
        .send({hero: 'cyclops'})
        .end(function(err, res) {
          id = res.body._id;
          done();
        });
    });

    it('should have an index', function(done) {
      chai.request('localhost:3000/api/v1')
        .get('/heroes')
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(Array.isArray(res.body)).to.be.true;
          expect(res.body[0]).to.have.property('hero');
          done();
        });
    });

    it('should be able to update a hero', function(done) {
      chai.request('localhost:3000/api/v1')
        .put('/heroes/' + id)
        .send({hero: 'cable'})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.hero).to.eql('cable');
          done();
        });
    });

    it('should be able to delete a hero', function(done) {
      chai.request('localhost:3000/api/v1')
        .delete('/heroes/' + id)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('Deleted ' + id);
          done();
        });
    });
  });
});

