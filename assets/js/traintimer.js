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
  var firstTrain = moment($("#first-train").val().trim(), "HH:mm").subtract(10, "years").format("x");
  var trainFreq = $("#trainFreq").val().trim();

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




//on child added update
trainDatabase.ref().on("child_added", function(Snapshot) {
  var name = Snapshot.val().name;
  var destination = Snapshot.val().destination;
  var firstTrain = Snapshot.val().firstTrain;
  var trainFreq = Snapshot.val().trainFreq;

  //remainder
  var remainder = moment().diff(moment().minute(firstTrain), "minutes") % trainFreq;
  //minutes
  var minutesTilArrival = trainFreq - remainder;
  //arrival
  var arrival = moment().add(minutesTilArrival, "minutes").format("hh:mm");

  



//append to table
$("#trainOutput").append("<tr><td>" + name + "</tr></td>");
$("#trainOutput").append("<tr><td>" + destination + "</tr></td>");
$("#trainOutput").append("<tr><td>" + minutesTilArrival + "</tr></td>");
$("#trainOutput").append("<tr><td>" +  arrival + "</tr></td>");


});//end on child added function
