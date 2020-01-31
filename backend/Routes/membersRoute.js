const express = require('express');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const memberDetailsModel = require('../Models/memberDetailsModel');

const router = express.Router();

router.use( fileUpload());

//CONNECT
router.get( '/connect', ( req, res ) => {

    memberDetailsModel.findOne({}).sort({_id:-1}).limit(1).exec( ( err , docs ) => {
        
        if(err) 
            console.log(err);
        else{
            
            if( docs == null || docs.ID === undefined ) 
                res.json({ ID : 1});
            else 
                res.json({ ID : (docs.ID + 1) });
        }
    });
});

//GET DATA BY NAME
router.post('/getDataByName' , ( req, res ) => {

    memberDetailsModel.findOne( { ID : req.body.ID }, ( err, docs ) => {

        if(!err)
            res.json( docs );
        else
            res.json( err );
    });
});


//FIND BY NAME
router.post( '/findByName', ( req, res ) => {

    let pattern = `/^${req.body.keyWord}/`;

    memberDetailsModel.find({ Name : { $regex: req.body.keyWord, $options : 'i' } }, { Name : 1, ID : 1, _id : 0 },( err, docs) =>{
        
        if(!err)
            res.json( docs );
        else 
            res.json( err );
    });
});

//INSERT
router.post( '/insert', ( req, res ) => {
    
    let insertVar = new memberDetailsModel();

    console.log( req.files );

    insertVar.ID = req.body.ID;
    insertVar.Name = req.body.Name;
    insertVar.Birthdate = req.body.Bday;
    insertVar.BloodGroup = req.body.BG;
    insertVar.MobileNo = req.body.Mobile;
    insertVar.AadharCardNo = req.body.Aadhar;
    insertVar.PAN = req.body.PAN;    
    insertVar.Licence = req.body.Lic;
    insertVar.VotingNo = req.body.Vot;
    insertVar.PassportNo = req.body.Pass;
    insertVar.Address = req.body.Addr;
    insertVar.PostalCode = req.body.Postal;
    insertVar.City = req.body.City;
    insertVar.Dist = req.body.Dist;
    insertVar.State = req.body.State;
    insertVar.PhoneNo = req.body.Phone;

    if( req.files !== null ) {

        console.log( req.files );
        let thePath = `${__dirname}\\${req.files.image.name}`;
        req.files.image.mv( thePath );

        fs.readFile( thePath, ( err, data ) => {
                
            if(!err)
                insertVar.img = data;
            
            insertVar.save( err => {

                if( err ) 
                    res.json( err );
                else{
                    res.json({ ID : req.body.ID, Name: req.body.Name });
                    console.log( `New Record Created.`);
                };
            });
        });
    }
    else 
        insertVar.save( err => {

            if(err)
                res.json( err );
            else {

                res.json({ ID: req.body.ID, Name: req.body.Name });
                console.log('Record Created.');
            }
        });
});

//DELETE
router.post( '/delete', ( req, res ) => {

    memberDetailsModel.deleteOne( { ID : req.body.Id } , ( err, docs ) => {

        if(!err) {
            console.log( docs );
            res.json( req.body.Id );
        }
        else
            res.json( err );
    });
});

//FIND
router.post('/find', ( req, res ) => {

    memberDetailsModel.findOne( { ID : req.body.Id }, ( err, docs ) => {

        if(!err)
            res.json( docs );
        else 
            res.json( err );
    });
});

//UPDATE
router.post('/update' , ( req, res ) => {

    console.log( req.body.ID );
    console.log( req.files ); 

    if( req.files !== null ) {

        memberDetailsModel.findOne({ ID: req.body.ID }, ( err, docs ) => {
            
            docs.Name = req.body.Name;
            docs.Birthdate = req.body.Bday; 
            docs.BloodGroup = req.body.BG;
            docs.MobileNo = req.body.Mobile;
            docs.AadharCardNo = req.body.Aadhar;
            docs.PAN = req.body.PAN;
            docs.Licence = req.body.Lic;
            docs.VotingNo = req.body.Vot;
            docs.PassportNo = req.body.Pass;
            docs.Address = req.body.Addr;
            docs.PostalCode = req.body.Postal;
            docs.City = req.body.City;
            docs.Dist = req.body.Dist;
            docs.State = req.body.State;
            docs.PhoneNo = req.body.Phone;
    
            let thePath = `${__dirname}\\${req.files.image.name}`;
            req.files.image.mv( thePath );
        
            fs.readFile( thePath, ( err, data ) => {
                    
                docs.img = data;
                docs.save();
                res.json({ ID : req.body.ID });
            });
        });
    }

    else {

        memberDetailsModel.findOne({ ID: req.body.ID }, ( err, docs ) => {
            
            docs.Name = req.body.Name;
            docs.Birthdate = req.body.Bday; 
            docs.BloodGroup = req.body.BG;
            docs.MobileNo = req.body.Mobile;
            docs.AadharCardNo = req.body.Aadhar;
            docs.PAN = req.body.PAN;
            docs.Licence = req.body.Lic;
            docs.VotingNo = req.body.Vot;
            docs.PassportNo = req.body.Pass;
            docs.Address = req.body.Addr;
            docs.PostalCode = req.body.Postal;
            docs.City = req.body.City;
            docs.Dist = req.body.Dist;
            docs.State = req.body.State;
            docs.PhoneNo = req.body.Phone;
            docs.img = '';
            docs.save();
            res.json({ ID : req.body.ID });
            
        });        
    }
});


module.exports = router;