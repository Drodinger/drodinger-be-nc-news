const { retrieveTopics, retrieveArticles, retrieveArticleById, retrieveCommentsByArticleId } = require('./models.js');
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

exports.getCommentsByArticleId = (req, res, next) => {
    retrieveCommentsByArticleId(req.params.article_id)
    .then((comments) => {
        res.status(200).send({ comments });
    })
    .catch((err) => {
        next(err);
    })
}
