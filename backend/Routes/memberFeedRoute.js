const express = require('express');
const meetingModel = require('../Models/meetingModel');

const router = express.Router();

router.get('/feed', ( req, res ) => {

    meetingModel.find( {}, { _id: 0}).sort({_id:-1}).exec( (err, docs)  => {

        console.log( docs );
        if( err )
            res.json({ error: err });
        else
            res.json(docs);
    });
});

module.exports = router;