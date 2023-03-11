import { getElement } from '../utils.js';
import display from '../displayProducts.js';

// const setupPrice = () => {};

// export default setupPrice;

const setupPrice = (store) => {
    const priceInput = getElement('.price-filter');
    const priceValue = getElement('.price-value');

    //setup filter
    let maxPrice = store.map((product) => product.price);
    maxPrice = Math.max(...maxPrice);
    maxPrice = Math.ceil(maxPrice / 10);
    priceInput.value = maxPrice;
    priceInput.max = maxPrice;
    priceInput.min = 0;
    priceValue.textContent = `Value : ${maxPrice}`;

    priceInput.addEventListener('input', function(){
        const value = parseInt(priceInput.value);
        priceValue.textContent = `Value : $${value}`;
        let newStore = store.filter((product) => product.price / 10 <= value); 
        display(newStore, getElement('.products-container'), true);
        if (newStore.length < 1){ // 그 간격에 해당하는 제품이 없다면
            const products = getElement('.products-container');
            products.innerHTML = `<h3 class="filter-error">sorry, no products matched your search</h3>`
        };
    });
};
export default setupPrice;
