#!/usr/bin/env node

var fs = require('fs');
var async = require('async');

var isImage = require('../lib/is-image');
var hasNotDate = require('../lib/has-not-date');
var createFromAndToFileNames = require('../lib/from-to-filenames');

function findAllImageFiles(cb) {
	return fs.readdir(process.cwd(), function(err, files){
		if (err) return cb(new VError(err, 'Could not find any image files'));
		cb(null, files.filter(isImage));
	});
}

function excludeFilenamesWithDate(allFiles, cb) {
	cb(null, allFiles.filter(hasNotDate));
}

function generateFileNamesFromExif(fromNames, cb) {
	var operations = fromNames.map(function(fromName) {
		return function doReadExif(cb) {
			createFromAndToFileNames(fromName, cb);
		};
	});

	async.parallel(operations, cb);
}

function renameFiles(results, cb) {
	var operations = results.map(function(fileObj) {
		return function doRenameFile(cb) {
			console.log(fileObj.from, '--->', fileObj.to);
			fs.rename(fileObj.from, fileObj.to, cb);
		};
	});

	async.series(operations, cb);
}

function displayStatus(err) {
	if (err) {
		console.error('HUFFDA! Skjedde visst no feil her...');
		return console.error('Nerdeinfo, teknisk årsak:', err.stack);
	}

	console.log('\n\n Ferdig!! :)');
}

async.waterfall([
		findAllImageFiles,
		excludeFilenamesWithDate,
		generateFileNamesFromExif,
		renameFiles
	],
	displayStatus
);