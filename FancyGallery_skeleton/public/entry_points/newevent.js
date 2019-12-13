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
      "user/search?nickname=" + search_input.value,
      {
        Accept: "application/json"
      },
      undefined
    )
      .then(res => {
        return res.json();
      })
      .then(photographers => {
        let result_photographer = photographers.findIndex(
          p => p.id === photographer.id
        );
        return result_photographer;
      })
      .then(body => {
        document.getElementById("search_result").innerHTML = body;
      });
  });

  add_btn_collection.forEach(element => {
    element.addEventListener("click", (e, photographer) => {
      e.preventDefault();

      element.setAttribute("src", "../public/images/remove.png");
      element.setAttribute("class", "delete_btn");
      plus_list.removeChild(element);
      element.style.display = "block";

      minus_list.appendChild(element);

      console.log(element);

      return myEvent.photographers.push(photographer.id);
    });
  });

  delete_btn_collection.forEach(element => {
    element.addEventListener("click", (e, photographer) => {
      e.preventDefault();
      element.setAttribute("src", "../public/images/add.png");
      element.setAttribute("class", "delete_btn");
      minus_list.removeChild(element);
      element.style.display = "block";

      plus_list.appendChild(element);
      let photographer_inList = myEvent.photographers.findIndex(
        p => photographer.id == p._id
      );
      return myEvent.photographers.splice(photographer_inList, 1);
    });
  });
}
