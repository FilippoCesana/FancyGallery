// TODO: 1) SERCH form,  2) ADD photographer, 3) DELETE photographer

document.addEventListener("DOMContentLoaded", start);

function start() {
  // variables
  myEvent = {
    orginainizer: undefined,
    photographers: []
  };

  let plus_list = document.getElementById("plus");
  let minus_list = document.getElementById("minus");
  let search_input = document.getElementById("search_input");
  let add_btn_collection = document.querySelectorAll(".plus");
  let delete_btn_collection = document.querySelectorAll(".minus");

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

  add_btn_collection.forEach(element => {
    element.addEventListener("onclick", (myEvent, photographer) => {
      console.log("Here");
      plus_list.removeChild(this);
      this.setAttribute("src", "../../public/images/remove.png");
      minus_list.appendChild(this.setAttribute("class", "delete_btn"));

      //return myEvent.photographers.push(photographer.id);
    });
  });

  delete_btn_collection.forEach(element => {
    element.addEventListener("onclick", (myEvent, photographer) => {
      console.log("There");
      minus_list.removeChild(this);
      this.setAttribute("src", "../../public/images/add.png");
      plus_list.appendChild(this.setAttribute("class", "delete_btn"));
      let photographer_inList = myEvent.photographers.findIndex(
        p => photographer.id == p._id
      );
      return myEvent.photographers.splice(photographer_inList, 1);
    });
  });
}
