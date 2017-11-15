var fs = require('fs');
var path = require('path');

function homeHandler(request, response) {
  var filePath = path.join(__dirname, '..', 'FrontEnd', 'index.html');
  fs.readFile(filePath, function(err, file){
    if(err) console.log(err);

    response.writeHead(200, 'Content-Type: text/html');
    response.end(file);
  });
}

function staticFileHandler(request, response, url) {
  const extensionType = {
    html : 'text/html',
    css : 'text/css',
    js : 'application/javascript',
    ico : 'image/x-icon',
    jpg : 'image/jpeg'
  }

  var extension = url.split('.')[1];

  var filePath = path.join(__dirname, '..', url);

  fs.readFile(filePath, function(err, file) {
    if(err) console.log(err);
    response.writeHead(200, 'Content-Type: ' + extensionType[extension]);
    response.end(file);
  });
}

function autocompleteHandler(request, response){
  var allTheData='';
  response.writeHead(302,{'Location': '/'});
  request.on('data',function(chunkOfData){
    allTheData += chunkOfData;
  });
  request.on('end',function(){
    var convertedData = querystring.parse(allTheData);
    console.log(convertedData);
    response.end();
  });


}

module.exports = {
  homeHandler,
  staticFileHandler,
  autocompleteHandler
}
