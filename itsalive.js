var expect = require('chai').expect;
var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);


describe('does math', function(){
	it('addition', function(){
		expect(2+2).to.equal(4)	
	})
})

describe('async', function(){
	it('compares time', function(done){
		setTimeout(done, 1000)
	})
})

describe('spies', function(){
	it('for each', function(){
		var arr = [1,2,3,4,5]
		var newArr=[]
		function doubler(el){
			newArr.push(el*2)
		}
		doubler =chai.spy(doubler);

		arr.forEach(doubler)

	    expect(doubler).to.have.been.called.exactly(arr.length);

		// expect(newArr).to.equal([2,4,6,8,10])

	})
})

