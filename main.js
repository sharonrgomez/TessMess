var tscreen = 1;
var a = 555; // y position of drawing canvas
var b = 230; // x position of drawing canvas
var c = 256;
// CHANGE CANVAS TO UNFIXED POSITION
// small rect next to slider to show color change
var startButton, drawButton, againButton, imageButton, imageGo, doneButton, saveButton;
var img, i, slider, bg, list, selectedImage, radio, rval, title, option, drawin, select1, drawText;
var images = ["", "image.jpg", "image1.jpg", "image2.jpg", "image3.png", "image4.png", "image5.png", "image6.jpg"];
var diter = 0;

function setup(){
  createCanvas(windowWidth-15, windowHeight-20);
  bg = loadImage("shards_pattern.jpg");
  draws = loadImage("text.png");
  font = loadFont("slkscr.ttf");
  font1 = loadFont("subwt.ttf");
  title = loadImage("title.png");
  option = loadImage("opciones.png");
  drawin = loadImage("drawings.png");
  select1 = loadImage("select.png");
  drawText = loadImage("text1.png");
  // radio = createRadio();
}

function draw(){
  if (tscreen == 1){
    background(bg);
    home();

  }
  else if (tscreen == 2){
    background(bg);
    options();
  }
  else if (tscreen == 3){
    drawing();
    textSize(15);
    // rval = radio.value();
    // text(rval + "!", 50, 20);
    return;
  }
  else if (tscreen == 4){
    pics();
  }
}

function home(){
  image(title, width/2-275, 220);
  if(!startButton){
    startButton = createButton("Start");
    startButton.position(width/2-20, 415);
    startButton.mousePressed(toOptionsScreen);
    buttonStyle(startButton);
  }
}

function options(){
  image(option, width/2-110, 235);
  if(!drawButton){
    drawButton = createButton("Draw my own image");
    drawButton.position(width/2-260, 400);
    buttonStyle(drawButton);
    emptyCanvas = createImage(c, c);
    emptyCanvas.loadPixels();
    for (i = 0; i < emptyCanvas.width; i++) {
      for (j = 0; j < emptyCanvas.height; j++) {
        emptyCanvas.set(i, j, color(255, 255, 255));
      }
    }
    emptyCanvas.updatePixels();
    drawButton.mousePressed(function() {
      toDrawingScreen(emptyCanvas);
    });
  } else {
    drawButton.show();
  }
  if(!imageButton){
    imageButton = createButton("Select an image");
    imageButton.position(width/2+80, 400);
    imageButton.mousePressed(toPicsScreen);
    buttonStyle(imageButton);
  } else {
    imageButton.show();
  }
}

function drawing(){
  touchMoved();
}

function pics(){
  if(imageButton){
    imageButton.hide();
  }
  if(drawButton){
    drawButton.hide();
  }
  if(!list){
    list = createSelect();
    list.position(width/2-90, 370);
    list.option("Select an Image")
    list.option("1");
    list.option("2");
    list.option("3");
    list.option("4");
    list.option("5");
    list.option("6");
    list.option("7");
    list.changed(mySelectEvent);
    buttonStyle(list);
  }
}

// to options page
function toOptionsScreen(){
  // startButton.style("transform", "translateY(4px)");
  tscreen = 2; // options function
  if(startButton){
    startButton.hide();
  }
  if(slider) {
    slider.hide();
  }
  if(doneButton) {
    doneButton.hide();
  }
}

// to drawing
function toDrawingScreen(canvasImg){
  // colorMode(RGB);
  tscreen = 3; // drawing function
  background(bg);

  if(saveButton){
    saveButton.hide();
  }
  if(imageButton){
    imageButton.hide();
  }
  if(againButton){
    againButton.hide();
  }
  if(drawButton){
    drawButton.hide();
  }

  image(drawin, width/2-380, 110);
  image(drawText, width/2-430, 170);
  image(canvasImg, a, b);
  strokeWeight(1);
  if(!slider){
    slider = createSlider(0, 360, 180, 40);
    slider.position(width/2-85, 515);
    slider.style('width', '200px');

	  slider.changed(function () {
		var val = slider.value();
		colorMode(HSB);
		noStroke();
		fill(val, 200, 100, 2);
		rect(width/2+120,510,15,15);
		colorMode(RGB, 255);
	});
  } else {
    slider.show();
  }

	var val = slider.value();
	colorMode(HSB);
	noStroke();
	fill(val, 200, 100, 2);
	rect(width/2+120, 510,15,15);
	colorMode(RGB, 255);

  if(!doneButton){
    // if diter is 0 it's empty canvas, if 1 it's ABCD canvas, > 2 it's full screen tess
    doneButton = createButton("Done!");
    doneButton.position(width/2-20, 555);
    doneButton.mousePressed(function() {
      if(diter >= 2){
        diter = 0;
      } else {
        diter++;
        done(diter);
      }
    });
    buttonStyle(doneButton);
  } else {
    doneButton.show();
  }

// to pics
function toPicsScreen(){
  if(imageButton){
    imageButton.hide();
  }
  tscreen = 4;
  background(bg);
  image(select1, width/2-250, 250);
}

// when done with drawing
function done(iter){
  if(doneButton){
    doneButton.hide();
  }
  if(slider){
    slider.hide();
  }

  // no need for saveFrames
  firstImage = get(a, b, c, c);
  var firstImageW = firstImage.width;
  var firstImageH = firstImage.height;
  if(iter == 1) { // ABCD
    copy(firstImage, 0, 0, c/2, c/2, a+c/2, b+c/2, c/2, c/2);
    copy(firstImage, c/2, c/2, c/2, c/2, a, b, c/2, c/2);
    copy(firstImage, 0, c/2, c/2, c/2, a+c/2, b, c/2, c/2);
    copy(firstImage, c/2, 0, c/2, c/2, a, b+c/2, c/2, c/2);
    secondImage = get(a, b, c, c);
    toDrawingScreen(secondImage);
  } else { // fullscreen tess
    for(var y = 0; y < height; y += firstImageH){
      for(var x = 0; x < width; x += firstImageW){
        image(firstImage, x, y);
        if(!againButton){
          againButton = createButton("Draw another?");
          againButton.position(10, 5);
          buttonStyle(againButton);
          againImg = createImage(c, c);
          againImg.loadPixels();
          for (i = 0; i < againImg.width; i++) {
            for (j = 0; j < againImg.height; j++) {
              againImg.set(i, j, color(255, 255, 255)); // COLOR OF BACKGROUND
            }
          }
          againImg.updatePixels();
          againButton.mousePressed(function() {
            toDrawingScreen(againImg);

          });
        } else {
          againButton.show();
        }
        if(!saveButton){
          saveButton = createButton("Save tessellation");
          saveButton.position(10, 35);
          saveButton.mousePressed(saveTess);
          buttonStyle(saveButton);
        }else{
          saveButton.show();
        }
      }
    }
  }
}
// chose image from list
function mySelectEvent(){
  background(bg);
  i = parseInt(list.value());
  image(select1, width/2-250, 250);

  selectedImage = loadImage(images[i], function(){
    if(i > 0){      // text("You chose image " + i + "!", 100, 200);
    image(selectedImage, width/2-60, 400);
    if(!imageGo){
      imageGo = createButton("Create!");
      imageGo.position(width/2-40, 550);
      imageGo.mousePressed(createImageTess);
      buttonStyle(imageGo);
    } else {
      imageGo.show();
    }
  }
});
}

function createImageTess(){
  var imgWidth = selectedImage.width;
  var imgHeight = selectedImage.height;
  for(var y = 0; y < height; y += imgHeight){
    for(var x = 0; x < width; x += imgWidth){
      image(selectedImage, x, y);
      list.position(10, 10);
      if(!saveButton){
        saveButton = createButton("Save tessellation");
        saveButton.position(10, 36);
        saveButton.mousePressed(saveTess);
        buttonStyle(saveButton);
      }
      imageGo.hide();
    }
  }
}

function saveTess(){
  save("myTess.png");
}

function touchMoved(){
  if(tscreen == 3){
    if(mouseIsPressed && (mouseX > a && mouseX < a+c && mouseY > b && mouseY < b+c) && (pmouseX > a && pmouseX < a+c && pmouseY > b && pmouseY < b+c)){
      smooth();
      var val = slider.value();
      colorMode(HSB);
      stroke(val, 200, 100, 2);
      line(mouseX, mouseY, pmouseX, pmouseY);

      colorMode(RGB, 255);
      stroke(0);
    }
  }
}

function buttonStyle(myButton){
  myButton.style("background-color", "#d6d6c2") ;
  myButton.style("font-family", "Silkscreen");
  myButton.style("font-size", "20px");
  myButton.style("border-radius", "10px");
}
