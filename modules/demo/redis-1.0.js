/**
 * Created by reynold on 11/3/13.
 */
exports.config = {
    'description' : 'REDIS Test Client',
    'author' : 'Reynold L.',
    'enabled' : true,

    // INPUT parameters
    'input' : {
        'name' : {
            'required' : true,
            'description' : 'First name of the person',
            'default' : 'Juan'
        },
        'last' : {
            'required' : true,
            'description' : 'Last name of the person',
            'default' : 'Dela Cruz'
        }
    },

    // OUTPUT parameters
    'output' : {
        'status' : {
            'description' : 'Status number',
            'default' : '200'
        },
        'response' : {
            'description' : 'Response',
            'default' : 'Greetings Juan Dela Cruz! from API v1.0'
        }

    },

    /**
     * This is where the main action happens
     * @param param
     * @returns {string}
     */
    'action' : function(instance) {

        console.log(instance.db.cache);
        instance.db.cache.on("error", function (err) {
            console.log("Error " + err);
        });

        instance.db.cache.set("some_var", "A whole new world");

        instance.db.cache.quit();

        instance.send({ "status" : 200, "response" : "Saved a value"});


        //return { "status" : 200, "response" : "Greetings " + instance.param.name + ' '  +instance.param.last + "! from API v1.0" }

    }
};
