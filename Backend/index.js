const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.json());
const port = 8000;
let users = [];
let counter = 1;

app.get('/users', (req, res) => {
    res.json(users);
}); 

app.post('/user', (req, res) => {
    let user = req.body;
    user.id = counter;
    counter +=1;
    users.push(user);
    res.json({message : 'User added successfully', user: user});
});

app.put('/user/:id', (req, res) => {
    let id = req.params.id;
    let updatedUser = req.body;

    let selectedIndex = users.findIndex(user => user.id == id);

    if (updatedUser.firstname){
        users[selectedIndex].firstname = updatedUser.firstname;
    }
    if (updatedUser.lastname){
        users[selectedIndex].lastname = updatedUser.lastname;
    }



    res.json({message : 'User updated successfully', 
        data: {
            user: updateUser, 
            indexUpdate: selectedIndex
        }
    });
});

    app.delete('/users/:id', (req, res) => {
        let id = req.params.id;
        let selectedIndex = users.findIndex(user => user.id == id);

        delete users[selectedIndex];
        res.json({
            message : 'User deleted successfully',
            indexDelete : selectedIndex
        });
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
