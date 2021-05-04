const puppeteer = require('puppeteer');
const {types} = require("./utils/types");

const words = [
    ".w",
    ".t",
    ".ot"
]
let logCount = 0;

const BASE_URL = 'https://discord.com/channels/833842848860340265/833842848860340269';
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


        await discord.page.waitFor(100);

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

    likeChannelProcess: async (serverID, channelID, delay= 1) => {
            types('string', serverID);
            types('string', channelID);

            async function initalStart () {
                await discord.page.waitForSelector('span[data-slate-object="text"]');
                await discord.page.type('span[data-slate-object="text"]', ".w\n.t\n.ot\n", {
                    delay: 100
                });
                await discord.page.waitFor(1000);
                await discord.page.keyboard.press('Enter')

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

            // change the first number for minutes
            // 3 * 60 * 1000 = 180000ms === 3 minutes
            setInterval(typeWord0, 10 * 1000)
            setInterval(typeWord1, 15 * 1000)
            setInterval(typeWord2, 16 * 1000)

    }
}

module.exports = discord;
