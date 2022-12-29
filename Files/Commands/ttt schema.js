const mongoose = require("mongoose")

const eloSchema = mongoose.Schema({
  // User Info
  _id: {
    type: String,
    required: true
  },

  name: {
    type: String,
    required: true,
  },
  // Wins and loses Counter

  win: {
    type: Number,
    required: true,
    default: 0,
  },

  lose: {
    type: Number,
    required: true,
    default: 0,
  },
  
  games: {
    type: Number,
    required: true,
    default: 0,
  },
})

module.exports = mongoose.model("playerElo", eloSchema)