const request = require('supertest');
const seed = require('../db/seeds/seed.js');
const { topicData, userData, articleData, commentData } = require('../db/data/test-data/index.js'); 
const db = require('../db/connection.js');
const app = require('../app.js');
const endpoints = require('../endpoints.json');

beforeEach(() => seed({ topicData, userData, articleData, commentData }));

afterAll(() => db.end());

describe('GET /api/topics', () => {
    test('returns status 200 and responds with an array of topic objects containing "slug" and "description" properties', () => {
        return request(app).get('/api/topics')
            .expect(200)
            .then((res) => {
                const topics = res.body.topics;
                expect(topics).toHaveLength(3)
                topics.forEach((topic) => {
                    expect(topic).toHaveProperty('slug');
                    expect(topic).toHaveProperty('description');
                })
            })
    })
})


describe('request non-existent endpoint error handling', () => {
    test('if endpoint does not exist returns status 404 and not found message', () => {
        return request(app).get('/api/utternonsense')
            .expect(404)
            .then((res) => {
                const msg = res.body.msg;
                expect(msg).toEqual('Not found');
            })
    })
})

describe('GET /api', () => {
    test('responds with status 200 and an object containing objects with "description", "queries" and "exampleResponse" keys', () => {
        return request(app).get('/api')
        .expect(200)
        .then((res) => {
            expect(res.body.endpoints).toEqual(endpoints);
        })
    })
})

describe('GET /api/articles/:article_id', () => {
    describe('Main functionality', () => {
        test('when called with an existing id responds with status 200 and the relevant article object', () => {
            return request(app).get('/api/articles/2')
                .expect(200)
                .then((res) => {
                    expect(typeof res.body.article).toBe('object');
                    expect(res.body.article).toHaveProperty('author');
                    expect(res.body.article).toHaveProperty('title');
                    expect(res.body.article).toHaveProperty('article_id');
                    expect(res.body.article).toHaveProperty('body');
                    expect(res.body.article).toHaveProperty('topic');
                    expect(res.body.article).toHaveProperty('created_at');
                    expect(res.body.article).toHaveProperty('votes');
                    expect(res.body.article).toHaveProperty('article_img_url');
                })
        })
    })
    describe('Error handling', () => {
        test('when given syntactically correct but non-existent parameter responds with an empty object articles object on res.body', () => {
            return request(app).get('/api/articles/532939827')
            .then((res) => {
                expect(res.body.article).toEqual({});
            })
        })
        test('when given syntactically incorrect non-existent parameter responds with status 400', () => {
            return request(app).get('/api/articles/thisIsNotAValidQuery')
                .expect(400)
                .then((res) => {
                    expect(res.body.msg).toEqual('Bad request');
                })
        })
    })
})


describe('GET /api/articles', () => {
    describe('main functionality', () => {
        test('responds with status 200 and an array of all articles with no "body" propety and containing the following properties: author, title, article_id, topic, created_at, votes, article_image_url, comment_count', () => {
            return request(app)
                .get('/api/articles')
                .expect(200)
                .then((res) => {
                    const articles = res.body.articles;
                    for (let article of articles) {
                        expect(article).toMatchObject({
                            author : expect.any(String),
                            title: expect.any(String),
                            article_id: expect.any(Number),
                            topic: expect.any(String),
                            created_at: expect.any(String),
                            votes: expect.any(Number),
                            article_img_url: expect.any(String),
                            comment_count: expect.any(String)
                        })
                        expect(article.body).toBe(undefined);
                    }
                })
        })
        test('array of articles is returned ordered by created_at (date the article was authored)', () => {
            return request(app)
                .get('/api/articles')
                .then((res) => {
                    const articles = res.body.articles;
                    let prevDateNum = 0;
                    for (let i = 0; i < articles.length; i++) {
                        const article = articles[i];
                        const dateStr = article.created_at;
                        const dateNum = Number(dateStr.slice(0,4) + dateStr.slice(5,7) + dateStr.slice(8,10) + dateStr.slice(11,13) + dateStr.slice(14,16) + dateStr.slice(17,19)); 
                        if (i === 0) {
                            prevDateNum = dateNum;
                        } else {
                        expect(dateNum).toBeLessThanOrEqual(prevDateNum);
                        prevDateNum = dateNum;
                        }
                    }
                })
        })
    })
})
describe('GET /api/articles/:article_id/comments', () => {
    describe('main functionality', () => {
        test('responds with status 200 and an array of objects', () => {
            return request(app)
                .get('/api/articles/9/comments')
                .expect(200)
                .then((res) => {
                    const comments = res.body.comments;
                    expect(Array.isArray(comments)).toBe(true);
                    comments.forEach((comment) => {
                        expect(Array.isArray(comment)).toBe(false);
                        expect(typeof comment).toBe('object');
                    })
                })
        })
    })
    describe('error handling', () => {
        test('if article_id query syntax is good but no comments exist for that article_id returns custom 404 error with custom message', () => {
            return request(app)
                .get('/api/articles/4/comments')
                .expect(404)
                .then((res) => {
                    expect(res.body.msg).toBe('No comments found for article_id: 4');
                })
        })
        test('if article_id query syntax is incorrect returns 400 bad request', () => {
            return request(app)
                .get('/api/articles/82h/comments')
                .expect(400)
                .then((res) => {
                    expect(res.body.msg).toEqual('Bad request');
                })
        })
    })
})
describe('POST /api/articles/:article_id/comments', () => {
    test.only('responds with code 201 and the message object', () => {
        const testComment = {
            "user": "lurker",
            "body": "Hi there this is a test body"
        }
        return request(app)
        .post('/api/articles/9/comments')
        .send(testComment)
        .expect(201)
        .then((res) => {
            const comment = res.body.comment;
            expect(comment).toMatchObject({
                comment_id: expect.any(Number),
                votes: expect.any(Number),
                created_at: expect.any(String),
                author: expect.any(String),
                body: expect.any(String),
                article_id: expect.any(Number)
            });
        })
    })
})
