module.exports.notFound = (req, res, next) => {
	try {
		res.render('404', {
			title: 'Error 404',
		});
	} catch (err) {
		return next(err);
	}
};

module.exports.internalError = (req, res, next) => {
	try {
		res.render('500', {
			title: 'Error 500',
		});
	} catch (err) {
		return next(err);
	}
};

