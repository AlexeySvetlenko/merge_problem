var merge = require('../merge');
var expect = require("chai").expect;
var assert = require('assert');

/*
Write a function that will recursively merge two objects with the following conditions:
1.) If a[field] is an array, and b[field] is defined and is not an array, add b[field] to the array
2.) If a[field] is an array an b[field] exists but is undefined or null, set a[field] to an empty array
3.) If a[filed] is an array and b[field] is an array, set a[field] to b[field]
4.) If a[field] exists and b[field] exists but is undefined, delete a[field]
5.) If b[field] is a non-complex type (number, string, boolean, et cetera), copy to a[field]

Example:
var a = {
	first_name: 'Bob',
	last_name: 'Joness',
	
	email: 'bob@gmail.com',
	
	address: {
		line_1: '1234 Main St',
		line_2: 'Apt 413',
		city: 'Los Angeles',
		state: 'CA',
		zip: '90048'
	},
	
	logins: [
		{ date: '10/22/2012', ip: '192.168.0.1' },
		{ date: '10/21/2012', ip: '192.168.0.1' }
	],
	
	photos: [
		'IMG-1985.jpg',
		'IMG-1987.jpg'
	]
}
	var b = {
	last_name: 'Jones',
	active: true,

	address: {
		line_1: '2143 South Main St',
		line_2: undefined
	},
	
	logins: { date: '10/23/2012', ip: '192.168.0.1' },
	
	photos: undefined
}


Result: {
	first_name: 'Bob',
	last_name: 'Jones',
	
	active: true,
	email: 'bob@gmail.com',
	
	address: {
		line_1: '2143 South Main St',
		city: 'Los Angeles',
		state: 'CA',
		zip: '90048'
	},
	
	logins: [
		{ date: '10/22/2012', ip: '192.168.0.1' },
		{ date: '10/21/2012', ip: '192.168.0.1' },
		{ date: '10/23/2012', ip: '192.168.0.1' }
	],
	
	photos: []
}
 
Assumptions: 
1.)	You can assume you are working in node; e.g. you have access to array methods such as .some and .forEach, and you do not have to worry about browser compatibility issues
2.)	You do not have access to utilities such as lodash or underscore

*/
describe("MergeTest", function() {

    // initial input
    it("works for the problem set-up (MANDATORY)", function() {
		var a = {
			first_name: 'Bob',
			last_name: 'Jones',
			
			email: 'bob@gmail.com',
			
			address: {
				line_1: '1234 Main St',
				line_2: 'Apt 413',
				city: 'Los Angeles',
				state: 'CA',
				zip: '90048'
			},
			
			logins: [
				{ date: '10/22/2012', ip: '192.168.0.1' },
				{ date: '10/21/2012', ip: '192.168.0.1' }
			],
			
			photos: [
				'IMG-1985.jpg',
				'IMG-1987.jpg'
			]
		};

		var b = {
			last_name: 'Jones',
			active: true,

			address: {
				line_1: '2143 South Main St',
				line_2: undefined
			},
			
			logins: { date: '10/23/2012', ip: '192.168.0.1' },
			
			photos: undefined
		};
    	var expected = {
			first_name: 'Bob',
			last_name: 'Jones',

			active: true,
			email: 'bob@gmail.com',
			address: {
				line_1: '2143 South Main St',
				city: 'Los Angeles',
				state: 'CA',
				zip: '90048'	
			},

			logins: [
				{ date: '10/22/2012', ip: '192.168.0.1' },
				{ date: '10/21/2012', ip: '192.168.0.1' },
				{ date: '10/23/2012', ip: '192.168.0.1' }
			],
			photos: []
		};

        var retval = merge(a,b);
        expect(expected).to.deep.equal(retval);

	});

    // 1.) If a[field] is an array, and b[field] is defined and is not an array, add b[field] to the array
    it("adds a field to the array on a merge with a non-complex field (MANDATORY)", function() {
        var a = {arr_field: ['a', 'b']};
        var b = {arr_field: 'c'};
        var expected = {arr_field: ['a','b','c']};
        var retval = merge(a,b);
        expect(expected).to.deep.equal(retval);
    });

    // 2a.) If a[field] is an array an b[field] exists but is undefined or null, set a[field] to an empty array
    it("empties array on a merge with an undefined (MANDATORY)", function() {
        var a = {arr_field: ['a', 'b']};
        var b = {arr_field: undefined};
        var expected = {arr_field: []};
        var retval = merge(a,b);
        expect(expected).to.deep.equal(retval);
    });

    // 2b.) If a[field] is an array an b[field] exists but is undefined or null, set a[field] to an empty array
    it("empties array on a merge with a null (MANDATORY)", function() {
        var a = {arr_field: ['a', 'b']};
        var b = {arr_field: null};
        var expected = {arr_field: []};
        var retval = merge(a,b);
        expect(expected).to.deep.equal(retval);
    });

    // 3.) If a[filed] is an array and b[field] is an array, set a[field] to b[field]
    it("replaces one array with another on a merge of two arrays (MANDATORY)", function() {
        var a = {arr_field: ['a', 'b']};
        var b = {arr_field: ['c', 'd']};
        var expected = {arr_field: ['c','d']};
        var retval = merge(a,b);
        expect(expected).to.deep.equal(retval);
    });

    // 4.) If a[field] exists and b[field] exists but is undefined, delete a[field]
    it("deletes a field on a merge of an undefined value (MANDATORY)", function() {
        var a = {a_field: 'a'};
        var b = {a_field: undefined};
        var expected = {};
        var retval = merge(a,b);
        expect(expected).to.deep.equal(retval);
    });

    // 5.) If b[field] is a non-complex type (number, string, boolean, et cetera), copy to a[field]
    it("overwrites a field on a merge of a non-complex value for the same field (MANDATORY)", function() {
        var a = {a_field: 'a'};
        var b = {a_field: 'b'};
        var expected = {a_field: 'b'};
        var retval = merge(a,b);
        expect(expected).to.deep.equal(retval);
    });

    // it("ignore complex types on dest if src is not complex type(VAGUE DEFINITION)", function() {
    //     // ignore complex types on dest if src is not complex type
    //     var a = {a_field: 'a'};
    //     var b = {a_field: {x_field: 'x'}};

    //     var expected = {a_field: 'a'};
    //     var retval = merge(a,b);
    //     expect(expected).to.deep.equal(retval);
    // });

    it("copies non-existing simple types (MANDATORY)", function() {
        // ignore complex types on dest if src is not complex type
        var a = {};
        var b = {a_field: 'x'};

        var expected = {a_field: 'x'};
        var retval = merge(a,b);
        expect(expected).to.deep.equal(retval);
    });

    it("copies non-existing complex types (MANDATORY)", function() {
        // ignore complex types on dest if src is not complex type
        var a = {};
        var b = {a_field: {x_field: 'x'}};

        var expected = {a_field: {x_field: 'x'}};
        var retval = merge(a,b);
        expect(expected).to.deep.equal(retval);
    });

    // recursive case
    it("merges objects recursively (MANDATORY)", function() {
        var a = {obj_field: {a_field:'a'}};
        var b = {obj_field: {a_field:'b'}};
        var expected = {obj_field: {a_field:'b'}};
        var retval = merge(a,b);
        expect(expected).to.deep.equal(retval);
    });

    it("keeps existing dest fields untouched during the merge if no matching src fields exist (MANDATORY)", function() {
        var a = {obj_field: {a_field:'a'}, e_field: 'keep me'};
        var b = {obj_field: {a_field:'b'}};
        var expected = {obj_field: {a_field:'b'}, e_field: 'keep me'};
        var retval = merge(a,b);
        expect(expected).to.deep.equal(retval);
    });


    it("hadles dest and src null values", function() {
        var a = null;
        var b = null;
        var expected = null;
        var retval = merge(a,b);
        expect(expected).to.equal(retval);
    });

    it("hadles dest null values", function() {
        var a = null;
        var b = {a_field: 'x'};
        var expected = {a_field: 'x'};  
        var retval = merge(a,b);
        expect(expected).to.deep.equal(retval);
    });

    it("hadles src null values", function() {
        var a = {a_field: 'x'};
        var b = null;
        var expected = {a_field: 'x'};
        var retval = merge(a,b);
        expect(expected).to.deep.equal(retval);
    });

    it("hadles dest and src undefined values", function() {
        var a;
        var b;
        var expected;
        var retval = merge(a,b);
        expect(expected).to.deep.equal(retval);
    }); 

    it("hadles undefined src values", function() {
        var a = {a_field: 'x'};
        var b;
        var expected = {a_field: 'x'};
        var retval = merge(a,b);
        expect(expected).to.deep.equal(retval);
    }); 

    it("hadles undefined dest values", function() {
        var a;
        var b = {a_field: 'x'};
        var expected = {a_field: 'x'};
        var retval = merge(a,b);
        expect(expected).to.deep.equal(retval);
    }); 

    it("overwrites nulls with simple values", function() {
        var a = { f1: null };
        var b = { f1: 'b'};
        var expected = { f1: 'b'};
        var retval = merge(a,b);
        expect(expected).to.deep.equal(retval);
    }); 

    it("overwrites simple values with nulls", function() {
        var a = { f1: 'a' };
        var b = { f1: null};
        var expected = { f1: null};
        var retval = merge(a,b);
        expect(expected).to.deep.equal(retval);
    }); 

    it("overwrites complex values with nulls", function() {
        var a = { c1: { f1: 'a' }};
        var b = { c1: null};
        var expected = { c1: null};
        var retval = merge(a,b);
        expect(expected).to.deep.equal(retval);
    }); 

    it("overwrites nulls with complex values ", function() {
        var a = { c1: null};
        var b = { c1: { f1: 'b' }};
        var expected = { c1: { f1: 'b' }};
        var retval = merge(a,b);
        expect(expected).to.deep.equal(retval);
    }); 

    it("skips functions (OPTIONAL)", function() {
        var a = {};
        var b = {f: function(a,b) { return a+b; }};
        var expected = {};
        var retval = merge(a,b);
        expect(expected).to.deep.equal(retval);
    });

    it("copies prototype properties (OPTIONAL)", function() {
        function B() {}
        var a = {f1: 'a'};
        var b = new B();
        b.constructor.prototype.f2 = "pb";
        b.f3 = 'b';

        var expected = {f1: 'a', f2: 'pb', f3: 'b'};
        var retval = merge(a,b);
        expect(expected).to.deep.equal(retval);
    });

});


