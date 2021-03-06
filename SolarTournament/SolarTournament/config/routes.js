// Set up routes
module.exports = function (app, highscoreProvider) {

    var sendError500 = function (response, error) {
        response.writeHead(500, { "Content-Type": "text/plain" });
        response.end("ERROR! " + error + "\n");
    };

    app.get('/', function (request, response) {
        response.render('index', {
            title: 'SolarTournament // Home'
        });
    });

    app.get('/tournament', function (request, response) {
        response.render('tournament', {
            title: 'SolarTournament // Tournament',
            locals: {
                socketUri: app.serverInfo.getSocketUri(request.headers.host)
            }
        });
    });

    app.get('/getTopTen', function (request, response) {

        var topTenReceived = function (error, dbResult) {

            if (error) { sendError500(error); return; }
            response.json(dbResult);
        };

        // hello MongoDB
        highscoreProvider.getTopTen(topTenReceived);
    });

    app.get('/highscore', function (request, response) {

        response.render('highscore', {
            title: 'SolarTournament // Highscore'
        });
    });

    app.get('/about', function (request, response) {
        response.render('about', {
            title: 'SolarTournament // About'
        });
    });
};