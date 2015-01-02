var fs = require('fs');
var moment = require('moment');
var ExifImage = require('exif').ExifImage;
var VError = require('verror');

// '2014:07:28 18:00:04'
function dateOfTimestampStr(dateStr) {
	return dateStr.substr(0, 4) + dateStr.substr(5, 2) + dateStr.substr(8, 2);
}

// <Date> -> '2014:07:28 18:00:04'
function dateToTimestampStr(dateObj) {
    return moment(dateObj).format('YYYY:MM:DD HH:mm:ss');
}

function origDateFromExif(filename, fallbackCb, finishedCb) {
    new ExifImage({ image : filename }, function (err, exifData) {
        if (err) return fallbackCb(filename, finishedCb);

        var createdDate = exifData.exif.DateTimeOriginal;
        if (createdDate === '0000:00:00 00:00:00') {
            return fallbackCb(filename, finishedCb);
        }
        finishedCb(null, createdDate);
    });
}

function orGetFileCreated(filepath, cb) {
    fs.stat(filepath, function(err, stat) {
        if (err) return cb(err);

        cb(null, dateToTimestampStr(stat.ctime));
    });
}

module.exports = function(filepath, cb) {
    origDateFromExif(filepath, orGetFileCreated, function(err, dateStr) {
        if (err) return cb(new VError(err, 'Could not read EXIF data or file created date from '+ filepath));

        cb(null, {
            from: filepath,
            to: dateOfTimestampStr(dateStr) +'-'+ filepath
        });
    });
};