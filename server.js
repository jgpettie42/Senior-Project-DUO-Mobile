const mysql = require('mysql'); 
const express = require('express'); 
const crypto = require('crypto'); 
const cors = require('cors'); 
const bodyParser = require('body-parser'); 
const bcrypt = require("bcrypt"); 

const pool = mysql.createPool({ 
    host: 'localhost', 
    user:'root', 
    password:'alvinandthechipmunks', 
    database:'duodatabase'
}); 

const HTTP_PORT = 8000; 


// const host = 'http://localhost:8000' //



var app = express(); 
app.use(cors()); 
app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.text()); 
function uuidv4() { 
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => 
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16) ); 
    } 

app.listen(HTTP_PORT, () => { 
    console.log("Server is listening on port " + HTTP_PORT); 
});

app.get("/sessions/:sessionid", (req,res,next)=>{
    let strSessionID = req.params.sessionid;
    pool.query('SELECT * FROM tblSessions WHERE SessionID = ?',strSessionID,function(error,result){
        if(!error){
            res.status(200).send(result);
        } else {
            res.status(400).send(JSON.stringify({'Error':error}));
        }
    })
})

app.post("/sessions", (req,res,next)=>{
    let strEmail = req.query.email || req.body.email;
    let strPassword = req.query.password || req.body.password;
    pool.query('SELECT Password FROM tblUsers WHERE UserID =?',strEmail,function(error,results){
        if(!error){
            bcrypt.compare(strPassword,results[0].Password)
            .then(outcome => {
                if(outcome == true){
                    let strSessionID = uuidv4();
                    pool.query('INSERT INTO tblSessions VALUES(?, ?,SYSDATE())',[strSessionID, strEmail], function(error, results){
                        if(!error){
                            res.status(201).send(JSON.stringify({SessionID:strSessionID}));
                        } else {
                            res.status(401).send(JSON.stringify({Error:'Bad Username or Password'}));
                        }
                    })
                }
            })
        }
    })
})
app.post("/event",(req,res,next)=>{

})
app.get("/event/:status",(req,res,next)=>{
    let strStatus = req.params.status;
    if(strStatus == 'Future'){
        pool.query('SELECT * FROM tblEvents WHERE EndDateTime >= NOW()',function(error,result){
            if(!error){
                res.status(200).send(result)
            } else {
                res.status(400).send(JSON.stringify({Error:error}));
            }
        })
    } else if(strStatus == 'Past'){
        pool.query('SELECT * FROM tblEvents EndDateTime <= NOW()',function(error,result){
            if(!error){
                res.status(200).send(result)
            } else {
                res.status(400).send(JSON.stringify({Error:error}));
            }
        })
    } else if(strStatus == 'All'){
        pool.query('SELECT * FROM tblEvents',function(error,result){
            if(!error){
                res.status(200).send(result)
            } else {
                res.status(400).send(JSON.stringify({Error:error}));
            }
        })
    }
    
})
app.get("/location/:locationid",(req,res,next)=>{
    if(locationid == null){
        pool.query('SELECT * FROM tblEventLocations',function(error,result){
            if(!error){
                res.status(200).send(result)
            } else {
                res.status(400).send(JSON.stringify({Error:error}));
            }
        })
    } else {
        pool.query('SELECT * FROM tblEventLocations WHERE LocationID = ?', locationid, function(error,result){
            if(!error){
                res.status(200).send(result)
            } else {
                res.status(400).send(JSON.stringify({Error:error}));
            }
        })
    }   
})

app.get("/preregistration/:registrationid",(req,res,next)=>{
    strRegistrationID = req.params.registrationid;
    strEventId = req.query.event || req.body.event;
    strSessionID = req.query.sessionid || req.body.sessionid;
    if(strRegistrationID == null){
        pool.query('SELECT FirstName,LastName,MiddleName,PreferredName,DOB,Sex,PreferredLanguage FROM tblRegistrations LEFT JOIN tblUsers ON tblRegistrations.UserID = tblUsers.UserID WHERE tblUsers.UserID = tblRegistrations.UserID) FROM tblRegistrations WHERE EventID = ? AND (SELECT COUNT(*) FROM tblSessions WHERE SessionID =?) > 0',[strEventId,strSessionID],function(error,result){
            if(!error){
                res.status(200).send(result);
            } else {
                res.status(400).send(JSON.stringify({Error:error}));
            }
        })
    } else {

    }
})

/* $.post("http://localhost:8000/preregistration",{
event:eventid,
firstname:firstname,
middleinit:middlename,
lastname:lastname,
preferredname:preferredname,
email:email,
sex:sex,
dob:dob,

}) */

app.post("/preregistration",(req,res,next)=>{
    console.log("Oh waddup")
    let strEvent = req.query.event || req.body.event;
    let strFirstName = req.query.firstname || req.body.firstname;
    let strMiddleName = req.query.middleinit || req.body.middleinit;
    let strLastName = req.query.lastname || req.body.lastname;
    let strPreferredName = req.query.preferredname || req.body.preferredname;
    let strEmail = req.query.email || req.body.email;
    if(strEmail == null){
        let strEmail = uuidv4();
    }
    let strSex = req.query.sex || req.body.sex;
    let strDOB = req.query.dob || req.body.dob;
    let strPassword = uuidv4();
    let strServices = req.query.services || req.body.services;
    let strLanguage = req.query.language || req.body.language;
    bcrypt.hash(strPassword,10).then(hash => {
        strPassword = hash;
        pool.query('INSERT INTO tblUsers (UserID,FirstName,MiddleName,LastName,Password,Sex,DOB,PreferredLanguage) VALUES(?,?,?,?,?,?,?,?)',[strEmail,strFirstName,strMiddleName,strLastName,strPassword,strSex,strDOB,strLanguage],function(error,result){
            if(!error){
                let strRegistrationID = uuidv4();
                pool.query("INSERT INTO tblRegistration VALUES (?,?,?,NOW(),'Pre')",[strRegistrationID,strEmail,strEvent],function(errors,results){
                    if(!errors){
                        res.status(201).send(JSON.stringify({RegistrationID:strRegistrationID}));
                    } else {
                        res.status(400).send(JSON.stringify({Error:errors}));
                    }
                })
            } else {
                res.status(400).send(JSON.stringify({Error:error}));
            }
        })
    })
})

app.get("/users/:userid",(req,res,next)=> {
    let strUserID = req.param.userid;
    let strSessionID = req.query.sessionid || req.body.sessionid;
    pool.query('SELECT FirstName,LastName,MiddleName,PreferredName,DOB,Sex,PreferredLanguage FROM tblUsers WHERE UserID = ? AND (SELECT COUNT(*) FROM tblSessions WHERE SessionID = ?) > 0',[strUserID,strSessionID],function(error,result){
        if(!error){
            res.status(200).send(result);
        } else {
            res.status(400).send(JSON.stringify({Error:error}));
        }
    })
})

app.get("/test",(req,res,next)=> {
    pool.query('SELECT * FROM tblUsers',function(error,result){
        if(!error){
            res.status(200).send(result);
        } else {
            res.status(400).send(JSON.stringify({Error:error}));
        }
    })
})

app.get("/testnotes",(req,res,next)=> {
    pool.query('SELECT * FROM tblDashboardNotes',function(error,result){
        if(!error){
            res.status(200).send(result);
        } else {
            res.status(400).send(JSON.stringify({Error:error}));
        }
    })
})

app.post("/users", (req,res,next)=>{
    let strFirstName = req.query.firstname || req.body.firstname;
    let strMiddleName = req.query.middleinit || req.body.middleinit;
    let strLastName = req.query.lastname || req.body.lastname;
    let strPreferredName = req.query.preferredname || req.body.preferredname;
    let strEmail = req.query.email || req.body.email;
    let strSex = req.query.sex || req.body.sex;
    let strDOB = req.query.dob || req.body.dob;
    let strPassword = req.query.password || req.body.password;

    console.log(strEmail,strFirstName,strMiddleName,strLastName,strPreferredName,strDOB,strSex,strPassword)

    if(strPassword == null){
        strPassword = uuidv4();
    }
    if(strEmail == null){
        strEmail = uuidv4();
    }

    bcrypt.hash(strPassword,10).then(hash => {
        strPassword = hash;
        pool.query('INSERT INTO tblUsers (UserID,FirstName,MiddleName,LastName,PreferredName,DOB,Sex,Password) VALUES (?,?,?,?,?,?,?,?)',[strEmail,strFirstName,strMiddleName,strLastName,strPreferredName,strDOB,strSex,strPassword],function(error,result){
            if(!error){
                res.status(201).send(JSON.stringify({'Outcome':'New user Created'}))
            } else {
                res.status(400).send(JSON.stringify({Error:error}));
            }
        })
    })
})

app.post("/dashboard", (req,res,next)=>{

    let UserID = req.query.userid || req.body.userid;
    let strHealthID = uuidv4()
    let strHeight = req.query.height || req.body.height;
    let strWeight = req.query.weight || req.body.weight;
    let strBMI = req.query.bmi || req.body.bmi;
    let strHR = req.query.hr || req.body.hr;
    let strBloodType = req.query.bloodtype || req.body.bloodtype;
    let strExtraInfo = req.query.extrainfo || req.body.extrainfo;
    let strO2 = req.query.o2 || req.body.o2;


    pool.query('INSERT INTO tblUserHealthInfo (HealthID,Height,Weight,BMI,HeartRate,BloodType,O2,ExtraInfo,UserID) VALUES (?,?,?,?,?,?,?,?)',[strHealthID,strHeight,strWeight,strBMI,strHR,strBloodType,strExtraInfo,stro2,strUserID],function(error,result){
        if(!error){
            res.status(201).send(JSON.stringify({'Outcome':'New user Created'}))
        } else {
            res.status(400).send(JSON.stringify({Error:error}));
        }
    })

})

app.post("/notes",(req,res,next)=>{

    let strNoteID = req.query.noteid || req.body.noteid;
    let strUserID = req.query.userid || req.body.userid;
    let strNote = req.query.note || req.body.note;

    console.log(strNote,strNoteID,strUserID)
    pool.query('INSERT INTO tblDashboardNotes (NotesID,UserID,Note,CreateDateTime) VALUES (?,?,?,SYSDATE())',[strNoteID,strUserID,strNote],function(error,result){
        if(!error){
            res.status(201).send(JSON.stringify({'Outcome':'New user Created'}))
        } else {
            res.status(400).send(JSON.stringify({Error:error}));
        }
    })

})


app.get("/dashboard/:userid",(req,res,next)=> {
    let strUserID = req.param.userid;
    let strSessionID = req.query.sessionid || req.body.sessionid;
    pool.query('SELECT * FROM tblDashboardNotes WHERE UserID = ? AND (SELECT COUNT(*) FROM tblSessions WHERE SessionID = ?) > 0',[strUserID,strSessionID],function(error,result){
        if(!error){
            res.status(200).send(result);
        } else {
            res.status(400).send(JSON.stringify({Error:error}));
        }
    })
})


app.get("/dashboard/:userid",(req,res,next)=> {
    let strUserID = req.param.userid;
    let strSessionID = req.query.sessionid || req.body.sessionid;
    pool.query('SELECT HealthID,Height,Weight,BMI,HeartRate,BloodType,O2,ExtraInfo,UserID FROM tblUserHealthInfo WHERE UserID = ? AND (SELECT COUNT(*) FROM tblSessions WHERE SessionID = ?) > 0',[strUserID,strSessionID],function(error,result){
        if(!error){
            res.status(200).send(result);
        } else {
            res.status(400).send(JSON.stringify({Error:error}));
        }
    })
})

