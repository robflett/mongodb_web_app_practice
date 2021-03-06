var express = require('express');
var app = express();
var eelsRouter = express.Router();
var EelsQuery = require("../db/eelsQuery");
var eelsQuery = new EelsQuery();


// //film by id
// eelsRouter.get('/:id', function(req, res){
//   res.json(eels[req.params.id]);
// });

//film index- WORKS
eelsRouter.get('/', function(req, res) {
  eelsQuery.all(function(docs){
    res.json(docs);
  });
});

//add new film
eelsRouter.post('/', function(req, res) {
  var newAlbum = {
    title: req.body.title,
    tracks: req.body.tracks,
    year: req.body.year,
    picks: req.body.picks,
  }
  eelsQuery.add(newAlbum, function(results){
    res.json(results);
  })
});

// DELETE
eelsRouter.delete("/:id", function(req, res){
  eelsQuery.delete(req.params.id), function(films){
    
  res.json({data: albums});
  }

})



module.exports = eelsRouter;