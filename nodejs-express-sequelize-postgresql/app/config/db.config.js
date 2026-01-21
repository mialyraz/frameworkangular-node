const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});

pool.connect(function(error){
  if(!!error){
    console.log(error);
  }else{
    console.log('Connected! mon bd');
  }
});

module.exports = pool;