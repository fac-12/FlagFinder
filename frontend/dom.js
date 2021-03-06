var searchForm = document.getElementById('searchForm');
var datalist = document.getElementById('countries');
var errorMessage = document.getElementById('error-message');
var image = document.getElementById('flag');
var body = document.getElementsByTagName('body')[0];

var searchValue;

searchForm.addEventListener('input', function(event) {
  searchValue = event.target.value;
  var url = '/autocomplete';
  var xhr = new XMLHttpRequest();
  var obj;

  if(searchValue === ''){
    removeOptions();
  } else {
    createOptions();
}
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4){


      obj = JSON.parse(xhr.responseText);

      autocomplete(obj);
    }
  };


  xhr.open("POST", url, true);
  xhr.send(searchValue);

})

function autocomplete(countryArray){

  var optionsArray = Array.from(document.getElementsByTagName('option'));
  console.log(countryArray);
  optionsArray.forEach(function(option, index) {

    if(countryArray[index] !== undefined)
      option.setAttribute("value", countryArray[index]);
    else
      option.setAttribute("value", '');
  });
}


searchForm.addEventListener('submit', function(event) {
  event.preventDefault();
  searchValue = event.target[0].value;

  var xhr = new XMLHttpRequest();
  var url = 'https://restcountries.eu/rest/v2/name/' + searchValue + '?fullText=true';

  var responseObj;

  xhr.onreadystatechange = function() {
    if(xhr.readyState == 4) {
      if(xhr.status == 200) {
        responseObj = JSON.parse(xhr.responseText)[0];
        flagRenderer(responseObj);
      }
      else if(xhr.status == 404) {
        errorHandler();
      }
    }

  }

  xhr.open("GET", url, true);
  xhr.send();


});

function flagRenderer(countryObj) {
  errorMessage.innerText = '';
  image.src = countryObj.flag;
  body.style.backgroundImage = "url('" + countryObj.flag + "')";
}

function removeOptions() {
  while (datalist.hasChildNodes()) {
    datalist.removeChild(datalist.firstChild);
  }
}

function createOptions() {
  if(!datalist.hasChildNodes()) {
    for (var i = 0; i < 10; i++) {
      var option = document.createElement('option');
      option.id = i;
      datalist.appendChild(option);
    }
  }
}

function errorHandler() {
  errorMessage.innerText = 'This is not a country!';
  image.src = '';
  body.style.backgroundImage = "url('')";
}
