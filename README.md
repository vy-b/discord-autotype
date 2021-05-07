# discord-autotype

Automatically navigates to discord, signs in with your specified credentials, types and sends messages at specified time intervals; runs on Chromium/Chrome/Firefox
You may use your PC normally as this runs by itself even when the window is minimized.

## to use:
1. type npm i in terminal to install
2. Edit index.js to enter your email and password - this information is known only to you and is entered by puppeteer into discord login page.
3. Edit discord.js to enter the messages you want to send in an array - as many as you would like, and enter the time intervals (in seconds) in the time interval array. The indexes of the time intervals will correspond to the indexes in the messages array.
4. Enter the channel ID and server ID for the channel you would like to send the message.
5. type node . to run on chromium

## if you would like to change from chromium to chrome or firefox:
edit the executablePath in the discord.js file to the path that contains your desired application.
