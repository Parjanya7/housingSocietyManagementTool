const express = require('express');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const houseModel = require('../Models/houseModel');

const router = express.Router();

router.use( fileUpload() );

router.get('/connect', ( req, res ) => {
    
    houseModel.findOne({}).sort({_id:-1}).limit(1).exec( ( err , docs ) => {
        
        if(err) 
            console.log(err);
        else{
            
            if( docs == null || docs.houseNo === undefined ) 
                res.json({ ID : 1});
            else 
                res.json({ ID : (docs.houseNo + 1) });
        }
    });
});

router.post('/findByName', ( req, res ) => {

    let pattern = `/^${req.body.keyWord}/`;

    houseModel.find({ houseName : { $regex: req.body.keyWord, $options : 'i' } }, { houseName : 1, houseNo : 1, _id : 0 },( err, docs ) =>{
        
        if(!err)
            res.json( docs );
        else 
            res.json( err );
    });
});

router.post('/getDataByName' , ( req, res ) => {

    houseModel.findOne( { houseNo : req.body.ID }, ( err, docs ) => {

        if(!err)
            res.json( docs );
        else
            res.json( err );
    });
});

// INSERT
router.post( '/insert', ( req, res ) => {
    
    let insertVar = new houseModel();

    console.log( req.files );

    insertVar.houseNo = req.body.ID;
    insertVar.houseName = req.body.Name;
    insertVar.MobileNo = req.body.Mobile;
    insertVar.Address = req.body.Addr;
    insertVar.phCode = req.body.phCode;
    insertVar.PostalCode = req.body.Postal;
    insertVar.PhoneNo = req.body.Phone;

    if( req.files !== null ) {


        console.log( req.files );
        let thePath = `${__dirname}\\${req.files.image.name}`;
        req.files.image.mv( thePath );

        console.log( thePath );

        console.log(fs.readFileSync(thePath));

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
        insertVar.save();
});

//FIND
router.post('/find', ( req, res ) => {

    houseModel.findOne( { houseNo : req.body.Id }, ( err, docs ) => {

        console.log( docs );

        if(!err)
            res.json( docs );
        else 
            res.json( err );
    });
});

//DELETE
router.post( '/delete', ( req, res ) => {

    houseModel.deleteOne( { ID : req.body.Id } , ( err, docs ) => {

        if(!err) {
            console.log( docs );
            res.json( req.body.Id );
        }
        else
            res.json( err );
    });
});

//UPDATE
router.post('/update' , ( req, res ) => {

    console.log( req.body.ID );
    console.log( req.files ); 

    if( req.files !== null ) {

        houseModel.findOne({ houseNo: req.body.ID }, ( err, docs ) => {
            
            docs.houseName = req.body.Name;
            docs.MobileNo = req.body.Mobile;
            docs.Address = req.body.Addr;
            docs.phCode = req.body.phCode;
            docs.PostalCode = req.body.Postal;
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

        houseModel.findOne({ houseNo: req.body.ID }, ( err, docs ) => {
        
            docs.houseName = req.body.Name;
            docs.MobileNo = req.body.Mobile;
            docs.Address = req.body.Addr;
            docs.phCode = req.body.phCode;
            docs.PostalCode = req.body.Postal;
            docs.PhoneNo = req.body.Phone;
            docs.img = '';

            docs.save();
            res.json({ ID : req.body.ID });
            
        });        
    }
});



module.exports = router;