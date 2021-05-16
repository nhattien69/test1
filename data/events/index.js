'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');
const { response } = require('express');

const configSQL = {
    user: 'DuyBao',
    password: 'DuyBao123',
    server: 'localhost', 
    database: 'PROFILE_DB',
    port: 1435
};

sql.connect(configSQL, function (err) {

    if (err) console.log("err SQL", err);
    else {
        console.log("Connect Success");
    }
    
});

const authUser = async (data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const auth = await pool.request()
                                .input('email',sql.NVarChar(50),data.email)
                                .input('pass',sql.NVarChar(50),data.pass)
                                .query(sqlQueries.authUser);
        return auth.recordset;
    }catch (error) {
        return error.message;
    }
}

const authAdmin = async (data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const auth = await pool.request()
                                .input('adminUsername',sql.NVarChar(50),data.adminUsername)
                                .input('adminPass',sql.NVarChar(50),data.adminPass)
                                .query(sqlQueries.authAdmin);
        return auth.recordset;
    }catch (error) {
        return error.message;
    }
}


const authPartner = async (data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const auth = await pool.request()
                                .input('partnerUsername',sql.NVarChar(50),data.partnerUsername)
                                .input('partnerPass',sql.NVarChar(50),data.partnerPass)
                                .query(sqlQueries.authPartner);
        return auth.recordset;
    }catch (error) {
        return error.message;
    }
}

const getUser_Partner = async() => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const list = await pool.request().query(sqlQueries.listUser_Partner);
        return list.recordset;
    }catch (error) {
        return error.message;
    }
}

const getPartners = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const list = await pool.request().query(sqlQueries.listPartner);
        return list.recordset;
    }catch (error) {
        return error.message;
    }
}

const getUsers = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const list = await pool.request().query(sqlQueries.listUser);
        return list.recordset;
    }catch (error) {
        return error.message;
    }
}


const getUserById = async (userId) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const oneUser = await pool.request()
                        .input('userId',sql.NVarChar(50),userId)
                        .query(sqlQueries.userbyid);
        return oneUser.recordset;
    }catch (error) {
        return error.message;
    }
}

const createUser = async (userData) => {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const insertUser = await pool.request()
                            .input('email',sql.NVarChar(50), userData.email)
                            .input('pass', sql.NVarChar(50), userData.pass)
                            .query(sqlQueries.createUser);
        return insertUser.recordset;
}

const updateUser = async (userId,userData) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const update = await pool.request()
                        .input('userId',sql.Int,userId)
                        .input('email',sql.NVarChar(50),userData.email)
                        .input('pass', sql.NVarChar(50), userData.pass)
                        .input('fristName',sql.NVarChar(50),userData.fristName)
                        .input('lastName',sql.NVarChar(50),userData.lastName)
                        .input('userAddress',sql.NVarChar(50),userData.userAddress)
                        .input('cards',sql.NVarChar(50),userData.cards)
                        .query(sqlQueries.updateUser)
        return update.recordset;
    }catch (error) {
        return error.message;
    }
}

const deleteUser = async (userId) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const deleted = await pool.request()
                        .input('userId',sql.NVarChar(50),userId)
                        .query(sqlQueries.deleteUser);
        return deleted.recordset;
    }catch (error) {
        return error.message;
    }
}


module.exports = {
    getUsers,
    getUserById,
    getPartners,
    createUser,
    updateUser,
    deleteUser,
    authUser,
    authAdmin,
    authPartner,
    getUser_Partner
}