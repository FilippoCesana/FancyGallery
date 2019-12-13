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

  // add_btn_collection.forEach(element => {
  //   element.addEventListener("click", e => h(e, element));
  // });
  // delete_btn_collection.forEach(element => {
  //   element.addEventListener("click", h);
  // });

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
    element.addEventListener("click", (e, photographer) => {
      e.preventDefault();

      element.setAttribute("src", "../public/images/remove.png");
      element.setAttribute("class", "delete_btn");
      plus_list.removeChild(element);
      element.style.display = "block";
      // element.style.margin = "top :1em";
      // element.style.margin = "bottom : 1em";
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

  // function h(e, elem) {
  //   e.preventDefault();
  //   console.log("mehhh");
  //   console.log(elem);
  // }
}
