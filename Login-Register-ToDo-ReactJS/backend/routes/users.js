const router = require('express').Router()
const { json } = require('express')
const { Mongoose } = require('mongoose')

let User = require('../models/user.model')

// Fetch all the users from the db
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
})

// To add a new user to the db
router.route('/adduser').post((req, res) => {
    const id = req.body.id
    const name = req.body.name
    const email = req.body.email
    const mobile = req.body.mobile
    const password = req.body.password
    const tasks = req.body.tasks
    const newUser = new User({ id, name, email, mobile, password, tasks })

    newUser.save()
        .then(() => res.json(`ID -> ${id} : User -> ${name} added!`))
        .catch(err => res.status(400).json('Error : ' + err))
})

let uFetch

// To remove an existing user from the db by passing in the id as a request parameter
router.route('/:id/removeuser').delete((req, res) => {
    User.findOneAndDelete({ id: req.params.id })
        .then(uFetch => { res.json(`User with name : ${uFetch.name} -> Deleted!`) })
        .catch(err => { res.status(400).json('Data not found in the database : Error code : ' + err) })
})

// To add a to-do task for a user by passing in the ID of the user as request parameter 
router.route('/:id/addtask').put((req, res) => {
    const id = req.params.id
    const id_val = req.body.id_val
    const desc = req.body.desc
    const completed = req.body.completed

    //inserted data is the object to be inserted 
    User.findOneAndUpdate({ id: id },
        {
            $push: {
                tasks: {
                    "id_val": id_val,
                    "desc": desc,
                    "completed": completed
                }
            }
        })
        .then((uFetch) => { res.json(`Task : ${desc} -> added for user ${uFetch.name}`) })
        .catch(err => { res.status(400).json('User with given ID Not found') })
})

// To remove a to-do task identified by passing user ID and Task ID using request parameters 
router.route('/:uid/removetask/:tid').delete((req, res) => {
    const uid = req.params.uid
    const tid = req.params.tid
    //remove task of a user 
    User.findOneAndUpdate({ id: uid, "tasks.id_val": tid },
        {
            $pull: {
                tasks: {
                    "id_val": tid,
                }
            }
        })
        .then((uFetch) => { res.json(`Task with ID: ${tid} removed for user ${uFetch.name}`) })
        .catch(err => { res.status(400).json('User or task with given ID Not found') })
})

// To update to-do task description by passing user ID and Task ID using request parameters 
router.route('/:uid/updatetaskdesc/:tid').put((req, res) => {
    const uid = req.params.uid
    const tid = req.params.tid
    const desc = req.body.desc
    //remove task of a user 
    User.findOneAndUpdate({ id: uid, "tasks.id_val": tid },
        {
            $set: {
                "tasks.$.desc": desc
            }
        })
        .then((uFetch) => { res.json(`Task with ID: ${tid} updated with new description : ${desc} for user ${uFetch.name}`) })
        .catch(err => { res.status(400).json('User or task with given ID Not found') })
})

// To update to-do task completed or not by passing user ID and Task ID using request parameters 
router.route('/:uid/updatetaskcheck/:tid').put((req, res) => {
    const uid = req.params.uid
    const tid = req.params.tid
    const completed = req.body.completed
    //remove task of a user 
    User.findOneAndUpdate({ id: uid, "tasks.id_val": tid },
        {
            $set: {
                "tasks.$.completed": completed
            }
        })
        .then((uFetch) => { res.json(`Task with ID: ${tid} | updated with new completion status : ${completed} | for User ${uFetch.name}`) })
        .catch(err => { res.status(400).json('User or task with given ID Not found') })
})

// To log a user in to his/her account 
router.route('/:uid/login').put((req, res) => {
    User.findOneAndUpdate({ id: req.params.uid}, { logged:true })
        .then(uFetch => res.json(`User : ${uFetch.name} has been logged in.`))
        .catch(err => res.json(`User with ID : ${req.params.uid} not found in the database.`))
})

// To log a user out of his/her account 
router.route('/:uid/logout').put((req, res) => {
    User.findOneAndUpdate({ id: req.params.uid }, { logged:false })
        .then(uFetch => res.json(`User : ${uFetch.name} has been logged out.`))
        .catch(err => res.json(`User with ID : ${req.params.uid} not found in the database.`))
})

module.exports = router