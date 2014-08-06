var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'UserTest' });
});

/* DJH - charts test page. */
router.get('/charts', function(req, res) {
  var db = req.db;
  var collection = db.get('users');
  collection.col.aggregate(
			[ 
			{ $group : { _id : { $dayOfYear: "$signedUpOn"} , counts: {$sum:1} }, }
                       ,{ $sort  : { _id : 1 }}
                        ] ,
                  function(e, docs) {
        res.render('charts', { 
        title: 'Charts' ,
        "charts" : docs
      });
    });
});



/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('users');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});







/* POST to Add User Service */
router.get('/update', function(req, res) {

    // Set our internal DB variable
    var db = req.db;
    var flag = false;
    // Get our form values. These rely on the "name" attributes
    var userName = req.query['userid'];
    var status  = req.query['status'];
    if (status == 'true'){
        flag = true ;
    }
    else{
	flag = false;
    }
    // Set our collection
    var collection = db.get('users');

    // Submit to the DB
    collection.update({
        "_id" : userName,
    },{ $set: {  "isEnabled": flag } }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("userlist");
            // And forward to success page
            res.redirect("userlist");
        }
    });
});


module.exports = router;
