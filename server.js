var builder = require('botbuilder');
var restify = require('restify');

var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

var bot = new builder.UniversalBot(connector);

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
server.post('/api/messages', connector.listen());
var projekts = 'projekts';

bot.dialog('/', [
    function(session, args, results) {
        builder.Prompts.text(session, 'Kads ir projekta nosaukums?');
    },
    function(session, args, results) {
        session.beginDialog('/termini');
    },
    function(session, args, results) {
        session.beginDialog('/budzets');
    },
    function(session, args, results) {
        builder.Prompts.text(session, 'viss kartiba porejkta');
    }
]);
bot.dialog('/termini',[
    function(session, results){
        var cars = ['aaa'];
        builder.Prompts.confirm(session, 'Vai projekts ir terminos?');
    },
    function(session, results){
        session.endDialog();
    }

]);
bot.dialog('/budzets',[
    function(session, results){
        builder.Prompts.choice(session,'vai budzets nobidijies?', ['ja','ne']);
    },
    function(session, results){
        session.endDialog();
    }
])
