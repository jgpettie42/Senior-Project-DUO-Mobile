var strLang;
$(document).ready(function(){
    if(localStorage.getItem('DUODeviceID')){
        // call web service to verify ID and get role
        $('#divLogin').slideUp(function(){
            $('#divDashboard').slideDown();
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
    let strUsername = $('#txtUsername').val();
    let strPassword = $('#txtPassword').val();
    if(strUsername.length && strPassword.length > 1){
        $('#divLogin').slideToggle();
        $('#divDashboard').slideToggle();
        //if username is valid
    }else{

        Swal.fire({
            icon: 'error',
            title: 'oops...',
            text: 'Email and password incorrect'
        })
    }
})

$('#btnLogout').on('click',function(){
    $('#divDashboard').slideUp(function(){
        $('#divLogin').slideDown();
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
                        $('#divDashboard').slideDown();
                    })
                })
            }
        })
    }
    
})
$('#btnData').on('click',function(){
    $('#divInputData').slideToggle();
    $('#divDashboard').slideToggle();
})
$('#btnSubmitData').on('click',function(){
   /* $.post('http://localhost:8000/users',{APIKey:apikey},function(result){
        objResult = JSON.parse(result);
        if(objResult.Outcome){
            Swal.fire({
            icon:'success',
            title:'Good to go!',
            text: 'Data Entered',
            })
        }else{
            handle error
        }
    })*/
    Swal.fire({                     //remove this when post is done
        icon:'success',
        title:'Good to go!',
        text: 'Data Entered',
        })
    $('#divInputData').slideToggle();
    $('#divDashboard').slideToggle();
})

$('.nav-link').on('click',function(){
    $('.nav-link').removeClass('active');
    $(this).addClass('active');
})

/*$.getJSON('http://localhost:8000/users',{APIkeys:apiKeys},function(result){
    $.each(result,function(index, curInfo){
        let strHTML = '';
        strHtml +='<h3>' + curInfo.APIKEY + '</h3>';
        //etc
        $('#divCard card-body').append(strHTML);
    })    
})*/

/*$.post('http://localhost:8000/users',{APIkeys:apikeys},functions(result){
    let objResult = JSON.parse(result);
    if(error){
        handle error
    }else{
        handle success
    }
})
*/
/*$('#btnSaveNote').on('click',function(){
    //write post here
    Swal.fire({
        icon:'success',
        title:'Good to go!',
        text: 'Note Entered',
        })
        $('#modalAddNote').hide();
        $('#divDashboard').slideDown();
    })*/


