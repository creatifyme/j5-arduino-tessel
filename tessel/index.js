// Import the interface to Tessel hardware
var tessel = require('tessel');
var Firebase = require('firebase');

// Turn one of the LEDs on to start.
// tessel.led[2].on();

// Blink!
// setInterval(function () {
//   tessel.led[2].toggle();
//   tessel.led[3].toggle();
// }, 100);
// 
// console.log("I'm blinking! (Press CTRL + C to stop)");
//
//

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAqymhZRqxSzV23p0jMtAZTc4oPZwDyoRA",
  authDomain: "tessel-thermostat.firebaseapp.com",
  databaseURL: "https://tessel-thermostat.firebaseio.com",
  storageBucket: "tessel-thermostat.appspot.com",
};

var access_token = "ccdc46e6-e587-4393-a411-8aa0a04b5729";
var ref = new Firebase('wss://developer-api.nest.com');
ref.auth(access_token);
ref.on('value', function(snapshot) {
  console.log(snapshot.val());
});

// firebase.initializeApp(config);
