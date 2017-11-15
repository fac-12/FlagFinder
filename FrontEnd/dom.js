const searchForm = document.getElementById('searchForm');


let searchValue;

searchForm.addEventListener('input', function(event) {
  searchValue = event.target.value;
  let url = 'http://localhost:8000/autocomplete';
  var xhr = new XMLHttpRequest();
  var obj;

  autocomplete([
    "england",
    "estonia",
    "ecuador",
    "egypt",
    "emmental"
  ]);

  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4){

      obj = JSON.parse(xhr.responseText);

    }
  };

  xhr.open("POST", url, true);
  xhr.send(searchValue);

})

function autocomplete(obj){
  obj.forEach(function(country, index){
    let option = document.getElementById(index.toString());
    option.setAttribute("value", country);
  })
}


// searchForm.addEventListener('submit', function(event) {
//   event.preventDefault();
//   var xhr = new XMLHttpRequest();
//     var obj;
//
//     xhr.onreadystatechange = function(){
//       if(xhr.readyState == 4){
//
//         obj = JSON.parse(xhr.responseText);
//         callback(obj);
//       }
//     };
//
//     xhr.open("GET", url, true);
//     xhr.send();
//
// })
