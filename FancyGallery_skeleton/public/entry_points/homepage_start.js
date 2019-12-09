//function to count times show more button is pressed
function nextNumber(){
    if(typeof nextNumber.counter == 'undefined'){
        nextNumber.counter = 0 ;
    }
   return  ++nextNumber.counter;
}

    


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
    });

   
}

function login(){
    //inviare la password in modo sicuro bisogna fare lo start.js del login
    window.location.href = "http://localhost:3000/user/login"
}

function signUp(){
    window.location.href = "http://localhost:3000/user/signin"
}

function searchEventByName(e){
   const value = document.getElementById('search_text_field').value.replace(" ","_");

   const options = {
    method : 'get',
    headers : {
        accept : "application/json"
        }
    } 

    const url = "http://localhost:3000/event/search&event_name="+value;

    fetch(url,options)
        .then(res=>res.json().then(model=>{
            nextNumber.counter = undefined;
            dust.render("partials/event",{model},(err,out)=>{
                if(err){throw err}
                document.getElementById('gallery').innerHTML = out;
            })
        }))
        .catch(err=>{
            console.log("error during searching for event");
            throw err;
        })

}

function showLess(){
  document.getElementById("show_more_btn").style.display = 'none';
}

async function showMore(e){

    // const options = {
    //     method : 'get',
    //     headers : {
    //         accept : "application/json"
    //     }
    // }
    //   const n = nextNumber();
    //     const url ='http://localhost:3000/event/more&n='+n;
    //    fetch(url,options)
    //         .then((r)=>r.json().then((model)=>{
    //             if(model.length ==0){showLess(); return};
    //             dust.render('partials/event',{model},(err,out)=>{
    //                 if(err){throw err};
    //                 const gallery = document.getElementById('gallery');
    //                 const before =  gallery.innerHTML;
    //                 gallery.innerHTML = before + " " + out;
    //             })
    //         }))
    //         .catch(err=>{throw err})
    console.log("ricevuto")


}

function showEvent(e,item){
    //capire che event ha cliccato leggendo l'id associato;
    //richiesta per l'evento 
    //render nel div corretto

    //TODO:
    // if already open_event_box do nothing
    //await chimata fetch 
    //close button
    console.log(item)
    const x = e.clientX;
    const y = e.clientY;
   document.body.style.overflow = 'hidden'
    const open_event_box = document.getElementById("open_event_box");
    open_event_box.className = "open_event_box_style"
    open_event_box.style.position = "fixed";
    open_event_box.style.top      =  100   + 'px';
    open_event_box.style.left     = 200 + 'px'

    
    console.log("TODO showEvent");
}

setTimeout(()=>{
   


            start();
   
},10)

