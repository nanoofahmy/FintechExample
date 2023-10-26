
const express = require('express');
const router = express.Router();
const  authenticateUser = require('../middleware/authenticate');
const controller = require('../controllers/Transaction')


router.post('/createTRX' , controller.createTransaction)
router.put('/updateTRX/:id(\\d*)?', authenticateUser ,controller.updateTransaction);
router.delete('/deleteTRX/:id(\\d*)?', authenticateUser ,controller.deleteTransaction);
router.get('/getTrxByID/:id(\\d*)?'  ,controller.getAllTransactionById)
router.get('/getAllTRX' ,authenticateUser ,controller.getAllTransaction);
router.put('/payTrxByID/:id(\\d*)?'  ,controller.payTransaction);


 module.exports = router