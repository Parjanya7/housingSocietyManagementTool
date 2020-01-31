const express = require('express');
const loginValidator = require('../Validations/loginValidator');
const signUpValidator = require('../Validations/signUpValidator');
const adminModel = require('../Models/adminModel');
const memberModel = require('../Models/memberModel');

const router = express.Router();

router.post('/Login', loginValidator , ( req, res ) => {    

    if( req.body.Access === 'Admin') {
        
        adminModel.findOne({ UserName: req.body.Name } , ( err, docs ) => {

            if(!docs) res.json({ entryVar: false, msg: 'User Not Found' });
    
            else {
    
                if( req.body.Password === docs.PassWord ) {
                    res.json( {entryVar: true, msg: `Welcome ${docs.UserName}`, user: docs.UserName, Access: 'Admin'});
                }
                else {
                    res.json({ entryVar: false, msg: 'Incorrect Password.' });
                }
            }
        });
    }

    if(req.body.Access === 'Member') {

        memberModel.findOne({ UserName: req.body.Name } , ( err, docs ) => {

            if(!docs) res.json({ entryVar: false, msg: 'User Not Found' });
    
            else {
    
                if( req.body.Password === docs.PassWord ) {
                    res.json( {entryVar: true, msg: `Welcome ${docs.UserName}`, user: docs.UserName, Access: 'Member'});
                }
                else {
                    res.json({ entryVar: false, msg: 'Incorrect Password.' });
                }
            }
        });
    }
});

router.post('/SignUp', signUpValidator, ( req, res ) => {

    if( req.body.Access === 'Admin' ) {
            
        console.log('hi');
        let insertVar = new adminModel();

        insertVar.UserName = req.body.UserName;
        insertVar.Name = req.body.Name;
        insertVar.Email = req.body.Email;
        insertVar.PassWord = req.body.Password;
        insertVar.MobileNo = req.body.MobileNo;
        insertVar.Access = req.body.Access;

        insertVar.save( err => {
            if( !err ){
                console.log('Saved new User');
                res.json({ 
                        msg: 'You are registered Successfully, Please Login Now.', 
                        entryVar: true, 
                        user: req.body.UserName 
                });
            }
        });
    }

    if( req.body.Access === 'Member' ) {

        console.log('hi');
        let insertVar = new memberModel();

        insertVar.UserName = req.body.UserName;
        insertVar.Name = req.body.Name;
        insertVar.Email = req.body.Email;
        insertVar.PassWord = req.body.Password;
        insertVar.MobileNo = req.body.MobileNo;
        insertVar.HouseNo = req.body.HouseNo;
        insertVar.Access = req.body.Access;

        insertVar.save( err => {
            if( !err ){
                console.log('Saved new User');
                res.json({ 
                        msg: 'You are registered Successfully, Please Login Now.', 
                        entryVar: true, 
                        user: req.body.UserName 
                });
            }
        });
    }
});

module.exports = router;