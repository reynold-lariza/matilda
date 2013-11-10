/**
 * Created by reynold on 11/10/13.
 */



exports.mysql = {
    connect : function(_connection_string){
        var _mysql_driver = require("mysql");

        return  _mysql_driver.createConnection({
                port : _connection_string.port,
                host : _connection_string.host,
                user: _connection_string.username,
                password: _connection_string.password,
                database : _connection_string.database
                });


/*        return  _mysql_driver.createPool({
                port : _connection_string.port,
                host : _connection_string.host,
                user: _connection_string.username,
                password: _connection_string.password,
                database : _connection_string.database
                });*/



    }

    /*,
    query : function(sql,cb){

        // if not yet connected, then attemp to connect to database
        if(!_mysql_connection)
        {
            this.connect()
        }
    }*/

}
