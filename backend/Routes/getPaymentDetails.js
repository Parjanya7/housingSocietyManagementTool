const express = require('express');
const memberModel = require('../Models/memberModel');
const houseModel = require('../Models/houseModel');

const router = express.Router();

router.post('/', ( req, res ) => {

    console.log(req.body);
    memberModel.findOne({ UserName: req.body.user }, { HouseNo: 1}, ( err, docs) => {

        houseModel.findOne({ houseNo: docs.HouseNo }, { Payment: 1, _id: -1 }, ( err, docs ) => {

            console.log( docs );
            if( docs.Payment.total === undefined ) {

                res.json({ Payment: 0 });
            }
            else {
                
                res.json({ Payment: docs.Payment });
            }
        });
    });
});

module.exports = router;