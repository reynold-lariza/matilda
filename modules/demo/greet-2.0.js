/**
 * Created by reynold on 11/3/13.
 */
exports.config = {
    'description' : 'Greets a person',
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
            'default' : 'Greetings Juan Dela Cruz! from API v2.0'
        }

    },

    /**
     * This is where the main action happens
     * @param param
     * @returns {string}
     */
    'action' : function(param) {

        return { "status" : 200, "response" : "Greetings " + param.name + ' '  +param.last + "! from API v2.0" };
    }
};
