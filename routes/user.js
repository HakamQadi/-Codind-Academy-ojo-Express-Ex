const express = require('express')
const router = express.Router()
const fs = require("fs");
const { send } = require('process');

const users = JSON.parse(fs.readFileSync('../data/data.json'));

router.get('/', (req, res) => {
    res.send("users")
})

router.get('/:id', (req, res) => {
    const id = req.params.id * 1
    const userWithId = users.find(el => el.id === id)
    res.send(userWithId)
})

router.post('/create', (req, res) => {
    try {
        const newUserData = req.body; // Received data
        let newId = users[users.length - 1].id + 1
        const newUser = Object.assign({ id: newId }, newUserData)  // combine two objects together
        users.push(newUser)
        fs.writeFile('../data/data.json', JSON.stringify(users), (err) => {
            res.status(200).json(users);
        })
    } catch (error) {
        res.status(400).send('Invalid JSON data');
    }
})


// router.patch("/:id/edit", (req, res) => {
//     const id = req.params.id
//     const newEdit = req.body
//     // res.send(newEdit)
//     // res.send(req.body)
//     const editUser = users.find(el => el.id === id)
//     const index = users.indexOf(editUser)
//     Object.assign(editUser, req.body)
//     users[index] = editUser
//     fs.writeFile('../data/data.json', JSON.stringify(users), (err) => {
//         if (err) {
//             res.status(500).send('Server Error');
//         }
//         else {
//             res.status(200).json(editUser);
//         }
//     })
// })

router.patch("/:id/edit", (req, res) => {
    const id = req.params.id * 1
    const newEdit = req.body
    // res.send(newEdit)
    // res.send(req.body)
    const editUser = users.find(el => el.id === id)
    // res.send(editUser)
    // console.log(editUser)

    const index = users.indexOf(editUser)
    Object.assign(editUser, req.body)
    users[index]=editUser
    fs.writeFile('../data/data.json', JSON.stringify(users), (err) => {
        if (err) {
            res.status(500).send('Server Error');
        }
        else {
            res.status(200).json(editUser);
        }
    })
})

router.delete('/:id/delete', (req, res) => {
    const id = req.params.id * 1
    const userDelete = users.find(el => el.id === id)
    const index = users.indexOf(userDelete)
    users.splice(index, 1)
    fs.writeFile('../data/data.json', JSON.stringify(users), (err) => {
        if (err) {
            res.status(500).send('Server Error');
        }
        else {
            res.status(204).send(null);
        }
    })
})





module.exports = router

// const express = require('express');
// const router = express.Router();


// router.get('/', (req, res) => {
//     res.send("User List")
// });

// router.get('/new', (req, res) => {
//     res.send("User New Form")
// });

// router.post('/', (req, res) => {
//     res.send('create User')
// });


// router.get("/:id",(req,res) => {
//     res.send(`Ger user With ID ${req.params.id}`)
// });

// router.put("/:id",(req,res) => {
//     res.send(`put user With ID ${req.params.id}`)
// });

// router.delete("/:id",(req,res) => {
//     res.send(`delte user With ID ${req.params.id}`)
// });


// module.exports = router
