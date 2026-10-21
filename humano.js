let img;
let canvas;
let objects = [];
let modelStatus = false;
let objectDetector;

function preload(){
    img = loadImage("person.jpg");
}

function setup(){
    canvas = createCanvas(img.width, img.height);
    canvas.center();
    objectDetector = ml5.objectDetector("cococssd", modelLoaded);
    document.getElementById("status").innerHTML = "stauts : detectando objetos";
}

function draw(){
    image(img, 0, 0);

    if(modelStatus){
        for(let i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "status: objeto detectando";
            let obj = objects[i];
            fill(255, 0, 0);
            textSize(16);
            text(
                `${obj.label} ${floor(obj.width, obj.height)}`,
                obj.x + 5,
                obj.y + 15
            )
            noFill();
            stroke(255, 0,0);
            strokeWeight(2);
            rect(obj.x, obj.y, obj.width, obj.height);
        }
    }
}

function modelLoaded(){
    console.log("modelo carregado");
    modelStatus = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
        return;
    }
    objects = results;
}