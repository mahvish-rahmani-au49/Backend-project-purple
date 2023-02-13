const productImages = document.querySelectorAll(".product-images img"); 
const productImageSlide = document.querySelector(".image-slider"); 

let activeImageSlide = 0;

productImages.forEach((item, i) => {
    item.addEventListener('click', () => { 
        productImages[activeImageSlide].classList.remove('active'); 
        item.classList.add('active'); 
        productImageSlide.style.backgroundImage = `url('${item.src}')`; 
        activeImageSlide = i; 
    })
})
/*********/
const shadeBtns = document.querySelectorAll('.shade-radio-btn');
let checkedBtn = 0;
let shade;

shadeBtns.forEach((item,i) => {
    item.addEventListener('click',() => {
        shadeBtns[checkedBtn].classList.remove('check');
        item.classList.add('check');
        checkedBtn = i;
        shade = item.innerHTML;
    })
})

