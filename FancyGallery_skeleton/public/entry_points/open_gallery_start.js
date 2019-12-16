function start(){
    let images = document.querySelectorAll('.event_box');
    images.forEach(image=>{
        image.addEventListener('click', (e)=>openImage(e,image));
    });
}

const hide = ()=>{
    const container = document.getElementById("clicked_img");
    container.className  = "image_close";
}

function openImage(e,item){
    const src = item.childNodes[0].src;
    const container = document.getElementById("clicked_img");
    container.className  = "image_open";
    const img = container.childNodes[0];
    img.src = src;

    document.body.className = "stop_scroll";

    document.getElementById("background").onclick = hide;

    window.location.href = "/image/open"

}


setTimeout(()=>{
    start()
},100);
