const router = require('express').Router()
const { json } = require('express')
const { Mongoose } = require('mongoose')

let User = require('../models/user.model')

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/adduser').post((req, res) => {
    const id = req.body.id
    const name = req.body.name
    const email = req.body.email
    const mobile = req.body.mobile
    const password = req.body.password
    const tasks = req.body.tasks
    //let completed = false
    //let id = Task.find().sort({id:1}).limit(1) ? 1 : Task.find().sort({_id:1}).limit(1) +1 
    const newUser = new User({ id, name, email, mobile, password, tasks })

    newUser.save()
        .then(() => res.json(`ID -> ${id} : User -> ${name} added!`))
        .catch(err => res.status(400).json('Error : ' + err))
})

let uFetch
router.route('/:id/addtask').put((req, res) => {
    const id = req.params.id
    const id_val = req.body.id_val
    const desc = req.body.desc
    const completed = req.body.completed

    User.findOne({ id: id }, (err, userFetched) => {
        if (err) {
            console.log(err)
            return err
        }
        else {
            //console.log(taskFetched)
            uFetch = userFetched
        }
    })

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

module.exports = router