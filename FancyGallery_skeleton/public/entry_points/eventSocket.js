const socket = io();

const eventId = document.getElementById('event_id').value;
const gallery = document.getElementById('photoGallery');


socket.on('connect', function () {
    console.log("connected from event", eventId);
    socket.emit('visiting', {eventId:eventId})
});



socket.on('newImage', function(image){
   // writeEvent(image);
     dust.render('partials/image', image, function(err, html){
         if(err){
             console.log(err);
         }
         console.log(html);
         gallery.innerHTML += html;
     });
});