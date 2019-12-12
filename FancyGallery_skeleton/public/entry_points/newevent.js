// TODO: 1) SERCH form,  2) ADD photographer, 3) DELETE photographer

document.addEventListener("DOMContentLoaded", start);

function start() {
  // variables
  let myEvent = {
    orginainizer: undefined,
    photographers: []
  };

  let search_input = document.getElementById("search_input");
  let add_btn = document.getElementsByClassName(".plus");
  let delete_btn = document.getElementsByClassName(".minus");

  //var new_list = document.querySelector("div[class = 'container_form']");
  //var add_phot = document.querySelector("input[class='bt_add_photographer']");
  //all these varibles are null

  // Event Listeners
  search_input.addEventListener("keypress", photographer_search);
  add_btn.addEventListener("onclick", add_photographer);
  delete_btn.addEventListener("onclick", remove_photographer);

  function photographer_search() {
    doFetchRequest(
      "GET",
      "user/search?name=" + search_input.value,
      {
        "Content-Type": "text/html"
      },
      undefined
    )
      .then(res => {
        console.log(res);
        return res.text();
      })
      .then(body => {
        document.getElementById("search_result").innerHTML = body;
      });
  }

  // da inizializzare ogni volta che creo una nuova galleria
  // when page is reloaded {loggedId,}

  function add_photographer(myEvent, photographer) {
    return myEvent.photographers.push(photographer.id);
  }

  function remove_photographer(myEvent, photographer) {
    let target = myEvent.photographers.findIndex(e => photographer.id == e._id);
    return myEvent.photographers.splice(target, 1);
  }
}
