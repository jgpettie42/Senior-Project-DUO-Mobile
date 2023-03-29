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
        //if username and password are valid
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

let BMI = $('#txtBMI').val();
let GripStrength = $('#txtGripStrength').val();
let Height = $('#txtHeight').val();
let Weight = $('#txtWeight').val();
let BP = $('#txtBP').val();
let HR = $('#txtHR').val();
let O2Sat = $('#txtO2Sat').val();
let Temp = $('#txtTemp').val();
let HealthID = $('#txtHealthID').val();
let ExtraInfo = $('#txtExtraInfo').val();
let Condition = $('#txtCondition').val();



$('#btnSubmitData').on('click',function(){
    
   /* $.post('http://localhost:8000/dashboard',{strBMI:BMI,strGripStrength:GripStrength,strHeight:Height,strWeight:Weight,strBP:BP,strHR:HR,strO2Sat:O2Sat,strTemp:Temp,strHealthID:HealthID,strExtraInfo:ExtraInfo,strCondition:Condition},function(result){
        objResult = JSON.parse(result);
        if(objResult.Outcome){
            Swal.fire({
            icon:'success',
            title:'Good to go!',
            text: 'Data Entered',
            })
        }else{
            Swal.fire({
            icon:'error',
            title:'oops..',
            text: 'Data Not Entered',
            })
        }
    })*/
    Swal.fire({             //deleter when post is written
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

/*$.getJSON('http://localhost:8000/dashboard',{APIkeys:apiKeys},function(result){
    $.each(result,function(index, curInfo){
        let strHTML = '';
        strHtml +='<h3>' + curInfo.APIKEY + '</h3>';
        //etc
        $('#divCard card-body').append(strHTML);
    })    
})*/

/*$.post('http://localhost:8000/users',{APIkeys:apikeys},function(result){
    let objResult = JSON.parse(result);
    if(result.Outcome){
        handle success
    }else{
        handle error
    }
})
*/
/*$('#btnSaveNote').on('click',function(){
    let note = $('#txtNote').val();
    let noteType = $('#cboNoteType).val();
    *$.post('http://localhost:8000/notes',{strNote:note,strNoteType:noteType,USERIDHELP},function(result){
    let objResult = JSON.parse(result);
    if(objResult.Outcome){
        Swal.fire({
        icon:'success',
        title:'Good to go!',
        text: 'Note Entered',
        })
        $('#modalAddNote').hide();
        $('#divDashboard').slideDown();
    } else{
        Swal.fire({
        icon:'error',
        title:'oops...',
        text: 'Note Not Entered',
        })
    }
 })*/
    
    
    
    //load users for the day
 /*$.getJSON('http://localhost:8000/users',{APPKey:apikey},function(result){
    $.each(result,function(index,curUsers){
        let strHTML = '';
        strHTML += '<p>' + curUsers.SOMETHING + '</p>'
        $('#divPEOPLE card-something').append();
    })
 })*/

