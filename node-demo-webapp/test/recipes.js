import fetchJSON from '../src/data/fetchJSON'

const SCHEME_AUTHORITY = 'http://localhost:61549'//'http://pantrycook.westeurope.cloudapp.azure.com' 
const BASE_URL = `${SCHEME_AUTHORITY}/api` 
const BASE_RECIPES_URL = `${BASE_URL}/recipes`

const assert = require('assert')
const expect = require('chai').expect

describe('Recipes Service Tests', () => {

    it('test recipe withouth auth', done => {
            fetchJSON(BASE_RECIPES_URL)
            .then(data => {
                expect(data)
                    .to.be.an('object')
                    .and.have.a.property('recipes')
                expect(data).to.have.a.property('size')
                done()
            })
    })  
})
