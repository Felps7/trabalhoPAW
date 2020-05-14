const mongoose = require('mongoose');
var Pedido = require("../models/pedido");

var pedidoController = {};

/**
 * Criar um pedido
 */
pedidoController.createPedido = function(req, res, next){
    var pedido = new Pedido(req.body);

    pedido.save(function(err){
        if(err){
            next(err);
        } else {
            res.json(pedido);
        }
    });
};

/**
 * Apagar um pedido 
 */
pedidoController.deletePedido = function(req, res, next){
    Pedido.deleteOne({_id: req.params.id}, function(err, result){
        if(err){
            next(err);
        } else {
            res.json(result);
        }
    });
};

/**
 * Todos os pedidos
 */
pedidoController.getAllPedidos = function(req, res, next){
    Pedido.find(function(err, pedidos){
        if(err){
            next(err);
        } else {
            res.json(pedidos);
        }
    });
};

/**
 * Pedir um pedido
 */

pedidoController.getByIdPedido = function (req, res, next) {
    Pedido.findById(req.params.id, function (err, pedido) {
        if (err) {
            next(err);
        } else {
            res.json(pedido);
        }
    });
};

/**
 * Update pedido
 */
pedidoController.updatePedido = function(req, res){
    Pedido.findByIdAndUpdate(req.params.id, {
        $set: {
            titulo: req.body.titulo, user: req.body.user, info: req.body.info
        }
    }, {new: true}, function(err, ped){
        if(err){
            res.json(err);
        }
        res.json(ped);
    });
};

module.exports = pedidoController;