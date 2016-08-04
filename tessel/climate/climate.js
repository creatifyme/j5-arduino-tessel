var tessel = require('tessel');
var climatelib = require('climate-si7020');
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
  var climate = climatelib.use(tessel.port['A']);
  var tempRef = firebase.database().ref("/temp");
  var humidRef = firebase.database().ref("/humid");

  climate.on('ready', function () {
    console.log('Connected to climate module');

    // Loop forever
    setImmediate(function loop () {
      climate.readTemperature('f', function (err, temp) {
        climate.readHumidity(function (err, humid) {
          console.log('Degrees:', temp.toFixed(4) + 'F', 'Humidity:', humid.toFixed(4) + '%RH');
          tempRef.set(temp.toFixed(4));
          humidRef.set(humid.toFixed(4));
          setTimeout(loop, 500);
        });
      });
    });
  });

  climate.on('error', function(err) {
    console.log('error connecting module', err);
  });
});
