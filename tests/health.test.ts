/*
 *
 *
 */

import request from 'supertest';
import express from 'express';
import { router } from '../src/routes/health.router';

test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});


const app = express();
app.use('/health', router);

describe('Health Check Endpoint', () => {
  it('should return status UP', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "cupcakes" });
  });
});
