var strLang;
var strBaseURL = 'http://localhost:8005'
//var strBaseURL = 'http://192.168.0.121:8005';

var array = []

$('.services').on('click',function(){
   
    
    if($(this).hasClass('bg-success')){
        $(this).removeClass('bg-success');
        $(this).children().removeClass('text-white');
        $(this).children().addClass('text-dark');
        $(this).removeClass('interest');
    } else {
        $(this).addClass('bg-success');
        $(this).children().removeClass('text-dark');
        $(this).children().addClass('text-white');
        $(this).addClass('interest');
       
    }
    console.log(($(this).attr('data-value')))
 })


let blnError = false;
$('.btnLang').on('click',function(){
    let strLang = $(this).attr('data-lang');
    $('#divContent').removeClass('align-items-center').removeClass('vh-100').addClass('align-items-top').addClass('pt-4');
    $('#divPickLang').slideUp(function(){
        $('#divReg-' + strLang).slideDown();
    })
    if(strLang == 'en'){
        Swal.fire({
            icon:'warning',
            title: 'DISCLAIMER',
            text:'Due to limited slots, there is NO GUARANTEE that your selected servies will be available.'
        })
    } else {
        Swal.fire({
            icon:'warning',
            title: 'Atención',
            text:'Debido a los espacios limitados, no hay garantía de que los servicios seleccionados estén disponibles.'
        })
    }

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
    let arrServicesInputs = $('.selServices-' + strLang);
    var arrServices = $('.selServices-'+strLang).map((i, e) => e.value).get();
    
    console.log(arrServices);
    let strServices = ""
    
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
        arrServices.forEach(function(item,index){
            strServices += "," +  item
        })        
        $.post(strBaseURL + '/preregistration', {firstname: strFirstName, middleinit: strMiddleName, lastname:strLastName, dob: strDOB, email: strEmail, phone: strPhone, sex : strSex, services:strServices , language:strLang})
        .done(function(result){
            let objResult = JSON.parse(result);
            //this is success
        })
        $.post(strBaseURL + '/users', {firstname: strFirstName, middleinit: strMiddleName, lastname:strLastName, dob: strDOB, email: strEmail, sex : strSex, preferedlanguage: strLang,phone:strPhone})
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

