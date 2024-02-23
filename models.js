const db = require('./db/connection.js');
const format = require('pg-format');

exports.retrieveTopics = () => {
    const queryString = 'SELECT topics.slug, topics.description FROM topics';
    return db.query(queryString)
        .then((queryResult) => {
            return queryResult.rows;
        })
}

exports.retrieveArticles = () => {
    return db.query(`
        SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id) AS comment_count
        FROM articles 
        LEFT JOIN comments ON articles.article_id = comments.article_id
        GROUP BY articles.article_id
        ORDER BY articles.created_at DESC;
        `)
        .then((queryResult) => {
            return queryResult.rows;
        })
}

exports.retrieveArticleById = (id) => {
    return db.query('SELECT * FROM articles WHERE article_id = $1;', [id])
        .then((queryResult) => {
            if (!queryResult.rows[0]) {
                return {}
            }
            return queryResult.rows[0];
        })
}

exports.retrieveCommentsByArticleId = (id) => {
    return db.query(`
        SELECT * FROM comments
        WHERE comments.article_id = $1
        ORDER BY comments.created_at DESC;
        `, [id])
        .then((queryResponse) => {
            if (queryResponse.rows.length === 0) {
                return Promise.reject({
                    status: 404,
                    msg: `No comments found for article_id: ${id}`
                })
            }
            return queryResponse.rows;
        })
}

exports.insertCommentByArticleId = (id, comment) => {
    if (!comment.user || !comment.body) {
        return Promise.reject({
            status: 400,
            msg: 'Bad request'
        })
    } else if (typeof comment.user !== 'string' || typeof comment.body !== 'string') {
        return Promise.reject({
            status: 400,
            msg: 'Bad request'
        })
    }
    const query = `
    INSERT INTO comments
    ( author, body, article_id )
    VALUES
    ( $1, $2, $3 )
    `
    return db.query(query, [ comment.user, comment.body, id ])
        .then(() => {
            return db.query(`
                SELECT * FROM comments
                ORDER BY comment_id DESC
                LIMIT 1;
                `)
        })
        .then((queryResult) =>{
            return queryResult.rows[0];
        })
}

exports.updateArticleVotesById = (article_id, inc_votes) => {
    const query = `
    UPDATE articles
    SET votes = votes + $1
    WHERE article_id = $2;
    `
    return db.query(query, [ inc_votes, article_id ])
        .then(() => {
            return db.query(`
                SELECT * FROM articles
                WHERE article_id = $1
                `
                , [ article_id ])
        })
        .then((queryResponse) => {
            return queryResponse.rows[0];
        })
} 

exports.removeCommentById = (comment_id) => {
    const query = `
    DELETE FROM comments
    WHERE comment_id = $1;
    `;
    return db.query(query, [ comment_id ])
        .then((queryResponse) => {
            if (!queryResponse.rowCount) {
                return Promise.reject({
                    "status": 404,
                    "msg": "Not found"
                })
            }
            return;
        })
}
