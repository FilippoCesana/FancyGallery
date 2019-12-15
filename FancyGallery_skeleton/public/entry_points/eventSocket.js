const socket = io();

const eventId = document.getElementById('event_id').value;
const gallery = document.getElementById('photoGallery');


socket.on('connect', function () {
    console.log("connected from event", eventId);
    socket.emit('visiting', {eventId:eventId})
});



socket.on('newImage', function(image){
   // writeEvent(image);
    console.log(image);
    console.log('HELLO');
     dust.render('image', image, function(html){
         gallery.innerHTML += html;
     });
});