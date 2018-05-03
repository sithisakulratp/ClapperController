/*	device.js - runs on RaspberryPi
	author: Ploy Sithisakulrat
	published on 5/2/2018
	contribution: Taron Foxworth
*/

//Get library
var mqtt = require('mqtt')
const bulb = require('tplink-lightbulb')

// CloudMQTT credentials
// mqtt.connect('mqtt://[server]:[websockets port]'
var client = mqtt.connect('[server]:[websockets port]', {
	username: "[username]",
	password: "[password]"
})

//When connected to MQTT, subscribe to the Web Server
client.on('connect', function () {
	console.log("Connected to MQTT.")

	client.subscribe('web')
})

/*
 * listen to a message from te web server
 * when 'on' button is click, device turns the light on
 * and vice versa
 */
client.on('message', function (topic, message) {
	if (topic === 'web') {

		if (message.toString() === "on") {
			// set status to true and turn the light on
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
			// set status to false and turn the light off
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
		//when topic is not found
		console.log("There is no such topic exist")
	}
})
