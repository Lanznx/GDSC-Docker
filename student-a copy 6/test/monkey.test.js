const request = require('supertest');
const baseURL = "http://localhost:3000"

describe('GET /', () => {
  it('should return 200 OK', async () => {
    const response = await request(baseURL).get('/');
    expect(response.status).toBe(200);
  });
  it('should return a message', async () => {
    const response = await request(baseURL).get('/');
    expect(response.body.msg).toBe('this is working');
  });
})

describe('GET /monkey', () => {
  beforeAll(async () => {
    await request(baseURL).post('/monkey').send({name: 'K8s'});
  });

  it('should return 200 OK', async () => {
    const response = await request(baseURL).get('/monkey?name=K8s');
    expect(response.status).toBe(200);
    expect(response.body.monkey.name).toBe("K8s");
  });

  it('should return 404 if no monkey is found', async () => {
    const response = await request(baseURL).get('/monkey?name=NOMONKEY');
    expect(response.status).toBe(404);
    expect(response.body.msg).toBe("No monkey found");
  })

  it('should return 400 if no name is provided', async () => {
    const response = await request(baseURL).get('/monkey');
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Need a name");
  })

  it('should return 200 and all monkeys if query name is "all"', async () => {
    const response = await request(baseURL).get('/monkey?name=all');
    expect(response.status).toBe(200); 
    expect(response.body.monkey.length).toBeGreaterThan(0);
  })
})

describe('POST /monkey', () => {
  it('should return 201 OK', async () => {
    const response = await request(baseURL).post('/monkey').send({name: 'Docker'});
    expect(response.status).toBe(201);
    expect(response.body.msg).toBe("Monkey created");
  });

  it('should return 400 if no name is provided', async () => {
    const response = await request(baseURL).post('/monkey');
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Need a name");
  })
}
)

