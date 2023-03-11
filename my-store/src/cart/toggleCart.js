import { getElement } from '../utils.js';

// export const openCart = () => {};

const cartOverlay = getElement('.cart-overlay');
const closeCartBtn = getElement('.cart-close');
const toggleCartBtn = getElement('.toggle-cart');

toggleCartBtn.addEventListener('click', () => {
    cartOverlay.classList.add('show');
})
closeCartBtn.addEventListener('click', () => {
    cartOverlay.classList.remove('show');
})

//프로그램적으로 자동으로 카트사이드바가 나올 수 있도록 
export const openCart = () => {
    cartOverlay.classList.add('show');
};

