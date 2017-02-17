const container = require('./config/containerConfig')

const Hapi = container.get('Hapi')
const config = container.get('config')
const Routes = container.get('routes')
const db = container.get('db')
let server = new Hapi.Server()

server.connection(config.server)
server.route(Routes)

const options = {
  ops: {
    interval: 1000
  },
  reporters: {
    myConsoleReporter: [{
      module: 'good-squeeze',
      name: 'Squeeze',
      args: [{ log: '*', response: '*' }]
    }, {
      module: 'good-console'
    }, 'stdout'],
    myFileReporter: [{
      module: 'good-squeeze',
      name: 'Squeeze',
      args: [{ ops: '*' }]
    }, {
      module: 'good-squeeze',
      name: 'SafeJson'
    }, {
      module: 'good-file',
      args: ['./test/fixtures/awesome_log']
    }],
    myHTTPReporter: [{
      module: 'good-squeeze',
      name: 'Squeeze',
      args: [{ error: '*' }]
    }]
  }
}

server.register({
  register: container.get('good'),
  options
}, (err) => {
  if (err) {
    return console.error(err)
  }
  server.start(() => {
    console.info(`Server started at ${server.info.uri}`)
  })
})

module.exports = server
