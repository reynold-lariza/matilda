/**
 * Created by reynold on 11/3/13.
 */
exports.config = {
    'description' : 'Say hello to a person',

    /**
     * This is where the main action happens
     * @param param
     * @returns {string}
     */
    'action' : function(param) {

        return { "status" : 200, "response" : "Hello " + param.name + "! from API v2.0"};
    }
};
