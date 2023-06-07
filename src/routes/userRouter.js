const express = require('express')
const userRouter = express.Router()
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const userReg = require('../models/userReg')
const volunteerReg = require('../models/volunteerReg')
const login = require('../models/login')

userRouter.post('/register/user', async (req,res) => {
    try{
        const userExists = await login.findOne({ email: req.body.email })
        if(userExists){
            return res.status(400).json({ message: 'email already registered'})
        }        
        
        const hashedPassword = await bcrypt.hash(req.body.password, 8)

        const oldPhone = await userReg.findOne({ phonenumber: req.body.phonenumber }) 
        if(oldPhone){
            return res.status(400).json({ message: 'phone number already exists '}) 
        }  
        var log = {
            login_id: req.body.login_id,
            username: req.body.username,
            password: hashedPassword,
            role: req.body.role,
            status: req.body.status,
        }
        const result = await login(log).save()
        var reg = {
            username: req.body.username,
            name: req.body.name,
            address: req.body.address,
            email: req.body.email,
            phonenumber: req.body.phonenumber,
            location: req.body.location,
            corporation_id: req.body.corporation_id,
            login_id: result._id,
        }
        const result2 = await userReg(reg).save()
        res.status(201).json({
            result: result2,
            message: 'Successfully Registered'
        })

    }
    catch(err){
        res.status(500).json({ message: 'Something Went Wrong'})
        console.log(error)
    }
})

userRouter.post('/register/volunteer', async (req,res) => {
    try{
        const userExists = await login.findOne({ email: req.body.email })
        if(userExists){
            return res.status(400).json({ message: 'email already registered'})
        }        
        
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        const oldPhone = await volunteerReg.findOne({ phone: req.body.phonenumber }) 
        if(oldPhone){
            return res.status(400).json({ message: 'phone number already exists '}) 
        }
        var log = {
            username: req.body.username,
            password: hashedPassword,
            role: req.body.role,
            status: req.body.status,
        }
        const result = await login(log).save()
        var reg = {
            username: req.body.username,
            name: req.body.username,name,
            address: req.body.address,
            email: req.body.email,
            phonenumber: req.body.phonenumber,
            location: req.body.location,
            corporation_id: req.body.corporation_id,
            login_id: result._id,
        }
        const result2 = await volunteerReg(reg).save()
        res.status(201).json({
            result: result2,
            message: 'Successfully Registered'
        })

    }
    catch(err){
        res.status(500).json({ message: 'Something Went Wrong'})
        console.log(err)
    }
})

userRouter.post('/login/user', async(req, res) => {
    try{
        const oldUserLog = await login.findOne({username: req.body.username})
        console.log(oldUserLog)
        if(!oldUserLog){
            return res.status(404).json({success:false, error: true,message:'user not found'})
        }
        const pass = await bcrypt.compare(req.body.password, oldUserLog.password)
        if(pass){
            var token = jwt.sign({loginID: oldUserLog._id, username: oldUserLog.username, role: oldUserLog.role}, 
                'tokenkey', 
                {
                    expiresIn:'1h'
                })
            return res.status(200).json({success:true, error: false, token})
        } 
        else{
            return res.status(400).json({success:false, error: true,message:'wrong password'}) 
        } 
       
    } 
        catch(error){
            res.status(404).json({ message: 'user not found' })
            console.log(error)
        }
})  

userRouter.post('/login/volunteer', async(req, res) => {
    try{
        const oldUserLog = await login.findOne({username: req.body.username})
        console.log(oldUserLog)
        if(!oldUserLog){
            return res.status(404).json({success:false, error: true,message:'volunteer not found'})
        }
        const pass = await bcrypt.compare(req.body.password, oldUserLog.password)
        if(pass){
            var token = jwt.sign({loginID: oldUserLog._id, username: oldUserLog.username, role: oldUserLog.role}, 
                'tokenkey', 
                {
                    expiresIn:'1h'
                })
            return res.status(200).json({success:true, error: false, token})
        } 
        else{
            return res.status(400).json({success:false, error: true,message:'wrong password'}) 
        } 
       
    } 
        catch(error){
            res.status(404).json({ message: 'volunteer not found' })
            console.log(error)
        }
})  



module.exports = userRouter