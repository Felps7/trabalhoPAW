let mongoose = require('mongoose');

//Pedido Schema
let pedidoSchema = mongoose.Schema({
    titulo:{
        type: String,
        required: true
    },
    user:{
        type: String,
        required: true
    },
    info:{
        type: String,
        required: true
    }
});

let Pedido = module.exports = mongoose.model('Pedido', pedidoSchema);
