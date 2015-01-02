var dateRegexs = [
	/^\d{8}.+\.\w+/,
	/^\d{4}[.-]\d{2}[.-]\d{2}.+\.\w+/
];

module.exports = function hasNotDate(filename) {
	return dateRegexs.every(function(rxp) {
		return filename.match(rxp) === null;
	});
};