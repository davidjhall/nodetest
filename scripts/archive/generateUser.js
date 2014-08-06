var MongoClient = require('mongodb').MongoClient;
var myDateString = Date();
var http = require ('http');
var sleep = require('sleep');



callback = function(response) {
  var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
//    console.log(str);
    name = str.substring( str.indexOf('<li class="email"><span class="value">')+38, str.indexOf('</span> <div class="adtl">') );
    console.log( name) ;

    password = str.substring(   str.indexOf('<li class="lab">Password:</li>&nbsp;')+89, str.indexOf('<li class="lab">Mother')-108) ;
    console.log(password);
//  Connect to the db 
    
    //var mongoclient = new MongoClient(new Server("localhost",27017), {native_parser:true});


    MongoClient.connect("mongodb://localhost:27017/usertest", function(err, db) 
    {
      if(!err) {
        console.log("We are connected");
        var collection = db.collection('user');
        var user1 = { 'username':name,'password':password,'signedUpOn': new Date(), 'isEnabled':true};
        collection.insert (user1,
 			     function (err, result){
    					  if (err) throw err;
   					   console.log(result);
   			      }
						
                            );
      } 
    });
 });
}

// 4:32p | 7/15 
// 6:07pm

var str = '';
var options = {
	hostname: 'www.fakenamegenerator.com',
	headers: { 'user-agent': 'Mozilla/5.0' }
	};
var name ='';
var password = '';
console.log('begin program');
for ( var i =0 ; i <= 5 ; i++)
{

str = '';
name = '';
password='';
	var req = http.request(options,  function(res) {
  		 res.setEncoding('utf8');
  		 res.on('data', function (chunk) {
                        str +=  chunk;
  		 });	
        	res.on('end',function () {
			console.log('getting name');
        		name = str.substring( str.indexOf('<li class="email"><span class="value">')+38, str.indexOf('</span> <div class="adtl">') );
    			console.log( name) ;
			console.log('getting password');
  			password = str.substring(   str.indexOf('<li class="lab">Password:</li>&nbsp;')+89, str.indexOf('<li class="lab">Mother')-108) ;
    			console.log(password);

		//	MongoClient.connect("mongodb://localhost:27017/usertest", function(err, db) {
      		//		if(!err) {
        	//			console.log("We are connected");
        	//			var collection = db.collection('user');
        	//			var user1 = { 'username':name,'password':password,'signedUpOn': new Date(), 'isEnabled':true};
        	//			collection.insert (user1, function (err, result){ if (err) throw err; console.log(result); } );
      		//		} 
    		//	});
  		});	
	});
	req.on('error', function(e) {
  		console.log('problem with request: ' + e.message);
	});

	// write data to request body
	req.write('data\n');
	req.write('data\n');
	req.end();
        console.log(str);

};

console.log('end program');
