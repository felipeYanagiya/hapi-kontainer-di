let ExpenseControllerFactory = (Joi, Boom, Expense) => {
  const getAll = {
    handler: (request, reply) => {
      Expense.find({}, (err, expense) => {
        if (!err) {
          reply(expense)
        } else {
          reply(Boom.badImplementation(err)) // 500 error
        }
      })
    }
  }

  const getOne = {
    validate: {
      params: {
        id: Joi.string().required()
      }
    },
    handler: (request, reply) => {
      Expense.findOne({
        '_id': request.params.id
      }, (err, expense) => {
        if (!err) {
          reply(expense)
        } else {
          reply(Boom.badImplementation(err)) // 500 error
        }
      })
    }
  }

  const create = {
    validate: {
      payload: {
        value: Joi.number().required()
      }
    },
    handler: (request, reply) => {
      var expense = new Expense(request.payload)
      expense.save((err, expense) => {
        if (!err) {
          reply(expense).created('/expense/' + expense._id) // HTTP 201
        } else {
          if (err.code === 11000 || err.code === 11001) {
            reply(Boom.forbidden('please provide another expense id, it already exist'))
          } else reply(Boom.forbidden()) // HTTP 403
        }
      })
    }
  }

  const update = {
    validate: {
      payload: {
        value: Joi.number().required()
      }
    },

    handler: (request, reply) => {
      Expense.findOne({
        '_id': request.params.id
      }, (err, expense) => {
        if (!err) {
          expense.value = request.payload.value
          expense.save((err, expense) => {
            if (!err) {
              reply(expense).updated('/expense/' + expense._id) // HTTP 201
            } else {
              if (err.code === 11000 || err.code === 11001) {
                reply(Boom.forbidden('please provide another expense id, it already exist'))
              } else reply(Boom.forbidden()) // HTTP 403
            }
          })
        } else {
          reply(Boom.badImplementation(err)) // 500 error
        }
      })
    }
  }

  const remove = {
    handler: (request, reply) => {
      Expense.findOne({
        '_id': request.params.id
      }, (err, expense) => {
        if (!err && expense) {
          expense.remove()
          reply({
            message: 'Expense deleted successfully'
          })
        } else if (!err) {
                  // Couldn't find the object.
          reply(Boom.notFound())
        } else {
          reply(Boom.badRequest('Could not delete expense'))
        }
      })
    }
  }

  return {
    getOne: getOne,
    getAll: getAll,
    remove: remove,
    create: create,
    update: update
  }
}

module.exports = ExpenseControllerFactory
