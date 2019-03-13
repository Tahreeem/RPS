var config = {
    apiKey: "AIzaSyB3cELKyB7L8Zl06N5NWur245dPR5NTiHE",
    authDomain: "rock-paper-scissors-21da5.firebaseapp.com",
    databaseURL: "https://rock-paper-scissors-21da5.firebaseio.com",
    projectId: "rock-paper-scissors-21da5",
    storageBucket: "rock-paper-scissors-21da5.appspot.com",
    messagingSenderId: "701655021712"
};
firebase.initializeApp(config);
var database = firebase.database();

/*database.ref().set({
});*/



// connectionsRef references a specific location in our database.
// All of our connections will be stored in this directory.
var connectionsRef = database.ref("/connections");

// '.info/connected' is a special location provided by Firebase that is updated
// every time the client's connection state changes.
// '.info/connected' is a boolean value, true if the client is connected and false if they are not.
var connectedRef = database.ref(".info/connected");

// When the client's connection state changes...
connectedRef.on("value", function (snap) {

    // If they are connected..
    if (snap.val()) {

        // Add user to the connections list.
        var con = connectionsRef.push(true);
        console.log(snap);
        // Remove user from the connection list when they disconnect.
        con.onDisconnect().remove();
    }
});

var NumUsers;
// When first loaded or when the connections list changes...
connectionsRef.on("value", function (snap) {

    // The number of online users is the number of children in the connections list.
    NumUsers = snap.numChildren();
    //console.log(snap.numChildren());
});






var NumInputs = 0;
var Choices = ["Rock", "Paper", "Scissors"];
var Inputs = [];

var WinnerMatrix = [
   //Rock, Paper, Scissors
    ["",   0,     1], //Rock
    [1,    "",    0], //Paper
    [0,    1,    ""] //Scissors
];

function Winner(Inputs) {
    var answer = WinnerMatrix[Inputs[0]][Inputs[1]];

    if (answer == 0) {
        answer = Choices[Inputs[1]];
    }
    else if (answer == 1) {
        answer = Choices[Inputs[0]];
    }

    var WinnerDiv = $("<div>").addClass("col-3 Winner").text(answer);
    $(".Results:last-child").append(WinnerDiv);
}

function ResultsRow(Choice) {  //where Choice is a number

    if (NumInputs == 0) {
        $("#container").append($("<div>").addClass("row justify-content-center Results"));
    }

    if (NumInputs < 2) {
        NumInputs++;
        Inputs.push(Choice);
        /*database.ref('game/' + userID).set({
            selection: userSelection,
        });*/
 
        var Choice = $("<div>").addClass("col-3 Input").text( Choices[Choice] );
        $(".Results:last-child").append(Choice);
        
    }

    if (NumInputs == 2) {
        Winner(Inputs);
        NumInputs = 0;
        Inputs = [];
        //$(".Results:last-child").prepend($("<br>"));
    }
}







$("#Rock").on("click", function (event) {
    ResultsRow(0);
});

$("#Paper").on("click", function (event) {
    ResultsRow(1);
});

$("#Scissors").on("click", function (event) {
    ResultsRow(2);
});

$(".Reset").on("click", function (event) {
    $(".Results").remove();
});






