const express = require("express");
const db = require("../db");
const utils = require("../utils");



const router = express.Router();

router.get('/',(request,response)=>{
    const statement=`select * from bookings;`
    db.pool.query(statement,(error,bookings)=>{
        response.send(utils.createResult(error,bookings))
    })
})

router.post('/' ,(request, response)=> {
    const { propertyId, total, fromDate, toDate } = request.body;
    const statement = `insert into bookings (userId,propertyId,total, fromDate,toDate) values (?,?,?,?,?);`
    db.pool.execute(
      statement,
      [request.userId, propertyId, total, fromDate, toDate],
      (error, bookings) => {
        response.send(utils.createResult(error, bookings));
      }
    )

})




module.exports=router