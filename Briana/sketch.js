
// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBHJlDDacafb8Y4b5utW8hJD3yB7mJCtPA",
    authDomain: "briana-r.firebaseapp.com",
    databaseURL: "https://briana-r.firebaseio.com",
    projectId: "briana-r",
    storageBucket: "briana-r.appspot.com",
    messagingSenderId: "780419709290",
    appId: "1:780419709290:web:e0a71d3466dc3c19"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
let database = firebase.database()

let scoreboard = {  }
let idk=document.getElementById("idk")
let x
let y
let score
let direction
let phone
let level
let time



function setup() {
  createCanvas(windowWidth,windowHeight);
  s = width/1244
  x=100
  y=200
  a=260
  b=600
  c=[60,260,460,660,860,1060]
  d=[200,200,500,400,500,500]
  score=0
  direction=[1,1,1,1,1]
  phone=1
  level=1
  time=1000
 

}

function draw() {
   if (time > 0) { 
     background(25,70,100);
  fill(23,100,230)
  circle(x*s,y,90*s)
  if(keyIsDown(LEFT_ARROW)){
    x = x - 6
  }
  if(keyIsDown(DOWN_ARROW)){
    y = y + 6
  }
    if(keyIsDown(UP_ARROW)){
    y = y - 6
  }
  if(keyIsDown(RIGHT_ARROW)){
  x = x + 6
  }
  
  fill(24,140,210)
  circle(a*s,b,100*s)
  a = a + 4
  
  if(a*s>width){
    a=0
  }
  textSize(30)
  text('score: ' +score,200,120)
  
  text('time: ' +time,0,170)
  time = time-1
  
 
  if(dist(x*s,y,a*s,b)<90*s+90*s){
       score=score+1
  }
  
for (i=0; i<phone; i=i+1) { 
  
  if(dist(x*s,y,c[i]*s,d[i])<90*s+90*s){
     score=score-1
  }

  fill(90,60,95)
  circle(c[i]*s,d[i],90*s)
  d[i]= d[i] + 5*direction[i]
  
  if(d[i]>height || d[i]<0){
  direction[i]=direction[i] * -1
  
  }
}
  
    if(score>100 && level == 1){
     phone = phone + 1
     level = 2
     }
    if(score>200 && level == 2){
      phone = phone + 1
      level = 3
     }
     if(score>300 && level == 3){
      phone = phone + 1
      level = 4
     }
  if(score>400 && level == 4){
      phone = phone + 1
      level = 5
     }
   if(score>500 && level == 5){
      phone = phone + 1
      level = 6
     }
					if(score>600 && level == 6){
						phone = phone + 1
						level = 7
					}
   }
  else{
  idk .innerHTML = "name? <input id = 'moon'><button onclick='restart()'>Restart</button> <button onclick='generate_alltime_leaderboard()'>Leaderboard</button>"
    noLoop()
    
  }  
 
 }
function restart() { 
  let moon = document.getElementById("moon")
  name = moon.value
		database.ref(name).set(score)
  if (name != ""){
  scoreboard[moon] = score
  }
  alert("scoreboard: " +JSON.stringify(scoreboard,null,1))
  time = 1000
  score = 0
  phone=1
  level=1
  loop()
  idk.innerHTML = ""
  generate_leaderboard()
}

function generate_leaderboard() {
  scores = Object.values(scoreboard)
  names = Object.keys(scoreboard)
  
  if (scores.length >= 3) {
    let leaderboard = { }
    for (i=0; i<3; i=i+1) {
      max = Math.max(...scores)
      index = scores.indexOf(max)
      leaderboard[names[index]] = max
      names.splice(index,1)
      scores.splice(index,1)
    }
    alert("Leaderboard: " + JSON.stringify(leaderboard,null,1))
  }
		function generate_alltime_leaderboard() {
			let alltime_leaderboard = { }
			database.ref().orderByValue().limitToLast(3).on("value", function(snapshot) {
				snapshot.forEach(function(data) {
				alltime_leaderboard[data.key] = data.val()
				});
		    	});
			if (Object.values(alltime_leaderboard).length > 0) {
			  alert("All-time leaderboard: " + JSON.stringify(alltime_leaderboard,null,1))
		    	}
		}

		generate_alltime_leaderboard()



}




