/*	device.js - runs on RaspberryPi Zero W
		author: Ploy Sithisakulrat
		published on 5/1/2018
		contribution: Taron Foxworth
*/

//Get library
var mqtt = require('mqtt')

const bulb = require('tplink-lightbulb')

//Use your CloudMQTT credentials
//mqtt.connect('mqtt://[server]:[websockets port]'
var client = mqtt.connect('mqtt://m12.cloudmqtt.com:15044', {
	username: "zqicfsxt",
	password: "ezMx6GPrNC9J"
})

//When connected to MQTT, subscribe to the Web Services
client.on('connect', function () {
	console.log("Connected to MQTT.")

	client.subscribe('web')
})

//
	let status
client.on('message', function (topic, message) {
	if (topic === 'web') {

		if (message.toString() === "on") {
			// turn the light on
			// set status to true
		  status = true;
			console.log("I have a message: " + message.toString())
			client.publish('device', 'on')

			// scan for the SmartBulb and turn it on
			const scan = bulb.scan()
				.on('light', light => {
					light.power(true)
						.then(status => {
							console.log(status)
							scan.stop()
						}).catch(error => {
							console.log(error)
						})
				})
		} else {
			// turn the light off
			// set status to false
		  status = false;
			console.log("I have a message: " + message.toString())
			client.publish('device', 'off')

			// scan for the SmartBulb and turn it off
			const scan = bulb.scan()
				.on('light', light => {
					light.power(false)
						.then(status => {
							console.log(status)
							scan.stop()
						}).catch(error => {
							console.log(error)
						})
				})
		}

		//save message DB
	} else {
		console.log("There is no such topic exist")
	}
})
