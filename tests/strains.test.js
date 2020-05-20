const should = require('chai').should()
const expect = require('chai').expect
const supertest = require('supertest')
const api = supertest('http://localhost:8000')

describe('GET/strains', (done) => {
  it('should return a 200 response', () => {
    api
      .get('/strains')
      .set('Accept', 'application/json')
      .expect(200, done)
  })
  it('should return an array', (done) => {
    api
      .get('/strains')
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(response.body).to.be.an('array')
        done()
      })
  })
})

describe('GET/strains/:id', (done) => {
  it('should return a 200 response', () => {
    api
      .get('/strains/:id')
      .set('Accept', 'application/json')
      .expect(200, done)
  })
  it('should return an array', (done) => {
    api
      .get('/strains/:id')
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(response.body).to.be.an('array')
        done()
      })
  })
})
