const searchForm = document.getElementById('searchForm');

let searchValue;

searchForm.addEventListener('input', function(event) {
  searchValue = event.target.value;
  var xhr = new XMLHttpRequest();
    var obj;

    xhr.onreadystatechange = function(){
      if(xhr.readyState == 4){

        obj = JSON.parse(xhr.responseText);
        callback(obj);
      }
    };

    xhr.open("GET", url, true);
    xhr.send();

})


searchForm.addEventListener('submit', function(event) {
  event.preventDefault();
  var xhr = new XMLHttpRequest();
    var obj;

    xhr.onreadystatechange = function(){
      if(xhr.readyState == 4){

        obj = JSON.parse(xhr.responseText);
        callback(obj);
      }
    };

    xhr.open("GET", url, true);
    xhr.send();

})
