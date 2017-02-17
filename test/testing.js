const Lab = require('lab')
const lab = exports.lab = Lab.script()
const code = require('code')

const server = require('../lib/server')

lab.experiment('test root', () => {
  lab.test('root ', (done) => {
    server.inject({method: 'GET', url: '/'}, response => {
      code.expect(response.statusCode).to.equal(200)
      code.expect(response.result).to.equal('its working')
      done()
    })
  })
})
