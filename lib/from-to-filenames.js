var ExifImage = require('exif').ExifImage;
var VError = require('verror');

// '2014:07:28 18:00:04'
function dateOfTimestampStr(dateStr) {
	return dateStr.substr(0, 4) + dateStr.substr(5, 2) + dateStr.substr(8, 2);
}

module.exports = function(fromName, cb) {
	new ExifImage({ image : fromName }, function (err, exifData) {
        if (err) {
        	return cb(new VError(err, 'Could not read exif of '+ fromName));
        }

        var toName = dateOfTimestampStr(exifData.exif.DateTimeOriginal) +'-'+ fromName;

        cb(null, {
        	from: fromName,
        	to: toName
    	});
    });
};