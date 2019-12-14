
let filter_value = false;

//function to count times show more button is pressed

const show_more_manager = {
    events : [],
    times  : 0,
    user_events : [],
    displayed : [],
    
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
          console.log(res);
          const final = await res.json();
          console.log(final);
          this.events = final.events;
          this.displayed = final.events.slice(0,3);
          this.user_events = (final.user) ? final.user : undefined;
          this.times = 1;

        }catch(err){
            throw err;
        }
        
    },
    show_already_load : ()=>{
        let finalToBeRendered = "";
        console.log(this.displayed.length)
        this.displayed.forEach(event=>{
            dust.render("partials/event",event,(err,out)=>{
                if(err)throw err;
                finalToBeRendered += out;
            });
        });
        const gallery =  document.getElementById('gallery');
        gallery.innerHTML =  finalToBeRendered;
        setTimeout(()=>{
            document.querySelectorAll('.event_box').forEach(box=>{
                box.addEventListener('click', (e)=>showEvent(e,box))
            });
        },10)
    },


    display : ()=>{
       
        const start = this.times * 3;
     
        const end   = (this.times + 1) * 3;
       
        const tmp = this.events.slice(start,end);
        
       
        if(tmp.length === 0){ document.getElementById('show_more_btn').style.display = 'none';return}
        
        this.displayed = this.displayed.concat(tmp);
        
        let finalToBeRendered = "";
        tmp.forEach(event=>{
            dust.render("partials/event",event,(err,out)=>{
                if(err)throw err;
    
            finalToBeRendered += out;
             
        })
        })
        
        const gallery =  document.getElementById('gallery');
        gallery.innerHTML = gallery.innerHTML + " " + finalToBeRendered;
        setTimeout(()=>{
            document.querySelectorAll('.event_box').forEach(box=>{
                box.addEventListener('click', (e)=>showEvent(e,box))
            });
        },10)
        
        this.times = this.times +1;
    },

    display_user_events : ()=>{

        let final = '';
        this.user_events.forEach(event=>{
            dust.render("partials/event",event,(err,out)=>{
                if(err)throw err;
                final +=  out;
            })
        });
        const gallery =  document.getElementById('gallery');
        gallery.innerHTML =  final;
        setTimeout(()=>{
            document.querySelectorAll('.event_box').forEach(box=>{
                box.addEventListener('click', (e)=>showEvent(e,box))
            });
        },10)

    }

}



async function start(){

    //login button listen click
    if(document.getElementById('log_in_btn')){
        const login_btn = document.getElementById('log_in_btn');
        login_btn.addEventListener('click', (e)=>login(e));
    
        //signin button listen click
        const sign_in_btn = document.getElementById("sign_in_btn");
        sign_in_btn.addEventListener('click', (e)=>signUp(e));
    
    }else{
        const logout_btn = document.getElementById("log_out_btn");
        logout_btn.addEventListener('click',()=>logout());
    }
   
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

    //buttonLoggedFilter
    if(document.getElementById("buttonLoggedCreate")){
       const button_create = document.getElementById("buttonLoggedCreate");
       const button_filter = document.getElementById("filter_btn");

       button_create.addEventListener("click",()=>createEvent());
       button_filter.addEventListener('click', (e)=> filterUserEvent(e));
    }

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

    if(value == ""){
       
        show_more_manager.show_already_load();
        return;
    }

    const url = "http://localhost:3000/event/match?name="+value;

    fetch(url,options)
        .then(res=>res.json().then(result=>{
        
            if(result.length == 0) {return;}
           
            let finalToBeRendered = "";
            result.forEach(event=>{
                dust.render("partials/event",event,(err,out)=>{
                    if(err)throw err;
                    finalToBeRendered += out;
                })
                
            });
            
            document.getElementById('gallery').innerHTML = finalToBeRendered;
           
            const event_boxes = document.querySelectorAll(".event_box");
            event_boxes.forEach(box=>{
                box.addEventListener('click', (e)=>showEvent(e,box))
            });


        })) 
         
        .catch(err=>{
            console.log("error during searching for event");
            throw err;
        })

}

function showLess(){
  document.getElementById("show_more_btn").style.display = 'none';
}

function createEvent(){

    const url = "http://localhost:3000/event/create";
    window.location.href = url
}

function showEvent(e,item){
   const event_id = item.childNodes[8].value;
    const options = {
        method : "get"
    }

    const url = "http://localhost:3000/event/open/"+event_id;
    // fetch(url,options);
    window.location.href = url
}

function filterUserEvent(e){
    filter_value = !filter_value;
    
    if(filter_value){
        document.getElementById('show_more_btn').style.display = 'none' 
        show_more_manager.display_user_events();
        
    }else{
        document.getElementById('show_more_btn').style.display = ''
        show_more_manager.show_already_load();
    }
}

setTimeout(()=>{
  start();
},100)

