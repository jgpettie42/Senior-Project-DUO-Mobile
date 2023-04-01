var strLang;
let blnError = false;
$('.btnLang').on('click',function(){
    let strLang = $(this).attr('data-lang');
    $('#divContent').removeClass('align-items-center').removeClass('vh-100').addClass('align-items-top').addClass('pt-4');
    $('#divPickLang').slideUp(function(){
        $('#divReg-' + strLang).slideDown();
    })
})

$('.btnRegistar').on('click',function(){
    let strLang = $(this).attr('data-lang');
    let strFirstName = $('#divReg-' + strLang + ' .txtFirstName').val();
    let strMiddleName = $('#divReg-' + strLang + ' .txtMiddleName').val();
    let strLastName = $('#divReg-' + strLang + ' .txtLastName').val();
    let strPhone = $('#divReg-' + strLang + ' .txtPhone').val();
    let strEmail = $('#divReg-' + strLang + ' .txtEmail').val();
    let strDOB = $('#divReg-' + strLang + ' .txtDOB').val();
    let strSex = $('#divReg-' + strLang + ' .selectSex').val();
    let arrServicesInputs = $('.selServices-' + strLang + ' input');
    var arrServices = $('.selServices-en').map((i, e) => e.value).get();
    var arrServices = '';
    console.log(arrServices);
    let strError = '';
    if(strLang == 'en'){
        if(strFirstName.length < 1){
            blnError = true;
            strError += '<p class="mb-0">First Name Cannot Be Blank</p>'
        }
        if(strLastName.length < 1){
            blnError = true;
            strError += '<p class="mb-0">Last Name Cannot Be Blank</p>'
        }
        if(strDOB.length < 1){
            blnError = true;
            strError += '<p class="mb-0">Date of Birth Cannot Be Blank</p>'
        }
    } else {
        if(strFirstName.length < 1){
            blnError = true;
            strError += '<p class="mb-0">El nombre no puede estar en blanco</p>'
        }
        if(strLastName.length < 1){
            blnError = true;
            strError += '<p class="mb-0">El apellido no puede estar en blanco</p>'
        }
        if(strDOB.length < 1){
            blnError = true;
            strError += '<p class="mb-0">La fecha de nacimiento no puede estar en blanco</p>'
        }
    }
    if(blnError == true){
        Swal.fire({
            icon:'error',
            title:'Information Missing',
            html:strError
        })
    } else {
        $.post('http://localhost:8000/preregistration', {firstname: strFirstName, middleinit: strMiddleName, lastname:strLastName, dob: strDOB, email: strEmail, phone: strPhone, sex : strSex})
        .done(function(result){
            let objResult = JSON.parse(result);
            //this is success
        })
        swal.fire({
            icon: 'success',
            html: '<p>Congrats you are Pre-Registered!</p>'
        })
        $('#divReg-' + strLang).slideUp(function(){
        $('#divComplete-' + strLang).slideDown();
        })
    }
    
})

$('.btnBack').on('click',function(){
    let strLang = $(this).attr('data-lang');
    $('#divContent').addClass('align-items-center').addClass('vh-100').addClass('align-items-top').addClass('pt-4');
    $('#divPickLang').show('slow');
    $('#divReg-' + strLang).hide('slow');
})

