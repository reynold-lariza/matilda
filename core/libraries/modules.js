/**
 * Created by reynold on 11/9/13.
 * Modules library
 */

exports.modules = {
    /**
     * Get modules list
     * @param enabled - set this to false to get all modules (both enabled, and disabled).
     * Default is that it will only get the enabled modules
     */
    'list' : function(){

        var wrench = require('wrench');
        var module_path = __dirname + '/../../modules/';
        var _dir = wrench.readdirSyncRecursive(module_path);
        var path = require('path');
        var modules_list = [];

        // get the modules

        _dir.forEach(function(v,i){

            if(_dir[i].indexOf(path.sep) == -1) {

                // verify if the module is enabled. If so, then get the list of API functions
                var mod_cfg = require(module_path + _dir[i] + '/config.json');
                if(mod_cfg.enabled){



                    // get the list of active functions
                    var _func = wrench.readdirSyncRecursive(module_path  + v);
                    var _module_name = _dir[i];

                    var _func_list = [];
                    _func.forEach(function(v,i){

                        if(v=='config.json') return;

                        var _func_ref = require(module_path + _module_name + '/' + v);

                        // get the function name
                        var _func_name = v.split('-');
                        var _version = _func_name[1].split('.js');
                        if(_func_ref.config.enabled)
                        {
                            // get the necessary properties for each API function
                            _func_list.push({
                                'name' : _func_name[0],
                                'version' : _version[0],
                                'description' : _func_ref.config.description,
                                'author' : _func_ref.config.author,
                                'input' : _func_ref.config.input,
                                'output' : _func_ref.config.output
                            });
                        }


                    });

                    // save the module's data and function list into the modules_list array
                    modules_list.push(
                        {
                            // specify the name
                            'name' : _dir[i],
                            'config' : mod_cfg,
                            'func' : _func_list
                        }
                    );
                }




            }
        });
        return modules_list;

    }
}
