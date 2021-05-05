const puppeteer = require('puppeteer');
const {types} = require("./utils/types");

// hello! 
// go to index.js and type your email and password into the given places
// enter the words you want to type below
const words = [
    "!w",
    "!t",
    "!ot"
]

// now enter the time intervals you want to set for each of them (respective lines)
const timeInterval = [
    5,
    10,
    17
]

// copy your serverID and channel ID here
const serverID = "833842848860340265"
const channelID= "833842848860340269"
let logCount = 0;

const BASE_URL = `https://discord.com/channels/${serverID}/${channelID}`;
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
            delay: 100
        });

        await discord.page.type('input[name="password"]', password, {
            delay: 110
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


            async function typeWord0 () {
                await discord.page.type('span[data-slate-object="text"]', words[0], {
                    delay: 100
                });

                await discord.page.keyboard.press('Enter')

                logCount++

                // this logs the time the message was sent at and the total message count
                console.debug('Message sent: ' + words[0] + ' , at: ' + new Date() + ', Message Count: ' + logCount )
            }
            async function typeWord1 () {
                await discord.page.type('span[data-slate-object="text"]', words[1], {
                    delay: 100
                });

                await discord.page.keyboard.press('Enter')

                logCount++

                // this logs the time the message was sent at and the total message count
                console.debug('Message sent: ' + words[1] + ' , at: ' + new Date() + ', Message Count: ' + logCount )
            }
            async function typeWord2 () {
                await discord.page.type('span[data-slate-object="text"]', words[2], {
                    delay: 100
                });

                await discord.page.keyboard.press('Enter')

                logCount++

                // this logs the time the message was sent at and the total message count
                console.debug('Message sent: ' + words[2] + ' , at: ' + new Date() + ', Message Count: ' + logCount )
            }

            await typeWord0();
            setInterval(typeWord0, timeInterval[0]* 1000 + 500)
            await discord.page.waitFor(2*1000);
            await typeWord1();
            setInterval(typeWord1, timeInterval[1]* 1000 + 500)
            await discord.page.waitFor(2*1000);
            await typeWord2();;
            setInterval(typeWord2, timeInterval[2]* 1000 + 500)
            await discord.page.waitFor(2*1000);

    }
}

module.exports = discord;
