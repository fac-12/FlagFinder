const searchForm = document.getElementById('searchForm');

let searchValue;

searchForm.addEventListener('input', function(event) {
  searchValue = event.target.value;
  let url = 'http://localhost:8000/autocomplete';
  var xhr = new XMLHttpRequest();
  var obj;

  // autocomplete([
  //   "england",
  //   "estonia",
  //   "ecuador",
  //   "egypt",
  //   "emmental"
  // ]);

  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4){
      console.log('client side', xhr.responseText);
      obj = JSON.parse(xhr.responseText);

      autocomplete(obj);
    }
  };

  xhr.open("POST", url, true);
  xhr.send(searchValue);

})

function autocomplete(array){
  array.forEach(function(country, index){
    let option = document.getElementById(index.toString());
    option.setAttribute("value", country);
  })
}


searchForm.addEventListener('submit', function(event) {
  event.preventDefault();
  searchValue = event.target[0].value;

  var xhr = new XMLHttpRequest();
  var url = 'https://restcountries.eu/rest/v2/name/' + searchValue + '?fullText=true';


  var responseObj;

  xhr.onreadystatechange = function() {
    if(xhr.readyState == 4) {
      responseObj = JSON.parse(xhr.responseText)[0];
      flagRenderer(responseObj);


    }
  }

  xhr.open("GET", url, true);
  xhr.send();


});

function flagRenderer(countryObj) {
  var image = document.getElementById('flag');
  image.src = countryObj.flag;
}
