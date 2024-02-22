exports.handleNonexistentEndpoint = (req, res, next) => {
    res.status(404).send({ msg: 'Not found' });
}

exports.handleCustomErrors = (err, req, res, next) => {
    console.log(err);
    if (err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg});
    }
    next(err);
}

exports.handlePsqlErrors = (err, req, res, next) => {
    console.log(err);
    if (err.code === '22P02') {
        res.status(400).send({ msg: 'Bad request' });
    } else if (err.code === '23503') {
        res.status(404).send({ msg: 'Not found' });
    }
    next(err);
}


exports.handleServerErrors = (err, req, res, next) => {
    console.log(err);
    res.status(500).send({ msg: 'Server error!' });
}
