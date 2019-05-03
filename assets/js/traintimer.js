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

  // -----------------------------

// trainInfo references a specific location in our database.
// All of our connections will be stored in this directory.
var trainInfo = database.ref("/connections");

// When first loaded or when the connections list changes...
trainInfo.on("value", function(snap) {

  // Display the viewer count in the html.
  // The number of online users is the number of children in the connections list.
  $("#connected-viewers").text(snap.numChildren());
});


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


  