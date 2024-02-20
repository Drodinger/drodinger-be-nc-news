const db = require('./db/connection.js');
const pg = require('pg');
const endpoints = require('./endpoints.json');

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
