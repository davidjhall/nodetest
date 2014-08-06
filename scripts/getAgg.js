var MongoClient = require('mongodb').MongoClient;

var j =0;
 MongoClient.connect("mongodb://localhost:27017/usertest", function(err, db) { 
 	if(!err) {
                 var collection = db.collection('users');

                 //db.users.aggregate( { $group: { _id: { $dayOfYear: "$signedUpOn"}, counts: {$sum:1}}})

               collection.aggregate( {   
          	      $group : {
            	       _id : { $dayOfYear: "$signedUpOn"}, counts: {$sum:1}}
 		   
       		  } , 
                  function(err, result) { 
                       console.log(result);
                       db.close()
                  }
                )  ;
            }
});

