/**
 * Created by reynold on 11/3/13.
 * API REST
 */
var _api_rest_send = function(req,res,_action,param){

    // read config.json
    var cfg = require(__dirname + '/../config.json');

    var _result = _action._api_.action(param);
    var _output = undefined;
    res.setHeader('X-Powered-By', cfg._POWERED_BY_);
    res.setHeader('Developed-By', cfg._DEVELOPED_BY_);

    if (req.accepts('html')) {
        res.setHeader('Content-type', 'text/html');
        _output = _result;
    }
    else if (req.accepts('xml')) {
        res.setHeader('Content-type', 'application/xml');
        _output = require('easyxml').render(_result);
    }
    else if (req.accepts('json')) {
        res.setHeader('Content-type', 'application/json');

        _output = _result;
    }
    else
    {
        res.setHeader('Content-type', 'text/plain');
        _output = _result;
    }


    res.send(_output);
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


