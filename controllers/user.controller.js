const db            = require("../models");
const User          = db.user;
const Role          = db.role;
const Op            = db.Sequelize.Op;
const bcrypt        = require("bcryptjs");
const Sequelize     = require("sequelize");

exports.addUser = async(req, res) => {
    try {
        User.create({
            fullname    : req.body.fullname,
            username    : req.body.username,
            email       : req.body.email,
            active      : req.body.active,
            roleId     : req.body.roleId,
            createdBy  : req.createdBy,
            password    : bcrypt.hashSync(req.body.password , 8),
        })
        .then(user => {
            res.status(200);
            res.send({ 
                message: "User registered successfully !" ,
                statusCode: 200,
            });
        })
        .catch(err => {
            res.status(500);
            res.send({ 
                message: err.message ,
                statusCode: 500,
            });
        });
    } catch (error) {
        res.status(500);
        res.send({ 
            message: error.message ,
            statusCode: 500,
        });
    }
};

exports.deleteUser = async(req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({ where: {id : id} });
        if(user){
            await user.destroy()
            .then(user => {
                res.status(200);
                res.send({ 
                    message: 'User successfully deleted !',
                    statusCode: 200,
                });
            })
            .catch(err => {
                res.status(500);
                res.send({ 
                    message: err.message ,
                    statusCode: 500,
                });
            });
        }
        else{
            res.status(400);
            res.send({
                message : 'User not found !',
                statusCode: 400,
            });
        }
    } catch (error) {
        res.status(500);
        res.send({ 
            message: error.message ,
            statusCode: 500,
        });
    }
};

exports.updateUser = async(req, res) => {
    try {
        const id    = req.params.id;
        const user = await User.findOne({ where: {id : id} });
        if(user){
            if(req.body.password){req.body.password = bcrypt.hashSync(req.body.password, 8)}
            await user.update(req.body, {
                where: {
                    id: id,
                },
            })
            .then(user => {
                res.status(200);
                res.send({
                    message: 'User updated successfully !',
                    statusCode: 200
                });
            })
            .catch(err => {
                res.status(500);
                res.send({ 
                    message: err.message ,
                    statusCode: 500,
                });
            });
        }
        else{
            res.status(400);
            res.send({
                message : 'User not found !',
                statusCode: 400,
            });
        }
    } catch (error) {
        res.status(500);
        res.send({ 
            message: error.message ,
            statusCode: 500,
        });
    }
};

exports.usersList = async(req, res) => {
    try {
        var draw        = req.body.draw;
        var start       = req.body.start;
        var length      = req.body.length;
        var orderData   = req.body.order;

        if(typeof orderData == 'undefined')
        {
            var column = 'id';
            var columnSort_order = 'desc';
        }
        else
        {
            var columnIndex = req.body.order[0]['column'];
            var column = req.body.columns[columnIndex]['data'];
            var columnSort_order = req.body.order[0]['dir'];
        }
        var searchTerm  = req.body.search['value'];
        var whereClause  = {
            [Op.or]: [
                { username: { [Op.like]: `%${searchTerm}%` } },
                { fullname: { [Op.like]: `%${searchTerm}%` } }
            ]
        };

        /* Total number of records without filtering */
        var totalRecords = await User.count();

        /* Total number of records with filtering */
        var totalRecords_filter = await User.count({
            where : whereClause,
        });

        var data = await User.findAll({
            where : whereClause,
            include: [
                {model: db.user , as: 'creator', attributes:['id' , 'fullname' , 'username']} , 
            ],
            order: [
                [column , columnSort_order],
            ],
            offset: parseInt(start), 
            limit: parseInt(length),
        });

        var dataObj = [];
        data.forEach(function(row){
            dataObj.push({
                'id'        : row.id,
                'fullname'  : row.fullname,
                'username'  : row.username,
                'email'     : row.email,
                'active'    : row.active,
                'creator'   : row.creator,
            });
        });

        var output = {
            'draw' : draw,
            'iTotalRecords' : totalRecords,
            'iTotalDisplayRecords' : totalRecords_filter,
            'aaData' : dataObj
        };
        res.json(output);
    } 
    catch (error) {
        res.send({ 
            message: error.message ,
            statusCode: 500,
        });
    }
};

exports.getUser = async(req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findOne({
            attributes: ['id', 'fullname' , 'username' , 'email' , 'active' , 'createdAt'],
            where: {id : id} , 
            include: [
                {model: db.user , as: 'creator', attributes:['id' , 'fullname' , 'username']} , 
                {model: db.role , as: 'role' , attributes:['id' , 'name']} , 
            ],
        });
        if(user){
            res.status(200);
            res.send({
                data: user,
                statusCode: 200,
            });
        }
        else{
            res.status(400);
            res.send({
                message: "User not found !",
                statusCode: 200,
            });
        }
    } catch (error) {
        res.status(500);
        res.send({ 
            message: error.message ,
            statusCode: 500,
        });
    }
};

exports.usersCount = async(req, res) => {
    try {
        var count = await User.count();
        res.status(200);
        res.send({ 
            data: count ,
            statusCode: 200,
        });
    } catch (error) {
        res.status(500);
        res.send({ 
            message: error.message ,
            statusCode: 500,
        });
    }
};