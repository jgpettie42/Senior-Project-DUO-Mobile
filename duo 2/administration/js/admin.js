var strLang;
$(document).ready(function(){
    if(localStorage.getItem('DUODeviceID')){
        // call web service to verify ID and get role
        $('#divLogin').slideUp(function(){
            $('#divDashboard').slideDown(function(){
                $('#navMain').slideDown();
            });
        })
    }
})
$('.btnDashboardHeader').on('click',function(){
    $(this).siblings('.card-body').slideToggle();
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
        $('#divDashboard').slideDown(function(){
            $('#navMain').slideDown();
            $('#divHome').slideDown();
        

           
        });
    })
})

$('#linkLogout').on('click',function(){
    $('#divDashboard').slideUp(function(){
        $('#divLogin').slideDown(function(){
            $('#navMain').slideUp();
            $('#divHome').slideUp();
            $('#divFeatures').slideUp();
            $('#divUsers').slideUp();
            $('#divVolunteers').slideUp();
            $('#divInventory').slideUp();



        });
    })
})
$('#linkHome').on('click', function(){
    $('#divHome').show();
    $('#divFeatures').hide();
    $('#divUsers').hide();
    $('#divVolunteers').hide();
    $('#divInventory').hide();
})
$('#linkFeatures').on('click', function(){
    $('#divFeatures').show();
    $('#divHome').hide();
    $('#divUsers').hide();
    $('#divVolunteers').hide();
    $('#divInventory').hide();
})
$('#linkUsers').on('click', function(){
    $('#divUsers').show();
    $('#divFeatures').hide();
    $('#divHome').hide();
    $('#divVolunteers').hide();
    $('#divInventory').hide();
})
$('#linkVolunteers').on('click', function(){
    $('#divVolunteers').show();
    $('#divFeatures').hide();
    $('#divUsers').hide();
    $('#divHome').hide();
    $('#divInventory').hide();
})
$('#linkInventory').on('click', function(){
    $('#divInventory').show();
    $('#divFeatures').hide();
    $('#divUsers').hide();
    $('#divVolunteers').hide();
    $('#divHome').hide();
})

$('#btnAddVolunteer').on('click',function(){
    $('#divVolunteerForm').slideUp(function(){
        $('#divAddVolunteer').slideDown(function(){
        

           
        });
    })
})
$('#btnDelVolunteer').on('click',function(){
    $('#divVolunteerForm').slideUp(function(){
        $('#divDelVolunteer').slideDown(function(){
        

           
        });
    })
})
$('#btnUpdateVolunteer').on('click',function(){
    $('#divVolunteerForm').slideUp(function(){
        $('#divUpdateVolunteer').slideDown(function(){
        

           
        });
    })
})
$('#btnAddVolunteerGoBack').on('click',function(){
    $('#divVolunteerForm').slideDown(function(){
        $('#divAddVolunteer').slideUp(function(){
        

           
        });
    })
})
$('#btnDelVolunteerGoBack').on('click',function(){
    $('#divVolunteerForm').slideDown(function(){
        $('#divDelVolunteer').slideUp(function(){
        

           
        });
    })
})
$('#btnUpdateVolunteerGoBack').on('click',function(){
    $('#divVolunteerForm').slideDown(function(){
        $('#divUpdateVolunteer').slideUp(function(){
        

           
        });
    })
})

$('#btnDelUser').on('click',function(){
    $('#divDelUserForm').slideDown(function(){
        $('#divDelUser').slideUp(function(){
        

           
        });
    })
})
$('#btnDelUserGoBack').on('click',function(){
    $('#divDelUserForm').slideUp(function(){
        $('#divDelUser').slideDown(function(){
        

           
        });
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
                        $('#divDashboard').slideDown(function(){
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