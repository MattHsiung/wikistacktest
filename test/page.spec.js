var models = require('../models');
var Page = models.Page;
var page;
var expect = require('chai').expect;
var chai = require('chai');
var spies = require('chai-spies');
var supertest = require('supertest');
var app = require('../app');
var agent = supertest.agent(app);
chai.use(spies);


beforeEach(function() {
    page = new Page()

})


it('errors without title', function(done) {
    page.validate(function(err) {
        expect(err.errors).to.have.property('title')
        done()
    })
})

beforeEach(function(done) {

    Page.create({
        title: 'foo',
        content: 'bar',
        tags: ['foo', ]
    }).then(function(){
        Page.create({
            title: 'foo2',
            content: 'bar2',
            tags: ['foo', 'bar']
        })   
    }).then(function(){
        Page.create({
            title: 'foo3',
            content: 'bar3',
            tags: ['foobar']
        })    
    }).then(function(){
        Page.create({
            title: 'foo is bar',
            content: '### bar3',
            tags: ['foobar']
        })  
    }).then(done,done)


})

afterEach(function (done){
   	Page.remove({},done)
})


describe('Add a page', function () {
    describe('Form works', function () {
        xit('gets author', function () {});
        xit('gets title' , function () {});
    });
    describe('Validation', function () {
        xit('Needs title', function () {});
        xit('Needs Content' , function () {});
        xit('Generates url' , function () {});
    });
    describe('Statics', function () {
        it('Find by tag', function (done) {
        	Page.findByTag('bar').then(function(result){
        		// console.log(result)
        		expect(result[0].title).to.equal('foo2')
        		done()
        	}).then(null, done);
        });

        it('Find multiple by tag', function () {
        	Page.findByTag('foo').then(function(result){
        		expect(result.length).to.equal(2)
        	})
        });

        xit('Find or create' , function () {});
    });

});



describe('Methods', function () {
	describe('Find Similar', function () {
        it('finds simlar by tags', function (done) {
        	Page.findOne({ title:'foo' })
        	.then(function (page) {
                return page.findSimilar().then(function(result){
        			console.log(result)
    				expect(result.length).to.equal(1)
        		}).then(done)
	        })       
        });
    });    
});

describe('Virtuals', function () {
	describe('hooks', function () {
        it('finds correct route', function (done) {
        	Page.findOne({ title:'foo' })
        	.then(function (page) {
        			// console.log(page)
    				expect(page.route).to.equal('/wiki/foo')
	        }).then(done)   	
        });
        it('finds correct route with hook', function (done) {
        	Page.findOne({ title:'foo is bar' })
        	.then(function (page) {
        			// console.log(page)
    				expect(page.route).to.equal('/wiki/foo_is_bar')
	        }).then(done)   	
        });
    });
    describe('rendered content', function () {
        it('renders html', function (done) {
            Page.findOne({ title:'foo is bar' })
            .then(function (page) {
                console.log(page.renderedContent)
                expect(page.renderedContent).to.equal('<h3 id="bar3">bar3</h3>\n')
            }).then(done,done)
                
        
            // }).end(function(err, res){
            //         if (err) return done(err);
                    
            //         expect(res).to.equal("xx")
            //      done()   
            // })  
        });
    });
});


    







