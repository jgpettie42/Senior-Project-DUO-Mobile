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
})

$('#btnNextToRegistration').on('click', function(){
    $('#divFirstRegister').slideToggle();
    $('#divSecondRegister').slideToggle();
})
$('#btnNextToEmergencyContact').on('click', function(){
    $('#divEmergencyContactRegister').slideToggle();
    $('#divSecondRegister').slideToggle();
})
$('#btnNextToLoginInfo').on('click', function(){
    $('#divEmergencyContactRegister').slideToggle();
    $('#divLoginInfo').slideToggle();
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