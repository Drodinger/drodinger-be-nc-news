const { retrieveTopics, retrieveArticles, retrieveArticleById, retrieveCommentsByArticleId, insertCommentByArticleId, updateArticleVotesById, removeCommentById } = require('./models.js');
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

exports.postCommentByArticleId = (req, res, next) => {
    insertCommentByArticleId(req.params.article_id, req.body)
        .then((comment) => {
            res.status(201).send({ comment });
        })
        .catch((err) => {
            next(err);
        })

}

exports.patchArticleById = (req, res, next) => {
    updateArticleVotesById(req.params.article_id, req.body.inc_votes)
        .then((article) => {
            if (!article) {
                return Promise.reject({
                    "status": 404,
                    "msg": "Not found"
                });
            }
            res.status(200).send({ article });
        })
        .catch((err) => {
            next(err);
        })
}

exports.deleteCommentById = (req, res, next) => {
    removeCommentById(req.params.comment_id)
        .then(() => {
            res.status(204).send({ "msg": "No content" });
        })
        .catch((err) => {
            next(err);
        })
}
