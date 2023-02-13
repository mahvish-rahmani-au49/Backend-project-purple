let loader = document.querySelector('.loader');

const becomeSellerElement = document.querySelector('.become-seller');
const applyForm = document.querySelector('.apply-form');
const showApplyFormBtn = document.querySelector('#apply-btn');

window.onload = () => {
    if(sessionStorage.user){
        let user = JSON.parse(sessionStorage.user);
        if(compareToken(user.authToken, user.email)){
            becomeSellerElement.classList.remove('hide');  
    } 
}else {
    location.replace('/login');
} 
    } 
    


showApplyFormBtn.addEventListener('click', () => {
    becomeSellerElement.classList.add('hide');
    applyForm.classList.remove('hide');

})

//form submission
const applyFormButton = document.querySelector('#apply-form-btn');
const bussinessName = document.querySelector('#business-name');
const address = document.querySelector('#business-add');
const about = document.querySelector('#about');
const number = document.querySelector('#number');
const tac = document.querySelector('#terms-and-cond');
const legitInfo = document.querySelector('#legitInfo');

applyFormButton.addEventListener('click',()=>{
    if(!bussinessName.value.length || !address.value.length || !about.value.length || !number.value.length){
        showAlert('fill all the inputs');
    }else if(!tac.checked || !legitInfo.checked){
        showAlert('you must agree to our terms and conditions');
    } else{
        //server req
        loader.style.display = 'block';
        sendData('/seller' , {
            name : bussinessName.value,
            address : address.value,
            about : about.value,
            number : number.value,
            tac : tac.checked,
            legitInfo : legitInfo.checked,
            email : JSON.parse(sessionStorage.user).email
        })
    }
})