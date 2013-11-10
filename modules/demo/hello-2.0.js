/**
 * Created by reynold on 11/3/13.
 */
exports.config = {
    'description' : 'Say hello to a person',
    'author' : 'Reynold L.',
    'enabled' : true,

    // INPUT parameters
    'input' : {
        'name' : {
            'required' : true,
            'description' : 'Name of the person',
            'default' : 'Juan'
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
            'default' : 'Hello Juan ! from API v2.0'
        }

    },

    /**
     * This is where the main action happens
     * @param param
     * @returns {string}
     */
    'action' : function(instance) {

        instance.send({ "status" : 200, "response" : "Hello " + instance.param.name + "! from API v2.0"});
    }
};
