var fs = require('fs');
var path = require('path');
var querystring = require('querystring');
var countriesObject = require("./countries");

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

function filterCountries(searchParameter, dataObject ){
  var regex = new Regex('/^' + searchParameter + '/i');

  return Object.values(dataObject).filter(function(value){
    return value.matches(regex);
  });

}

module.exports = {
  homeHandler,
  staticFileHandler,
  autocompleteHandler
}
