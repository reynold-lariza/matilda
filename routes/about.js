exports.index = function(req, res){
    var cfg = require(__dirname + '/../config.json');

    res.setHeader('X-Powered-By', cfg._POWERED_BY_);
    res.setHeader('Developed-By', cfg._DEVELOPED_BY_);
    res.render('about');
};