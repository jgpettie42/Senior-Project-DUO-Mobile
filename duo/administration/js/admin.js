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

var strBaseURL = 'http://localhost:8005';
//var strBaseURL = 'http://192.168.0.121:8005';

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

 $(document).on('click','#btnclrdb',function(){
    Swal.fire({
        icon: 'question',
        html: '<p>Are you sure?</p>',
        showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Yes',
            confirmButtonColor: '#0d6efd'
    }).then((result)=>{
        if(result.isConfirmed){
            $.ajax({
                url: "http://localhost:8005/start",
                type: "DELETE",
                dataType:'json'
            }).then((result)=> {

            })
        }
    })
 })



 $('#btnLogin').on('click',function(){
    
  })

  $('#btnLogin').on('click',function(){
    let strUsername = $('#txtUsername').val();
    let strPassword = $('#txtPassword').val();
    sessionStorage.setItem('SessionUser',strUsername)
    if(strUsername.length && strPassword.length > 1){
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
                        $('#divLogin').slideToggle(function(){$('#divHome').slideToggle();});
    
                }
            })
        //if username and password are valid
    }else{
 
        Swal.fire({
            icon: 'error',
            title: 'oops...',
            text: 'Email and password incorrect'
        })
    }
 })


 $('#btnDateClick').on('click',function(){
    let strdate = $('#txtDate').val();
    console.log(strdate)
    $.get(strBaseURL+'/adminval',{date:strdate},function(result){
        
        $('#divAppendChart').empty();
        $.each(result,function(index,curUser){
            let strHTML = '';
            strHTML +='<div class="card">';
            strHTML +='<div class="card-header">';
            strHTML+="<label>Attendance: " + strdate + "</label>";
            strHTML+= '</div>';
            strHTML +='<div class="card-body">';
            strHTML+='<label> Count: ' + curUser.Patients + '</label>';
            strHTML+= '</div>';
            strHTML+= '</div>';
             $('#divAppendChart').append(strHTML);
  })
  })
 })