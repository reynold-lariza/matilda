/**
 * Created by reynold on 11/3/13.
 * API DOCS
 */
exports.api = function(req,res) {
    // read config.json
    var cfg = require(__dirname + '/../config.json');

    res.setHeader('X-Powered-By', cfg._POWERED_BY_);
    res.setHeader('Developed-By', cfg._DEVELOPED_BY_);
    res.render('docs', { title: 'Documentation - Index' });
};

exports.api_index = function(req,res) {
    // read config.json
    var cfg = require(__dirname + '/../config.json');

    res.setHeader('X-Powered-By', cfg._POWERED_BY_);
    res.setHeader('Developed-By', cfg._DEVELOPED_BY_);
    res.render('docs', { title: 'Documentation - Index' });
};

exports.api_version = function(req,res) {
    // read config.json
    var cfg = require(__dirname + '/../config.json');

    res.setHeader('X-Powered-By', cfg._POWERED_BY_);
    res.setHeader('Developed-By', cfg._DEVELOPED_BY_);
    res.render('docs_version', { title: 'Documentation - ' + req.params.version });
};

exports.api_module = function(req,res) {
    // read config.json
    var cfg = require(__dirname + '/../config.json');

    res.setHeader('X-Powered-By', cfg._POWERED_BY_);
    res.setHeader('Developed-By', cfg._DEVELOPED_BY_);
    res.render('docs_module', { title: 'Documentation - Module' });
};

exports.api_specific = function(req,res) {
    // read config.json
    var cfg = require(__dirname + '/../config.json');

    res.setHeader('X-Powered-By', cfg._POWERED_BY_);
    res.setHeader('Developed-By', cfg._DEVELOPED_BY_);
    res.render('docs_specific', { title: 'Documentation - Specific' });
};

