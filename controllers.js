const { retrieveTopics, retrieveArticleById } = require('./models.js');
const endpoints = require('./endpoints.json');

exports.getEndpoints = (req, res) => {
    res.status(200).send({ endpoints });
}

exports.getTopics = (req, res) => {
    retrieveTopics()
    .then((topics) => {
        res.status(200).send({ topics });
    })
    .catch(() => {
        next(err);
    })
}

exports.getArticleById = (req, res, next) => {
    retrieveArticleById(req.params.article_id)
    .then((article) => {
        res.status(200).send({ article });
    })
    .catch((err) => {
        next(err);
    })
}
