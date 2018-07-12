const request = require('supertest');

const app = require('../index');

describe('Test the root path', () => {
  test('It should respond to / with 200', (done) => {
    request(app).get('/').then((res) => {
      expect(res.statusCode).toBe(200);
      done();
    });
  });
});
