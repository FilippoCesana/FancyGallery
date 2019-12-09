// search
var search_input = document.querySelector("input[name='photographer_search_field']");
search_input.addEventListener("keyup", (e) => {
  var s = photographer_search_field.value;
  console.log(s);
  var url = "user/search/"+ s;
  doFetchRequest('GET', "user/search?name=" + s, {'Content-Type':'text/html'}, undefined)
  .then((res) => {return res.text()})
  .then((body) => {document.getElementById('search_result').innerHTML = body})
})

var photographersAtParty = [];

// da inizializzare ogni volta che creo una nuova galleria
function new_photographer_list(id_evento, organizzatore){
  photographersAtParty = [organizzatore];
}

function add_photographer(id_evento, photographer) {
  photographersAtParty.push(id_photographer);
}

function remove_photographer(id_evento, photographer) {
  let target = photographersAtParty.findIndex(e => (photographer.id == e._id));
  favorites.splice(target,1);
}
