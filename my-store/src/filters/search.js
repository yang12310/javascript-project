// import { getElement } from '../utils.js';
// import display from '../displayProducts.js';
// const setupSearch = () => {};

// export default setupSearch;

import { getElement } from '../utils.js';
import display from '../displayProducts.js';
const setupSearch = (store) => {
    const form = getElement('.input-form');
    const nameInput = getElement('.search-input');
    form.addEventListener('keyup', function () {
        const value = nameInput.value;
        if (value) {
            const newStore = store.filter((product) => {
            let { name } = product;
            name = name.toLowerCase();
            if (name.startsWith(value)) { //입력한걸로 시작되면
                return product;
            }
        });
        display(newStore, getElement('.products-container'), true);
        if (newStore.length < 1) {
            const products = getElement('.products-container');
            products.innerHTML = `<h3 class="filter-error">
            sorry, no products matched your search
            </h3>`;
        }
    } else {
        display(store, getElement('.products-container'), true); //search에 안적으면 전체 display를 뿌려준다
    }
    });
};
export default setupSearch;
