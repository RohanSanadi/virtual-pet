var dog,dogImage,happyDog,foodStock,foodReamaning, database;
var position, feeling="hungry";

function preload(){
  dogImage=loadImage("Dog.png")
  happyDog=loadImage("happydog.png")
}
function setup(){
  database = firebase.database();
  console.log(database);
  createCanvas(500,500);
  
  dog = createSprite(250,250,10,10);
  dog.addImage("dog",dogImage)
  dog.addImage("happydog",happyDog)
  dog.scale=0.2
  
  
  
  

  foodStock= database.ref('Food');
  foodStock.on("value", readStock, showError);
}

function draw(){
  background("white");
textSize(20)
  stroke("red")
  text("foodLeft :"+foodReamaning,250,50)
   if(keyDown(UP_ARROW)){
     feeling="happy"
     //dog.changeImage("happydog",happyDog)
     foodReamaning=foodReamaning-1
      writeStock(foodReamaning);
      
    }
    if(feeling==="happy"){
      dog.changeImage("happydog",happyDog)
      feeling="hungry"
    }
    drawSprites();
  
}

function writeStock(x){
  database.ref('/').set({
    'Food':x
    
  })

}

function readStock(data){
  foodReamaning = data.val();
  }

function showError(){
  console.log("Error in writing to the database");
}
