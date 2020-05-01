const { Pool } = require('pg');
var bodyParser = require('body-parser');
var express = require("express");
var app = express();
var jwt = require('jsonwebtoken');
var config = {
    user: 'postgres', 
    database: 'test_db', 
    password: 'password', 
    host: 'localhost', 
    port: 5432, 
};
const conn = new Pool(config);



conn.connect((err)=>{
	
	if(err) throw err;
	console.log("Psql connected successfully");
});



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/register', function (req, res) {

let dd = {
                //"id":  req.body.id,
                "name": req.body.name,
                "age": req.body.age,
                "address": req.body.address,
                "salary": req.body.salary,
                "join_date": req.body.join_date
            }
  console.log(req.body);

let sql = `INSERT INTO COMPANY SET ?`;
console.log(sql)


 conn.query(sql, req.body, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({"status": 200,"error": null,"response": results}));

  });
});

app.get('/showall',  function (req, res) {

  //console.log(req.body);
  let sql = "SELECT * FROM COMPANY";
  let query = conn.query(sql, (err, results) => {

    if (err) throw err;
    console.log(JSON.stringify(results));
    res.json({ results:results });
  })
})

app.delete('/delete',function (req, res) {
  let data = { id: req.body.id };
  
  let sql = "DELETE FROM COMPANY WHERE id = ?";
  let query = conn.query(sql, data, (err, results) => {
    if (err) throw err;
    console.log(data);
    res.send({ "output": data.id });
  })
});



app.put('/update',function (req, res) {

  let data = [req.body.first_name, req.body.last_name, req.body.email, req.body.mobile, req.body.id];
  //console.log(req.body);
  let sql = "UPDATE register SET first_name = ?,last_name = ?, email = ?, mobile = ? WHERE id=?";
  let query = conn.query(sql, data, (err, results, fields) => {

    if (err) throw err;
    console.log(data);
    res.end(JSON.stringify(results));
  })
});


app.listen(4000);




