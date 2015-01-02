var assert = require('assert');

var hasNotDate = require('../lib/has-not-date');

describe('Util: has-not-date(filename)', function() {

	it('returns true when filename is IMG_1234.jpg', function() {
		assert(hasNotDate('IMG_1234.jpg'));
	});

	it('returns false when filename is 20150101-IMG_1234.jpg', function() {
		assert(!hasNotDate('20150101-IMG_1234.jpg'));
	});

	it('returns false when filename is 2015.01.01-IMG_1234.jpg', function() {
		assert(!hasNotDate('2015.01.01-IMG_1234.jpg'));
	});

	it('returns false when filename is 2015.01.01 IMG_1234.jpg', function() {
		assert(!hasNotDate('2015.01.01 IMG_1234.jpg'));
	});

	it('returns false when filename is 2015-01-01 IMG_1234.jpg', function() {
		assert(!hasNotDate('2015-01-01 IMG_1234.jpg'));
	});

});