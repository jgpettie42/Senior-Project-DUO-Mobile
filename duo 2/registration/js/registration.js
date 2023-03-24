var strLang;
$(document).ready(function(){
    if(localStorage.getItem('DUODeviceID')){
        // call web service to verify ID and get role
        $('#divLogin').slideUp(function(){
            $('#divCheckIn').slideDown(function(){
                $('#navMain').slideDown();
            });
            
        })
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
        //show user information that was selected in the prereg
    }
})

$('#btnCheckInNew').on('click', function(){
    $('#divFirstRegister').slideToggle();
    $('#divCheckIn').slideToggle();
    $('#divContent').slideToggle();
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
    if($('#txtRegMiddleInitial').val().length < 1){
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
    if(isValidEmail() == false){
        blnError = true;
        strHTML += '<p>The entered email must be a valid email address</p>'
    }
    if(isValidPassword() == false){
        blnError = true;
        strHTML += '<p>Your password must be at least 8 characters long and contain and uppercase, lowercase, and special character.</p>'
    }
    if(blnError == true){
        swal.fire({
                html: strHTML,
                icon: 'error',
            })
    } else {
        swal.fire({
            icon: 'success',
            html: '<p>User Successfully Registered</p>',
            confirmButtonText: 'OK' 
        }).then((result) => {
        if (result.isConfirmed) {
            $('#divFrontPage').slideToggle();
            $('#divLoginInfo').slideToggle();
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
        //also need to slide toggle to dashboard
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
    $('#divLogin').slideUp(function(){
        $('#divCheckIn').slideDown(function(){
            $('#navMain').slideDown();
        });
    })
})

$('#linkLogout').on('click',function(){
    $('#divCheckIn').slideUp(function(){
        $('#divLogin').slideDown(function(){
            $('#navMain').slideUp();
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

function isValidEmail(strEmailAddress){
    var strEmailAddress = $('#txtRegistrationEmail').val();
    let regEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return regEmail.test(strEmailAddress);
}

function isValidPassword(strPassword){
    var strPassword = $('#txtRegistrationPassword').val()
    let regPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,64}$/;
    return regPassword.test(strPassword);
}