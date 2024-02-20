const db = require('./db/connection.js');
const format = require('pg-format');

exports.retrieveTopics = () => {
    const queryString = 'SELECT topics.slug, topics.description FROM topics';
    return db.query(queryString)
    .then((queryResult) => {
        return queryResult.rows;
    })
    .catch(() => {
        next(err);
    })
}

exports.retrieveArticleById = (id) => {
    return db.query('SELECT * FROM articles WHERE article_id = $1;', [id])
    .then((queryResult) => {
        return queryResult.rows[0];
    })
}
