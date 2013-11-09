/**
 * Created by reynold on 11/3/13.
 * API DOCS
 */

// read config.json
var cfg = require(__dirname + '/../config.json');

// load modules list
var modules_list = require(__dirname + '/../core/libraries/modules').modules.list();
var query_string = require("querystring").stringify;

exports.api = function(req,res) {
    // read config.json
    var cfg = require(__dirname + '/../config.json');

    res.setHeader('X-Powered-By', cfg._POWERED_BY_);
    res.setHeader('Developed-By', cfg._DEVELOPED_BY_);

    res.render('docs', { title: 'Documentation - Index' });
};

// Documentation index page
exports.api_index = function(req,res) {


    var data = {
        'qs' : query_string,
        // get the list of modules
        'modules' : modules_list,
        'menu_modules' : false,
        'menu_about' : true

    }


    res.setHeader('X-Powered-By', cfg._POWERED_BY_);
    res.setHeader('Developed-By', cfg._DEVELOPED_BY_);


    // show a page
    res.render('docs', { 'data' : data });
};

exports.api_version = function(req,res) {

    res.setHeader('X-Powered-By', cfg._POWERED_BY_);
    res.setHeader('Developed-By', cfg._DEVELOPED_BY_);
    res.render('docs_version', { title: 'Documentation - ' + req.params.version });
};

exports.api_module = function(req,res) {


    var data = {
        'qs' : query_string,
        // get the list of modules
        'modules' : modules_list,
        '_module' : req.params._module_,
        'menu_modules' : true,
        'menu_about' : true

    }

    res.setHeader('X-Powered-By', cfg._POWERED_BY_);
    res.setHeader('Developed-By', cfg._DEVELOPED_BY_);

    res.render('docs_module', { 'data' : data });
};

exports.api_specific = function(req,res) {

    var data = {
        'qs' : query_string,
        // get the list of modules
        'modules' : modules_list,
        '_module' : req.params._module_,
        '_func' : req.params.func,
        '_version' : req.params.version,
        'menu_modules' : false,
        'menu_about' : true,
        'menu_func' : true

    }

    res.setHeader('X-Powered-By', cfg._POWERED_BY_);
    res.setHeader('Developed-By', cfg._DEVELOPED_BY_);
    res.render('docs_specific', { 'data' : data });
};

