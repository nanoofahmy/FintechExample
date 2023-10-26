const express = require('express');
const router = express.Router();

const user = require('./users')
router.use('/user', user)

const Transaction = require('./Transaction')
router.use('/Transaction', Transaction)




module.exports = router