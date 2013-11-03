
exports.index = function(req, res){
    res.render('index', { title: 'Express' });
};

exports.sample = function(req, res){
    res.render('sample', { title: 'Sample page' });
};
