const { describe, test, expect, afterAll } = require('@jest/globals');
const supertest = require('supertest');

const connection = require('../db/pool');


const app = require('../app');

describe('GET products endpoint', ()=> {

  test('should return 200', (done)=> {
    supertest(app)
      .get('/api/products')
      .expect(200)
      .end(done)
  });

  test('should return json data', async ()=> {

    const response = await supertest(app)
        .get('/api/products')
        .set('Accept', 'application/json');
    
    expect(response.status).toEqual(200);
    expect(response.headers['content-type']).toMatch(/json/);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 1,
          title: 'Jalkapallo',
          description: 'Jonkun verran potkittu jalkapallo',
          image: 'https://www.vastavalo.net/albums/userpics/22294/normal_p8172409pt.jpg',
          price: 15.5,
          owner: '3d4707aa-d293-4dec-b02b-79be13c6674d'
        }), 
      ])
    )
  });

});

describe('GET product by id endpoint', () => {

  test('should return 200 if item was found', (done) => {
    supertest(app)
      .get('/api/products/id/1')
      .expect(200)
      .end(done);
  });

  test('should return 200 and json if the item was found', async() => {
    const response = await supertest(app)
      .get('/api/products/id/1')
      .set('Accept', 'application/json');

    expect(response.status).toEqual(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: 1,
        title: 'Jalkapallo',
        description: 'Jonkun verran potkittu jalkapallo',
        image: 'https://www.vastavalo.net/albums/userpics/22294/normal_p8172409pt.jpg',
        price: 15.5,
        owner: '3d4707aa-d293-4dec-b02b-79be13c6674d' 
      })
    );
  });

});

describe('POST product endpoint', ()=> {

  const loggedInUser = {
    id: '',
    email: '',
    token: ''
  }

  beforeAll(async () => {
    connection.query('DELETE FROM users WHERE email=?', ['john.wayne@domain.com'])
    const data = {
      name: 'John Wayne',
      email: 'john.wayne@domain.com',
      password: 'password123'
    }

    const response = await supertest(app)
      .post('/api/users/signup')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .send(data)
    loggedInUser.id = response.body.id
    loggedInUser.email = response.body.email
    loggedInUser.token = response.body.token
    
  })

  afterAll(async() => {
    const deleteQuery = `DELETE FROM products WHERE title LIKE 'testi tuote' AND description LIKE 'Test test';`;
    connection.query(deleteQuery, (err, result) => {
      if(err) {
        console.log(err);
      }
    });
  });

  test('should create a new product', async() => {
    const product = {
      title: 'testi tuote',
      description: 'Test test',
      image: 'https://www.iss.europ%20banner.jpg?itok=2VD5CQf5?%3E',
      price: 1,
      owner: loggedInUser.id
    }

    const response = await supertest(app)
      .post('/api/products')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .set('Authorization', 'Bearer ' + loggedInUser.token)
      .send(product);

    expect(response.status).toEqual(201);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.id).toBeTruthy();
    expect(response.body.title).toEqual('testi tuote');
    expect(response.body.description).toEqual('Test test');
  });

  test('should not create a product without a title property', async() => {
    const product = {
      description: 'testi description',
      image: 'image.jpg',
      price: 123,
      owner: loggedInUser.id
    }

    const response = await supertest(app)
      .post('/api/products')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .set('Authorization', 'Bearer ' + loggedInUser.token)
      .send(product);

    expect(response.status).toEqual(400);
    expect(response.text).toContain('"title" is required');
  });

  test('should not create a product without a owner property', async() => {
    const product = {
      title: 'testi tuote2',
      description: 'testi description',
      image: 'image.jpg',
      price: 123,
    }

    const response = await supertest(app)
      .post('/api/products')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .set('Authorization', 'Bearer ' + loggedInUser.token)
      .send(product);

    expect(response.status).toEqual(400);
    expect(response.text).toContain('"owner" is required');
  });

  test('should not create a product without price', async() => {
    const product = {
      title: 'testi tuote',
      description: 'testi description',
      image: 'image.jpg',
      owner: loggedInUser.id
    }

    const response = await supertest(app)
      .post('/api/product')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .set('Authorization', 'Bearer ' + loggedInUser.token)
      .send(product);

    expect(response.status).toEqual(400);
    expect(response.text).toContain('"price" is required');
  });

  test('should not create a product with an empty title value', async() => {
    const product = {
      title: '',
      description: 'testi description',
      image: 'image.jpg',
      price: 123,
      owner: loggedInUser.id
    }

    const response = await supertest(app)
      .post('/api/products')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .set('Authorization', 'Bearer ' + loggedInUser.token)
      .send(product);

    expect(response.status).toEqual(400);
    expect(response.text).toContain('"title" is not allowed to be empty');
  });

  test('should not create a product title with a too short value', async() => {
    const product = {
      title: 'tes',
      description: 'testi description',
      image: 'image.jpg',
      price: 123,
      owner: loggedInUser.id
    }

    const response = await supertest(app)
      .post('/api/products')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .set('Authorization', 'Bearer ' + loggedInUser.token)
      .send(product);

    expect(response.status).toEqual(400);
    expect(response.text).toContain('"title" length must be at least 4 characters long');
  });
});

describe('DELETE products endpoint', () => { 
  const loggedInUser = {
    id: '',
    email: '',
    token: ''
  }

  beforeAll(async () => {
    connection.query('DELETE FROM users WHERE email=?', ['john.wayne@domain.com'])
    const data = {
      name: 'John Wayne',
      email: 'john.wayne@domain.com',
      password: 'password123'
    }

    const response = await supertest(app)
      .post('/api/users/signup')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .send(data)
    loggedInUser.id = response.body.id
    loggedInUser.email = response.body.email
    loggedInUser.token = response.body.token
  })

  test('should delete the product by id', async () => {
    const product = {
      title: 'testi tuote',
      description: 'testi description',
      image: 'image.jpg',
      price: 123,
      owner: loggedInUser.id
    };

    const postResponse = await supertest(app)
      .post('/api/products')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .set('Authorization', 'Bearer ' + loggedInUser.token)
      .send(product);

    const postId = postResponse.body.id;
    
    const deleteResponse = await supertest(app)
      .delete(`/api/products/${postId}`)
      .set('Authorization', 'Bearer ' + loggedInUser.token)
      .set('Accept', 'application/json');

    expect(deleteResponse.status).toEqual(200);
    expect(deleteResponse.text).toEqual('Product deleted');

  }); 
});