const { Pool } = require('pg');
var config = {
    user: 'postgres', 
    database: 'test_db', 
    password: 'password', 
    host: 'localhost', 
    port: 5432, 
};
const pool = new Pool(config);



pool.connect((err)=>{
	
	if(err) throw err;
	console.log("Psql connected successfully");
});
