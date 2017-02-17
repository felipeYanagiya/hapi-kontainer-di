let Expense = (mongoose) => {
  const Schema = mongoose.Schema

  const expenseSchema = new Schema({
    value: {type: Number, required: true}
  })

  return mongoose.model('expense', expenseSchema)
}

module.exports = Expense
