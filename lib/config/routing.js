let ExpenseEndpoints = (Controller) => {
  return [
    { method: 'POST', path: '/api/v1/expense', config: Controller.create },
    { method: 'GET', path: '/api/v1/expense', config: Controller.getAll },
    { method: 'GET', path: '/', handler: (_req, reply) => reply('its working') },
    { method: 'GET', path: '/api/v1/expense/{id}', config: Controller.getOne },
    { method: 'PUT', path: '/api/v1/expense/{id}', config: Controller.update },
    { method: 'DELETE', path: '/api/v1/expense/{id}', config: Controller.remove }]
}

module.exports = ExpenseEndpoints
