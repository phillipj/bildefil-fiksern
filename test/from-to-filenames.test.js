var assert = require('assert');
var fs = require('fs');
var moment = require('moment');

var fromToFilenames = require('../lib/from-to-filenames');

var IMG_WITH_EXIF = 'img-with-exif.jpg';
var IMG_WITHOUT_EXIF = 'img-without-exif.jpg';

describe('Util: from-to-filenames(filepath, cb)', function() {

	var withoutExifStat;

	before(function(done) {
		this.prevCwd = process.cwd();
		process.chdir(__dirname);

		fs.stat(IMG_WITHOUT_EXIF, function(err, stat) {
			withoutExifStat = stat;
			done(err);
		});
	});

	after(function() {
		process.chdir(this.prevCwd);
	});

	describe('given EXIF data exists', function() {

		it('yields without error when given image with EXIF data', function(done) {
			fromToFilenames(IMG_WITH_EXIF, function(err, obj) {
				assert.deepEqual(err, null, 'Yielded with error === null');
				done();
			});
		});

		it('generates to-name starting with image created date', function(done) {
			fromToFilenames(IMG_WITH_EXIF, function(err, obj) {
				assert.equal(0, obj.to.indexOf('20111231-'), 'Starts with original image created date');
				done();
			});
		});

	});

	describe('given EXIF does not exist', function() {

		it('yields without error when given image without EXIF data', function(done) {
			fromToFilenames(IMG_WITHOUT_EXIF, function(err, obj) {
				assert.deepEqual(err, null, 'Yielded with error === null');
				done();
			});
		});

		it('generates to-name starting with file created date', function(done) {
			var expectedStart = moment(withoutExifStat.ctime).format('YYYYMMDD-');

			fromToFilenames(IMG_WITHOUT_EXIF, function(err, obj) {
				assert.equal(0, obj.to.indexOf(expectedStart), 'Starts with original file created date');
				done();
			});
		});

	});

});