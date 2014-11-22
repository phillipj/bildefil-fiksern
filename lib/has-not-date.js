var dateRegex = /^\d{8}-.+\.\w+/;

module.exports = function hasNotDate(filename) {
	return filename.match(dateRegex) === null;
};