// 4:32p | 7:15


var http = require ('http');
var options = {
host: 'www.fakenamegenerator.com',
headers: {'user-agent': 'Mozilla/5.0'},
path: '/index.php'
};

callback = function(response) {
  var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
    console.log(str);
    name = str.substring( str.indexOf('<li class="email"><span class="value">')+38, str.indexOf('</span> <div class="adtl">') );
    console.log( name) ; 

    password = str.substring(   str.indexOf('<li class="lab">Password:</li>&nbsp;')+89, str.indexOf('<li class="lab">Mother')-108) ;
    console.log(password);

  });
}

http.request(options, callback).end();

