
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var rest = require('./routes/rest');
var docs = require('./routes/docs');
var about = require('./routes/about');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
//app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// Handle 404
app.use(function(req, res) {

    if (req.accepts('html')) {
        // respond with html page
        res.render('404', { 'title': 'Error', 'message' : 'Error : Page not found'});
        return;
    }
    else if (req.accepts('json')) {
        // respond with json data

        res.send({ 'code': 404, 'message' : 'Error : Page not found' });
        return;
    }
    else if (req.accepts('xml')) {
        // respond with xml data
        res.send(require('easyxml').render({ 'code': 404, 'message' : 'Error : Page not found' }));
        return;
    }
    else
    {
        // default to plain-text. send()
        res.type('txt').send('Error : Page not found');

    }
});

// Handle 500
app.use(function(error, req, res, next) {

    var cfg = require(__dirname + '/config.json');

    if (req.accepts('html')) {
        // respond with html page
        res.render('500', { 'title': 'Error', 'error' : error });

        return;
    }
    else if (req.accepts('json')) {
        // respond with json data
        var msg = error.toString().split('/../');
        res.send({ 'code': error.code, 'message' : 'Error : Cannot find ' + msg[1] });
        return;
    }
    else if (req.accepts('xml')) {
        // respond with xml data
        var msg = error.toString().split('/../');
        res.send(require('easyxml').render({ 'code': error.code, 'message' : 'Error : Cannot find ' + msg[1] }));
        return;
    }
    else
    {
        // default to plain-text. send()
        var msg = error.toString().split('/../');
        res.type('txt').send('Error : Cannot find ' + msg[1]);
    }


});
// development only
if ('development' == app.get('env')) {
  //app.use(express.errorHandler());
}

// GET : load and execute a REST API
app.get('/api/rest/:version(\\d+\.\\d+)/:_module_/:func',rest.api.get);
app.get('/api/rest/:version(\\d+\.\\d+)/:_module_/:func/*',rest.api.get);

// POST : load and execute a REST API
app.post('/api/rest/:version(\\d+\.\\d+)/:_module_/:func',rest.api.post);
app.post('/api/rest/:version(\\d+\.\\d+)/:_module_/:func/*',rest.api.post);

// PUT : load and execute a REST API
app.put('/api/rest/:version(\\d+\.\\d+)/:_module_/:func',rest.api.put);
app.put('/api/rest/:version(\\d+\.\\d+)/:_module_/:func/*',rest.api.put);

// DELETE : load and execute a REST API
app.delete('/api/rest/:version(\\d+\.\\d+)/:_module_/:func',rest.api.delete);
app.delete('/api/rest/:version(\\d+\.\\d+)/:_module_/:func/*',rest.api.delete);

// load documentation via browser

// load documentation at index page
app.get('/api/docs',docs.api_index);
app.get('/api/docs/',docs.api_index);

// load documentation at index page, but filtered by version (n.n)
app.get('/api/docs/:version(\\d+\.\\d+)',docs.api_version);
app.get('/api/docs/:version(\\d+\.\\d+)/',docs.api_version);

// load documentation at index page for a specified module
app.get('/api/docs/:version(\\d+\.\\d+)/:_module_',docs.api_module);
app.get('/api/docs/:version(\\d+\.\\d+)/:_module_/',docs.api_module);

// load documentation for a specific api
app.get('/api/docs/:version(\\d+\.\\d+)/:_module_/:func',docs.api_specific);
app.get('/api/docs/:version(\\d+\.\\d+)/:_module_/:func/*',docs.api_specific);

// load index page -- currently redirects to /api/docs/
app.get('/', routes.index);
app.get('/api', routes.index);
app.get('/api/', routes.index);
app.get('/docs', routes.index);
app.get('/docs/', routes.index);


// load about page
app.get('/about', about.index);
app.get('/about/', about.index);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Server listening on port ' + app.get('port'));
});
