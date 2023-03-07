var strLang;
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
    let arrServicesInputs = $('.selServices-' + strLang + ' input');
    var arrServices = $('.selServices-en').map((i, e) => e.value).get();
    console.log(arrServices);
    let blError = false;
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
    }
    if(strLang == 'es'){
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
        $('#divReg-' + strLang).slideUp(function(){
            $('#divComplete-' + strLang).slideDown();
        })
    }
    
})

