/**
 * Created by reynold on 11/10/13.
 */

exports.redis = {
    connect : function(_connection_string){
        var _driver = require("redis");

        return  _driver.createClient({
            port : _connection_string.port,
            host : _connection_string.host
        });

    }
}
