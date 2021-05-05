const puppeteer = require('puppeteer');
const {types} = require("./utils/types");
// hello! 
// go to index.js and type your email and password into the given places
// enter the words you want to type below
const words = [
    "!w",
    "!t",
    "!ot",
    "!buy flipper",
    "!buy karaoke",
    "!buy music",
    "!buy chef"
    
]

// now enter the time intervals you want to set for each of them (respective lines)
const timeInterval = [
    540,
    240,
    1800,
    8*360,
    6*360,
    4*360,
    4*360
]

// copy your serverID and channel ID here
const serverID = "833842848860340265"
const channelID= "833842848860340269"

let logCount = 0;
types('string', serverID);
types('string', channelID);
const BASE_URL = `https://discord.com/channels/${serverID}/${channelID}`
// change this & enter the channel url
const discord = {
    browser: null,
    page: null,

    initialize: async () => {

        discord.browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: [
                '--start-maximized'
            ]
        });

        discord.page = await discord.browser.newPage();

    },

    /**
     * username and password
     * @param {string} username
     * @param {string} password
     * @return {Promise<void>}
     */

    login: async (username, password) => {

        await discord.page.goto(BASE_URL, {
            waitUntil: 'networkidle2'
        })


        await discord.page.waitForSelector('input[name="email"]');

        /* username and password */

        await discord.page.type('input[name="email"]', username, {
            delay: 0
        });

        await discord.page.type('input[name="password"]', password, {
            delay: 0
        });

        /* clicking on login button */

        loginButton = await discord.page.$x('//div[contains(text(), "Login")]');
        await loginButton[0].click();

        await discord.page.waitFor(10000);

    },


    /**
     * Enter server id and channel urk
     * @param { string } serverID
     * @param { string } channelID
     * @param { number } delay
     * @return {Promise<void>}
     */

    likeChannelProcess: async () => {

            async function initalStart () {
                await discord.page.waitForSelector('span[data-slate-object="text"]');

                console.debug('Auto typer started ' + new Date() )

            }

            await initalStart();


            function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
            }

            let typeLoop = async () => {
            await discord.page.waitForSelector('span[data-slate-object="text"]');
            for (let i = 0; i < words.length; i++) {
                await discord.page.type('span[data-slate-object="text"]', words[i] + "\n", {
                    delay: 100
                });


                logCount++

                // this logs the time the message was sent at and the total message count
                console.debug('Message sent: ' + words[i] + ' , at: ' + new Date() + ', Message Count: ' + logCount )
                setInterval(async() => { 
                    await discord.page.type('span[data-slate-object="text"]', words[i] + "\n", {
                        delay: 100
                    });


                    logCount++

                    // this logs the time the message was sent at and the total message count
                    console.debug('Message sent: ' + words[i] + ' , at: ' + new Date() + ', Message Count: ' + logCount )
                }, timeInterval[i]*1000+500)
                await sleep(3123);
            }
            }
            typeLoop();

    }
}

module.exports = discord;
