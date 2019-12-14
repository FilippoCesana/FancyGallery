document.getElementById("add_photo_btn")addEventListener('click', e => {
        doJSONRequest('GET', 'image/{id}/addimage', {}, {dataURL : canvas.toDataURL()})};

//che cazzo deve fare se schiaccio bottone add image dentro una gallery
