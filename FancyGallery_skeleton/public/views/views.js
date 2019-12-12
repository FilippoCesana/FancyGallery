(function(dust) {
  dust.register("partials/event", body_0);
  function body_0(chk, ctx) {
    return chk
      .w(
        "<style>.event_place_label{color: grey;margin-left: 60px;font-size: 15px;}.event_name_label{margin-left: 30px;font-size: 15px;color: grey;}.event_btn_toGallery{margin-left: 55px;}.btn{padding: 5%; background-color:rgba(250, 250, 250, 0.918);color: grey;border-color: rgb(91, 224, 247);font-family: 'Montserrat', sans-serif;text-shadow: 4px 4px 4px rgb(112, 189, 189);}.btn:hover{padding: 5%; background-color:rgb(246, 237, 114);border-color: rgb(11, 12, 12);font-family: 'Montserrat', sans-serif;text-shadow: 2px 2px 2px black,2px 2px 2px purple,3px 10px 10px rgb(25, 27, 8);}</style>"
      )
      .s(ctx.get(["model"], false), ctx, { block: body_1 }, {});
  }
  body_0.__dustBody = !0;
  function body_1(chk, ctx) {
    return chk
      .w('<div class="event_box" ><a href="imagesEvent.dust"><img src="')
      .f(ctx.get(["dataURL"], false), ctx, "h")
      .w('"> </img></a><label class="event_place_label">')
      .f(ctx.get(["place"], false), ctx, "h")
      .w(', </label><label class="event_name_label">')
      .f(ctx.get(["name"], false), ctx, "h")
      .w(' </label><label class="event_timestamp_label">')
      .f(ctx.get(["timestamp"], false), ctx, "h")
      .w(
        ' </label><div class= "event_btn_toGallery"><!-- <a href="imagesEvent.dust" class="btn btn-primary">Visit</a> --></div><input type="hidden" value="'
      )
      .f(ctx.get(["id"], false), ctx, "h")
      .w('" class="event_id_input"> </input></div>');
  }
  body_1.__dustBody = !0;
  return body_0;
})(dust);
(function(dust) {
  dust.register("partials/slideshow", body_0);
  function body_0(chk, ctx) {
    return chk.w(
      '<!doctype html><html lang="en"><head><!-- Required meta tags --><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script><title>Slide Show</title></head><body><div class="container"><h2>SlideShow</h2><div id="myCarousel" class="carousel slide" data-ride="carousel"><!-- Indicators --><ol class="carousel-indicators"><li data-target="#myCarousel" data-slide-to="0" class="active"></li><li data-target="#myCarousel" data-slide-to="1"></li><li data-target="#myCarousel" data-slide-to="2"></li></ol><!-- Wrapper for slides --><div class="carousel-inner"><div class="item active"><img src="../images/partyWall0.jpg" alt="Los Angeles" style="width:100%;"><div class="carousel-caption"><h3>Los Angeles</h3><p>LA is always so much fun!</p></div></div><div class="item"><img src="../images/partyWall5.jpg" alt="Chicago" style="width:100%;"><div class="carousel-caption"><h3>Chicago</h3><p>Thank you, Chicago!</p></div></div><div class="item"><img src="../images/partyWall4.jpg" alt="New York" style="width:100%;"><div class="carousel-caption"><h3>New York</h3><p>We love the Big Apple!</p></div></div></div><!-- Left and right controls --><a class="left carousel-control" href="#myCarousel" data-slide="prev"><span class="glyphicon glyphicon-chevron-left"></span><span class="sr-only">Previous</span></a><a class="right carousel-control" href="#myCarousel" data-slide="next"><span class="glyphicon glyphicon-chevron-right"></span><span class="sr-only">Next</span></a></div></div><!-- Optional JavaScript --><!-- jQuery first, then Popper.js, then Bootstrap JS --><script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script><script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script><script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script></body></html>'
    );
  }
  body_0.__dustBody = !0;
  return body_0;
})(dust);
