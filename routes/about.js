// read config.json
var cfg = require(__dirname + '/../config.json');

exports.index = function(req, res){

    var data = {
        'cfg' : cfg,
        'menu_modules' : false,
        'menu_about' : false,
        'menu_search' : true
    }

    res.setHeader('X-Powered-By', cfg._POWERED_BY_);
    res.setHeader('Developed-By', cfg._DEVELOPED_BY_);
    res.render('about',{'data' : data });
};