const request = require('supertest');
const app = require('../server');

// Mock mongoose to avoid real DB in tests
jest.mock('mongoose', () => ({
  connect: jest.fn().mockResolvedValue({}),
  Schema: class {
    constructor() { this.index = jest.fn(); this.virtual = jest.fn(() => ({ get: jest.fn() })); this.pre = jest.fn(); this.methods = {}; }
  },
  model: jest.fn(() => ({}))
}));

describe('Health Check', () => {
  it('GET /api/health returns ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});

describe('Auth Routes', () => {
  it('POST /api/auth/register validates input', async () => {
    const res = await request(app).post('/api/auth/register').send({});
    expect(res.status).toBe(400);
  });

  it('POST /api/auth/login validates input', async () => {
    const res = await request(app).post('/api/auth/login').send({ email: 'notanemail' });
    expect(res.status).toBe(400);
  });
});

describe('Task Routes (protected)', () => {
  it('GET /api/tasks requires auth', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.status).toBe(401);
  });

  it('POST /api/tasks requires auth', async () => {
    const res = await request(app).post('/api/tasks').send({ title: 'Test' });
    expect(res.status).toBe(401);
  });
});

describe('404 Handler', () => {
  it('returns 404 for unknown routes', async () => {
    const res = await request(app).get('/api/unknown-route');
    expect(res.status).toBe(404);
  });
});
