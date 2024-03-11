const express = require('express');
const { getEndpoints, getTopics, getArticles, getArticleById, getCommentsByArticleId, postCommentByArticleId, patchArticleById, deleteCommentById, getUsers } = require('./controllers.js');
const { handleCustomErrors, handlePsqlErrors, handleServerErrors, handleNonexistentEndpoint } = require('./errors/index.js');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.json());
app.get('/api', getEndpoints);
app.get('/api/topics', getTopics);
app.get('/api/articles', getArticles);
app.get('/api/articles/:article_id', getArticleById);
app.get('/api/articles/:article_id/comments', getCommentsByArticleId);
app.get('/api/users', getUsers);
app.post('/api/articles/:article_id/comments', postCommentByArticleId);
app.patch('/api/articles/:article_id', patchArticleById);
app.delete('/api/comments/:comment_id', deleteCommentById);

app.use('*', handleNonexistentEndpoint);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
