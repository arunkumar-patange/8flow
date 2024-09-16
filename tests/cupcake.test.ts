/*
 *
 *
 */

import request from 'supertest';
import express from 'express';
import { router } from '../src/routes/cupcakes.router';


const app = express();
app.use('/v2/cupcake', router);

describe('Cupcakes GET', () => {
  it('get all cupcakes', async () => {
    const response = await request(app).get('/v2/cupcake');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});


// TODO: add more test
