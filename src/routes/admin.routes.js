// const app = require("express").Router();


// const con = require("../Model/databaseCon/conDb");
// const maseterTokenVerify = require("../middleware/tokenMaster&admin");

// ////////////////////////////////////////// SHIPMENT GET//////////////////////////////////////////////////////

// app.get('/get/shipment', maseterTokenVerify, (req, res) => {
//     con.execute(`SELECT 
//                 shipment.shipment_id , 
//                 shipment.type , 
//                 shipment.addressFrom, 
//                 shipment.adressTo,
//                 shipment.shipmentState,
//                 shipment.dateFrom,
//                 shipment.dateTo,
//                 shipment.receiverNumber,
//                 shipment.price,
//                 quickuser.name,
//                 quickuser.phoneNum
//                 FROM  shipment INNER JOIN quickuser ON shipment.user_Id = quickuser.id;`, (err, data) => {
//         if (err) {
//             throw err
//         } else {
//             console.log(data) ;
//             console.log("-_-----------------") ; 
//             res.send(data);
//         }
//     })
// });



// ////////////////////////////////////////// SHIPMENT DELETE//////////////////////////////////////////////////////


// app.delete('/delete/shipment/:shipmentID', maseterTokenVerify, (req, res) => {
//     const shipmentID = req.params.shipmentID;

//     console.log(`the id of the user is ++++++++++++++++ ${shipmentID} ++++++++++++++++`);
  
//     if(shipmentID !== undefined && shipmentID!==null && typeof(shipmentID)=="string"){
//         con.execute(`DELETE FROM shipment WHERE shipment_id = ${shipmentID}`, (err) => {
//             if (err) {
//                 res.send(err);
//             }
//         })
//         res.send("deleted successfully");
//     }else{
//         res.send("SOMETHING WENT WRONG");
//     }

// });




// ////////////////////////////////////////// GET ALL SHIPMENTS USING SEARCH//////////////////////////////////////////////////////

// app.post('/search/shipment', (req, res) => {
  
//       let {input} = req.body;
//       console.log(input) ; 
//          if(input===undefined || input===null){
//              input = "" ; 
//          }
//          if (input !== undefined) {
//         con.execute(`SELECT 
//                     shipment.shipment_id , 
//                     shipment.type , 
//                     shipment.addressFrom, 
//                     shipment.adressTo,
//                     shipment.shipmentState,
//                     shipment.dateFrom,
//                     shipment.dateTo,
//                     shipment.receiverNumber,
//                     shipment.price,
//                     quickuser.name,
//                     quickuser.phoneNum
//                     FROM shipment INNER JOIN quickuser 
//                     ON shipment.user_Id = quickuser.id 
//                     WHERE 
//                     shipment.type LIKE '%${input}%' 
//                     OR shipment.type LIKE '%${input}%'
//                     OR shipment.addressFrom LIKE '%${input}%'
//                     OR shipment.adressTo LIKE '%${input}%'
//                     OR quickuser.name LIKE '%${input}%'
//                     OR quickuser.phoneNum LIKE '%${input}%'
//                     OR shipment.shipment_id LIKE '%${input}%'
//                     OR shipment.shipmentState LIKE '%${input}%';`
//                     , (err, data) => {
//             if (err) {
//                 throw err
//             } else {
//                 res.send(data);
//             }
//         })
//     }else{
//         res.send("input is undefined");
//     }


// });


// ////////////////////////////////////////// SHIPMENT  State//////////////////////////////////////////////////////

// app.post('/update/shipmentState', maseterTokenVerify, (req, res) => {
//     const { shipmentState, shipmentID } = req.body;
//     con.execute(`UPDATE shipment SET shipmentState='${shipmentState}' WHERE shipment_id=${shipmentID}`);

//     res.send({ message: "shipment state updated successfully" });
// });











// module.exports = app;