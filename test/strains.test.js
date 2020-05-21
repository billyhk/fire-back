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

describe('POST /strains/', () => {
  const createdId = {
    title: 'Hall of Fame',
    name: 'Amnesia Haze',
    genetics: 'Sativa dominant (70%)',
    plantCategory: 'Hybrid: Sativa Dominant',
    popular: true,
    parents: 'Jamaican, Afghani, Laos, Hawaiian',
    thcContent: '22 - 24%',
    cbdContent: 'Low',
    smellAndFlavor: 'Sweet, Pepper, Citrus, Spicy, Earthy',
    effect: 'Uplifting, Euphoric, Cerebral, Strong, Energetic',
    info: 'Amnesia Haze has a classic, long, maturing psychotropic sativa lineage tamed with a dash of dense mountain indica. Two land-races and a hybrid have been expertly combined to produce a THC powerhouse that has an effect that even the most experienced cannabis aficionados will find undeniable and insistent. Amnesia Haze has dense flower clusters that are hard to the touch when cured lovingly. So well-crystallised are the firm nuggets, that they seem to have been lightly glazed with some kind of exotic cardamom and lime, marjoram and mandarin flavoured toffee that sparkles and refracts the light. The overdrive trichome production makes Amnesia Haze prized for hashes and other extractions. Warmed and twenty tonne pressed, the clear honey-coloured 22% THC resin waterfalls are a sticky sight to behold and an incomparable aromatic revelation.',
    mainImage: 'imgurl',
    additionalImages: ['https://www.leafly.com/strains/amnesia-haze/photos']
  }

  before((done) => {
    console.log(createdId)
    api
      .post('/strains')
      .set('Accept', 'application/json')
      .send(createdId)
      .end(done)
  })

  it('should include the new strain in the collection', (done) => {
    api
      .get('/strains')
      .set('Accept', 'application/json')
      .end((error, response) => {
        console.log(response.body)
        const postToFind = response.body.find((post) => post.id === createdId.id)
        expect(postToFind).to.be.an('object')
        done()
      })
  })
})

describe('PUT /strains/5ec5041b45f19100047b3684', () => {
  let strainUpdate
  const editedStrain = {
    title: 'Hall of Fame',
    name: 'Amnesia Haze',
    genetics: 'Sativa dominant (70%)',
    plantCategory: 'Hybrid: Sativa Dominant',
    popular: true,
    parents: 'Jamaican, Afghani, Laos, Hawaiian',
    thcContent: '22 - 24%',
    cbdContent: 'Low',
    smellAndFlavor: 'Sweet, Pepper, Citrus, Spicy, Earthy',
    effect: 'Uplifting, Euphoric, Cerebral, Strong, Energetic',
    info: 'Amnesia Haze has a classic, long, maturing psychotropic sativa lineage tamed with a dash of dense mountain indica. Two land-races and a hybrid have been expertly combined to produce a THC powerhouse that has an effect that even the most experienced cannabis aficionados will find undeniable and insistent. Amnesia Haze has dense flower clusters that are hard to the touch when cured lovingly. So well-crystallised are the firm nuggets, that they seem to have been lightly glazed with some kind of exotic cardamom and lime, marjoram and mandarin flavoured toffee that sparkles and refracts the light. The overdrive trichome production makes Amnesia Haze prized for hashes and other extractions. Warmed and twenty tonne pressed, the clear honey-coloured 22% THC resin waterfalls are a sticky sight to behold and an incomparable aromatic revelation.',
    mainImage: 'imgurl',
    additionalImages: ['https://www.leafly.com/strains/amnesia-haze/photos']
  }
  before((done) => {
    api
      .get('/strains/5ec5041b45f19100047b3684')
      .set('Accept', 'application/json')
      .end((error, response) => {
        console.log(response.body)
        strainUpdate = response.body
        done()
      })
  })
  before((done) => {
    api
      .put(`/strains/${strainUpdate._id}`)
      .set('Accept', 'application/json')
      .send(editedStrain)
      .end(done)
  })
  it('can edit a strain by id', (done) => {
    api
      .get('/strains/5ec5041b45f19100047b3684')
      .set('Accept', 'application/json')
      .end((req, response) => {
        expect(response.body).to.have.property('name', 'genetics')
        done()
      })
  })
})

describe('DELETE /strains/5ec6b48d95e92b00044b40cd', () => {
  let strainToDelete
  before((done) => {
    api
      .get('/strains/5ec6b48d95e92b00044b40cd')
      .set('Accept', 'application/json')
      .end((error, response) => {
        const post = response.body
        console.log(response.body)
        strainToDelete = post[post.length - 1]._id
        console.log(strainToDelete)
        done()
      })
  })
  before((done) => {
    api
      .delete(`/strains/5ec6b48d95e92b00044b40cd/${strainToDelete}`)
      .set('Accept', 'application/json')
      .end(done)
  })
  it('deletes a strain by id', (done) => {
    api
      .get(`/strains/${strainToDelete}`)
      .set('Accept', 'application/json')
      .end((error, response) => {
        console.log(response.body)
        expect(response.body.name).to.equal(undefined)
        done()
      })
  })
})
