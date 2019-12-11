// TODO: 1) SERCH form,  2) ADD photographer, 3) DELETE photographer

document.addEventListener("DOMContentLoaded", start);

function start() {
  // variables
  let myEvent = {
    orginainizer: undefined,
    photographers: []
  };

  let search_input = document.getElementById("search_input");

  //var new_list = document.querySelector("div[class = 'container_form']");
  //var add_phot = document.querySelector("input[class='bt_add_photographer']");
  //all these varibles are null

  // Event Listeners
  search_input.addEventListener("keypress", photographer_search);
  // console.log("search_input: ", search_input.getElementsByClassName());

  function photographer_search() {
    doFetchRequest("GET", "user/search?name=" + search_input.value, {
      "Content-Type": "text/html"
    })
      .then(res => {
        console.log(res);
        //return res.text();
      })
      .then(body => {
        document.getElementById("search_result").innerHTML = body;
      });
  }

  // search_input.addEventListener("load",);

  // da inizializzare ogni volta che creo una nuova galleria
  // when page is reloaded {loggedId,}
  function new_photographer_list(myEvent) {
    return myEvent.photographers.push(myEvent.organizer);
  }

  function add_photographer(myEvent, photographer) {
    return myEvent.photographers.push(photographer.id);
  }

  function remove_photographer(myEvent, photographer) {
    let target = myEvent.photographers.findIndex(e => photographer.id == e._id);
    return myEvent.photographers.splice(target, 1);
  }
}
