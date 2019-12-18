const Event = require('./dataModels/Event');
const Image = require('./dataModels/Image');
const User = require('./dataModels/User');
const watch = require('watch');
const canvas = require('canvas');

const socketServer = require('./socketServer')


async function init(){
var gallery_id = "5dfa2e6c2f12f4287343ba5f";  //galleria LIVE
var user_id = "5df23ff7ed0c4f81b5cd33a5"; //brunner


watch.createMonitor('./public/images_canon', (monitor) => {

  monitor.on("created", (file, stat) => {

    console.log(file)

    const { createCanvas, loadImage } = require('canvas')
    const canvas = createCanvas(720, 480)
    const ctx = canvas.getContext('2d')

    loadImage(file).then(async (photo) => {
      ctx.drawImage(photo, 0, 0, 720, 480)

      var imgUrl = canvas.toDataURL();

      let image = new Image({
          dataURL: imgUrl,
          photographer: user_id
      });

      const event = await Event.findById(gallery_id);

      socketServer.io.to(event._id.toString()).emit('newImage', image)

      console.log('EVENT:', event);

      image = await image.save();
      event.images.push(image._id);
      await event.save();

    })
  })
});
}

init();
