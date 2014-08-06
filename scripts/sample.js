var MongoClient = require('mongodb').MongoClient;

// Some docs for insertion
var docs = [{
    title : "this is my title", author : "bob", posted : new Date() ,
    pageViews : 5, tags : [ "fun" , "good" , "fun" ], other : { foo : 5 },
    comments : [
      { author :"joe", text : "this is cool" }, { author :"sam", text : "this is bad" }
    ]}];

MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
  // Create a collection
  db.createCollection('test', function(err, collection) {
    // Insert the docs
    collection.insert(docs, {safe:true}, function(err, result) {

      // Execute aggregate, notice the pipeline is expressed as an Array
      collection.aggregate([
          { $project : {
            author : 1,
            tags : 1
          }},
          { $unwind : "$tags" },
          { $group : {
            _id : {tags : "$tags"},
            authors : { $addToSet : "$author" }
          }}
        ], function(err, result) {
          console.dir(result);
          db.close();
      });
    });
  });
});
