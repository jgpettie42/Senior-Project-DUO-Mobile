//const { json } = require("express/lib/response");

var strLang;
var arrPreReqParts;

var strBaseURL = 'http://localhost:8000';

$(document).ready(function(){
    if(localStorage.getItem('DUODeviceID')){
        if(sessionStorage.getItem('SimpleSession')){
            $.getJSON(strBaseURL + '/sessions',{sessionid:sessionStorage.getItem('SimpleSession')},function(result){
                if(result){
                    $('#divLogin').slideUp(function(){
                        $('#divCheckIn').slideDown(function(){
                            $('#navMain').slideDown();
                        });
                    })
                } else {
                    sessionStorage.removeItem('SimpleSession');
                }
            })
        }
    }
})

$(document).on('click','.btnStatChange',function(){
    let strStat = $(this).attr('data-stat');
    let strChange = $(this).attr('data-amount');

    $.ajax({
        url: "http://localhost:8000/stat",
        type: "PUT",
        dataType:'json',
        data:{stat:strStat,change:strChange},
        success:
        $.getJSON('http://localhost:8000/stat',{strStat,strChange},function(result){
            $.each(result,function(index,curStat){
                let strHTML = '';
                strHTML += curStat.Change;
            })
            $('#txtCurrentExtraction').append(strHTML);
        })
    })
    // on success then call getJSON to  /stat and refill the span tags

})

$('.btnDashboardHeader').on('click',function(){
    $(this).siblings('.card-body').slideToggle();
})
$('.btnDocHeader').on('click',function(){
    $(this).siblings('.card-body').slideToggle();
})

$('#btnCheckInPreReg').on('click', function(){
    console.log("uhhh")
    let strPreRegID = $('#selectParticipant').val();
    if(strPreRegID == ''){
        Swal.fire({
            icon:'error',
            html:'<p>Please select a preregistered participant or register a new one!</p>'
        })
    } else {
        //get preregistration data and fill the text boxes for the person to confirm user
        let objSelectedPart = arrPreReqParts.filter(el=> el.RegistrationID == strPreRegID)[0];
        console.log(objSelectedPart)
        let strData = $("#selectParticipant").val()
        console.log(strData)
        let strfname = objSelectedPart.FirstName
        let strlname = objSelectedPart.LastName
        let strdob = objSelectedPart.DOB.split('T')[0]
        let strPhone = objSelectedPart.Phone;
        let strEmail = objSelectedPart.Email;
        let strLang = objSelectedPart.PreferredLanguage;
        let strPreferredName = objSelectedPart.PreferredName;
        let strMiddleName = objSelectedPart.MiddleName;
        let strServices = objSelectedPart.Services;
        let strSex = objSelectedPart.Sex


        $('#txtPreFirstName').val(strfname);
        $('#txtPreLastName').val(strlname);
        $('#txtPreMiddleNameName').val(strMiddleName);
        $('#txtPreDateOfBirth').val(strdob);
        $('#txtPrePhone').val(strPhone);
        $('#txtPreEmail').val(strEmail);
        $('#txtPrePreferredName').val(strPreferredName);
        $('#txtPreServices').val(strServices);
        $('#txtPreLanguage').val(strLang);

        $("#txtPreSex").val(strSex)

        $('#divPreregisteredFill').slideToggle(function(){
            $('#divCheckIn').slideToggle();
        });
        
    }
})

$('#btnConfirmVisitor').on('click', function(){
    $('#divPreregisteredFill').slideToggle();
    $('#divAssignUserID').slideToggle();
})

$('#btnPreConfirmVisitor').on('click', function(){
    $('#divPreregisteredFill').slideToggle();
    $('#divAssignUserID').slideToggle();
})

$('#btnCheckVisitor').on('click', function(){
    $('#divExistingUser').slideToggle();
    //show user profile here
    //then after confirming them we will want to assign a ID for the day
    let strfname = $('#txtFirstName').val()
    let strlname= $('#txtLastName').val()
    let strDOB= $('#txtDateOfBirth').val()
    $.getJSON(strBaseURL+"/previoususers",{firstname:strfname,lastname:strlname,dob:strDOB},function(results){
        console.log(results)
    })
})

$('#btnCheckInExistingUser').on('click', function(){
    $('#divExistingUser').slideToggle();
    $('#divCheckIn').slideToggle();
})

$('#linkCheckIn').on('click', function(){
    $('#divCheckIn').show();
    $('#divCheckOut').hide();
    $('#divSchedules').hide();
})

$('#linkCheckOut').on('click', function(){
    $('#divCheckOut').show();
    $('#divCheckIn').hide();
    $('#divSchedules').hide();
})

$('#linkSchedules').on('click', function(){
    $('#divSchedules').show();
    $('#divCheckIn').hide();
    $('#divCheckOut').hide();
})

$('#btnCheckInNew').on('click', function(){
    $('#divFirstRegister').slideToggle();
    $('#divCheckIn').slideToggle();
})

$('#btnNextToRegistration').on('click', function(){
    blnError = false;
    strHTML = '';
    if($('#txtRegFirstName').val().length < 1){
        blnError = true;
        strHTML += '<p>You must enter First Name</p>'
    }
    if($('#txtRegLastName').val().length < 1){
        blnError = true;
        strHTML += '<p>You must enter Last Name</p>'
    }
    if($('#txtRegMiddleName').val().length < 1){
        blnError = true;
        strHTML += '<p>You must enter Middle Initial</p>'
    }
    if($('#selectRegSex').val() == 'Open This Select Menu'){
        blnError = true;
        strHTML += '<p>You must select a Sex</p>'
    }
    if($('#txtRegDateOfBirth').val().length < 1){
        blnError = true;
        strHTML += '<p>You must enter Date of Birth</p>'
    }
    if($('#txtEmail').val().length < 1){
        blnError = true;
        strHTML += '<p>You must enter a valid email address</p>'
    }
    if(blnError == true){
        swal.fire({
            html: strHTML,
            icon: 'error',
        })
    }
    else{
        $('#divFirstRegister').slideToggle();
        $('#divSecondRegister').slideToggle();
    } 
})

$('#btnBackToAddressInfo').on('click', function(){
    $('#divSecondRegister').slideToggle();
    $('#divEmergencyContactRegister').slideToggle();
})

$('#btnBackToCheckIn').on('click', function(){
    $('#divPreregisteredFill').slideToggle();
    $('#divCheckIn').slideToggle();
})

$('#btnBackToCheckIn2').on('click', function(){
    $('#divExistingUser').slideToggle();
    $('#divCheckIn').slideToggle();
})

$('#btnAlreadyRegistered').on('click', function(){
    $('#divFirstRegister').slideToggle();
    $('#divCheckIn').slideToggle();
})

$('#btnBackToFirstRegistration').on('click', function(){
    $('#divFirstRegister').slideToggle();
    $('#divSecondRegister').slideToggle();
})

$('#btnNextToEmergencyContact').on('click', function(){
    blnError = false;
    if($('#Checkbox').is(':checked')){
        $('#divEmergencyContactRegister').slideToggle();
        $('#divSecondRegister').slideToggle();
    } else{
        if($('#txtStreetName1').val().length < 1){
        blnError = true;
        }
        if($('#txtCity').val().length < 1){
            blnError = true;
        }
        if($('#txtState').val() == 'Please Select a State'){
            blnError = true;
        }
        if($('#txtCountry').val().length < 1){
            blnError = true;
        }
        if($('#txtZip').val().length < 1){
            blnError = true;
        }
        if(blnError == true){
            Swal.fire({
            icon: 'warning',
            title: 'Are you sure you want to continue without filling out these fields?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Yes`,
            denyButtonText: `No`,
            }).then((result) => {
            if (result.isConfirmed) {
                $('#divEmergencyContactRegister').slideToggle();
                $('#divSecondRegister').slideToggle();
            } else if (result.isDenied) {
                
            }
            })
        } else {
            $('#divEmergencyContactRegister').slideToggle();
            $('#divSecondRegister').slideToggle();
        }
    }
    
}) 
$('#btnNextToLoginInfo').on('click', function(){
    blnError = false;
    if($('#txtEmergencyFirstName').val().length < 1){
        blnError = true;
    }
    if($('#txtEmergencyLastName').val().length < 1){
        blnError = true;
    }
    if($('#txtEmergencyPhoneNumber').val().length < 1){
        blnError = true;
    }
    if(blnError == true){
        Swal.fire({
        icon: 'warning',
        title: 'Are you sure you would like to proceed without identifying an Emergency Contact?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Yes`,
        denyButtonText: `No`,
        }).then((result) => {
        if (result.isConfirmed) {
            $('#divEmergencyContactRegister').slideToggle();
            $('#divLoginInfo').slideToggle();
        } else if (result.isDenied) {
            
        }
        })
    } else {
        $('#divEmergencyContactRegister').slideToggle();
        $('#divLoginInfo').slideToggle();
    }
 
})

$('#btnBackToEmergencyContact').on('click', function(){
    $('#divLoginInfo').slideToggle();
    $('#divEmergencyContactRegister').slideToggle();
})
$(document).ready(function() {
    const canvas = document.getElementById('signature-box');
    const ctx = canvas.getContext('2d');
    const dataURL = canvas.toDataURL();
    var resetButton = document.getElementById('reset-button');
    var isDrawing = false;
    var lastX = 0;
    var lastY = 0;
  
    canvas.addEventListener('mousedown', function(e) {
      isDrawing = true;
      lastX = e.offsetX;
      lastY = e.offsetY;
    });
  
    canvas.addEventListener('mousemove', function(e) {
      if (isDrawing) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        lastX = e.offsetX;
        lastY = e.offsetY;
      }
    });
  
    canvas.addEventListener('mouseup', function() {
      isDrawing = false;
    });
  
    resetButton.addEventListener('click', function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
  });


$('#btnFinishRegistration').on('click', function(){
    blnError = false;
    strHTML = '';
    if($('#selectPreferredLang').val() == 'Open This Select Menu'){
        blnError = true;
        strHTML += '<p>You must enter a preferred language</p>'
    }
    if(blnError == true){
        swal.fire({
                html: strHTML,
                icon: 'error',
            })
    } else {
        $.post(strBaseURL + '/users', {firstname: $('#txtRegFirstName').val(), middleinit: $('#txtRegMiddleName').val(), lastname: $('#txtRegLastName').val(), preferredname: $('#txtPreferredName').val(), sex: $('#selectSex').val(), dob: $('#txtRegDateOfBirth').val(), email: $('#txtEmail').val(),signature:dataURL})
        .done(function(result){
            let objResult = JSON.parse(result);
            //this is success
            if(objResult.Outcome){
                $('#divLoginInfo').slideToggle();
                $('#txtPreFirstName').val($('#txtRegFirstName').val());
                $('#txtPreMiddleName').val($('#txtRegMiddleName').val());
                $('#txtPreLastName').val($('#txtRegLastName').val());
                $('#txtPreDateOfBirth').val($('#txtRegDateOfBirth').val());
                $('#divAssignUserID').slideToggle();
            } else {
                swal.fire({
                    icon:'error',
                    html:'<p>New User Not Registered!</p>'
                })
            }
        })
       
    }

})



$('#btnBackToLoginInfo').on('click', function(){
    $('#divLoginInfo').slideToggle();
    $('#divAssignUserID').slideToggle();
})

$('#btnAssignUserID').on('click', function(){
    if($('#txtAssignUserID').val().length < 4){
        swal.fire({
            icon:'error',
            html:'<p>User ID must be at least 4 Characters long! Please reference the ID tags for the number!</p>'
        })
    } else {
        /*
         $('#txtPreFirstName').val(strfname);
        $('#txtPreLastName').val(strlname);
        $('#txtPreMiddleNameName').val(strMiddleName);
        $('#txtPreDateOfBirth').val(strdob);
        $('#txtPrePhone').val(strPhone);
        $('#txtPreEmail').val(strEmail);
        $('#txtPrePreferredName').val(strPreferredName);
        $('#txtPreServices').val(strServices);
        $('#txtPreLanguage').val(strLang);
        */
       $.getJSON(strBaseURL+"/preregistrationtransfer",{firstname: $('#txtPreFirstName').val(), lastname: $('#txtPreLastName').val(), dob: $('#txtPreDateOfBirth').val()},function(result){
            console.log(result)
            let strFname = ""
            $.each(result,function(index,currfield){
                console.log(currfield)
                strFname = currfield.FirstName
            })
            console.log(strFname)
       })


        $.post(strBaseURL + '/badgenum',{firstname: $('#txtPreFirstName').val(), lastname: $('#txtPreLastName').val(), dob: $('#txtPreDateOfBirth').val(), badgenum: $('#txtAssignUserID').val()},function(result){
            console.log(result);
            let objResult = JSON.parse(result);
            if(objResult.Outcome){
                swal.fire({
                    icon: 'success',
                    html: "<p>User Successfully Registered for Today's Event!</p>",
                    confirmButtonText: 'OK' 
                }).then((result) => {
                if (result.isConfirmed) {
                    $('#divAssignUserID').slideToggle();
                    $('#divCheckIn').slideToggle();
                }
                })
                var inputElements = document.getElementsByTagName('input');
                for (var i=0; i < inputElements.length; i++) {
                    if (inputElements[i].type == 'text') {
                        inputElements[i].value = '';
                    }
                    if (inputElements[i].type == 'date'){
                        inputElements[i].value = '';
                    }
                    if (inputElements[i].type == 'select'){
                        inputElements[i].value = '';
                    }
                    
                }
            } else {
                swal.fire({
                    icon:'error',
                    html:'<p>User ID not assigned!</p>'
                })
            }
        })
        
        //also need to toggle dashboard
    }
})



$('.btnCheck').on('click',function(){
    let strButtonText = $(this).text();
    if(strButtonText != 'Check Out'){
        $(this).removeClass('btn-primary').addClass('btn-danger');
        $(this).text('Check Out');
    } else {
        $(this).removeClass('btn-danger').addClass('btn-primary');
        $(this).text('Check In');
    }
    
})

$('#btnCheckOutUser').on('click',function(){
    let strBadgeNum = $('#checkoutnum').val()
    $.post(strBaseURL+'/checkout',{badgenum:strBadgeNum},function(result){
        console.log(result)
    })
})


function fillPreRegs(){
    $('#selectParticipant').empty();
    strSessionID = sessionStorage.getItem('SimpleSession');
    let objPreRegPromise = $.getJSON(strBaseURL + '/preregistration',{},function(result){
        arrPreReqParts = result;
    })

    $.when(objPreRegPromise).done(function(){
        $('#selectParticipant').append('<option value=""></option>');
        $.each(arrPreReqParts,function(index,participant){
            let shortDOB = participant.DOB.split('T')[0]
            let strHTML = '<option value="' + participant.RegistrationID + '">' + participant.FirstName + " " + participant.LastName + " | " + shortDOB + '</option>';
            $('#selectParticipant').append(strHTML);
        })
    })
        
}

setInterval(function(){
    fillPreRegs()
}, 30000)

$('#btnLogin').on('click',function(){
    console.log(strBaseURL)
    $.post(strBaseURL + '/sessions?email=' + $('#txtUsername').val() + '&password=' + $('#txtPassword').val())
    .done(function(sessionData){
        let objSession = JSON.parse(sessionData);
        if(objSession.Outcome == 'Bad Username or Password'){
            swal.fire({
                icon: 'error',
                html: '<p>Incorrect Username or Password!</p>'
            })
        } else {
            sessionStorage.setItem('SimpleSession',objSession.SessionID);
            $('#divLogin').slideUp(function(){
                $('#divCheckIn').slideDown(function(){
                    $('#navMain').slideDown();
                });
            })
            let strSessionID = sessionStorage.getItem('SimpleSession'); 
                fillPreRegs();
        }
    })
})

$('#linkLogout').on('click',function(){
    $('#divCheckIn').slideUp(function(){
        $('#divLogin').slideDown(function(){
            $('#navMain').slideUp();
            $('#divCheckIn').slideUp();
            $('#divCheckOut').slideUp();
            $('#divSchedules').slideUp();
        });
    })
})

$('#linkSchedules').on('click',function(){
    $('#divCheckIn').slideUp(function(){
        $('#divSchedules').slideDown();
    })
})

$('#btnRegister').on('click',function(){
    if(localStorage.getItem('DUODeviceID')){
        // call web service to verify ID and get role
        Swal.fire({
            icon: 'question',
            title: 'Remove Device ID',
            html:'<p>This device is already registered.  Would you like to remove access as a DUO device?</p>',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Yes',
            confirmButtonColor: '#0d6efd'
        }).then((result)=>{
            if(result.isConfirmed){
                // call webservice to to grab DeviceID
                // display device id
                localStorage.removeItem('DUODeviceID');
                Swal.fire({
                    icon: 'success',
                    title: 'Device Unregistered',
                    html: '<p>Your device will now require login or re-registration to work with DUO</p>'
                })
            }
        })
    } else {
        Swal.fire({
            icon: 'question',
            title: 'Register Device',
            html:'<p>Would you like to register this device as a DUO device?</p>',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Yes',
            confirmButtonColor: '#0d6efd'
        }).then((result)=>{
            if(result.isConfirmed){
                // call webservice to to grab DeviceID
                // display device id
                localStorage.setItem('DUODeviceID','TESTDEVICE');
                Swal.fire({
                    icon: 'success',
                    title: 'Device Registered',
                    html: '<p>Your Device ID is TESTDEVICE</p>'
                }).then((result)=> {
                    $('#divLogin').slideUp(function(){
                        $('#divCheckIn').slideDown(function(){
                        $('#navMain').slideDown();
                        });
                    })
                })
            }
        })
    }
    
})

$('.nav-link').on('click',function(){
    $('.nav-link').removeClass('active');
    $(this).addClass('active');
})

$("input[name='phone']").keyup(function() {
    $(this).val($(this).val().replace(/^(\d{3})(\d{3})(\d+)$/, "($1)$2-$3"));
});

