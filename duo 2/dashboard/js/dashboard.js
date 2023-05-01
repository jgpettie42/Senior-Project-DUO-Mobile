 var strLang;

 var strBaseURL = 'http://localhost:8000';

$(document).ready(function(){
    if(localStorage.getItem('DUODeviceID')){
        // call web service to verify ID and get role
        $('#divLogin').slideUp(function(){
            $('#divDashboardHealth').slideDown();
        })
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

function fillFields(){
    let struserID =sessionStorage.getItem('UserID');
                $('#divBMI').empty();
                $('#divGripStrength').empty();
                $('#divHeight').empty();
                $('#divWeight').empty();
                $('#divBP').empty();
                $('#divHR').empty();
                $('#divO2Sat').empty();
                $('#divTemp').empty();
                $('#divUserID').empty();
                $('#divExtraInfo').empty();
                $('#divAllergies').empty();
                $('#divMedicines').empty();
                $('#divA1C').empty();
                $('#divMentalState').empty();
                $('#divSubstances').empty();
                $.get('http://localhost:8000/dashboard',{userid:struserID},function(result){
                    console.log(result)
                    console.log("worked")

                    let arrUsers = result
                    $.each(arrUsers,function(index,user){
                        let BMI = user.BMI
                        $('#divBMI').append(user.BMI);
                        $('#divGripStrength').append(user.GripStrength);
                        $('#divHeight').append(user.Height);
                        $('#divWeight').append(user.Weight);
                        $('#divBP').append(user.BloodPressure);
                        $('#divHR').append(user.HeartRate);
                        $('#divO2Sat').append(user.O2);
                        $('#divTemp').append(user.Temp);
                        $('#divUserID').append(user.UserID);
                        $('#divExtraInfo').append(user.ExtraInfo);
                        $('#divAllergies').append(user.Allergy);
                        $('#divMedicines').append(user.Medicines);
                        $('#divA1C').append(user.A1C);
                        $('#divMentalState').append(user.MentalState);
                        $('#divSubstances').append(user.SubstanceUsage);
                   })
                })
}

function fillPeeps(){
    console.log(2)
    $.get('http://localhost:8000/dashboardpeeps',function(results){
        console.log(results)
        let arrUsers = results;
        let strAppendHtml = ''
        $('#ulDashboardParticipants').empty();
        $.each(arrUsers,function(index,user){
            let shortDOB = user.DOB.split('T')[0]
            strAppendHtml+='<li class="card w-100 mb-1 border-success">'
            strAppendHtml+='<div class="card-header text-bg-success btnDashboardHeader">'
            strAppendHtml+='<h3>'+user.BadgeNum+'</h3>'
            strAppendHtml+='</div>'
            strAppendHtml+='<div class="card-body participant-profile" style="display:none;">'
            strAppendHtml+='<div class="text-center">'
            strAppendHtml+='<img src="images/profile.png" class="w-100 rounded-circle">'
            strAppendHtml+='</div>';
            strAppendHtml+='<h3 class="col-12 text-center mb-0 mt-3 ">'+user.FirstName+'</h3>';
            strAppendHtml+='<h4 class="col-12 text-center ">'+user.LastName+'</h4>';
            strAppendHtml+='<hr>';
            strAppendHtml+= '<div class="col-12 row">';
            strAppendHtml+= '<p class="col-7 text-primary"><i class="bi bi-gender-ambiguous me-2"></i>'+user.Sex+'</p>';
            strAppendHtml+='<p class="col-5 text-primary"><i class="bi bi-megaphone me-2"></i>'+user.PreferredLanguage+'</p>';
            strAppendHtml+='</div>';
            strAppendHtml+='<div class="col-12 row">';
            strAppendHtml+='<p class="col-7 text-primary"><i class="bi bi-calendar me-2"></i>'+shortDOB+'</p>';
            strAppendHtml+='<p class="col-5 text-primary"><i class="bi bi-person-circle me-2"></i>'+user.UserID +'</p>';
            strAppendHtml+='</div>';
            strAppendHtml+='<div class="col-12">';
            strAppendHtml+='<button value='+user.UserID+' class="btn btn-primary col-12 btnCheck" type="button">Check In</button>';
            strAppendHtml+='</div>';
            strAppendHtml+='</div>';
            strAppendHtml+='</li>';
        })
        $('#ulDashboardParticipants').append(strAppendHtml);
    })
}
$(document).on('click','.btnDashboardHeader',function(){
    $(this).siblings('.card-body').slideToggle();
})
$(document).on('click','.btnCheck',function(){
    
    let strButtonText = $(this).text();
    let strUserID = $(this).val();
    
    if(strButtonText != 'Check Out'){
        sessionStorage.setItem('UserID',strUserID)
        $(this).removeClass('btn-primary').addClass('btn-danger');
        $(this).text('Check Out');
    } else {
        sessionStorage.removeItem('UserID')
        $(this).removeClass('btn-danger').addClass('btn-primary');
        $(this).text('Check In');
    }
    
})
/*


*/ 

setInterval(() => {
    fillPeeps()
    fillFields()
}, 15000);

$('#btnAddAppt').on('click',function(){
    $('#divAddAppt').slideToggle();
    $('#divInputData').slideToggle();
})

$('#btnLogin').on('click',function(){
    let strUsername = $('#txtUsername').val();
    let strPassword = $('#txtPassword').val();
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
                    $('#divLogin').slideUp(function(){
                        $('#divLogin').slideToggle(function(){$('#divDashboardHealth').slideToggle();});
                    })
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




$('#btnSubmitData').on('click',function(){
            let strBMI = $('#txtBMI').val();
            let strGripStrength = $('#txtGripStrength').val();
            let strHeight = $('#txtHeight').val();
            let strWeight = $('#txtWeight').val();
            let strBP = $('#txtBP').val();
            let strHeartRate = $('#txtHR').val();
            let strO2Saturation = $('#txtO2Sat').val();
            let strTemp = $('#txtTemp').val();
            let strHealthID = $('#txtHealthID').val();
            let strExtraInfo = $('#txtExtraInfo').val();
            let strCondition = $('#txtA1C').val();
            let strAllergies = $('#txtAllergies').val();
            let strMedicines = $('#txtMedicines').val();
            let strMentalState= $('#selectMentalState').val();
            let strDrugs= $('#txtDrugs').val();
    if(strBMI.length < 1 || strGripStrength.length < 1 || strHeight.length < 1 || strWeight < 1 || strBP.length < 1 || strHeartRate.length < 1 || strO2Saturation.length < 1 || strTemp.length < 1 || strExtraInfo.length < 1 || strCondition.length < 1 || strDrugs.length < 1 || strMentalState == '' || strAllergies.length < 1 || strMedicines.length < 1){
        Swal.fire({
            title: 'Are you sure?',
            text: "Some spaces are blank... do you wish to continue?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, I am sure!'
          }).then((result) => {
            let strBMI = $('#txtBMI').val();
            let strGripStrength = $('#txtGripStrength').val();
            let strHeight = $('#txtHeight').val();
            let strWeight = $('#txtWeight').val();
            let strBloodPressure = $('#txtBP').val();
            let strHeartRate = $('#txtHR').val();
            let strO2Saturation = $('#txtO2Sat').val();
            let strTemp = $('#txtTemp').val();
            let strHealthID = $('#txtHealthID').val();
            let strextrainfo = $('#txtExtraInfo').val();
            let A1C = $('#txtA1C').val();
            let strallergy = $('#txtAllergies').val();
            let strmedicines = $('#txtMedicines').val();
            let strmentalstate= $('#selectMentalState').val();
            let strsubstanceusage = $('#txtDrugs').val();
            $.ajax({
                url: 'http://localhost:8000/userhealthinfo',
                type: 'PUT',
                dataType: 'json',
                data: {userid:sessionStorage.getItem('UserID'),bmi:strBMI,gripstrength:strGripStrength,height:strHeight,weight:strWeight,bloodpressure:strBloodPressure,heartrate:strHeartRate,o2:strO2Saturation,temp:strTemp,extrainfo:strextrainfo,allergy:strallergy,medicines:strmedicines,mentalstate:strmentalstate,substances:strsubstanceusage},
                success: function (data, textStatus, xhr) {
                     Swal.fire({
                            icon:'success',
                            title:'Good to go!',
                            text: 'Data Entered',
                        })
                },
                error: function (xhr, textStatus, errorThrown) {
                    Swal.fire({
                        icon:'error',
                        title:'Something Went Wrong',
                        text: 'Something went wrong please try again',
                        })
                }
            })
            if (result.isConfirmed) {
                let struserID ='cock';
                $('#divBMI').empty();
                $('#divGripStrength').empty();
                $('#divHeight').empty();
                $('#divWeight').empty();
                $('#divBP').empty();
                $('#divHR').empty();
                $('#divO2Sat').empty();
                $('#divTemp').empty();
                $('#divUserID').empty();
                $('#divExtraInfo').empty();;
                $('#divAllergies').empty();
                $('#divMedicines').empty();
                $('#divA1C').empty();
                $('#divMentalState').empty();
                $('#divSubstances').empty();
                $.get('http://localhost:8000/dashboard',{userid:struserID},function(result){
                    console.log(result)
                    console.log("worked")

                    let arrUsers = result
                    $.each(arrUsers,function(index,user){
                        let BMI = user.BMI
                        $('#divBMI').append(user.BMI);
                        $('#divGripStrength').append(user.GripStrength);
                        $('#divHeight').append(user.Height);
                        $('#divWeight').append(user.Weight);
                        $('#divBP').append(user.BloodPressure);
                        $('#divHR').append(user.HeartRate);
                        $('#divO2Sat').append(user.O2);
                        $('#divTemp').append(user.Temp);
                        $('#divUserID').append(user.UserID);
                        $('#divExtraInfo').append(user.ExtraInfo);
                        $('#divAllergies').append(user.Allergies);
                        $('#divMedicines').append(user.Medicines);
                        $('#divA1C').append(user.A1C);
                        $('#divMentalState').append(user.MentalState);
                        $('#divSubstances').append(user.Substances);
                   })
                   $('#divInputData').slideToggle();
                   $('#divDashboardHealth').slideToggle();
                })

               

              
            }
          })
    }
})

$('.nav-link').on('click',function(){
    $('.nav-link').removeClass('active');
    $(this).addClass('active');
})



/*$.post('http://localhost:8000/users',{APIkeys:apikeys},function(result){
    let objResult = JSON.parse(result);
    if(result.Outcome){
        handle success
    }else{
        handle error
    }
})
*/
$('#btnSaveNote').on('click',function(){
    let strNote = $('#txtNotes').val();
    let strNoteType = $('#cboNoteType').val();
    $.post('http://localhost:8000/notes?note=' + strNote + '&noteid=' + strNoteType + '&userid=' + sessionStorage.getItem('UserID'),function(result){
    if(result){
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
        $('#divDashboardDental').slideToggle();
        $('#divLogin').slideToggle();
})




$('#btnSubmitDentalData').on('click',function(){
    Swal.fire({
        icon: 'success',
        title: 'RAHHHH',
        text: 'nice'
    })
    $('#divEditDental').slideToggle();
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

$(document).on('click','.btnSubmitHair',function(){
    let strUserIDHair = $('#txtHairUserID').val();
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

