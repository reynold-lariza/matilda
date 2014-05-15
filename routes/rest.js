/**
 * Created by reynold on 11/3/13.
 * API REST
 */

var cfg = require(__dirname + '/../config.json');
if(cfg.LOGS.error_file) {
// append any uncaught error to log file
process.on('uncaughtException', function (err) {



    if(cfg.LOGS.error_file)
    {
        var fs = require("fs");

        var log_dir = __dirname + "/../logs/";
        var log_path = log_dir + "error.log";

        var now = new Date();

        // generate the timestamp yyyy-mm-dd h:i:s
        var _time_stamp = ((now.getFullYear()) + '-' +
            (now.getMonth()) + '-' +
            now.getDate() + " " +
            now.getHours() + ':' +
            ((now.getMinutes() < 10)
                ? ("0" + now.getMinutes())
                : (now.getMinutes())) + ':' +
            ((now.getSeconds() < 10)
                ? ("0" + now.getSeconds())
                : (now.getSeconds())));
        var _err_msg;
        _err_msg="---------------------------- BEGIN ERROR MESSAGE ----------------------------\n";
        _err_msg+= _time_stamp + ' : ' + (err.stack || err.message) + "\n";
        _err_msg+="---------------------------- END ERROR MESSAGE -----------------------------\n";
        fs.exists(log_path,function(e){
            if(!e)
            {
                //console.log('not exists');
                fs.mkdir(log_dir,function(e){
                    if(e)
                    {
                        fs.appendFile(log_path,_err_msg,function(e){
                        });

                    }
                });
            }
            else
            {
                fs.appendFile(log_path,_err_msg,function(e){
                });
            }

        });
    }

    if(cfg.LOGS.error_console)
    {
        var fs = require("fs");

        var log_dir = __dirname + "/../logs/";
        var log_path = log_dir + "error.log";

        var now = new Date();

        // generate the timestamp yyyy-mm-dd h:i:s
        var _time_stamp = ((now.getFullYear()) + '-' +
            (now.getMonth()) + '-' +
            now.getDate() + " " +
            now.getHours() + ':' +
            ((now.getMinutes() < 10)
                ? ("0" + now.getMinutes())
                : (now.getMinutes())) + ':' +
            ((now.getSeconds() < 10)
                ? ("0" + now.getSeconds())
                : (now.getSeconds())));
        var _err_msg;
        _err_msg="---------------------------- BEGIN ERROR MESSAGE ----------------------------\n";
        _err_msg+= _time_stamp + ' : ' + (err.stack || err.message) + "\n";
        _err_msg+="---------------------------- END ERROR MESSAGE -----------------------------\n";

        console.log(_err_msg);
    }

});
}

var instance;
var _api_rest_send_output = function(_result){

    if (instance.req.accepts('html')) {
        //instance.res.setHeader('Content-type', 'text/html');
        _output = _result;
    }
    else if (instance.req.accepts('xml')) {
        //instance.res.setHeader('Content-type', 'application/xml');
        _output = require('easyxml').render(_result);
    }
    else if (instance.req.accepts('json')) {
        //instance.res.setHeader('Content-type', 'application/json');

        _output = _result;
    }
    else
    {
        //instance.res.setHeader('Content-type', 'text/plain');
        _output = _result;
    }
    // send data to client
    instance.res.connection.setTimeout(0);
    instance.res.send(_output);


}

var _api_rest_send = function(req,res,_action,param){

    // read config.json

    var _db = [];

    // if database is active in config.json, then load it
    for(var db in cfg.DATABASE)
    {
        if(cfg.DATABASE[db].active)
        {
            if(!_db[cfg.DATABASE[db].driver])
            {
                _db_driver = require(__dirname + "/../core/libraries/"+cfg.DATABASE[db].driver);
                //_db_driver[cfg.DATABASE[db].driver].connect(cfg.DATABASE[db]);
                _db[db] = _db_driver[cfg.DATABASE[db].driver].connect(cfg.DATABASE[db]);
                //_db.push(_db_driver[cfg.DATABASE[db].driver].connect(cfg.DATABASE[db]));
            }



        }

    }

    instance = {'param' : param, 'res' : res, 'req' : req,'send' : _api_rest_send_output,'db' : _db};
    //var _mysql_driver = require(__dirname + "/../core/libraries/mysql");

    try {
        var _result = _action._api_.action(instance);
        var _output = undefined;
        res.setHeader('X-Powered-By', cfg._POWERED_BY_);
        res.setHeader('Developed-By', cfg._DEVELOPED_BY_);

    }catch (e) {
        var _msg = e.toString();
        res.setHeader('Content-length',e.length);
        res.send({code : e.code, message : e.message });
    }

}
exports.api = {
    'get' : function(req,res)
    {
        var _api_module = req.params._module_;
        var _api_name = req.params.func;

        var _action = require(__dirname + '/../modules/' + _api_module + '/' + _api_name + '-' +req.params.version +  '.js');
        var _config = {
            '_module_' : require(__dirname + '/../modules/' + _api_module + '/config.json'),
            '_api_' : _action.config
        };

        var filtered_params = undefined;
        if(req.params[0])
        {
            var _params = req.params[0].split('/');

            var filtered_params = {};
            _params.forEach(function(val, i) {
                if (i % 2 === 1) return; // Skip all even elements (= odd indexes)
                filtered_params[val] = _params[i + 1];   // Assign the next element as a value of the object,
                // using the current value as key
            });

        }
        else {
            // get query string
            var url = require('url');
            var url_parts = url.parse(req.url, true);
            filtered_params = url_parts.query;

        }

        _api_rest_send(req,res,_config,filtered_params);

    },
    'post' : function(req,res)
    {
        var _api_module = req.params._module_;
        var _api_name = req.params.func;

        var _action = require(__dirname + '/../modules/' + _api_module + '/' + _api_name + '-' +req.params.version +  '.js');
        var _config = {
            '_module_' : require(__dirname + '/../modules/' + _api_module + '/config.json'),
            '_api_' : _action.config
        };

        var filtered_params = undefined;
        if(req.body)
        {
            filtered_params = req.body;
        }

        _api_rest_send(req,res,_config,filtered_params);
    },
    'put' : function(req,res)
    {
        var _api_module = req.params._module_;
        var _api_name = req.params.func;

        var _action = require(__dirname + '/../modules/' + _api_module + '/' + _api_name + '-' +req.params.version +  '.js');
        var _config = {
            '_module_' : require(__dirname + '/../modules/' + _api_module + '/config.json'),
            '_api_' : _action.config
        };

        var url = require('url');
        var url_parts = url.parse(req.url, true);
        var filtered_params = url_parts.query;

        _api_rest_send(req,res,_config,filtered_params);
    },
    'delete' : function(req,res)
    {
        var _api_module = req.params._module_;
        var _api_name = req.params.func;

        var _action = require(__dirname + '/../modules/' + _api_module + '/' + _api_name + '-' +req.params.version +  '.js');
        var _config = {
            '_module_' : require(__dirname + '/../modules/' + _api_module + '/config.json'),
            '_api_' : _action.config
        };

        var url = require('url');
        var url_parts = url.parse(req.url, true);
        var filtered_params = url_parts.query;

        _api_rest_send(req,res,_config,filtered_params);
    }

};


