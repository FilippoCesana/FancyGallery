// search
var search_input = document.querySelector("input[name='photographer_search_field']");
search_input.addEventListener("keyup", (e) => {
  var s = photographer_search_field.value;
  console.log(s);
  doFetchRequest('GET', "user/search?name=" + s, {'Content-Type':'text/html'}, undefined)
  .then((res) => {return res.text()})
  .then((body) => {document.getElementById('search_result').innerHTML = body})
})

let myEvent
initNewEvent()

// da inizializzare ogni volta che creo una nuova galleria
function new_photographer_list(organizzatore){
  myEvent.organizer = organizzatore;
  myEvent.photographers.push(organizzatore);
}

function add_photographer(photographer) {
  myEvent.photographers.push(photographer.id);
}

function remove_photographer(photographer) {
  let target = myEvent.photographers.findIndex(e => (photographer.id == e._id));
  myEvent.photographers.splice(target,1);
}

function initNewEvent() {
  myEvent = {
    orginainizer: undefined,
    photographers: []
  }
}