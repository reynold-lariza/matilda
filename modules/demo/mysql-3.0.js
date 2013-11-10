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

        //console.log(instance.db.default);

        instance.db.support.getConnection(function(err, connection) {
            // connected! (unless `err` is set)
            if(err)
            {
                return instance.send(err.toString());
            }

            connection.query("SELECT * FROM status",function(err,results,fields){

                if(err) {
                    return instance.send(err.toString());
                }

                //console.log(results);

                instance.send({ "status" : 200, "response" : results });


            });

            connection.end();

        });

    }
};
