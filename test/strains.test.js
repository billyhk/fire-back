const should = require('chai').should()
const expect = require('chai').expect
const supertest = require('supertest')
const api = supertest('https://fireinternationalapp.herokuapp.com')

describe('GET /strains', (done) => {
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

describe('GET /strains/5ec5041b45f19100047b3684', (done) => {
  it('should return a 200 response', () => {
    api
      .get('/strains/5ec5041b45f19100047b3684')
      .set('Accept', 'application/json')
      .expect(200, done)
  })
  it('should return an array', (done) => {
    api
      .get('/strains/5ec5041b45f19100047b3684')
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(response.body).to.be.an('object')
        done()
      })
  })
})
