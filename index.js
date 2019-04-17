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

    // connect to your database
    connect.connect(function (err) {

        if (err) console.log(err);
      else console.log('connected');
            });
        app.get('/', function (req, res) {
                      res.render('main.ejs');

});
app.get('/home', function (req, res) {
              res.render('home.html');

});



app.post('/home', function(req, res) {
  console.log(req.body.input[0]);
 let bloodtype = req.body.input[0];

    connect.query("SELECT * FROM PatientDB WHERE BloodType = "+sql.escape(bloodtype), function (err, result, fields) {
      if (err) throw err;
      res.render('gotit.ejs',{result:result});
      console.log(result.length)
    });

});

app.post('/', (req, res) => {

  res.redirect('/home');
})




       app.listen(5000);
