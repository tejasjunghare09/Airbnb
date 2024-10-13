const express = require("express");
const db = require("../db");
const utils = require("../utils");
const router = express.Router();

router.post("/", (request, response) => {
  const {
    categoryId,
    title,
    details,
    address,
    contactNo,
    ownerName,
    isLakeView,
    isTV,
    isAC,
    isWifi,
    isMiniBar,
    isBreakfast,
    isParking,
    guests,
    bedrooms,
    beds,
    bathrooms,
    rent,
    profileImage,
    createdTimestamp,
  } = request.body;

  const query = `insert into property (categoryId,title,details,address,contactNo,ownerName,isLakeView,isTV,isAC,isWifi,isMiniBar,isBreakfast,isParking,guests,bedrooms,beds,bathrooms,rent) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

  db.pool.execute(query, [
    1,
    title,
    details,
    address,
    contactNo,
    ownerName,
    isLakeView,
    isTV,
    isAC,
    isWifi,
    isMiniBar,
    isBreakfast,
    isParking,
    guests,
    bedrooms,
    beds,
    bathrooms,
    rent,
  ],
    (error, result) => {
      response.send(utils.createResult(error, result));
    }
)
})


router.get('/',(request,response)=>{
    const statement=`select id ,title,details,rent,profileImage from property;`
    db.pool.query(statement,(error,properties)=>{
        response.send(utils.createResult(error,properties))
    })
})
//success
router.get('/details/:id', (request, response) => {
  const {id}=request.params
    const statement = `select * from property where id = ?;`
  db.pool.query(statement,[id], (error, properties) => {
    response.send(utils.createResult(error, properties));
  });
});


module.exports = router;
