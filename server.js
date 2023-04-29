const mysql = require('mysql'); 
const express = require('express'); 
const crypto = require('crypto'); 
const cors = require('cors'); 
const bodyParser = require('body-parser'); 
const bcrypt = require("bcrypt"); 
const { error } = require('console');

const pool = mysql.createPool({ 
    host: 'localhost', 
    user:'root', 
    password:'alvinandthechipmunks', 
    database:'duodatabase'
}); 

const HTTP_PORT = 8000; 




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
    try{
        pool.query('SELECT * FROM tblSessions WHERE SessionID = ?',strSessionID,function(error,result){
            if(!error){
                res.status(200).send(result);
            } else {
                res.status(400).send(JSON.stringify({'Error':error}));
            }
        })
    } catch {
        console.log(error);
    }
    
})

app.post("/sessions", (req,res,next)=>{
    let strEmail = req.query.email || req.body.email;
    let strPassword = req.query.password || req.body.password;
    
    let strSessionID = uuidv4();
    try {
        pool.query('SELECT Password FROM tblUsers WHERE UPPER(UserID) = UPPER(?)',[strEmail],function(error,results){
            if(results){
                bcrypt.compare(strPassword,results[0].Password)
                .then(outcome => {
                    if(outcome == true){
                        let strSessionID = uuidv4();
                        pool.query('INSERT INTO tblSession VALUES(?, ?,SYSDATE())',[strSessionID, strEmail], function(error, results){
                            if(!error){
                                res.status(201).send(JSON.stringify({SessionID:strSessionID}));
                            } else {
                                res.status(401).send(JSON.stringify({Error:'Bad Username or Password'}));
                            }
                        })
                    }
                })
            } else {
                res.status(400).send(JSON.stringify({Error:error}));
            }
        })
    } catch (error) {
        console.log(error);
    }
    
})
app.post("/event",(req,res,next)=>{

})
app.get("/event/:status",(req,res,next)=>{
    let strStatus = req.params.status;
    try{
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
    } catch{
        console.log(error);
    }  
})
app.get("/location/:locationid",(req,res,next)=>{
    try{
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
    } catch {
        console.log(error);
    }
    
})

app.get("/preregistration",(req,res,next)=>{
        try{
            pool.query('select * from tblpreregistration where CheckIn_Status = "NO"',function(error,result){
                if(!error){
                    res.status(200).send(result);
                } else {
                    res.status(400).send(JSON.stringify({Error:error}));
                }
            })
        } catch{
            console.log(error);
        }
        
})

app.get("/preregistrationtransfer",(req,res,next)=>{
    let strFirstName = req.query.firstname || req.body.firstname;
    let strLastName = req.query.lastname || req.body.lastname;

    let strDOB = req.query.dob || req.body.dob;

    try{
        pool.query('select * from tblpreregistration where FirstName = ? AND LastName = ? AND DOB = ?',[strFirstName,strLastName,strDOB],function(error,result){
            if(!error){
                res.status(200).send(result);
            } else {
                res.status(400).send(JSON.stringify({Error:error}));
            }
        })
    } catch{
        console.log(error);
    }
    
})

app.post("/preregistration",(req,res,next)=>{
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
    let strPassword = (strDOB.split("-")[0]) + strFirstName.split(0) + strLastName + "!"
    let strServices = req.query.services || req.body.services;
    let strLanguage = req.query.language || req.body.language;

    console.log(strEmail,strFirstName,strMiddleName,strLastName,strServices,strDOB,strSex,strPassword)
    

    bcrypt.hash(strPassword,10).then(hash => {
        strPassword = hash;
    try{
            let strRegistrationID = uuidv4()
            pool.query('INSERT INTO tblpreregistration (RegistrationID,Email,FirstName,MiddleName,LastName,Password,Sex,DOB,PreferredLanguage,CheckIn_Status,Services) VALUES(?,?,?,?,?,?,?,?,?,"NO",?)',[strRegistrationID,strEmail,strFirstName,strMiddleName,strLastName,strPassword,strSex,strDOB,strLanguage,strServices],function(error,result){
            console.log(strEmail,strFirstName,strMiddleName,strLastName,strPreferredName,strDOB,strSex,strPassword)
        if(!error){
                    let strRegistrationID = uuidv4();
                    let strEvent = uuidv4();
                    let strHealthID = uuidv4();
                    pool.query("INSERT INTO tblRegistrations VALUES (?,?,1,NOW(),'Pre')",[strRegistrationID,strEmail],function(errors,results){
                        if(!errors){
                            pool.query("INSERT INTO tbluserhealthinfo (HealthID,UserID) VALUES (?,?)",[strHealthID,strEmail],function(errors,results){})
                            res.status(201).send(JSON.stringify({RegistrationID:strRegistrationID}));
                        } else {
                            
                            res.status(400).send(JSON.stringify({Error:errors}));
                        }
                    })
                } else {
                    res.status(401).send(JSON.stringify({Error:error}));
                } 
             })
        } catch (error) {
            console.log(error);
        }   
    })
})

app.get("/users/:userid",(req,res,next)=> {
    let strUserID = req.param.userid;
    let strSessionID = req.query.sessionid || req.body.sessionid;
     try{
        pool.query('SELECT FirstName,LastName,MiddleName,PreferredName,DOB,Sex,PreferredLanguage FROM tblUsers WHERE UserID = ? AND (SELECT COUNT(*) FROM tblSessions WHERE SessionID = ?) > 0',[strUserID,strSessionID],function(error,result){
            if(!error){
                res.status(200).send(result);
            } else {
                res.status(400).send(JSON.stringify({Error:error}));
            }
        })
     } catch{
        console.log(error);
     }
   
})

app.get("/previoususers",(req,res,next)=> {
    let strFirstName = req.query.firstname || req.body.firstname;
    let strLastName = req.query.lastname || req.body.lastname;
    let strDOB = req.query.dob || req.body.dob;
    
    try{
        pool.query('SELECT * FROM tblUsers WHERE FirstName = ? AND LastName = ? AND DOB = ?',[strFirstName,strLastName,strDOB],function(error,result){
            if(!error){
                res.status(200).send(result);
            } else {
                res.status(400).send(JSON.stringify({Error:error}));
            }
        })
     } catch{
        console.log(error);
     }
   
})


app.get("/testnotes",(req,res,next)=> {
    try{
        pool.query('SELECT * FROM tblDashboardNotes',function(error,result){
            if(!error){
                res.status(200).send(result);
            } else {
                res.status(400).send(JSON.stringify({Error:error}));
            }
        })
    } catch{
        console.log(error);
    }
   
})

app.post("/badgenum", (req,res,next)=>{
    let strFirstName = req.query.firstname || req.body.firstname;
    let strLastName = req.query.lastname || req.body.lastname;

    let strDOB = req.query.dob || req.body.dob;
    let intBadgeNum = req.query.badgenum || req.body.badgenum;

    console.log(strFirstName,strLastName,strDOB,intBadgeNum)

    try{
        pool.query('update tblusers set BadgeNum = (?) WHERE (FirstName,LastName,DOB) = (?,?,?)',[intBadgeNum,strFirstName,strLastName,strDOB],function(error,result){
            if(!error){
                pool.query('update tblpreregistration set CheckIn_Status = "Yes" WHERE (FirstName,LastName,DOB) = (?,?,?)',[strFirstName,strLastName,strDOB])
                res.status(201).send(JSON.stringify({'Outcome':'New user Created'}))
            } else {
                res.status(400).send(JSON.stringify({Error:error}));
            }
        })
    } catch{
        console.log(error);
    }
 
})



app.post("/users", (req,res,next)=>{
    let strFirstName = req.query.firstname || req.body.firstname;
    let strMiddleName = req.query.middleinit || req.body.middleinit;
    let strLastName = req.query.lastname || req.body.lastname;
    let strPreferredName = req.query.preferredname || req.body.preferredname;
    let strEmail = req.query.email || req.body.email;
    let strSex = req.query.sex || req.body.sex;
    let strDOB = req.query.dob || req.body.dob;
    let strPassword = (strDOB.split("-")[0]) + strFirstName.split(0) + strLastName + "!"

    console.log(strEmail,strFirstName,strMiddleName,strLastName,strPreferredName,strDOB,strSex,strPassword)

    let strUserRoleId = uuidv4();

    if(strEmail == null){
        strEmail = uuidv4();
    }

    bcrypt.hash(strPassword,10).then(hash => {
        strPassword = hash;
        try{
            pool.query('INSERT INTO tblUsers (UserID,FirstName,MiddleName,LastName,PreferredName,DOB,Sex,Password,CreateDateTime) VALUES (?,?,?,?,?,?,?,?,SYSDATE())',[strEmail,strFirstName,strMiddleName,strLastName,strPreferredName,strDOB,strSex,strPassword],function(error,result){
                if(!error){

                    pool.query('INSERT INTO tbluserroles (UserRoleID,UserID,RoleID) VALUES (?,?,"Patient")',[strUserRoleId,strEmail],function(error,result){
                        let strHealthID = uuidv4()
                        pool.query('INSERT INTO tbluserhealthinfo (HealthID,UserID) VALUES (?,?)',[strHealthID,strEmail],function(error,result){
                            console.log(error)
                        })
                        if(error){
                            console.log(error)
                        }
                    })
                    res.status(201).send(JSON.stringify({'Outcome':'New user Created'}))

                } else {
                    res.status(400).send(JSON.stringify({Error:error}));
                }
            })
        } catch{
            console.log(error);
        }
        
    })
})

app.post('/img', (req, res) => {
    let signature = req.body.signature;
    let base64Data = signature.replace(/^data:image\/png;base64,/, '');
  
    // Save signature data to JSON file
    fs.readFile('signatures.json', (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error reading signatures file');
      } else {
        let signatures = JSON.parse(data);
        let newSignature = { signature: base64Data };
        signatures.push(newSignature);
        fs.writeFile('signatures.json', JSON.stringify(signatures), (err) => {
          if (err) {
            console.log(err);
            res.status(500).send('Error saving signature');
          } else {
            res.status(200).send('Signature saved successfully');
          }
        });
      }
    });
  });

app.post("/admin", (req,res,next)=>{
    let strFirstName = req.query.firstname || req.body.firstname;
    let strMiddleName = req.query.middleinit || req.body.middleinit;
    let strLastName = req.query.lastname || req.body.lastname;
    let strPreferredName = req.query.preferredname || req.body.preferredname;
    let strEmail = req.query.email || req.body.email;
    let strSex = req.query.sex || req.body.sex;
    let strDOB = req.query.dob || req.body.dob;
    let strPassword = req.query.password || req.body.password;

    console.log(strEmail,strFirstName,strMiddleName,strLastName,strPreferredName,strDOB,strSex,strPassword)

    let strUserRoleId = uuidv4();

    if(strPassword == null){
        strPassword = uuidv4();
    }
    if(strEmail == null){
        strEmail = uuidv4();
    }

    bcrypt.hash(strPassword,10).then(hash => {
        strPassword = hash;
        try{
            pool.query('INSERT INTO tblUsers (UserID,FirstName,MiddleName,LastName,PreferredName,DOB,Sex,Password,CreateDateTime) VALUES (?,?,?,?,?,?,?,?,SYSDATE())',[strEmail,strFirstName,strMiddleName,strLastName,strPreferredName,strDOB,strSex,strPassword],function(error,result){
                if(!error){

                    pool.query('INSERT INTO tbluserroles (UserRoleID,UserID,RoleID) VALUES (?,?,"Admin")',[strUserRoleId,strEmail],function(error,result){
                        if(error){
                            console.log(error)
                        }
                    })
                    res.status(201).send(JSON.stringify({'Outcome':'New user Created'}))

                } else {
                    res.status(400).send(JSON.stringify({Error:error}));
                }
            })
        } catch{
            console.log(error);
        }
        
    })
})


app.post("/staff", (req,res,next)=>{
    let strFirstName = req.query.firstname || req.body.firstname;
    let strMiddleName = req.query.middleinit || req.body.middleinit;
    let strLastName = req.query.lastname || req.body.lastname;
    let strPreferredName = req.query.preferredname || req.body.preferredname;
    let strEmail = req.query.email || req.body.email;
    let strSex = req.query.sex || req.body.sex;
    let strDOB = req.query.dob || req.body.dob;
    let strPassword = req.query.password || req.body.password;
    let strRole = req.query.role || req.body.role;

    console.log(strEmail,strFirstName,strMiddleName,strLastName,strPreferredName,strDOB,strSex,strPassword,strRole)

    let strUserRoleId = uuidv4();

    if(strPassword == null){
        strPassword = uuidv4();
    }
    if(strEmail == null){
        strEmail = uuidv4();
    }

    bcrypt.hash(strPassword,10).then(hash => {
        strPassword = hash;
        try{
            pool.query('INSERT INTO tblUsers (UserID,FirstName,MiddleName,LastName,PreferredName,DOB,Sex,Password,CreateDateTime) VALUES (?,?,?,?,?,?,?,?,SYSDATE())',[strEmail,strFirstName,strMiddleName,strLastName,strPreferredName,strDOB,strSex,strPassword],function(error,result){
                if(!error){

                    pool.query('INSERT INTO tbluserroles (UserRoleID,UserID,RoleID) VALUES (?,?,?)',[strUserRoleId,strEmail,strRole],function(error,result){
                        if(error){
                            console.log(error)
                        }
                    })
                    res.status(201).send(JSON.stringify({'Outcome':'New user Created'}))

                } else {
                    res.status(400).send(JSON.stringify({Error:error}));
                }
            })
        } catch{
            console.log(error);
        }
        
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

    try{
        pool.query('INSERT INTO tblUserHealthInfo (HealthID,Height,Weight,BMI,HeartRate,BloodType,O2,ExtraInfo,UserID) VALUES (?,?,?,?,?,?,?,?)',[strHealthID,strHeight,strWeight,strBMI,strHR,strBloodType,strExtraInfo,stro2,strUserID],function(error,result){
            if(!error){
                res.status(201).send(JSON.stringify({'Outcome':'New user Created'}))
            } else {
                res.status(400).send(JSON.stringify({Error:error}));
            }
        })
    }catch{
        console.log(error);
    }
    

})

app.post("/notes",(req,res,next)=>{

    let strNoteID = req.query.noteid || req.body.noteid;
    let strUserID = req.query.userid || req.body.userid;
    let strNote = req.query.note || req.body.note;

    console.log(strNote,strNoteID,strUserID)
    try{
        pool.query('INSERT INTO tblDashboardNotes (NotesID,UserID,Note,CreateDateTime) VALUES (?,?,?,SYSDATE())',[strNoteID,strUserID,strNote],function(error,result){
            if(!error){
                res.status(201).send(JSON.stringify({'Outcome':'New user Created'}))
            } else {
                res.status(400).send(JSON.stringify({Error:error}));
            }
        })
    } catch {
        console.log(error);
    }

    

})


app.get("/dashboardnotes/:userid",(req,res,next)=> {
    let strUserID = req.param.userid;
    let strSessionID = req.query.sessionid || req.body.sessionid;
    try{
        pool.query('SELECT * FROM tblDashboardNotes WHERE UserID = ? AND (SELECT COUNT(*) FROM tblSessions WHERE SessionID = ?) > 0',[strUserID,strSessionID],function(error,result){
            if(!error){
                res.status(200).send(result);
            } else {
                res.status(400).send(JSON.stringify({Error:error}));
            }
        })
    } catch {
        console.log(error);
    }
})


app.get("/dashboard",(req,res,next)=> {
    let strUserID = req.query.userid || req.body.userid
try{
    pool.query('SELECT * FROM tblUserHealthInfo WHERE UserID = ?',[strUserID],function(error,result){
        if(!error){
            res.status(200).send(result);
        } else {
            res.status(400).send(JSON.stringify({Error:error}));
        }
    })
} catch{
    console.log(error);
}
    
})

app.get("/usercheckinfo",(req,res,next)=> {
    let strFirstName = req.query.firstname || req.body.firstname;
    let strLastName = req.query.lastname || req.body.lastname;

    let strDOB = req.query.dob || req.body.dob;

try{
    pool.query('SELECT * FROM tblUsers WHERE FirstName = ? AND LastName = ? AND DOB = ?',[strFirstName,strLastName,strDOB],function(error,result){
        if(!error){
            res.status(200).send(result);
        } else {
            res.status(400).send(JSON.stringify({Error:error}));
        }
    })
} catch{
    console.log(error);
}

    
})

app.get("/testRoleGet",(req,res,next)=> {
    let strRole = req.query.role || req.body.role;
    try{
        pool.query('SELECT * FROM tblUsers join tbluserroles on tbluserroles.UserID = tblusers.UserID where RoleID = ?',[strRole],function(error,result){
            if(!error){
                res.status(200).send(result);
            } else {
                res.status(400).send(JSON.stringify({Error:error}));
            }
        })
    } catch{
        console.log(error);
    }
})
/*
app.post("/userhealthinfo",(req,res,next)=>{
    let strUserID = req.query.userid || req.body.userid
    let strBMI = req.query.bmi || req.body.bmi
    let strGripStrength = req.query.gripstrength || req.body.gripstrength
    let strHeight = req.query.height || req.body.height
    let strWeight = req.query.weight || req.body.weight
    let strBloodPressure = req.query.bloodpressure || req.body.bloodpressure
    let strHeartRate = req.query.heartrate || req.body.heartrate
    let strO2 = req.query.o2 || req.body.o2
    let strTemp = req.query.temp || req.body.temp
    let strExtraInfo = req.query.extrainfo || req.body.extrainfo
    let strAllergy = req.query.allergy || req.body.allergy
    let strMedicines = req.query.medicines || req.body.medicines
    let strMentalState = req.query.mentalstate || req.body.mentalstate
    let strSubstances = req.query.substances || req.body.substances

    let strInfo = strAllergy+strBMI+strBloodPressure+strExtraInfo+strGripStrength+strHeartRate+strHeight+strMedicines+strMentalState+strO2+strSubstances+strTemp+strWeight+strUserID
    console.log(strInfo)

    try{
    pool.query("update tbluserhealthinfo set Height = ?, Weight = ?, BMI = ?, BloodPressure = ?, BloodType = ?, Temp = ?, O2 = ?, HeartRate = ?, Allergy = ?, Medicines = ?, MentalState = ?, SubstanceUsage = ?, GripStrength = ?, A1C= ?, ExtraInfo = ? where UserID = ?",[strHeight,strWeight,strBMI,strBloodPressure,"Clear",strTemp,strO2,strHeartRate,strAllergy,strMedicines,strMentalState,strSubstances,strGripStrength,"12",strExtraInfo,strUserID],function(error,result){
        if(!error){
            res.status(200).send(result);
        }else{
            res.status(400).send(JSON.stringify({Error:error}));
        }
    })
    }catch(error){
        console.log(error)
    }
})

*/



app.put('/userhealthinfo',(req,res,next)=>{
    let strUserID = req.query.userid || req.body.userid
    let strBMI = req.query.bmi || req.body.bmi
    let strGripStrength = req.query.gripstrength || req.body.gripstrength
    let strHeight = req.query.height || req.body.height
    let strWeight = req.query.weight || req.body.weight
    let strBloodPressure = req.query.bloodpressure || req.body.bloodpressure
    let strHeartRate = req.query.heartrate || req.body.heartrate
    let strO2 = req.query.o2 || req.body.o2
    let strTemp = req.query.temp || req.body.temp
    let strExtraInfo = req.query.extrainfo || req.body.extrainfo
    let strAllergy = req.query.allergy || req.body.allergy
    let strMedicines = req.query.medicines || req.body.medicines
    let strMentalState = req.query.mentalstate || req.body.mentalstate
    let strSubstances = req.query.substances || req.body.substances

    let strQuery = ""
    let arrInputs = []
    if(strHeight.length > 0){
        strQuery += "Height = ?,"
        arrInputs.push(strHeight)
    }
    if(strWeight.length > 0){
        strQuery += "Weight = ?,"
        arrInputs.push(strWeight)
    }
    if(strGripStrength.length > 0){
        strQuery += "GripStrength =?,"
        arrInputs.push(strGripStrength)
    }
    if(strBMI.length > 0){
        strQuery += "BMI = ?,"
        arrInputs.push(strBMI)
    }
    if(strBloodPressure.length > 0){
        strQuery += "BloodPressure = ?,"
        arrInputs.push(strBloodPressure)
    }
    if(strBloodType.length > 0){
        strQuery += "BloodType =?,"
        arrInputs.push(strBloodType)
    }
    if(strHeartRate.length > 0){
        strQuery += "HeartRate =?,"
        arrInputs.push(strHeartRate)
    }
    if(strO2.length > 0){
        strQuery += "O2 =?,"
        arrInputs.push(strO2)
    }
    if(strTemp.length > 0){
        strQuery += "Temp =?,"
        arrInputs.push(strTemp)
    }
    if(strExtraInfo.length > 0){
        strQuery += "ExtraInfo =?,"
        arrInputs.push(strExtraInfo)
    }
    if(strAllergy.length > 0){
        strQuery += "Allergy =?,"
        arrInputs.push(strAllergy)
    }
    if(strMedicines.length > 0){
        strQuery += "Medicines =?,"
        arrInputs.push(strMedicines)
    }
    if(strMentalState.length > 0){
        strQuery += "MentalState =?,"
        arrInputs.push(strMentalState)
    }
    if(strSubstances.length > 0){
        strQuery += "Substances =?,"
        arrInputs.push(strSubstances)
    }
    strQuery = strQuery.substring(0, (strQuery.length - 1))
    arrInputs.push(strUserID)
    console.log(strQuery)
    console.log(arrInputs)

    try{
        pool.query("Update tbluserhealthinfo set "+strQuery+" where UserID=?",arrInputs,function(error,result){
            if(!error){
                res.status(201).send(result);
            }else{
                console.log(error)
                res.status(400).send(JSON.stringify({Error:error}))
            }
    
        })
    }catch{
        console.log(error)
    }
    
})