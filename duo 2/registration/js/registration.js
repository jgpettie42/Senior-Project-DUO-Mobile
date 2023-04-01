//const { json } = require("express/lib/response");

var strLang;

$(document).ready(function(){
    if(localStorage.getItem('DUODeviceID')){
        if(sessionStorage.getItem('SimpleSession')){
            $.getJSON('http://localhost: 8000/sessions',{SessionID:sessionStorage.getItem('SimpleSession')},function(result){
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

$('.btnDashboardHeader').on('click',function(){
    $(this).siblings('.card-body').slideToggle();
})

$('#btnCheckInPreReg').on('click', function(){
    if($('#selectParticipant').val() == ''){
        Swal.fire({
            icon:'error',
            html:'<p>Please select a preregistered participant or register a new one!</p>'
        })
    } else {
        //get preregistration data and fill the text boxes for the person to confirm user
        $.getJSON('http://localhost: 8000/preregisration',{'enter KVPs': $('#txtFirstNameRegister')}, function(result){
            $.each(result, function(i, field){
                $('#divPreregisteredFill').append(field + '');
            })
        })
        $('#divPreregisteredFill').slideToggle();
        $('#divCheckIn').slideToggle();
    }
})

$('#btnConfirmVisitor').on('click', function(){
    $('#divPreregisteredFill').slideToggle();
    $('#divAssignUserID').slideToggle();
})

$('#btnCheckVisitor').on('click', function(){
    $('#divExistingUser').slideToggle();
    //show user profile here
    //then after confirming them we will want to assign a ID for the day
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
        $.post('http://localhost:8000/users', {firstname: $('#txtRegFirstName').val(), middleinit: $('#txtRegMiddleName').val(), lastname: $('#txtRegLastName').val(), preferredname: $('#txtPreferredName').val(), sex: $('#selectSex').val(), dob: $('#txtRegDateOfBirth').val()})
        .done(function(result){
            let objResult = JSON.parse(result);
            //this is success
            if(objResult.Outcome){
                $('#divLoginInfo').slideToggle();
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
        $.post('http://localhost:8000/badgenum',{firstname: $('#txtRegFirstName').val(), middleinit:$('#txtRegMiddleName').val(), lastname: $('#txtRegLastName').val(), dob: $('#txtRegDateOfBirth').val(), badgenum: $('#txtAssignUserID').val()},function(result){
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

$('#btnLogin').on('click',function(){
    $.post('http://localhost:8000/sessions?email=' + $('#txtUsername').val() + '&password=' + $('#txtPassword').val())
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
                $.getJSON('http:localhost: 8000/users',{SessionID:strSessionID,AnimalType:strAnimalType},function(animals){
                    $.ajax({
                        type: "PUT",
                        contentType:"applicaiton/json; charset=utf-8",
                        url: "http:localhost: 8000/sessions",
                        data: { SessionID:strSessionID },
                        success:function(result){
                            // Completea your logout
                        },
                        error: function(resultError){
                            // Handle any errors here
                        }
                    })
                    $('#selectParticipant').empty();
                    // want to get preregistered users and put them into the selectParticipant list for registration 
                })
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