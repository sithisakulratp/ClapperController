# IoT Smart Bulb Controller

## Getting Started

 - Clone the above files into a specific directory on your computer.
 
 And make sure to have the following installed on your computer (including on your Pi)

### - Node.js:
   https://nodejs.org/en/download/

### - ExpressJS:
   I use ExpressJS as Node.js web application platform
    
   https://expressjs.com/en/starter/installing.html Or run the command
   
        npm install express --save

### - MQTT:
   https://www.npmjs.com/package/mqtt OR use the command
 
        npm install mqtt --save
        
### - TP-Link Lightbulb Library
   Install the library into the same directory as the above files
   https://www.npmjs.com/package/tplink-lightbulb Or use the command
    
        npm i tplink-lightbulb
 
## Raspberry Pi Get Started
This is where device.js file will be running on since Pi acts as a gatewat between Web server and the light
Follow the instructions on the following link:
https://projects.raspberrypi.org/en/projects/raspberry-pi-getting-started

## NOW Global Deployment Get Started
NOW is used to deployed a web server where we will be controlling the light from
Follow the instruction on the following link: https://zeit.co/now#get-started

With all of the above installed and downloaded correctly, running the command 'now' will give you a link to your depoloyed web service.

For more information and more detailed instructions, please see my blog on Hackster.io https://www.hackster.io/ploysitis/tp-link-smart-bulb-controller-6a3531 
