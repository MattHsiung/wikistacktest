var models = require('../models');
var Page = models.Page;
var page;
var expect = require('chai').expect;
var chai = require('chai');
var spies = require('chai-spies');
var supertest = require('supertest');
var app = require('../app');
var agent = supertest.agent(app);


describe('http requests', function(done) {

    describe('GET /', function() {
        it('gets 200', function(done) {
        	agent
          		.get('/')
          		.expect(200, done)
        });
    });

    describe('GET /add', function () {
        it('gets 200', function (done) {
        	agent
          		.get('/wiki/add')
          		.expect(200, done)
        });
    });

    describe('GET /wiki/:urlTitle', function() {
        it('gets 404 on page that doesnt exist', function(done) {
        	agent
          		.get('/wiki/silly')
          		.expect(404, done)
        });
        it('gets 200 on page that does exist', function(done) {
        	agent
          		.get('/wiki/foo')
          		.expect(200, done)
        });
    });

    describe('GET /wiki/search', function() {
        it('gets 200', function(done) {
        	agent
          		.get('/wiki/search')
          		.expect(200, done)
        });
    });

    describe('GET /wiki/:urlTitle/similar', function() {
        it('gets 404 for page that doesn\'t exist', function(done) {
        	agent
          		.get('/wiki/fooby/similar')
          		.expect(404, done)
        });
        it('gets 200 for similar page', function(done) {
        	agent
          		.get('/wiki/foo/similar')
          		.expect(200, done)
        });
    });


    describe('GET /wiki/add', function() {
        it('gets 200', function(done) {
        	agent
          		.get('/wiki/add')
          		.expect(200, done)
        });
    });

    
    describe('POST /wiki/', function(done) {
        it('creates a page in db', function(done) {
        	agent
          		.post('/wiki/')
          		.send( {
          				name: 'matt',
          				email: 'email@matt',
          				title: 'Fooby',
          				content: 'stuff',
          				tags: 'hey'
          			}
          		)
          		.expect(302)
          		.end(function(err, res){
          			if (err) return done(err);
    				
    				Page.findOne({title:'Fooby'})
  					.then(function(page){
  						console.log(page)
      					return page;
      				}).then(function(page){
          				expect(page.title).to.equal('Fooby')
        				done();
      				})
          		})



          		
          			
        		// .expect(Page.findOne({title:'Fooby'}).to.have.length(1))

        });
    });

});