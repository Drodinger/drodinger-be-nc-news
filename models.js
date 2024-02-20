const db = require('./db/connection.js');

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
