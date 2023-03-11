// global imports
import '../toggleSidebar.js';
import '../cart/toggleCart.js';
import '../cart/setupCart.js';
// specific
import { addToCart } from '../cart/setupCart.js';
import { singleProductUrl, getElement, formatPrice, getStorageItem } from '../utils.js';

//selections
const loading = getElement('.page-loading');
const centerDOM = getElement('.single-product-center');
const pageTitleDOM = getElement('.page-hero-title');
const imgDOM = getElement('.single-product-img');
const titleDOM = getElement('.single-product-title');
const companyDOM = getElement('.single-product-company');
const priceDOM = getElement('.single-product-price');
const colorsDOM = getElement('.single-product-colors');
const descDOM = getElement('.single-product-desc');
const cartBtn = getElement('.addToCartBtn');

//cart product
let productID;

//show product when page loads
window.addEventListener('DOMContentLoaded', function(){
    const urlID = window.location.search;
    productID = urlID.substring(4);
    let products = getStorageItem('store');

    const product = products.find((product) => product.id == productID)
    const {name, company, price, colors, description, image} = product;

    //set values

    

    this.document.title = `${name.toUpperCase()} | Comfy`;
    pageTitleDOM.textContent = `Home / ${name}` ; //제품이름
    imgDOM.src = image;
    titleDOM.textContent = name;
    companyDOM.textContent = `by ${company}`;
    priceDOM.textContent = formatPrice(price);
    descDOM.textContent = description;
    colors.forEach((color) => {
        const span = document.createElement('span');
        span.classList.add('product-color');
        span.style.backgroundColor = `${color}`;
        colorsDOM.appendChild(span);
    });

    loading.style.display = 'none';
})

cartBtn.addEventListener('click', function(){
    addToCart(productID);
});
