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
function merge(a, b) {
	return { ...a, ...b }; // TBD merge implementation and return the result of the merge operations
}

module.exports = merge;