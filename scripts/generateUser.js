var request = require('request');
var MongoClient = require('mongodb').MongoClient;

var options = {
   url: 'http://www.fakenamegenerator.com',
   headers: { 'user-agent': 'Mozilla/5.0' },
   };

for (var i =0 ; i <= Math.random()*15 ; i++) {
    name = '';
    password = '';
    request(options, (function() { return function(err, resp, body) {
	
         // console.log('getting name');
         //  DJH:  For speed, I parse out the location of the user and the password from the html 
         //        The 'right' way would be to put this in an html -> JSON object and parse the object out.  For Future release
         name = body.substring( body.indexOf('<li class="email"><span class="value">')+38, body.indexOf('</span> <div class="adtl">') );

         // console.log( name) ;
         // console.log('getting password');
         password = body.substring(   body.indexOf('<li class="lab">Password:</li>&nbsp;')+89, body.indexOf('<li class="lab">Mother')-108) ;
         // console.log(password);

	 MongoClient.connect("mongodb://localhost:27017/usertest", function(err, db) { 
      		if(!err) {
       			var collection = db.collection('users');
        		var user1 = { 'username':name,'password':password,'signedUpOn': new Date(), 'isEnabled':true};

                //      DJH: Original call to insert, though caused duplicates if website or callback came back more than once	
		//	collection.insert (user1, function (err, result){ if (err) throw err; console.log(result); } );

		//      DJH: Because sometimes returns the same user twice, I opted to update ( and upsert if non-exist) the user instead of dups

        		collection.update ( {'username':name} , user1, {upsert:true,w:0} );
			db.close();

                 }
          })  ;

    }})(i));
}
