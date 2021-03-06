let DatabaseFactory = (mongoose, config) => {
  mongoose.connect('mongodb://' + config.database.host + '/' + config.database.db)
  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error'))
  db.once('open', function callback () {
    console.log('Connection with database succeeded.')
  })
}

module.exports = DatabaseFactory
