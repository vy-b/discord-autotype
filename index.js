const dc = require('./discord');

(async () => {

    await dc.initialize();
    // here is where you enter your email and password
    await dc.login('kvy.bui@gmail.com', 'X0701767769hn?d')

    await dc.likeChannelProcess('833842848860340265', '833842848860340269', 1) // 1 = 1 minute
    
    debugger;

})();
