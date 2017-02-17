const Lab = require('lab')
const lab = exports.lab = Lab.script()
const code = require('code')

const server = require('../../lib/server')

lab.experiment('tests expense api', () => {
  lab.test('creating correct expense', (done) => {
    server.inject({method: 'POST', url: '/api/v1/expense', payload: {value: 25.67}}, response => {
      code.expect(response.statusCode).to.equal(201)
      done()
    })
  })

  lab.test('creating incorrect expense', (done) => {
    server.inject({method: 'POST', url: '/api/v1/expense', payload: {whatever: 'whatever'}}, response => {
      code.expect(response.statusCode).to.equal(400)
      done()
    })
  })
})
