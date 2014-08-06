var request = require('request');
var MongoClient = require('mongodb').MongoClient;


var options = {
   url: 'http://www.fakenamegenerator.com',
   headers: { 'user-agent': 'Mozilla/5.0' },
   };

var j =0;
for (var i =0 ; i <= Math.random()*15 ; i++) {
    j = i;
    name = '';
    password = '';
    request(options, (function() { return function(err, resp, body) {
	
         console.log('getting name');
         name = body.substring( body.indexOf('<li class="email"><span class="value">')+38, body.indexOf('</span> <div class="adtl">') );
         console.log( name) ;
         console.log('getting password');
         password = body.substring(   body.indexOf('<li class="lab">Password:</li>&nbsp;')+89, body.indexOf('<li class="lab">Mother')-108) ;
         console.log(password);

	 MongoClient.connect("mongodb://localhost:27017/usertest", function(err, db) { 
      		if(!err) {
       			var collection = db.collection('users');
        		var user1 = { 'username':name,'password':password,'signedUpOn': new Date(), 'isEnabled':true};
        	//	collection.insert (user1, function (err, result){ if (err) throw err; console.log(result); } );

        		collection.update ( {'username':name} , user1, {upsert:true,w:0} );

			db.close();


                 }
          })  ;

    }})(i));
}
