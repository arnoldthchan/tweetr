"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {
    saveTweet: function(newTweet, callback) {
      console.log(newTweet);
      db.collection("tweets").insert(newTweet);
      callback(null, true);
    },

    // Saves a tweet to `db`
    //ASD saveTweet: function(newTweet, callback) {
    //ASD   simulateDelay(() => {
    //ASD     db.tweets.push(newTweet);
    //ASD     callback(null, true);
    //ASD   });
    //ASD },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection("tweets").find().toArray(callback);

      //ASD simulateDelay(() => {
      //ASD   const sortNewestFirst = (a, b) => a.created_at - b.created_at;
      //ASD   callback(null, db.tweets.sort(sortNewestFirst));
      //ASD });

    }

  };
}
