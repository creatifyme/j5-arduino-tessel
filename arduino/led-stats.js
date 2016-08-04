var five = require("johnny-five");
var board = new five.Board();
var firebase = require("firebase");

var config = {
  apiKey: "AIzaSyDrbphL2-bo_jILwSnc8JXeqN78SArgVoU",
  authDomain: "climate-and-ambient.firebaseapp.com",
  databaseURL: "https://climate-and-ambient.firebaseio.com",
  storageBucket: "climate-and-ambient.appspot.com",
};
firebase.initializeApp(config);

board.on("ready", function() {
  var lightStat = new five.Led(5);
  var soundStat = new five.Led(6);
  var tempStat = new five.Led(10);
  var humidStat = new five.Led(11);
  var db = firebase.database();

  db.ref('/temp').on('value', function(temp) {
    if (temp.val() > 82) {
      tempStat.on();
    } else {
      tempStat.off();
    }
  });

  db.ref('/humid').on('value', function(humid) {
    if (humid.val() > 70) {
      humidStat.on();
    } else {
      humidStat.off();
    }
  });

  db.ref('/light').on('value', function(light) {
    if (light.val() > 0.05) {
      lightStat.on();
    } else {
      lightStat.off();
    }
  });

  db.ref('/sound').on('value', function(sound) {
    if (sound.val() > 0.03) {
      soundStat.on();
    } else {
      soundStat.off();
    }
  });
});
