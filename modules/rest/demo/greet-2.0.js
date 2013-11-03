/**
 * Created by reynold on 11/3/13.
 */
exports.config = {
    'description' : 'Greets a person',

    /**
     * This is where the main action happens
     * @param param
     * @returns {string}
     */
    'action' : function(param) {

        return { "status" : 200, "response" : "Greetings " + param.name + ' '  +param.last + "! from API v2.0" };
    }
};
