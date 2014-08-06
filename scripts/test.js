console.log('start program');
var MongoClient = require('mongodb').MongoClient;
var myDateString = Date();


var htmlparser = require('htmlparser2');


// Connect to the db
MongoClient.connect("mongodb://localhost:27017/usertest", function(err, db) {
  if(!err) {
    console.log("We are connected");
    var collection = db.collection('user');
    var user1 = { 'username':'dhall','password':'foobar','signedUpOn': myDateString, 'isEnabled':true};
	collection.insert(user1, {w:1}, function(err, result) {}); 
  

//collection.insert(newstuff, function (err, inserted) {
//    if (err){
//        console.log(err);
//        console.log(inserted);
//    }
//   console.log('insert function');
//});

}
});

console.log('end program');
