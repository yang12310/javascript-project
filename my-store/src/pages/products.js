// global imports
import '../toggleSidebar.js';
import '../cart/toggleCart.js';
import '../cart/setupCart.js';

//  filter imports
import setupSearch from '../filters/search.js';
import setupCompanies from '../filters/companies.js';
import setupPrice from '../filters/price.js';

// specific imports
import { setupStore, store } from '../store.js';
import display from '../displayProducts.js';
import { getElement } from '../utils.js';

//import fetch products
import fetchProducts from '../fetchProducts.js';

const init = async () => {
    const loading = getElement('.page-loading');
    let products;

    products = await fetchProducts();
    console.log(products);
    setupStore(products); //localstorage에 저장

    display(products, getElement('.products-container'));

    setupSearch(store); //검색부분
    setupCompanies(store); //필터부분
    setupPrice(store); //가격 필터부분
    loading.style.display = 'none';
};

init();
