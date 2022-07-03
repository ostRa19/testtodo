const express = require('express');
const app = express();
const usersRoute = require('./routes/users');
const todoRoute = require('./routes/todo');

require('dotenv').config();

app.use(express.json());

app.use((err, req, res, next) => {
    if(err.statusCode) {
        res.status(err.statusCode).send(err.message);
    } else {
        console.log(err);
        res.status(500).send('Something unexpected happened');
    }
});


app.use(usersRoute);
app.use(todoRoute);

// we will eventually use env variables
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server Started');
});


// const express = require('express');
// const app = express();
//
// const { Pool, Client } = require('pg')
// // const pool = new Pool({
// //     user: 'dbuser',
// //     host: 'database.server.com',
// //     database: 'mydb',
// //     password: 'secretpassword',
// //     port: 3211,
// // })
// // pool.query('SELECT * FROM todoapp;', (err, res) => {
// //     console.log(err, res)
// //     pool.end()
// // })
// const client = new Client({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'postgres',
//     password: '1234',
//     port: 5432,
// })
// client.connect()
// // client.query('SELECT * FROM todoapp;', (err, res) => {
// //     console.log(err, res)
// //     client.end()
// // })
//
//
// app.get('/', async (req, res) => {
//     try {
//         await client.query('SELECT * FROM todoapp;', (err, res) => {
//             console.log(err, res)
//             client.end()
//         })
//         }
//
//     catch (err) {
//         console.log(err.stack)
//     }}
// )
//
//
// app.listen(3000, function() {
//     console.log('listening on 3000')
// })