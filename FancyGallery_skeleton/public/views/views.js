(function(dust){dust.register("partials\/slide",body_0);function body_0(chk,ctx){return chk.w("<style>#myImg {border-radius: 5px;cursor: pointer;transition: 0.3s;}#myImg:hover {opacity: 0.7;}/* The Modal (background) */.modal {display: none; /* Hidden by default */position: fixed; /* Stay in place */z-index: 1; /* Sit on top */padding-top: 100px; /* Location of the box */left: 0;top: 0;width: 100%; /* Full width */height: 100%; /* Full height */overflow: auto; /* Enable scroll if needed */background-color: rgb(0,0,0); /* Fallback color */background-color: rgba(0,0,0,0.9); /* Black w/ opacity */}/* Modal Content (Image) */.modal-content {margin: auto;display: block;width: 80%;max-width: 700px;}/* Caption of Modal Image (Image Text) - Same Width as the Image */#caption {margin: auto;display: block;width: 80%;max-width: 700px;text-align: center;color: #ccc;padding: 10px 0;height: 150px;}/* Add Animation - Zoom in the Modal */.modal-content, #caption {animation-name: zoom;animation-duration: 0.6s;}@keyframes zoom {from {transform:scale(0)}to {transform:scale(1)}}/* The Close Button */.close {position: absolute;top: 15px;right: 35px;color: #f1f1f1;font-size: 40px;font-weight: bold;transition: 0.3s;}.close:hover,.close:focus {color: #bbb;text-decoration: none;cursor: pointer;}/* 100% Image Width on Smaller Screens */@media only screen and (max-width: 700px){.modal-content {width: 100%;}}</style><!-- Trigger the Modal -->").x(ctx.get(["dataURL"], false),ctx,{"block":body_1},{});}body_0.__dustBody=!0;function body_1(chk,ctx){return chk.w("<img id=\"myImg\" src=\"").f(ctx.getPath(true, ["dataURL"]),ctx,"h").w("\" alt=\"Snow\" style=\"width:100%;max-width:300px\"><!-- The Modal --><div id=\"myModal\" class=\"modal\"><!-- The Close Button --><span class=\"close\">&times;</span><!-- Modal Content (The Image) --><img class=\"modal-content\" id=\"img01\"><!-- Modal Caption (Image Text) --><div id=\"caption\"></div></div>");}body_1.__dustBody=!0;return body_0}(dust));
(function(dust){dust.register("partials\/image",body_0);function body_0(chk,ctx){return chk.w("<!-- !!! per qualche motivo se rimuovo il css da qui e lo metto in index.css, salta tutto, quindi per il momento lasciamol qui --><style>#photoGallery div.event_box {margin-left: 100px;float: left;width: 250px;}#photoGallery div.event_box img {width: 100%;height: 180px;box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.42);margin-left: 10px;}</style><div class=\"event_box\" ><img src=\"").f(ctx.get(["dataURL"], false),ctx,"h").w("\" class=\"image_box\" /><!-- <label class=\"id_photographer\">").f(ctx.get(["photographer"], false),ctx,"h").w(" </label> --><input type=\"hidden\" value=\"").f(ctx.get(["_id"], false),ctx,"h").w("\" class=\"id_image\"> </input><br/><input type=\"hidden\" value=\"").f(ctx.get(["dateCreated"], false),ctx,"h").w("\"> </input><input type=\"hidden\" value=\"").f(ctx.get(["photographer"], false),ctx,"h").w("\"> </input><br/></div>");}body_0.__dustBody=!0;return body_0}(dust));
(function(dust){dust.register("partials\/event",body_0);function body_0(chk,ctx){return chk.w("<div class=\"event_box\" ><img src=\"").f(ctx.get(["cover"], false),ctx,"h").w("\"> </img><label class=\"event_place_label\">").f(ctx.get(["place"], false),ctx,"h").w(",     </label><label class=\"event_name_label\">").f(ctx.get(["name"], false),ctx,"h").w(" </label><label class=\"event_timestamp_label\">").f(ctx.get(["start"], false),ctx,"h").w(" </label><!-- <div class= \"event_btn_toGallery\"> --><!-- <a href=\"imagesEvent.dust\" class=\"btn btn-primary\">Visit</a> --><!-- </div> --><input type=\"hidden\" value=\"").f(ctx.get(["_id"], false),ctx,"h").w("\" class=\"event_id_input\"> </input></div>");}body_0.__dustBody=!0;return body_0}(dust));
