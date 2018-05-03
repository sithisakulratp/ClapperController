/*	index.js - Web service
 	author: Ploy Sithisakulrat
	published: 5/2/2018
	contribution: Taron Foxworth
*/

//Get library
var mqtt = require('mqtt')
const express = require('express')
const app = express()

// CloudMQTT credentials
//mqtt.connect('mqtt://[server]:[websockets port]'
var client = mqtt.connect('mqtt://m12.cloudmqtt.com:15044', {
	username: "zqicfsxt",
	password: "ezMx6GPrNC9J"
})

app.get('/', function (req, res) {
	//load data from DB
		res.send('<h2>IoT Smart Bulb Toggle Button</h2><br><button type="button"><a href="/on">Light ON</button><br><br><button type="button"><a href="/off">Light OFF</button>')
})

//When 'on' button is pressed, send message 'on' to device
app.get('/on', function (req, res) {
	client.publish('web', 'on')
	res.redirect('/'); //redirect to the web server
})

//When 'off' button is pressed, send message 'off' to device
app.get('/off', function (req, res) {
	client.publish('web', 'off')
	res.redirect('/'); // redirect the page back to the server
})

// when error is detected, notify via the console log
client.on('error', function (err) {
	console.log(err)
})

// listen to the Pi (device.js) for a message
client.on('message', function(topic, message){
	if(topic === 'device'){
			// toggle the switch
			console.log("Switch toggled")
	}
})

//When connected to MQTT, subscribe to the Pi (device.js)
client.on('connect', function () {
	console.log("Connected to MQTT.")

	client.subscribe('device')

	//besides openning up the server from a link provided by NOW
	//you are also able to open it from localhost:3000
	app.listen(3000, function() {
		console.log('Example app listening on 3000!')
	})
})
