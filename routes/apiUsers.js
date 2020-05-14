const express = require('express');

var router = express.Router();

var userController = require('../controllers/userController');

/**
 * pedir todos os users
 */
router.get('/', userController.getAllUsers);

/**
 * Criar um user
 */
router.post("/add", userController.criarUser);

/**
 * procurar um user
 */
router.get('/getUser/:id', userController.getByIdUser);

/**
 * delete user
 */
router.delete('/deleteUser/:id', userController.deleteUser);

/**
 * update de um pedido
 */
router.post('/updateUser/:id', userController.updateUser);

module.exports = router;