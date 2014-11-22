var path = require('path');

var imgExts = ['.jpg', '.jpeg'];

module.exports = function isImage(imagePath) {
	var ext = path.extname(imagePath).toLowerCase();
	return imgExts.indexOf(ext) > -1;
};