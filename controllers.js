const { retrieveTopics, retrieveArticles, retrieveArticleById } = require('./models.js');
const endpoints = require('./endpoints.json');

exports.getEndpoints = (req, res) => {
    res.status(200).send({ endpoints });
}

exports.getTopics = (req, res, next) => {
    retrieveTopics()
    .then((topics) => {
        res.status(200).send({ topics });
    })
    .catch(() => {
        next(err);
    })
}

exports.getArticles = (req, res, next) => {
    retrieveArticles()
    .then((articles) =>{
        res.status(200).send({ articles });
    })
    .catch((err) => {
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
