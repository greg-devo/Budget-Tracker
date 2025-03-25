const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.get('/', transactionController.renderHome);

router.get('/transactions', transactionController.renderTransactions);

router.get('/add', transactionController.renderAddTransaction);
router.post('/add', transactionController.addTransaction);

router.get('/edit/:id', transactionController.renderEditTransaction);
router.post('/edit/:id', transactionController.updateTransaction);

router.get('/delete/:id', transactionController.deleteTransaction);

module.exports = router;
