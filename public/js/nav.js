
const userImageButton = document.querySelector('#user-img');
const userPopup = document.querySelector('.login-logout-popup');
const popupText = document.querySelector('.account-info');
const actionBtn = document.querySelector('#user-btn');

userImageButton.addEventListener('click',() => {
    userPopup.classList.toggle('hide');
})

window.onload = ()=>{
    let user = JSON.parse(sessionStorage.user || null);
    if (user != null){
        //user is logged in
        popupText.innerHTML = `Log in as, ${user.name}`;
        actionBtn.innerHTML = 'Log out';
        actionBtn.addEventListener('click',() =>{
            sessionStorage.clear();
            location.reload();
        })
    }else{
        //user is logged out.
        popupText.innerHTML = 'login to place order';
        actionBtn.innerHTML = 'log in';
        actionBtn.addEventListener('click',() => {
            location.href = '/login';
        })
    }
}

const searchBtn = document.querySelector('.search-btn');
const searchBox = document.querySelector('.search-box');
searchBtn.addEventListener('click', () => {
    if(searchBox.value.length){
        location.href = `/search/${searchBox.value}`
    }
})