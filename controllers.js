const { retrieveTopics } = require('./models.js');


exports.getTopics = (req, res) => {
    return retrieveTopics()
    .then((topics) => {
        res.status(200).send({ topics });
    })
    .catch(() => {
        next(err);
    })
}
