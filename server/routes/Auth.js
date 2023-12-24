const express = require('express');
const router = express.Router();
const {User} = require('../models');
const { log } = require('console');
require('dotenv').config();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const salt = process.env.SALT || 10;
const secret = process.env.SECRET_KEY;
// sign up router
router.post('/signup',async (req,res) =>{
    const user = req.body;
    let cryptedPassword;
    
    bcrypt.hash(user.password,10).then(async (response) => {
        cryptedPassword = response 
        const newUser ={
            id:user.id,
            username:user.username, 
            email:user.email,
            password : cryptedPassword}
            try{
                const existUser = await User.findOne({
                  where: {
                      email: user.email 
                     } })
                     if(!existUser){
                        await User.create(newUser)
                        log(newUser) 
                        res.json(newUser);
                        log(cryptedPassword)
                        res.json(newUser)
                    }else{
                        res.send('user already exists') 
                    }
                    }catch(err){
                        log(err)
                    }  
                     
        
                })
    .catch(err => log(err))
    
   
})

// log in router
router.post('/signin',async (req,res) =>{
    let existUser;
    const user = req.body;
    try{
       existUser = await User.findOne({
         where: {
             email: user.email 
            } })
        if (!existUser) {
                return res.status(404).json({ message: 'User not found' });
        }
        bcrypt.compare(user.password , existUser.password)
        .then(
            (response) =>{
                if(response){
                    const token = jwt.sign(user, secret, { expiresIn: '300h' });
                    //localStorage.setItem('token',token)
                    res.json({message : "succefull sign in " , token:token})
                }else{
                    res.status(404).json({message : 'Invalide Cridentials'})
                }
            }
        ).catch(err => log(err))
    }catch(err){
        log(err)
    }
    
})

module.exports = router