// Initialize Firebase
var config = {
    apiKey: "AIzaSyCDDEvDN8T21KSpUnxrUrfozcXM7EywOoM",
    authDomain: "traintimer-1cfec.firebaseapp.com",
    databaseURL: "https://traintimer-1cfec.firebaseio.com",
    projectId: "traintimer-1cfec",
    storageBucket: "",
    messagingSenderId: "810687246335"
  };

  firebase.initializeApp(config);

//reference the database.
var database = firebase.database();

// Assumptions
var tFrequency = 17;

// Time is 3:30 AM
var firstTime = "03:16";

// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % tFrequency;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));





// on submit button click
$("#submit").on("click", function() {

  var trainName = $("#train-name").val().trim();
  var destination = $("#destination").val().trim();
  var starting = $("#first-train").val().trim();
  var trainFreq = $("#trainFreq").val().trim();

  console.log(trainName);
  console.log(destination);
  console.log(starting);
  console.log(trainFreq);

  var pushData = {
    trainName: trainName,
    destination: destination,
    starting: starting,
    trainFreq: trainFreq
  };

  console.log(pushData);

  trainInfo.ref().push(pushData);

  //clear boxes
  $("#train-name").append.pushData.trainName;
  $("#destination").append.pushData.destination;
  $("#first-train").val('');
  $("#trainFreq").val('');


});