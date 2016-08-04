var tessel = require('tessel');
var ambientlib = require('ambient-attx4');
var five = require("johnny-five");
var TesselIo = require("tessel-io");
var board = new five.Board({
  io: new TesselIo()
});
var firebase = require("firebase");

var config = {
  apiKey: "AIzaSyDrbphL2-bo_jILwSnc8JXeqN78SArgVoU",
  authDomain: "climate-and-ambient.firebaseapp.com",
  databaseURL: "https://climate-and-ambient.firebaseio.com",
  storageBucket: "climate-and-ambient.appspot.com",
};
firebase.initializeApp(config);

board.on("ready", function() {
  var ambient = ambientlib.use(tessel.port['A']);
  var lightRef = firebase.database().ref("/light");
  var soundRef = firebase.database().ref("/sound");

  ambient.on('ready', function () {
   // Get points of light and sound data.
    setInterval( function () {
      ambient.getLightLevel( function(err, lightdata) {
        if (err) throw err;
        ambient.getSoundLevel( function(err, sounddata) {
          if (err) throw err;
          console.log("Light level:", lightdata.toFixed(2), " ", "Sound Level:", sounddata.toFixed(2));
          lightRef.set(lightdata.toFixed(2));
          soundRef.set(sounddata.toFixed(2));
        });
      });
    }, 500); // The readings will happen every .5 seconds
  });

  ambient.on('error', function (err) {
    console.log(err);
  });
});
