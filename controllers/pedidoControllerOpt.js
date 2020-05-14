var mongoose = require('mongoose');
var path = require('path');
var http = require('http');

let Pedido = require('../models/pedido');

var pedidoControllerOtp = {};


pedidoControllerOtp.getAll = function(req, res){
    var pedidos ="";
    var options = {
        hostname: 'localhost',
        port: 3000,
        path: '/pedidosV1/'
    };

    var p1 = new Promise(function(resolve, reject){
        var newReq = http.get(options, function(res){
            res.setEncoding('utf-8');
            res.on('data', function(d){
                pedidos += d;
                resolve();
            });
        });
        newReq.on('error', (error) => {
            res.redirect("/");
        });

    });
    p1.then(function() {
                res.render('../views/index', {
                    title: 'Saúde 24',
                    pedidos: JSON.parse(pedidos)
                });
        });
    };

    pedidoControllerOtp.getPediById = function(req, res){
        var pedido = "";

        var options = {
            hostname: 'localhost',
            port: 3000,
            path:'/pedidosV1/getPedido/' + req.params.id,
        }

        var p1 = new Promise(function(resolve, reject){
            var newReq = http.get(options, function(res){
                res.setEncoding('utf-8');
                res.on('data', function(d){
                    pedido += d;
                    resolve();
                });
            });
        });
            
            p1.then(function(){
                if(JSON.parse(pedido)==null){
                    res.redirect('/');
                } else {
                    res.render('../views/pedido', {
                        pedido: JSON.parse(pedido)
                    });
                }
            });
    };

    pedidoControllerOtp.delete = function(req, res){
        var pedido;
        var options = {
            hostname: 'localhost',
            port: 3000,
            path: '/pedidosV1/deletePedido/'+ req.params.id,
            method: 'DELETE',
        };

        var p1 = new Promise(function(resolve, reject){
            var newReq = http.request(options,(res) =>{
                res.setEncoding('utf-8');
                res.on('data', (d) =>{
                    pedido = JSON.parse(d);
                    resolve();
                });
            });
            newReq.on('error', (error) => {
                res.redirect('/');
            });
            newReq.end();
        });
        
        p1.then(function(){
            if(pedido.deletedCount!=0){
                res.redirect('/');
            } else {
                res.redirect('/');
            }
        });
    };

    pedidoControllerOtp.addform = function(req, res){
        res.render('../views/add_pedido', {
            title: 'Adicionar Pedido'
        });
    }

    pedidoControllerOtp.adicionar = function(req, res){
       var pedidoCrea = {
           titulo: req.body.titulo,
           user: req.body.user,
           info: req.body.info
       };

       var details = JSON.stringify(pedidoCrea);

       var options = {
           hostname: 'localhost',
           port: 3000,
           path: '/pedidosV1/add',
           method: 'POST',
           headers: {
               "Content-Type": "application/json",
               'Content-Length': details.length
           }
       };
    var pedido;
    var p1 = new Promise(function(resolve, reject){
        var newReq = http.request(options, (res) => {
            res.setEncoding('utf-8');

            res.on('data', (d) => {
                pedido = d;
                resolve();
            });
        });
        newReq.on('error', (error) => {
            console.log(error);
        });
        newReq.write(details);
        newReq.end();
    });
    p1.then(function(){
        res.redirect('/');
    });
};

pedidoControllerOtp.update = function(req, res){
    var pedidoCrea = {
        titulo: req.body.titulo,
        user: req.body.user,
        info: req.body.info
    };

    var details = JSON.stringify(pedidoCrea);

    var options = {
        hostname: 'localhost',
        port: 3000,
        path: '/pedidosV1/updatePedido/' + req.params.id,
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Content-Length': details.length
        }
    };
 var pedido;
 var p1 = new Promise(function(resolve, reject){
     var newReq = http.request(options, (res) => {
         res.setEncoding('utf-8');

         res.on('data', (d) => {
             pedido = d;
             resolve();
         });
     });
     newReq.on('error', (error) => {
         console.log(error);
         reject();
     });
     newReq.write(details);
     newReq.end();
 });
 p1.then(function(){
     res.redirect('/');
 });
};

pedidoControllerOtp.renderUpdate = function(req, res){
    var pedido = "";

    var options = {
        hostname: 'localhost',
        port: 3000,
        path:'/pedidosV1/getPedido/' + req.params.id,
    }

    var p1 = new Promise(function(resolve, reject){
        var newReq = http.get(options, function(res){
            res.setEncoding('utf-8');
            res.on('data', function(d){
                pedido += d;
                resolve();
            });
        });
    });
        
        p1.then(function(){
            if(JSON.parse(pedido)==null){
                res.redirect('/');
            } else {
                res.render('../views/update_pedido', {
                    title: 'Editar Pedido',
                    pedido: JSON.parse(pedido)
                });
            }
        });
};



    module.exports = pedidoControllerOtp;