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
$('.btnCheckIn').on('click',function(){
    let strButtonText = $(this).text();
    if(strButtonText != 'In Use'){
        $(this).removeClass('btn-success').addClass('btn-danger');
        $(this).text('In Use');
    } else {
        $(this).removeClass('btn-danger').addClass('btn-success');
        $(this).text('Vacant');
    }
    
})

/*$('#btnSubmitAddAppt').on('click',function(){
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
})*/

$(document).on('click','.btnBackFromAddAppt',function(){
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
    let noteType = $('#cboNoteType').val();
    $.post('http://localhost:8000/notes',{strNote:note,strNoteType:noteType,USERIDHELP},function(result){
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
})
    
    
    
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
$('#btnDental').on('click',function(){
//$.getJSON('http://localhost:8000/dental',{},function(){
    //$.each(result,function(index,curDental){
        let strHTML ='';
strHTML +='<div class="row vh-100 col-12 mt-1 gx-2">';
strHTML +='<div class="col-3 h-100">';
strHTML +='<ul id="ulDashboardParticipants">';
strHTML +='<li class="card w-100 mb-1 border-success">';
strHTML +=' <div class="card-header text-bg-success btnDashboardHeader">';
strHTML +='<h3>AA213</h3>';
strHTML +='</div>';
strHTML +='<div class="card-body participant-profile" style="display:none;">';
strHTML +='<div class="text-center">';
strHTML +='<img src="images/profile.png" class="w-100 rounded-circle">';
strHTML +='</div>';
strHTML +=' <h3 class="col-12 text-center mb-0 mt-3 ">Johnny</h3>';
strHTML +='<h4 class="col-12 text-center ">Doeling</h4>';
strHTML +='<hr>';
strHTML +='<div class="col-12 row">';
strHTML +='<p class="col-7 text-primary"><i class="bi bi-gender-ambiguous me-2"></i> Male</p>';
strHTML +='<p class="col-5 text-primary"><i class="bi bi-megaphone me-2"></i> EN</p>';
strHTML +='</div>';
strHTML +='<div class="col-12 row">';
strHTML +='<p class="col-7 text-primary"><i class="bi bi-calendar me-2"></i> 11/13/1991</p>';
strHTML +='<p class="col-5 text-primary"><i class="bi bi-arrow-up-circle me-2"></i> 31yr</p>';

strHTML +='</div>';
strHTML +='<div class="col-12">';
strHTML +='<button class="btn btn-primary col-12 btnCheck" type="button">Check In</button>';
strHTML +='</div>';
                strHTML +='</div>';
                strHTML +='</li>';
                strHTML +='<li class="card w-100 mb-1 border-primary">';
                strHTML +='<div class="card-header text-bg-primary btnDashboardHeader">';
                strHTML +='<h3>LR412</h3>';
                strHTML +='</div>';
                strHTML +='<div class="card-body participant-profile" style="display:none;">';
                strHTML +='<div class="text-center">';
                strHTML +='<img src="images/male3.webp" class="w-100 rounded-circle">';
                strHTML +='</div>';
                strHTML +='<h3 class="col-12 text-center mb-0 mt-3 ">Nicholas</h3>';
                strHTML +='<h4 class="col-12 text-center ">Sparks</h4>';
                strHTML +='<hr>';
                strHTML +='<div class="col-12 row">';
                strHTML +='<p class="col-7 text-primary"><i class="bi bi-gender-ambiguous me-2"></i> Male</p>';
                strHTML +='<p class="col-5 text-primary"><i class="bi bi-megaphone me-2"></i> EN</p>';

                strHTML +='</div>';
                strHTML +='<div class="col-12 row">';
                strHTML +='<p class="col-7 text-primary"><i class="bi bi-calendar me-2"></i> 1/30/1978</p>';
                strHTML +='<p class="col-5 text-primary"><i class="bi bi-arrow-up-circle me-2"></i> 45yr</p>';
                strHTML +='</div>';
                strHTML +='<div class="col-12">';
                strHTML +='<button class="btn btn-primary col-12 btnCheck" type="button">Check In</button>';
                strHTML +='</div>';
                strHTML +='</div>';
                strHTML +='</li>';
                strHTML +='<li class="card w-100 mb-1 border-primary">';
                strHTML +='<div class="card-header text-bg-primary btnDashboardHeader">';
                strHTML +='<h3>SH980</h3>';
                strHTML +='</div>';
                strHTML +='<div class="card-body participant-profile" style="display:none;">';
                strHTML +='<div class="text-center">';
                    strHTML +='<img src="images/female3.webp" class="w-100 rounded-circle">';
                    strHTML +='</div>';
                    strHTML +=' <h3 class="col-12 text-center mb-0 mt-3 ">Jane</h3>';
                    strHTML +='<h4 class="col-12 text-center ">Smith</h4>';
                    strHTML +='<hr>';
                    strHTML +='<div class="col-12 row">';
                    strHTML +='<p class="col-7 text-primary"><i class="bi bi-gender-ambiguous me-2"></i> Female</p>';
                    strHTML +='<p class="col-5  text-danger"><i class="bi bi-megaphone me-2"></i> ES</p>';

                    strHTML +='</div>';
                    strHTML +='<div class="col-12 row">';
                    strHTML +='<p class="col-7 text-primary"><i class="bi bi-calendar me-2"></i> 07/25/1969</p>';
                    strHTML +='<p class="col-5 text-primary"><i class="bi bi-arrow-up-circle me-2"></i> 53yr</p>';

                    strHTML +='</div>';
                    strHTML +='<div class="col-12">';
                    strHTML +='<button class="btn btn-primary col-12 btnCheck" type="button">Check In</button>';
                    strHTML +='</div>';
                    strHTML +='</div>';
                    strHTML +='</li>';
                    strHTML +='<li class="card w-100 mb-1 border-primary">';
                    strHTML +='<div class="card-header text-bg-primary btnDashboardHeader">';
                    strHTML +=' <h3>AA208</h3>';
                    strHTML +='</div>';
                    strHTML +='<div class="card-body participant-profile" style="display:none;">';
                    strHTML +='<div class="text-center">';
                    strHTML +='<img src="images/female4.webp" class="w-100 rounded-circle">';
                    strHTML +='</div>';
                    strHTML +='<h3 class="col-12 text-center mb-0 mt-3 ">Markie</h3>';
                    strHTML +='<h4 class="col-12 text-center ">Whithers</h4>';
                    strHTML +='<hr>';
                    strHTML +='<div class="col-12 row">';
                    strHTML +='<p class="col-7 text-primary"><i class="bi bi-gender-ambiguous me-2"></i> Female</p>';
                    strHTML +='<p class="col-5 text-primary"><i class="bi bi-megaphone me-2"></i> EN</p>';

                    strHTML +='</div>';
                    strHTML +='<div class="col-12 row">';
                    strHTML +='<p class="col-7 text-primary"><i class="bi bi-calendar me-2"></i> 05/25/2002</p>';
                    strHTML +='<p class="col-5 text-primary"><i class="bi bi-arrow-up-circle me-2"></i> 20yr</p>';
                    strHTML +='</div>';
                    strHTML +='<div class="col-12">';
                    strHTML +='<button class="btn btn-primary col-12 btnCheck" type="button">Check In</button>';
                    strHTML +='</div>';
                    strHTML +='</div>';
                    strHTML +='</li>';
                    strHTML +='<li class="w-100 mt-5">';
                    strHTML +='<button class="btn btn-danger btn-lg col-12" type="button" id="btnLogoutDental">Logout</button>';
                    strHTML +='</li>';
                    strHTML +='</ul>';
                    strHTML +='</div>';
                strHTML +='<div class="col-9 h-100">';
                strHTML +='<div class="col-12 alert alert-info text-center alert-dismissible fade show mb-1" role="alert">';
                strHTML +='<strong>DENTAL</strong>';
                strHTML +='<button type="button" class="btn-close" data-dismiss="alert" aria-label="Close">';
                strHTML +='</button>';
                strHTML +='</div>';

                strHTML +='<div class="col-12 card">';
                strHTML +='<div class="card-body participant-profile">';
                strHTML +='<div class="col-12 d-flex justify-content-between flex-wrap">';
                strHTML +='<div class="col-4 card">';
                strHTML +='<div class="card-header">';
                strHTML +='<h3 class="col-12 text-center ">Measurements</h3>';
                strHTML +='</div>';
                strHTML +='<div class="card-body">';
                strHTML +='<hr>';
                strHTML +='<div class="d-flex col-12 flex-wrap mb-0">';
                strHTML +=' <div class="col-12 fw-bold text-center"><i class="bi bi-hand-index text-primary me-2"></i>Type of Visit</div>';
                strHTML +=' <div class="col-12 text-primary text-center">Extraction</div>';
                strHTML +='</div>';
                strHTML +='<hr>';
                strHTML +='</div>';
                strHTML +='</div>';
            strHTML +='<div class="col-4 card">';
            strHTML +=' <div class="card-header">';
            strHTML +='<h3 class="col-12 text-center ">Important Info</h3>';
            strHTML +='</div>';
            strHTML +='<div class="card-body">';
            strHTML +='<div class="d-flex col-12 flex-wrap mb-0">';
            strHTML +='<div class="col-6 fw-bold text-center"><i class="bi bi-person-vcard text-primary me-2"></i>Allergies</div>';
            strHTML +='<div class="col-6 fw-bold text-center"><i class="bi bi-prescription text-primary me-2"></i>Medicines</div>';
            strHTML +='</div>';
            strHTML +='<div class="d-flex col-12 flex-wrap mb-0">';
            strHTML +='<div class="col-6 text-center"><p class="fw-bold fs-5 text-danger">Peanut Allergy</p></div>';
            strHTML +='<div class="col-6 text-center text-danger"><p class="fw-bold fs-5">omeprazole (Prilosec)</p></div>';
            strHTML +='</div>';
            strHTML +='<div class="d-flex col-12 flex-wrap mb-0">';
            strHTML +='<div class="col-12 fw-bold text-center"><i class="bi bi-heart-pulse text-primary me-2"></i>Mental State</div>';
            strHTML +='</div>';
            strHTML +='<div class="d-flex col-12 flex-wrap mb-0">';
            strHTML +='<div class="col-12 text-center"><p class="fw-bold fs-5 text-primary">Average</p></div>';
            strHTML +='</div>';
            strHTML +='<hr>';
            strHTML +='<div class="d-flex col-12 flex-wrap mb-0">';
            strHTML +=' <div class="col-12 fw-bold text-center"><i class="bi bi-capsule text-primary me-2"></i>Substance Usage</div>';
            strHTML +='</div>';
            strHTML +='<div class="d-flex col-12 flex-wrap mb-0">';
            strHTML +='<div class="col-12 text-center text-danger"><p class="fw-bold fs-5">Methamphetamine</p></div>';
            strHTML +='</div>';
            strHTML +='</div>';
            strHTML +='</div>';
                    strHTML +='<div class="col-4 card">';
                    strHTML +='<div class="card-header">';
                    strHTML +='<h3 class="col-12 text-center ">Labs</h3>';
                    strHTML +='</div>';
                    strHTML +='<div class="card-body">';
                    strHTML +='<div class="d-flex col-12 flex-wrap mb-0">';
                    strHTML +='<div class="col-12 fw-bold text-center"><i class="bi bi-rulers me-2 text-primary"></i>X-Rays</div>';
                    strHTML +='</div>';
                    strHTML +='<div class="d-flex col-12 flex-wrap mb-0">';
                    strHTML +='<div class="col-12 fw-bold text-center fs-5 text-primary"><button class="btn btn-outline-success col-12" id="btnViewXray" type="button">View</button></div>';
                    strHTML +='</div>';
                    strHTML +='<hr>';
                    strHTML +='<div class="d-flex col-12 flex-wrap mb-0">';
                    strHTML +='<div class="col-12 fw-bold text-center"><i class="bi bi-list-ul me-2 text-primary"></i>Lipid Panel</div>';
                    strHTML +='</div>';
                    strHTML +='<div class="d-flex col-12 flex-wrap mb-0">';
                    strHTML +='<button class="col-12 btn btn-outline-primary mt-2" data-toggle="modal" data-target="#modalLipid">View</button>';
                    strHTML +='</div>';
                    strHTML +='<hr>';
                    strHTML +='</div>';
                    strHTML +='</div>';
                    strHTML +='</div>';
                            strHTML +='<div class="col-12 d-flex justify-content-between flex-wrap mt-3 align-items-stretch">';
                            strHTML +='<div class="col-6 card mb-3">';
                            strHTML +='<div class="card-header">';
                            strHTML +='<h3 class="col-12 text-center">Previous Visits</h3>';
                            strHTML +='</div>';
                            strHTML +='<div class="card-body">';
                            strHTML +='<ul class="col-12 list-unstyled">';
                            strHTML +=' <li><button class="btn btn-outline-secondary col-12 mb-1">Health on 6 Jan 2023</i></button></li>';
                            strHTML +=' <li><button class="btn btn-outline-secondary col-12 mb-1">Dental on 6 Dec 2022</i></button></li>';
                            strHTML +='<li><button class="btn btn-outline-warning col-12 mb-1">Dental on 26 Nov 2022 (Missed)</i></button></li>';
                            strHTML +='<li><button class="btn btn-outline-primary col-12 mt-4">3 More</i></button></li>';
                            strHTML +='</ul>';
                            strHTML +='</div>';
                            strHTML +='</div>';
                 strHTML +='<div class="col-6 card mb-3">';
                 strHTML +='<div class="card-header">';
                 strHTML +=' <h3 class="col-12 text-center">Appointments</h3>';
                 strHTML +='</div>';
                 strHTML +=' <div class="card-body">';
                 strHTML +='<ul class="col-12 list-unstyled">';
                 strHTML +='<li><button class="btn btn-outline-secondary col-12 mb-1">Vision on 23 June 2023 at 8:30 AM</i></button></li>';
                 strHTML +='<li><button class="btn btn-outline-secondary col-12 mb-1">Health on 24 June 2023 at 7:00 PM</i></button></li>';
                 strHTML +='<li><button class="btn btn-outline-secondary col-12 mb-1">Dental on 8 Nov 2023 at 6:15 PM</i></button></li>';
                 strHTML +='</ul>';
                 strHTML +='</div>';
                        
                 strHTML +='</div>';
                        strHTML +='<div class="col-12 d-flex justify-content-around flex-wrap align-items-center">';
                        strHTML +='<button class="btn btn-primary col-2">OpenEMR</button>';
                        strHTML +='<button class="btn btn-secondary col-2">Resources</button>';
                        strHTML +='<button class="btn btn-secondary col-2" type="button" id="btnDataDental">Insert Data</button>';
                        strHTML +='<button class="btn btn-success col-2" data-toggle="modal" data-target="#modalAddNote">Add Note</button>';
                        strHTML +='</div>';
                        strHTML +='</div>';
                        strHTML +='</div>';
                        strHTML +='</div>';
                        strHTML +='</div>';
                        strHTML +='</div>';
$('#divDashboardDental').append(strHTML);
$('#divLogin').slideToggle();
$('#divDashboardDental').slideToggle();
    })
//})

//})



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





$(document).on('click','.btnDataDental',function(){
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

//vision
$('#btnVision').on('click',function(){
    $('#divLogin').slideToggle();
    $('#divDashboardVision').slideToggle();
})


$('#btnLogoutVision').on('click',function(){
    $('#divLogin').slideToggle();
    $('#divDashboardVision').slideToggle();
})


//haircut
$('#btnHaircut').on('click',function(){
    $('#divLogin').slideToggle();
    $('#divHaircut').slideToggle();
})
let strUserIDHair = $('#txtHairUserID').val();
$(document).on('click','.btnSubmitHair',function(){
    if(strUserIDHair.length < 1){
        Swal.fire({
            icon: 'error',
            title: 'oops...',
            text: 'You must fill out all fields'
        })
    } else{
        Swal.fire({
            icon: 'success',
            title: 'Congrats!',
            text: 'User Submitted'
        })
    }
})


//food
$('#btnFood').on('click',function(){
    $('#divLogin').slideToggle();
    $('#divFood').slideToggle();
})
let foodCount = 0;
$('#btnSubmitFood').on('click',function(){


    Swal.fire({
        icon: 'question',
        title: 'Are you sure you want to continue?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Yes`,
        denyButtonText: `No`,
        }).then((result) => {
        if (result.isConfirmed) {
            foodCount += 1;
            $('#txtFoodCount').empty();
            $('#txtFoodCount').append(foodCount);
            Swal.fire({
                icon: 'success',
                title: 'Meal Submitted!'
            })
        } else if (result.isDenied) {
            
        }
        })
})

