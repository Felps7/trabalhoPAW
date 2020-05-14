const mongoose = require('mongoose');
const User = require('../models/user');

var userController={};

/**
 * Criar User
 */
userController.criarUser = function(req, res, next){
    var user = new User(req.body);

    user.save(function(err){
        if(err){
            next(err);
        } else {
            res.json(user);
        }
    });
};

/**
 * Apagar um user
 */
userController.deleteUser = function(req, res, next){
    User.deleteOne({_id: req.params.id}, function(err, result){
        if(err){
            next(err);
        } else {
            res.json(result);
        }
    });
};

/**
 * Todos os users
 */
userController.getAllUsers = function(req, res, next){
    User.find(function(err, users){
        if(err){
            next(err);
        } else {
            res.json(users);
        }
    });
};

/**
 * User em específico
 */
userController.getByIdUser = function (req, res, next) {
    User.findById(req.params.id, function (err, user) {
        if (err) {
            next(err);
        } else {
            res.json(user);
        }
    });
};

/**
 * Update user
 */
userController.updateUser = function(req, res){
    User.findByIdAndUpdate(req.params.id, {
        $set: {
            username: req.body.username,
            password: req.body.password,
            localizacao: req.body.localizacao,
            nomeCompleto: req.body.nomeCompleto,
            NIF: req.body.NIF,
            tipoU: req.body.tipoU
        }
    }, {new: true}, function(err, us){
        if(err){
            res.json(err);
        }
        res.json(us);
    });
};

module.exports = userController;
