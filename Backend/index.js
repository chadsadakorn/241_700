const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const app = express();


app.use(bodyParser.json());
const port = 8000;
let conn = null;
const initMySQL = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb',
        port: '8700'
    });
    console.log('Connected to MySQL database');
}




app.get('/users', async (req, res) => {
    const results = await conn.query('SELECT * FROM users');
    res.json(results[0])
})

app.post('/users', async (req, res) => {
    try {
        let user = req.body;
        const results = await conn.query('INSERT INTO users SET ?', user);
        res.json({
            message: 'User added successfully',
            data: results[0]
        });
    } catch (error) {
        console.error('Eroor inserting user:', error);
        res.status(500).json({ message: 'Error adding user' });
    }
})

app.get('/users/:id', async (req, res) => {
    try{
    const results = await conn.query('SELECT * FROM users WHERE id = ?', id);
    if (results[0].length === 0) {
        throw { statusCode: 404, message: 'User not found' }
    }
    res.json(results[0][0]);

} catch (error) {
    console.error('Error fetching user:', error);
    let statusCode = error.statusCode || 500;
    res.status(statusCode).json({
        message: error.message || 'Error fetching user'
    });
} 
})

app.put('/user/:id',async (req, res)=>{
    try{
        let id = req.params.id;
        const results = await con
    }
})










// //let users = [];
// let counter = 1;

// app.get('/users', (req, res) => {
//     res.json(users);
// }); 

// app.post('/user', (req, res) => {
//     let user = req.body;
//     user.id = counter;
//     counter +=1;
//     users.push(user);
//     res.json({message : 'User added successfully', user: user});
// });

// app.put('/user/:id', (req, res) => {
//     let id = req.params.id;
//     let updatedUser = req.body;

//     let selectedIndex = users.findIndex(user => user.id == id);

//     if (updatedUser.firstname){
//         users[selectedIndex].firstname = updatedUser.firstname;
//     }
//     if (updatedUser.lastname){
//         users[selectedIndex].lastname = updatedUser.lastname;
//     }



//     res.json({message : 'User updated successfully', 
//         data: {
//             user: updateUser, 
//             indexUpdate: selectedIndex
//         }
//     });
// });

//     app.delete('/users/:id', (req, res) => {
//         let id = req.params.id;
//         let selectedIndex = users.findIndex(user => user.id == id);

//         delete users[selectedIndex];
//         res.json({
//             message : 'User deleted successfully',
//             indexDelete : selectedIndex
//         });
//         //
// })

app.listen(port, async () => {
    await initMySQL();
    console.log(`Server is running on http://localhost:${port}`);
});
