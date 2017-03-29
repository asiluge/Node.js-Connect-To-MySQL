var express = require('express');
var router = express.Router();
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var filepath = '/app/public/images/reg.png';
var test = require('../test/test');

var app = express();
var bodyParser = require('body-parser');//post upload
var multer  = require('multer');//upload

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })//post
app.use(bodyParser.urlencoded({ extended: false }));//upload
app.use(multer({ dest: '../public/images'}).array('image'));//upload

app.use(express.static('./'));

app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

app.get("/post.html",function(req,res){
   res.sendFile( __dirname + "/" + "post.html");
})

app.get("/upload.html",function(req,res){
   res.sendFile( __dirname + "/" + "upload.html");
})

app.get("/login.html",function(req,res){
   res.sendFile( __dirname + "/" + "login.html");
})

app.get("/reg.html",function(req,res){
   res.sendFile( __dirname + "/" + "reg.html");
})

app.get("/h5.html",function(req,res){
   res.sendFile( __dirname + "/" + "h5.html");
})

app.get('/process_get', function (req, res) {

   // 输出 JSON 格式
   response = {
       first_name:req.query.first_name,
       last_name:req.query.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

app.post('/process_post', urlencodedParser, function (req, res) {

   // 输出 JSON 格式
   response = {
       first_name:req.body.first_name,
       last_name:req.body.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

//注册
app.post('/reg', function (req, res) {
    client = test.connect();
        test.insertFun(client,req.body.username ,req.body.password, function (err) {
              if(err) throw err;
              res.send('注册成功');
    });
});

//登录
app.post('/login',function(req, res) {
        client=test.connect();
        result=null;
        test.selectFun(client,req.body.username, function (result) {
            if(result[0]===undefined){
                res.send('没有该用户');
            }else{
                if(result[0].password===req.body.password){
                     res.sendfile( __dirname + "/" + "personal.html");
                }else
                {
                    res.send('密码错误');
                }
               }
        });
    });

//注销登录
app.post('/outlogin',function(req,res){
    res.sendfile( __dirname + "/" + "login.html");
})

app.post('/file_upload', function (req, res) {

   console.log(req.files[0]);  // 上传的文件信息

   var des_file = __dirname + "/" + req.files[0].originalname;
   fs.readFile( req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
         if( err ){
              console.log( err );
         }else{
               response = {
                   message:'File uploaded successfully', 
                   filename:req.files[0].originalname
              };
          }
          console.log( response );
          res.end( JSON.stringify( response ) );
       });
   });
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})

function readLines(input, func) {
  var remaining = '';
  input.on('data', function(data) {
    remaining += data;
    var index = remaining.indexOf('\n');
    while (index > -1) {
      var line = remaining.substring(0, index);
      remaining = remaining.substring(index + 1);
      func(line);
      index = remaining.indexOf('\n');
    }
 
  });
 
  input.on('end', function() {
    if (remaining.length > 0) {
      func(remaining);
    }
  });
}
 

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'ASILUGE' });
// });
          //服务器回应index主页

console.log( path.dirname(filepath) );
console.log( path.basename(filepath) );
console.log( path.extname(filepath) );

module.exports = router;
