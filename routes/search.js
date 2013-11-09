// read config.json
var cfg = require(__dirname + '/../config.json');
// load modules list
var modules_list = require(__dirname + '/../core/libraries/modules').modules.list();
var query_string = require("querystring").stringify;

exports.index = function(req, res){

    var filtered_params = undefined;
    if(req.body)
    {
        filtered_params = req.body;
    }

    var data = {
        'cfg' : cfg,
        'qs' : query_string,
        // get the list of modules
        'modules' : modules_list,
        'menu_modules' : false,
        'menu_about' : true,
        'menu_search' : true,
        'keyword' : filtered_params
    }

    res.setHeader('X-Powered-By', cfg._POWERED_BY_);
    res.setHeader('Developed-By', cfg._DEVELOPED_BY_);
    res.render('docs_search',{'data' : data });
};