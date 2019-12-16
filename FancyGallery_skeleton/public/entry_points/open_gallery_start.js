function start(){
    let images = document.querySelectorAll('.image_box');
    images.forEach(image=>{
        image.addEventListener('click', (e)=>openImage(e,image));
    });
}


function openImage(e,item){

    window.location.href = "/image/open"
}


setTimeout(()=>{
    start()
},10);
