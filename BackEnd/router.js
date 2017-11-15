var { homeHandler, staticFileHandler, autocompleteHandler} = require('./handler');


function router(request, response){
  var url = request.url;

  if(url.indexOf('FrontEnd') !== -1) {
    staticFileHandler(request, response, url)
    return;
  }

  switch (url) {
    case '/':
      homeHandler(request, response);
      break;
    case '/autocomplete':
      autocompleteHandler(request, response);
      break;
    default:
      response.writeHead(404);
      response.end('404, File not found.');
      return;
  }
}

module.exports = router;
