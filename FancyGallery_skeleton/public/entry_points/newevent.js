// TODO: 1) SERCH form,  2) ADD photographer, 3) DELETE photographer

document.addEventListener("DOMContentLoaded", start);

function start() {
  // variables
  let myEvent = {
    orginainizer: undefined,
    photographers: []
  };

  let plus_list = document.getElementById("plus_list");
  let minus_list = document.getElementById("minus_list");

  let search_input = document.getElementById("search_input");
  let add_btn = document.getElementsByClassName("plus");
  let delete_btn = document.getElementsByClassName("minus");

  //all these varibles are null

  // Event Listeners
  search_input.addEventListener("keypress", () => {
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
  });

  add_btn.addEventListener("onclick", (myEvent, photographer) => {
    add_btn.parentNode.removeChild(add_btn);
    return myEvent.photographers.push(photographer.id);
  });

  delete_btn.addEventListener("onclick", (myEvent, photographer) => {
    let target = myEvent.photographers.findIndex(e => photographer.id == e._id);
    return myEvent.photographers.splice(target, 1);
  });
}
