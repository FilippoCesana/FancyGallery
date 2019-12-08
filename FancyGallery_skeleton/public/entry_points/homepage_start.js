
function start(){
    
    //login button listen click
    const login_btn = document.getElementById('log_in_btn');
    login_btn.addEventListener('click', (e)=>login(e));

    //signin button listen click
    const sign_in_btn = document.getElementById("sign_in_btn");
    sign_in_btn.addEventListener('click', (e)=>signUp(e));

    //search button listen click
    const search_btn = document.getElementById('search_btn');
    search_btn.addEventListener('click',(e)=>searchEventByName(e));


    //show more btn button listen click
    const show_more_btn = document.getElementById('show_more_btn');
    show_more_btn.addEventListener('click',(e)=>showMore(e))

    //event open listen click
    const event_boxes = document.querySelectorAll(".event_box");
    event_boxes.forEach(box=>{
        box.addEventListener('click', (e)=>showEvent(e,box))
    })
    
}

function login(){
    //TODO:
    //go to nico form
    console.log("prova");
    // window.location.href = "http://localhost:3000/user/login/";
}
function sign_up(){
      //richiesta per sing_up e redirect to homepage_logged
}

function searchEventByName(){
    //read input e fai richiesta per quell'evento
    //render 
}

function showMore(){
    // counter per capire quante volte a richiesto lo showMore e caricare solo nuovi event
    //richiesta
    //render nel div corretto
}

function showEvent(){
    //capire che event ha cliccato leggendo l'id associato;
    //richiesta per l'evento 
    //render nel div corretto
}

setTimeout(()=>{
    start();
},100);

