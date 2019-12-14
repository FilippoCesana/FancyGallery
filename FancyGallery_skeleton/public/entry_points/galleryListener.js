// document.getElementById("add_photo_btn").addEventListener('click', e => {
//         doJSONRequest('GET', '/event/addimage', {}, undefined)});

if(document.getElementById("add_photo_btn")){
        document.getElementById("add_photo_btn").addEventListener('click',()=> upload())
}

function upload(){
window.location.href = "http://localhost:3000/event/addImage";
}

//che cazzo deve fare se schiaccio bottone add image dentro una ga,llery


