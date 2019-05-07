const config = {
    apiKey: "AIzaSyCDDEvDN8T21KSpUnxrUrfozcXM7EywOoM",
    authDomain: "traintimer-1cfec.firebaseapp.com",
    databaseURL: "https://traintimer-1cfec.firebaseio.com",
    projectId: "traintimer-1cfec",
    storageBucket: "traintimer-1cfec.appspot.com",
    messagingSenderId: "810687246335"

  };

// Initialize Firebase

firebase.initializeApp(config);

//reference the database.
var trainDatabase = firebase.database();
//console.log(trainDatabase);



// on submit button click
$("#submit").on("click", function() {

  var trainName = $("#train-name").val().trim();
  var destination = $("#destination").val().trim();
  var firstTrain = moment($("#first-train"), "HH:mm").subtract(10, "years").format("x");
  var trainFreq = $("#trainFreq").val().trim();

  // console.log(trainName);
  // console.log(destination);
  // console.log(starting);
  // console.log(trainFreq);

  var newTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    trainFreq: trainFreq
  }
  //console.log(pushData);

  trainDatabase.ref().push(newTrain);
  
  console.log("Train added!");

  //clear boxes
  $("#train-name").val("");
  $("#destination").val("");
  $("#first-train").val("");
  $("#trainFreq").val("");

  return false;
})

//console.log(trainDatabase.ref());

//on child added update
trainDatabase.ref().on("child_added", function(snapshot) {
  var name = snapshot.val().name;
  var destination = snapshot.val().destination;
  var firstTrain = snapshot.val().firstTrain;
  var trainFreq = snapshot.val().trainFreq;

  //remainder
  var remainder = moment().diff(moment().minute(firstTrain), "minutes") % trainFreq;
  //minutes
  var minutes = trainFreq - remainder;
  //arrival
  

  



//append to table
$("#trainOutput").append("<tr><td>" + name + "</tr></td>");
$("#trainOutput").append("<tr><td>" + destination + "</tr></td>");
$("#trainOutput").append("<tr><td>" + "<tr><td>" + firstTrain + "</tr></td>");


});//end on child added function









// Assumptions
// var tFrequency = 17;

// Time is 3:30 AM
// var firstTime = "03:16";

// First Time (pushed back 1 year to make sure it comes before current time)
//var firstTimeConverted = 
//console.log(firstTimeConverted);

// Current Time
// var currentTime = moment();
// console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// // Difference between the times
// var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
// console.log("DIFFERENCE IN TIME: " + diffTime);

// // Time apart (remainder)
// var tRemainder = diffTime % tFrequency;
// console.log(tRemainder);

// // Minute Until Train
// var tMinutesTillTrain = tFrequency - tRemainder;
// console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// // Next Train
// var nextTrain = moment().add(tMinutesTillTrain, "minutes");
// console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));