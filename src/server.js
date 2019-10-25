const express = require('express');
const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'aldebaran1.mysql',
  database: 'mydb'
})
const app = express();
// // app.get('takeEvents',(req,res) => {
//     let values = [
//         ['event example','2019-10-10T15:30','01:00','waiting'],
//         ['event example','2019-10-09T13:30','02:00','waiting'],
//         ['event example','2019-10-13T17:00','01:00','accepted'],
//         ['event example','2019-10-08T14:30','01:00','denied'],
//     ]
//     db.query('INSERT INTO example (title,start,duration,type) VALUES ?',[values],(err,result) => {
//         if(err)
//             throw err;
//         console.log('values inserted!!!');
    // })
    // db.query('SELECT * FROM example WHERE `start`!=""',(err,result) => {
    //     if(err)
    //         throw err;
    //     console.log(result);
    // })
    // res.send();
// });
app.get('/takeEvents',(req,res) => {
    console.log('requested!!!');
    res.send('correct!!!');
    
})
app.post('/searchByName',(req,res) => {
    console.log('hasav');
    res.send('correct!!!');
})
app.listen(2000,() => {
    console.log('server is listening on port 1000!!!');
})