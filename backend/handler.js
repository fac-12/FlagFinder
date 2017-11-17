var fs = require('fs');
var path = require('path');
var querystring = require('querystring');
var countriesObject = require("./countries.json");

function homeHandler(request, response) {
  var filePath = path.join(__dirname, '..', 'frontend', 'index.html');
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

  request.on('data',function(chunkOfData){
    allTheData += chunkOfData;
  });
  request.on('end',function(){

    var filteredArray = filterCountries(allTheData, countriesObject);

    response.writeHead(200,{'Content-Type':'application/json'});
    response.end(JSON.stringify(filteredArray));

  });

}

function filterCountries(searchParameter, dataObject ){

  var regex = new RegExp('^' + searchParameter, 'i');
  var newObject = JSON.parse(JSON.stringify(dataObject));

  newObject.countries = newObject.countries.filter(function(country){
    return regex.test(country);
  });
  
  if(newObject.countries.length < 5)
    return newObject.countries;
  else
    return newObject.countries = newObject.countries.slice(0,5);
}

module.exports = {
  homeHandler,
  staticFileHandler,
  autocompleteHandler,
  filterCountries
}
