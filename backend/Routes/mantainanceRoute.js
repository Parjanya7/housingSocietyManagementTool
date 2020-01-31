const express = require('express');
const houseModel = require('../Models/houseModel');

const router = express.Router();

router.post('/detailsById', ( req, res ) => {

    console.log( req.body );
    houseModel.findOne({ houseNo: req.body.houseNo }, {Payment: 1, _id: 0}, ( err, docs ) => {

        if( docs.Payment.total === undefined ) {

            res.json({ Payment: 0 });
        }
        else {
            
            res.json({ Payment: docs.Payment });
        }        
    });
});

router.post('/updatePayment', ( req, res ) => {

    console.log(req.body);
    
    houseModel.findOne({ houseNo: req.body.houseNo }, ( err, docs ) => {

        docs.Payment.total = req.body.total;
        if( req.body.man ) docs.Payment.man = req.body.man;
        if( req.body.park ) docs.Payment.park = req.body.park;
        if( req.body.fest ) docs.Payment.fest = req.body.fest;
        if( req.body.other ) docs.Payment.other = req.body.other;
        
        docs.save( err => {
    
            if(err)
                console.log(err);
            else 
                res.json({ msg: 'Payment Details Updated.'});
        });
    });
});

module.exports = router;