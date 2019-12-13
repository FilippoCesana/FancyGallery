//function to count times show more button is pressed

const show_more_manager = {
    events : [],
    times  : 0,
    
    init : async ()=>{
        const url = "http://localhost:3000/events"
        const options = {
            method : "GET",
            headers : {
                "Accept" : "application/json"
            }
        }

        try{
          const res =  await fetch(url,options);
          this.events = await res.json();
          this.times = 1;

        }catch(err){
            throw err;
        }
        
    },

    hideButton : ()=>{
        document.getElementById('show_more_btn').style.display = 'none';
    },

    display : ()=>{
       
        const start = this.times * 1;
     
        const end   = (this.times + 1) * 1;
       
        const tmp = this.events.slice(start,end);
        
        
        if(tmp.length === 0){this.hideButton; return}
        
        let finalToBeRendered = "";
        tmp.forEach(event=>{
            dust.render("partials/event",event,(err,out)=>{
                if(err)throw err;
    
            finalToBeRendered += out;
             
        })
        })
        console.log(finalToBeRendered)
        const gallery =  document.getElementById('gallery');
        gallery.innerHTML = gallery.innerHTML + " " + finalToBeRendered;

        this.times = this.times +1;
    }
}



async function start(){

    //login button listen click
    const login_btn = document.getElementById('log_in_btn');
    login_btn.addEventListener('click', (e)=>login(e));

    //signin button listen click
    const sign_in_btn = document.getElementById("sign_in_btn");
    sign_in_btn.addEventListener('click', (e)=>signUp(e));

    //search button listen click
    // const search_btn = document.getElementById('search_btn');
    // search_btn.addEventListener('click',(e)=>searchEventByName(e));

    var search_input_home = document.querySelector("input[name='event_name']");
    search_input_home.addEventListener("keyup", (e)=>searchEventByName(e));

    //show more btn button listen click
    const show_more_btn = document.getElementById('show_more_btn');
    show_more_btn.addEventListener('click',(e)=>show_more_manager.display());

    //event open listen click
    const event_boxes = document.querySelectorAll(".event_box");
    event_boxes.forEach(box=>{
        box.addEventListener('click', (e)=>showEvent(e,box))
    });

    await show_more_manager.init();
    


}

function login(){
    //inviare la password in modo sicuro bisogna fare lo start.js del login
    window.location.href = "http://localhost:3000/auth/login"
}

function signUp(){
    window.location.href = "http://localhost:3000/user/signin"
}

function resetResults(){
    document.getElementById("gallery").innerHTML = "No event found";
}

function searchEventByName(e){
   const value = document.getElementById('search_text_field').value;
   
   const options = {
    method : 'get',
    headers : {
        accept : "application/json"
        }
    }



    const url = "http://localhost:3000/event/match/"+value;

    fetch(url,options)
        .then(res=>res.json().then(result=>{
            nextNumber.counter = undefined;
            if(result.length === 0) { resetResults(); return;}
            const model = [];

            result.forEach(event=>{

                model.push({
                    name : event.name,
                    id   : event._id,
                    timestamp : event.start,
                    dataURL   : event.cover,
                    place     : event.place,
                });
            });
            document.getElementById("show_more_btn").style.display = '';
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

   


}

function showEvent(e,item){
   const event_id = item.childNodes[8].value;
    const options = {
        method : "get"
    }

    const url = "http://localhost:3000/event/open/id="+event_id;
    // fetch(url,options);
    window.location.href = url
}

setTimeout(()=>{
  start();
},10)
