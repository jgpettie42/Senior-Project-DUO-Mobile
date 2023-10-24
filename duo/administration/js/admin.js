var strLang;
/*$(document).ready(function(){
    if(localStorage.getItem('DUODeviceID')){
        // call web service to verify ID and get role
        $('#divLogin').slideUp(function(){
            $('#divDashboard').slideDown(function(){
                $('#navMain').slideDown();
            });
        })
    }
})*/
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
    strEmail = '';
    strPassword = '';
    $.getJson('http://localhost:8000/admin', {email: strEmail, password: strPassword}, function(result){
    if(insrtgoodOutcome == true){
        $('#divLogin').slideUp(function(){
            $('#divDashboard').slideDown(function(){
                $('#navMain').slideDown();
                $('#divHome').slideDown();
            });
        })
    } else {
        swal.fire({
            icon:'error',
            html:'<p>Please input the correct login information!</p>'
        })
    }
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
                        $('#divHome').slideDown();
                    })
                })
            }
        })
    }
    
})



$('#headingFive').on('click',function(){
    console.log(1);
})
$(document).on('click','.btnSlide1',function(){
    $(this).siblings('.card-body').slideToggle();
 })
 $(document).on('click','.btnSlide2',function(){
    $(this).siblings('.card-body').slideToggle();
 })
 $(document).on('click','.btnHelp',function(){
    Swal.fire(
        'Admin Tool Help',
        'Each of the small cards to the right side of the screen can be clicked. This allows for an interactive interface with customizable options! Just click the header of the card for an uncluttered workspace!',
        'info'
      )
 })