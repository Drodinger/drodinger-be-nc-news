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
