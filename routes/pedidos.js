var express = require('express');
var router = express.Router();
var pedidosContrll = require('../controllers/pedidoControllerOpt');

/* GET home page */
router.get('/', pedidosContrll.getAll);

/* Apresentar pedido */
router.get('/getPedidos/:id', pedidosContrll.getPediById);

/* Delete pedido*/
router.post('/deletePedido/:id', pedidosContrll.delete);

/*Create pedido*/
router.post('/pedidos/add', pedidosContrll.adicionar);

/*Add form render*/
router.get('/pedidos/addForm', pedidosContrll.addform);

/*Update form render*/
router.get('/pedido/update/:id', pedidosContrll.renderUpdate);

/*Update de um pedido*/
router.post('/updatePedido/:id', pedidosContrll.update);

module.exports = router;
