/**
 * Created by reynold on 11/3/13.
 */
exports.config = {
    'description' : 'MySQL Test client API',
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
            'default' : 'Hello Juan! from API v1.0'
        }

    },
    /**
     * This is where the main action happens
     * @param param
     * @returns {string}
     */
    'action' : function(instance) {

        instance.db.default.query("SELECT * FROM user_accounts",function(err,results,fields){
            if(err) {
                return instance.send(err.toString());
            }

            instance.send({ "status" : 200, "response" : results });

        });

        instance.db.default.end();

    }
};
