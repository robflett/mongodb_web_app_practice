var MongoClient = require("mongodb").MongoClient;
// The below creates a wrapper for the MongoDB ID.
var ObjectID = require("mongodb").ObjectID;

var EelsQuery = function(){
  this.url = "mongodb://localhost:27017/eels_info";
  // the above wont be found in a browser - it's a MongoDB protocol NOT an HTTP protocol.
};

EelsQuery.prototype = {

  all: function(onQueryFinished){
    MongoClient.connect(this.url, function(err, db){
      if(db){
        console.log("connection made");
        var collection = db.collection("albums");
        collection.find().toArray(function(err, docs){
          onQueryFinished(docs);
        })
      }
    })
  },


  add: function(albumToAdd, onQueryFinished){
    MongoClient.connect(this.url, function(err, db){
      if(db){
        var collection = db.collection("albums");
        collection.insert(albumToAdd);
        collection.find().toArray(function(err, docs){
          // console.log(docs);
        onQueryFinished(docs);
        })
      }
    })
  },


  delete: function(id, callback){
    MongoClient.connect(this.url, function(err, db){
      if(db){
        var collection = db.collection("albums");
        collection.remove( {_id: ObjectID(id)});
        collection.find().toArray(function(err, docs){
          callback(docs);
        })
      }
    })
}

}

module.exports = EelsQuery;