var models = require('../models');
var Page = models.Page;
var page;
var expect = require('chai').expect;
var chai = require('chai');
var spies = require('chai-spies');
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
    })

    Page.create({
        title: 'foo2',
        content: 'bar2',
        tags: ['foo', 'bar']
    })

    Page.create({
        title: 'foo3',
        content: 'bar3',
        tags: ['foobar']
    }, done )
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
        it('finds simlar by tags', function () {
        	Page.findOne({ title:'foo' })
        	.then(function (page) {
	                return page.findSimilar().then(function(result){
	                	console.log(result)}
	        	)
	        })        
	        // .then(function(result){
	        // 	console.log(result)
        	// 	// expect(result.length).to.equal(1)

	        // });
        });
        xit('does not find self' , function () {});
    });
    
});

// describe('Routes', function () {
// 	describe('POST WIKI', function () {
//         xit('return 200', function () {});
//         xit('return 200', function () {});
//         xit('return 200', function () {});
//     });
//     describe('rendered content', function () {
//         xit('renders html', function () {});
//     });
// });


// describe('Virtuals', function () {
// 	describe('route', function () {
//         xit('finds correct route', function () {});
//     });
//     describe('rendered content', function () {
//         xit('renders html', function () {});
//     });
// });




