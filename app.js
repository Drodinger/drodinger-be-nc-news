const express = require('express');
const { getEndpoints, getTopics } = require('./controllers.js');
const { handleCustomErrors, handlePsqlErrors, handleServerErrors, handleNonexistentEndpoint } = require('./errors/index.js');
const app = express();

app.get('/api/topics', getTopics);

app.use('*', handleNonexistentEndpoint);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
