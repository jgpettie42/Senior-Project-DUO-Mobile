var strLang;
$(document).ready(function(){
    if(localStorage.getItem('DUODeviceID')){
        // call web service to verify ID and get role
        $('#divLogin').slideUp(function(){
            $('#divDashboardHealth').slideDown();
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

$('#btnSubmitAddAppt').on('click',function(){
    if($('#selectServiceAddAppt').val() == ' ' || $('#txtUserAddAppt').val() == '' || $('#txtTimeAddAppt').val() == ''){
        Swal.fire({
            icon: 'error',
            title: 'oops...',
            text: 'You must fill out all fields'
        })
    }else{
            //WRITE POST TO /appointments???
    Swal.fire({
        icon: 'success',
        title: 'Nice!',
        text: 'Appointment added!'
    })
    $('#divAddAppt').slideToggle();
    $('#divInputData').slideToggle();
    }
})

$('#btnBackFromAddAppt').on('click',function(){
    $('#divAddAppt').slideToggle();
    $('#divInputData').slideToggle();
})


$('#btnAddAppt').on('click',function(){
    $('#divAddAppt').slideToggle();
    $('#divInputData').slideToggle();
})

$('#btnLogin').on('click',function(){
    let strUsername = $('#txtUsername').val();
    let strPassword = $('#txtPassword').val();
    if(strUsername.length && strPassword.length > 1){
        $('#divLogin').slideToggle();
        $('#divDashboardHealth').slideToggle();
        //if username and password are valid
    }else{

        Swal.fire({
            icon: 'error',
            title: 'oops...',
            text: 'Email and password incorrect'
        })
    }
})



$('#btnLogoutHealth').on('click',function(){
    $('#divDashboardHealth').slideUp(function(){
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
                        $('#divDashboardHealth').slideDown();
                    })
                })
            }
        })
    }
    
})



$('#btnDataHealth').on('click',function(){
    $('#divInputData').slideToggle();
    $('#divDashboardHealth').slideToggle();
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
let Allergies = $('#txtAllergies').val();
let Medicines = $('#txtMedicines').val();
let MentalState = $('#selectMentalState').val();
let Drugs = $('#txtDrugs').val();


$('#btnSubmitData').on('click',function(){
    if(BMI.length < 1 || GripStrength.length < 1 || Height.length < 1 || Weight < 1 || BP.length < 1 || HR.length < 1 || O2Sat.length < 1 || Temp.length < 1 || HealthID.length < 1 || ExtraInfo.length < 1 || Condition.length < 1 || Drugs.length < 1 || MentalState == '' || Allergies.length < 1 || Medicines.length < 1){
        Swal.fire({
            title: 'Are you sure?',
            text: "Some spaces are blank... do you wish to continue?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, I am sure!'
          }).then((result) => {
            
            if (result.isConfirmed) {
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
            Swal.fire({         //delete when post works
                icon:'success',
                title:'Good to go!',
                text: 'Data Entered',
                })
                $('#divInputData').slideToggle();
                $('#divDashboardHealth').slideToggle();
            }
          })
    }
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
        $('#divDashboardHealth').slideDown();
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






//dental
let HealthIDDental = $('#txtHealthIDDental').val();
let selectDentalVisit = $('#selectDentalVisit').val();
let Xray = $('#txtXray').val();


$('#btnSubmitDentalData').on('click',function(){
    if(HealthIDDental.lenghth < 1 || selectDentalVisit == ' ' || Xray.lenghth < 1 ){
        Swal.fire({
            title: 'Are you sure?',
            text: "Some spaces are blank... do you wish to continue?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, I am sure!'
          }).then((result) => {
            
            if (result.isConfirmed) {
            Swal.fire({         //delete when post works
                icon:'success',
                title:'Good to go!',
                text: 'Data Entered',
                })
                $('#divEditDental').slideToggle();
                $('#divDashboardDental').slideToggle();
            }
          })
    }
})



$('#btnDental').on('click',function(){
    $('#divLogin').slideToggle();
    $('#divDashboardDental').slideToggle();
})

$('#btnDataDental').on('click',function(){
    $('#divEditDental').slideToggle();
    $('#divDashboardDental').slideToggle();
})

$('#btnLogoutDental').on('click',function(){
    $('#divDashboardDental').slideUp(function(){
        $('#divLogin').slideDown();
    })
})

$('#btnViewXray').on('click',function(){
    $('#divDashbaordDental').slideToggle();
    $('#divXray').slideToggle();
})