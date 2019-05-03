var express = require('express');
var app = express();
var bodyParser = require('body-parser')

app.set('views',__dirname + '/views');
app.use(express.static(__dirname + '/JS'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({
    extended: true
}));

    var sql = require("mysql");

    // config for your database
    var connect = sql.createConnection({
        user: 'sql',
        password: '',
        host: 'localhost',
        database: 'PatientDB'
    });

    // var connect1 = sql.createConnection({
    //     user: 'sql',
    //     password: '',
    //     host: 'localhost',
    //     database: 'DonorID'
    // });

    // connect to your database
    connect.connect(function (err) {

        if (err) console.log(err);
      else console.log('connected-1');
            });

    // connect1.connect(function (err) {
    //
    //             if (err) console.log(err);
    //           else console.log('connected-1');
    //                 });



  app.get('/', function (req, res) {
                      res.render('main.ejs');

});
app.get('/home', function (req, res) {
              res.render('home.html');

});

// let value=['Anshu', 'A+', '20'];
// var sql1 = "INSERT INTO PatientDB (Name, BloodType, Age) VALUES ?";
//
// connect.query(sql1,[value], function (err, result) {
//   if (err) throw err;
//   console.log("1 record inserted");
// });



app.post('/home', function(req, res) {
  console.log(req.body.input
  );
 let bloodtype = req.body.input[0];

var banda = req.body.input.slice(0, 4);
console.log(banda);


    connect.query("SELECT * FROM PatientDB WHERE BloodType = "+sql.escape(bloodtype), function (err, result, fields) {
      if (err) throw err;
      res.render('gotit.ejs',{result:result});
      console.log(result.length)
    });

if(banda[3]){
  var val = banda;
      let value=[val];
      var sql1 = "INSERT INTO PatientDB (Name, Contact,BloodType, Age) VALUES ?";
     console.log(value);
      connect.query(sql1,[value], function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
      });
      res.redirect('/home');
}


});


// app.post('/home', function(req, res) {
//   console.log(req.body.input
//   );
//  let bloodtype = req.body.input[0];
//
// var banda = req.body.input.slice(0, 3);
// console.log(banda);
//
//
//     connect1.query("SELECT * FROM PatientDB WHERE BloodType = "+sql.escape(bloodtype), function (err, result, fields) {
//       if (err) throw err;
//       res.render('gotit.ejs',{result:result});
//       console.log(result.length)
//     });
//
//   });

app.get('/home/recipient', function (req, res) {
                    res.render('recipient.ejs');

});

app.post('/', (req, res) => {

  res.redirect('/home');
});





       app.listen(5000);
