"use strict";

const mongo = require('mongodb');
// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet);
      callback(null, true);
    },
    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection("tweets").find().toArray(callback);
    },
    //Updates Liked status
    changeLikes: function(id, value, callback) {
      const searchID = {"_id": mongo.ObjectId(id)};
      db.collection("tweets").update(
        searchID,
        {
          $set: { "liked": value }
        })
      callback();
    }
  };
}
