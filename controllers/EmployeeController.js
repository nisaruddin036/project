const { response } = require('express')
const Employee = require('../models/Employee')

// show the list of employee
const index = (req, res, next) => {
   Employee.find()
   .then(response => {
    res.json({
        response
    })
   })
   .catch(error =>{
    res.json({
        message:'an error occured!'
    })
   })
}

const show = (req, res, next) => {
    let employeeID = req.body.employeeID
    Employee.findById(employeeID)
    .then(response =>{

        
        res.json({
            response
        })
    })    

    .catch(error => {
        res.json({
            mssage:'an error occured'
        })
    })
}

const store = (req, res, next) => {
    let employee = new Employee({
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    })
    employee.save()
    .then(response =>{
        res.json({
            db:employee,
            mssage:'Employee added successfully'
        })
    })
    .catch(error => {
        res.json({
            mssage:'an error occured'
        })
    })
}


const update = (req, res, next) => {
    let employeeID = req.body.employeeID

    let updatedData = {
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    }
    Employee.findByIdAndUpdate(employeeID,{$set: updatedData})
    .then(() =>{
        res.json({
            message:'Employee updated successfully'
        })
    })
    .catch(error => {
        res.json({
            message:'an error occured'
        })
    })
}


const destroy = (req, res, next) => {
    let employeeID = req.body.employeeID
    Employee.deleteOne({ _id: employeeID })
    .then(() =>{
        res.json({
            message:'Employee deleted successfully'
        })
    })
    .catch(error => {
        console.log(error)
        res.json({
            
            message:'an error occured'
        })
    })
}




module.exports = {
    index, show, store, update, destroy
}







