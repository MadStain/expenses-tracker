const express = require('express')

const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const mongodb_address = process.env.MONGODB_ADDRESS
const bodyParser = require('body-parser')

const ExpenseModel = require('./model/expense.js')

if (!mongodb_address)
  throw "ERROR : .env file must specify a MONGODB_ADDRESS field"

mongoose.connect(mongodb_address);

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('\n\nHello, world!\n\n');
});


app.route('/expense')
  .get((req, res) => {
    console.log('get expense')
    ExpenseModel.find(function (err, expenses) {
      if (err) return console.error(err);
      res.json(expenses);
    })
  })
  .post((req, res) => {
    console.log('post expense', req.body, req.params)
    console.dir(req.body)
    const expense = new ExpenseModel({
      date: req.body.date,
      amount: req.body.amount,
      expenseType: req.body.expenseType
    })
    expense.save(function (err, room) {
      if (err) {
        console.log(err);
      } else {
        console.log('Expense saved, value : '+ expense.amount);
      }
      res.send(room)
    });
  })
  .delete((req, res) => {
    console.log('delete expense')
    ExpenseModel.find({}).remove().exec(err => console.log(err))
    res.sendStatus(200)
  })


module.exports = app;
