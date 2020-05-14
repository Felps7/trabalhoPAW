var express = require('express');

var router = express.Router();

var pedidoController = require("../controllers/pedidoController");

/**
 * pedir todos os pedidos
 */
router.get('/', pedidoController.getAllPedidos);

/**
 * Criar um pedido
 */
router.post("/add", pedidoController.createPedido);

/**
 * procurar um pedido
 */
router.get('/getPedido/:id', pedidoController.getByIdPedido);

/**
 * delete pedido
 */
router.delete('/deletePedido/:id', pedidoController.deletePedido);

/**
 * update de um pedido
 */
router.post('/updatePedido/:id', pedidoController.updatePedido);

module.exports = router;