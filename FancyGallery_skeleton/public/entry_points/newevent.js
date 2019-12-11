// function initNewEvent() {
//   myEvent = {
//     orginainizer: undefined,
//     photographers: []
//   };
// }

// variables
let myEvent = {
  orginainizer: undefined,
  photographers: []
};

var new_list = document.querySelector("div[class = 'container_form']");
var add_phot = document.querySelector("input[class='bt_add_photographer']");
var search_input = document.querySelector(
  "input[name='photographer_search_field']"
);
//all these varibles are null

// Event Listeners
// the event listener for remove photographer is already in the botton tag
console.log(new_list);
//search_input.addEventListener("keyup", photographer_search);
function photographer_search() {
  //photographer search event Listener
  var s = photographer_search_field.value;
  console.log(s);
  doFetchRequest(
    "GET",
    "user/search?name=" + s,
    { "Content-Type": "text/html" },
    undefined
  )
    .then(res => {
      return res.text();
    })
    .then(body => {
      document.getElementById("search_result").innerHTML = body;
    });
}

// search_input.addEventListener("load",);

// da inizializzare ogni volta che creo una nuova galleria
// when page is reloaded {loggedId,}
function new_photographer_list(organizzatore) {
  myEvent.organizer = organizzatore;
  return myEvent.photographers.push(organizzatore);
}

function add_photographer(photographer) {
  return myEvent.photographers.push(photographer.id);
}

function remove_photographer(photographer) {
  let target = myEvent.photographers.findIndex(e => photographer.id == e._id);
  return myEvent.photographers.splice(target, 1);
}
