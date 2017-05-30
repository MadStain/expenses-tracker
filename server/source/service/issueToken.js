
const utils = require('../service/utils')
const userTokenModel = require('../model/userToken')

function issueToken(user, done) {
  var token = utils.randomString(64)
  new userTokenModel({
    idUser : user._id,
    token :  token
  })
  .save( function (err) {
    if (err) return done(err)
    return done(null, token)
  })
}

module.exports = issueToken