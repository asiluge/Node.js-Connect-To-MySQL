//app.js

var mysql = require('mysql');

function connectServer(){
    var client = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'asiluge..520..',
        database:'nodejs',
        port: 3306
    });
    return client;
}

function  selectFun(client,username,callback){
    //client为一个mysql连接对象
    client.query('select password from t_user where name="'+username+'"',function(err,results,fields){
        if(err) throw err;
        callback(results);
    });
}

function insertFun(client , username , password, callback){
    client.query('insert into t_user(name,password) value(?,?)', [username, password], function(err,result){
        if( err ){
            console.log( "error:" + err.message);
            return err;
        }
          callback(err);
    });
}

exports.connect = connectServer;
exports.selectFun  = selectFun;
exports.insertFun = insertFun;
// conn.connect();

// var insertSQL = 'insert into t_user(name,password) values(?,?)';
// var t_user = ['req', 'req'];
// var selectSQL = 'select * from t_user limit 10';
// var deleteSQL = 'delete from t_user where name="asiluch"';
// var updateSQL = 'update t_user set name="ge"  where name="asiluchs"';

// //delete
// conn.query(deleteSQL, function (err0, res0) {
//     if (err0) console.log(err0);
//     console.log("DELETE Return ==> ");
//     console.log(res0);

    // //insert
    // conn.query(insertSQL,t_user, function (err1, res1) {
    //     if (err1) console.log(err1);
    //     console.log("INSERT Return ==> ");
    //     console.log(res1);

    //     //query
    //     conn.query(selectSQL, function (err2, rows) {
    //         if (err2) console.log(err2);

    //         console.log("SELECT ==> ");
    //         for (var i in rows) {
    //             console.log(rows[i]);
    //         }

            // //update
            // conn.query(updateSQL, function (err3, res3) {
            //     if (err3) console.log(err3);
            //     console.log("UPDATE Return ==> ");
            //     console.log(res3);

    //             //query
    //             conn.query(selectSQL, function (err4, rows2) {
    //                 if (err4) console.log(err4);

    //                 console.log("SELECT ==> ");
    //                 for (var i in rows2) {
    //                     console.log(rows2[i]);
    //                 }
    //             });
    //         });
    //     });
    // });
// });

