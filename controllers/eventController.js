'use strict';

const { response } = require('express');
const eventData = require('../data/events');
const { loginValidation } = require('../validate');
const jwt = require('jsonwebtoken')

function verifyJwtToken(token, secretKey){
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return reject(err);
        }
        resolve(decoded);
        });
    });
} 

const authUser = async (req, res, next) => {
    try{
        const data = req.body;
        const auth = await eventData.authUser(data);
        if (auth != 0)
        {
            const token = jwt.sign({auth}, "secretkey", {
                expiresIn: 900
            });
            const refreshToken = jwt.sign({auth}, "refreshsecretkey", {
                expiresIn: 864000
              });                   
            const response = {
                data,
                token,
                refreshToken
            }
            res.json(response);
        }
        else return res.send("Login fail")

    }catch (error) {
        res.status(400).send(error.message);
    }
}

const refToken = async (req, res, next) => {
    const { refreshToken } = req.body;
    if(refreshToken){
        try{
            const data = await verifyJwtToken(refreshToken,"refreshsecretkey")
            const token = jwt.sign({data}, "secretkey", {
                expiresIn: 900
            })          
            const response = {
                newtoken: token,
            }
            res.send(response)
        }catch(err){
            res.send({result: -1, errMsg: 'Invalid refresh token', err: err})
        }
    }else{
        res.send({result: -1, errMsg: 'Invalid Invalid request', err: err})
    }
}

const authAdmin = async (req, res, next) => {
    try{
        const data = req.body;
        const auth = await eventData.authAdmin(data);
        const partner = await eventData.getPartners();
        const user = await eventData.getUsers();
        if (auth != 0)
        {
            const token = jwt.sign({auth,partner,user}, "secretkey", {
                expiresIn: 259200
              });                   
              const response = {
                data,
                token
              }
              res.json(response);
        }
        else return res.send("Login fail")
    }catch (error) {
        res.status(400).send(error.message);
    }
}


const authPartner = async (req, res, next) => {
    try{
        const data = req.body;
        const rolePartner = await eventData.authPartner(data);
        const user = await eventData.getUser_Partner();
        if (rolePartner != 0)
        {
            const token = jwt.sign({user,rolePartner}, "secretkey", {
                expiresIn: 259200
              });
              const response = {
                data,
                token
              }
              res.json(response);
        }
        else return res.send("Login fail")

    }catch (error) {
        res.status(400).send(error.message);
    }
}


const getUsers = async (req, res, next) => {
    try{
        const events = await eventData.getUsers();
        res.send({
            Users: events
        });
        
    }catch (error) {
        res.status(400).send(error.message);
    }
}


const getOneUser = async (req,res,next) => {
    try{
        const id = req.params.id;
        const oneuser = await eventData.getUserById(id);
        if (oneuser != 0 && req.params.id) return res.send(oneuser);
        else if (req.params.id == null) res.send("not found");
        else return res.send("not found");
    }catch (error) {
        res.status(400).send(error.message);
    }
}

const addUser = async (req, res, next) => {
    try{
        const data = req.body;
        const email = req.body.email
        if(email=="") return res.status(404).send("Email can not be null")
        const pass = req.body.pass
        if(pass=="") return res.status(404).send("Password can not be null")
        const created = await eventData.createUser(data);
         return res.send(created);
    }catch (error) {
        res.status(404).send("Fail to create user, check if Email is being used");
    }
}

const updateUser = async (req, res, next) => {
    try{
        const userId = req.params.id;
        const data = req.body;
        const pass = req.body.pass
        if(pass=="") return res.status(404).send("Password can not be null")
        const updated = await eventData.updateUser(userId,data);
        res.send(updated);
    }catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteUser = async (req, res, next) => {
    try{
        const userId = req.params.id;
        const deleted = await eventData.deleteUser(userId);
        if(deleted==0) return res.send("Delete success");
        else return res.send("Id user not exist");
    }catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    getUsers,
    getOneUser,
    addUser,
    updateUser,
    deleteUser,
    authUser,
    authAdmin,
    authPartner,
    refToken
}