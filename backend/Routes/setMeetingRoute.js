const express = require('express');
const meetingModel = require('../Models/meetingModel');

const router = express.Router();

router.post('/', ( req, res ) => {

    let meetings = '';
    let notices = '';

    if( req.body.Meetings !== '' && req.body.Notices !== '' ) {

        meetings = req.body.Meetings;
        notices = req.body.Notices;
    }   
    else if( req.body.Notices === '' )
        meetings = req.body.Meetings;
    else
        notices = req.body.Notices;

    let insertVar = new meetingModel();

    if( meetings )
        insertVar.Meeting = meetings;
    if( notices )
        insertVar.Notice = notices;

    insertVar.save( err => {

        if( err )
            console.log(err);
        else 
            res.json({ msg: 'Updates SuccesFull Posted.' });
    });
});

module.exports = router;