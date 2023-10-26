const db = require('../models/index')
const {sequelize} = require('../config/db');
const {UnexpectedError , NotFound}= require('../utils/Error')
const standardResponse = require('../utils/standardResponse')
const {authenticate , registerOrder , requestPaymentKey} = require('../middleware/paymentIntegration') 

exports.createTransaction = async function (request, response, next) { 

    try {
        const {  amount } = request.body;
          /* // for front Test
      let token =await authenticate();
     
      const transaction = await db.Transaction.create({  amount:amount })
      await registerOrder (token , amount , transaction.id)
        response.status(201).json({ data :transaction  , message: 'create Transaction' });     
      
      */
        const transaction = await db.Transaction.create({  amount:amount  , userId:request.user.id })
         response.status(201).json({ data :transaction   , message: 'create Transaction' });     
      } catch (error) {
        console.log("🚀 ~ file: user.js:17 ~ error:", error)
        if (error.httpStatus == 400 ||error.httpStatus == 404) return next(error)
      return next(new UnexpectedError())
      }  
}

exports.payTransaction = async function (request, response, next) { 
    // console.log("🚀 ~ file: Transaction.js:10 ~ request:", request.user.id)
     try {
       const {  amount } = request.body;
       const Transaction = await db.Transaction.findOne({ where: { id:request.params.id  } }); 
      // const Transaction = await db.Transaction.findOne({ where: { id:request.params.id  , UserId: request.user.id } }); 
       let token =await authenticate();
       const orderId = await registerOrder (token , amount , Transaction.id)
       const paid =  await requestPaymentKey(token , amount ,orderId )

     const updatedTransaction = await db.Transaction.update({ status: 'success'} , { where: { id: request.params.id } })
         response.status(201).json({ data :updatedTransaction , paid  , message: 'pay Transaction' });     
       } catch (error) {
         console.log("🚀 ~ file: user.js:17 ~ error:", error)
         if (error.httpStatus == 400 ||error.httpStatus == 404) return next(error)
       return next(new UnexpectedError())
       }  
 }

exports.updateTransaction =  async function (request, response, next) { 
    try{
    const {id} = request.params 
    let  FieldsToUpdate = {};
    const {amount , status  , UserId} = request.body;
    FieldsToUpdate = amount ? { ...FieldsToUpdate, amount } : FieldsToUpdate
    FieldsToUpdate = status ? { ...FieldsToUpdate, status } : FieldsToUpdate
    FieldsToUpdate = UserId ? { ...FieldsToUpdate, UserId } : FieldsToUpdate
    const Transaction = await db.Transaction.findOne({ where: { id:id  } }); 
    if (Transaction == null) return next(new NotFound('Transaction')); 
    await Transaction.update(FieldsToUpdate)
    await Transaction.save()   
    response.status(201).json({ data :Transaction  , message: 'updated Transaction' });     
      } catch (error) {
        if (error.httpStatus == 400 ||error.httpStatus == 404) return next(error)
      return next(new UnexpectedError())
      }
    };

    exports.deleteTransaction= async (request, response , next) => {
        try {
          const Transaction =  await db.Transaction.findOne({ where: { id: request.params.id ,UserId: request.user.id } })
          if (Transaction == null) return next(new NotFound('Transaction'));
            await db.Transaction.destroy({ where: { id: Transaction.id } })
          return standardResponse.ok("deleted  ", undefined, response);
        } catch (error) {
          if (error.httpStatus == 404 ) return next(error)
          console.error(error);
          response.status(500).json({ message: 'Internal server error' });
        }
      };
      exports.getAllTransaction = async (request, response) => {
        try {
          let data = {}
          const Transaction =  await db.Transaction.findAll({ })
          data.Transaction = Transaction
          return standardResponse.ok("get all Transactions ", data, response);
        } catch (error) {
          console.error(error);
          response.status(500).json({ message: 'Internal server error' });
        }
      };
      exports.getAllTransactionById = async (request, response , next) => {
        try {
          let data = {}
          const Transaction =  await db.Transaction.findOne({ where: { id: request.params.id } })
          if (Transaction == null) return next(new NotFound('Transaction'));
          data.Transaction = Transaction
          return standardResponse.ok("get Transactions by id ", data, response);
        } catch (error) {
          if (error.httpStatus == 404 ) return next(error)
          console.error(error);
          response.status(500).json({ message: 'Internal server error' });
        }
      };