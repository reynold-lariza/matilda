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
            'default' : 'Greetings Juan Dela Cruz! from API v1.0'
        }

    },

    /**
     * This is where the main action happens
     * @param param
     * @returns {string}
     */
    'action' : function(instance) {


        var mariadb = require("mariasql");
        var db = new mariadb();
        db.connect({
            host: "localhost",
            user: "dev",
            password: "dev123",
            db: "tsg_core_db"
        });

        db.query("SELECT * FROM user_accounts")
            .on("result", function(result){
                result.on("end", function(info){
                    console.log(info);
                    console.log(result);
                    db.end();
                });
            });

        return { "status" : 200, "response" : 'test' };
    }
};
