"use strict";

const userHelper    = require("../lib/util/user-helper")

const express       = require('express');
const tweetsRoutes  = express.Router();

module.exports = function(DataHelpers) {

  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

  tweetsRoutes.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now(),
      liked: false
    };

     DataHelpers.saveTweet(tweet, (err) => {
       if (err) {
         res.status(500).json({ error: err.message });
       } else {
         res.status(201).send();
       }
     });
  });
  // PUT Request for liking a tweet
  tweetsRoutes.put("/:id/likes/", function(req, res){
    DataHelpers.changeLikes(req.params.id, true,(err)=>{
       if (err) {
         res.status(500).json({ error: err.message });
       } else {
         res.status(201).send();
       }
    });
  });
  //PUT Request for unliking an already liked tweet
  tweetsRoutes.put("/:id/unlikes/", function(req, res){
    DataHelpers.changeLikes(req.params.id, false,(err)=>{
       if (err) {
         res.status(500).json({ error: err.message });
       } else {
         res.status(201).send();
       }
    });
  });
  return tweetsRoutes;

}
