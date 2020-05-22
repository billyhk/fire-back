const should = require('chai').should()
const expect = require('chai').expect
const supertest = require('supertest')
const api = supertest('https://fireinternationalapp.herokuapp.com')

describe('GET /strains', (done) => {
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

describe('GET /strains/', (done) => {
  let postToView
  before((done) => {
    api
      .get('/strains')
      .set('Accept', 'application/json')
      .end((error, response) => {
        const post = response.body
        postToView = post[post.length - 1]._id
        done()
      })
  })
  it('should return an array', (done) => {
    api
      .get('/strains/' + postToView._id)
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
    plantCategory: 'Sativa',
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
      .post('/strains')
      .set('Accept', 'application/json')
      .send(createdId)
      .end(done)
  })

  it('should include the new post in the collection', (done) => {
    api
      .get('/strains')
      .set('Accept', 'application/json')
      .end((error, response) => {
        const postToFind = response.body.find((post) => post.id === createdId.id)
        expect(postToFind).to.be.an('object')
        done()
      })
  })
})

describe('PUT /strains/', () => {
  let strainUpdate
  const editedStrain = {
    title: 'Hall of Fame',
    name: 'Tina',
    genetics: 'Sativa dominant (70%)',
    plantCategory: 'Sativa',
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
      .get('/strains/')
      .set('Accept', 'application/json')
      .end((error, response) => {
        post = response.body
        strainUpdate = post[post.length - 1]
        done()
      })
  })
  it('can edit a strain by id', (done) => {
    api
      .put(`/strains/${strainUpdate._id}`)
      .set('Accept', 'application/json')
      .send(editedStrain)
      .end((req, response) => {
        expect(response.body).to.have.property('name', 'Tina')
        done()
      })
  })
})

describe('DELETE /strains/', () => {
  let postToDelete
  before((done) => {
    api
      .get('/strains')
      .set('Accept', 'application/json')
      .end((error, response) => {
        const post = response.body

        postToDelete = post[post.length - 1]._id
        done()
      })
  })
  before((done) => {
    api
      .delete(`/strains/${postToDelete}`)
      .set('Accept', 'application/json')
      .end(done)
  })
  it('deletes a strain by id', (done) => {
    api
      .get(`/strains/${postToDelete}`)
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(response.body).to.equal(null)
        done()
      })
  })
})
