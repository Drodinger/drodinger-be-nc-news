const { retrieveTopics } = require('./models.js');
const endpoints = require('./endpoints.json');

exports.getEndpoints = (req, res) => {
    res.status(200).send({ endpoints });
}

exports.getTopics = (req, res) => {
    return retrieveTopics()
    .then((topics) => {
        res.status(200).send({ topics });
    })
    .catch(() => {
        next(err);
    })
}
