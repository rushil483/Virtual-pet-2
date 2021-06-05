//Create variables here
var Dog;
var dog;
var happyDog;
var database;
var foodS;
var foodStock;
var feed,addFood;
var fedTime,lastFed;
var foodObj;

function preload()
{
	//load images here
  Dog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);

  database = firebase.database();
  dog = createSprite(250,300,150,150);
  dog.addImage(Dog);
  dog.scale = 0.2;

  foodObj = new Food()
  foodStock = database.ref("Food");
  foodStock.on("value",readStock);
  foodStock.set(20);

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  
}


function draw() {  
  background(46,139,87);

foodObj.display();

fedTime = database.ref('FeedTime');
fedTime.on("value",function(data){
  lastFed = data.val();
})

fill(255,255,254);
 textSize(15);
  if(lastFed>=12){
     text("Last Feed : "+ lastFed%12 + " PM", 350,30); 
    }
    else if(lastFed==0)
    { text("Last Feed : 12 AM",350,30);
   }
   else
   { text("Last Feed : "+ lastFed + " AM", 350,30); }
  drawSprites();
  //add styles here
  
}



function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);


  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food : foodObj.getFoodStock(),
    FeedTime : hour() 
  })
}

   function addFoods(){
     foodS++;
     database.ref('/').update({
       Food : foodS
     })
   }