const router = require('express').Router()
const { json } = require('express')
let Task = require('../models/task.model')

router.route('/').get((req, res) => {
    Task.find()
        .then(tasks => res.json(tasks))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res)=>{
    const desc = req.body.desc
    const id_val = req.body.id_val
    //let completed = false
    //let id = Task.find().sort({id:1}).limit(1) ? 1 : Task.find().sort({_id:1}).limit(1) +1 
    const newTask = new Task({id_val, desc})
    
    newTask.save()
        .then(() => res.json('Task added!'))
        .catch(err => res.status(400).json('Error : '+err))
})

router.route('/:id').get((req,res)=>{
    Task.findById(req.params.id)
        .then((fetchedTask) => res.json(fetchedTask))
        .catch(err => res.status(400).json('Error : Not found : '+err))
})
let tFetch=""
router.route('/update/:id').put((req,res)=>{
    const desc = req.body.desc
    Task.findOne({id_val: req.params.id}, (err, taskFetched)=> {
        if(err){
            console.log(err)
        } 
        else{
            //console.log(taskFetched)
            tFetch = taskFetched
        }
    })

    Task.findOneAndUpdate({id_val: req.params.id}, {desc: desc})
        .then((tFetch)=>{ res.json(`Task : ${tFetch.desc} -> updated to : ${desc}`)})
        .catch(err=>{res.status(400).json('Data Not found : Error code : '+err)})
})

router.route('/updatecheck/:id').put((req,res)=>{
    const completed = req.body.completed
    const desc = req.body.desc
    Task.findOne({id_val: req.params.id}, (err, taskFetched)=> {
        if(err){
            console.log(err)
        } 
        else{
            console.log(taskFetched)
            tFetch = taskFetched
        }
    })

    Task.findOneAndUpdate({id_val: req.params.id}, {completed: completed})
        .then((tFetch)=>{ res.json(`Task : ${tFetch.desc} - ${!completed} -> updated to : ${desc} - ${completed}`)})
        .catch(err=>{res.status(400).json('Data Not found : Error code : '+err)})
})

router.route('/delete/:id').delete((req,res)=>{
    Task.findOne({id_val: req.params.id}, (err, taskFetched)=> {
        if(err){
            console.log(err)
        } 
        else{
            console.log(`Task fetched ${JSON.stringify(taskFetched)}`)
            tFetch = taskFetched
        }
    })

    Task.findOneAndDelete({id_val: req.params.id})
        .then((tFetch) => { res.json(`Task : ${tFetch.desc} -> Deleted!`)})
        .catch(err=> {res.status(400).json('Data not found : Error code : '+err)})
})

module.exports = router