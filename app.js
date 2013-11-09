
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var rest = require('./routes/rest');
var docs = require('./routes/docs');
var about = require('./routes/about');
var search = require('./routes/search');

var path = require('path');
var fs = require('fs');

// load configuration
var cfg = require(__dirname + '/config.json');

var app = express();

// all environments
//app.set('port', process.env.PORT || 8080);
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

    var data = {
        'cfg' : cfg,
        'menu_modules' : false,
        'menu_about' : true,
        'menu_search' : true
    }

    if (req.accepts('html')) {
        // respond with html page
        res.render('404', { 'data': data});
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

    var data = {
        'cfg' : cfg,
        'menu_modules' : false,
        'menu_about' : true,
        'menu_search' : true
    }

    if (req.accepts('html')) {
        // respond with html page
        res.render('500', { 'title': 'Error', 'error' : error,'data' : data });

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
app.get('/api/rest/:_module_/:func/:version(\\d+\.\\d+)',rest.api.get);
app.get('/api/rest/:_module_/:func/:version(\\d+\.\\d+)/*',rest.api.get);

// POST : load and execute a REST API
app.post('/api/rest/:_module_/:func/:version(\\d+\.\\d+)',rest.api.post);
app.post('/api/rest/:_module_/:func/:version(\\d+\.\\d+)/*',rest.api.post);

// PUT : load and execute a REST API
app.put('/api/rest/:_module_/:func/:version(\\d+\.\\d+)',rest.api.put);
app.put('/api/rest/:_module_/:func/:version(\\d+\.\\d+)/*',rest.api.put);

// DELETE : load and execute a REST API
app.delete('/api/rest/:_module_/:func/:version(\\d+\.\\d+)',rest.api.delete);
app.delete('/api/rest/:_module_/:func/:version(\\d+\.\\d+)/*',rest.api.delete);

// load documentation via browser

// load documentation at index page
app.get('/api/docs',docs.api_index);
app.get('/api/docs/',docs.api_index);

// load documentation at index page for a specified module
app.get('/api/docs/:_module_',docs.api_module);
app.get('/api/docs/:_module_/',docs.api_module);

// load documentation for a specific api
app.get('/api/docs/:_module_/:func',docs.api_module);
app.get('/api/docs/:_module_/:func/',docs.api_module);

// load documentation for a specific api
app.get('/api/docs/:_module_/:func/:version(\\d+\.\\d+)',docs.api_specific);
app.get('/api/docs/:_module_/:func/:version(\\d+\.\\d+)/',docs.api_specific);

// load index page -- currently redirects to /api/docs/
app.get('/', routes.index);
app.get('/api', routes.index);
app.get('/api/', routes.index);
app.get('/docs', routes.index);
app.get('/docs/', routes.index);


// load about page
app.get('/about', about.index);
app.get('/about/', about.index);

// load about page
app.post('/api/search/', search.index);
//app.get('/api/docs/search/', routes.index);



// load HTTP server
if(cfg.HTTP_SERVER.enabled)
{
    require('http').createServer(app).listen(cfg.HTTP_SERVER.port, function(){
        console.log('HTTP Server listening on port ' + cfg.HTTP_SERVER.port);
    });
}

// load HTTPS/SSL server
if(cfg.HTTPS_SERVER.enabled)
{
    var options = {
        key: fs.readFileSync(__dirname + '/public/ssl/' + cfg.HTTPS_SERVER.key),
        cert: fs.readFileSync(__dirname + '/public/ssl/' + cfg.HTTPS_SERVER.cert)
    };
    require('https').createServer(options,app).listen(cfg.HTTPS_SERVER.port, function(){
        console.log('HTTPS Server listening on port ' + cfg.HTTPS_SERVER.port);
    });

}

