/*	index.js - Web service for IoT Clapper
 		author: Ploy Sithisakulrat
		published:
		contribution: Taron Foxworth
*/
//Get library
var mqtt = require('mqtt')
const express = require('express')
const app = express()

// MQTT credentials
var client = mqtt.connect('mqtt://m12.cloudmqtt.com:15044', {
	username: "zqicfsxt",
	password: "ezMx6GPrNC9J"
})

app.get('/', function (req, res) {
	//load data from DB
		res.send('<h2>IoT Clapper Toggle Button</h2><br><button type="button"><a href="/on">Light ON</button><br><br><button type="button"><a href="/off">Light OFF</button>')
})

app.get('/on', function (req, res) {
	client.publish('web', 'on')
	res.redirect('/');
})

app.get('/off', function (req, res) {
	client.publish('web', 'off')
	res.redirect('/');
})

// when error is detected, notify users via the console log
client.on('error', function (err) {
	console.log(err)
})

client.on('message', function(topic, message){
	if(topic === 'device'){
			// toggle the switch
			console.log("Switch toggled")
	}
})

//When connected, do something
client.on('connect', function () {
	console.log("Connected to MQTT.")

	//client.publish('device')
	client.subscribe('device')

	app.listen(3000, function() {
		console.log('Example app listening on 3000!')
	})
})
