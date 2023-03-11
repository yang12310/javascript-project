import { getElement } from '../utils.js';
import display from '../displayProducts.js';

// const setupCompanies = () => {};

// export default setupCompanies;

const setupCompanies = (store) => {
    let companies = ['all', ...new Set(store.map((product) => product.company))]; //spread 연산자 
    //debugger
    const companiesDOM = getElement('.companies');
    companiesDOM.innerHTML = companies.map((company) => {
        return ` <button class="company-btn">${company}</button>`;
    }) //필터 버튼 만들어줌
    .join('');
    companiesDOM.addEventListener('click', function (e){
        const element = e.target;
        if (element.classList.contains('company-btn')){
            let newStore = [];
            if (element.textContent === 'all'){
                newStore = [...store];
            }else{
                newStore = store.filter(
                    (product) => product.company === e.target.textContent
                ); //해당 제품만 필터링되도록 만들어주는 것
            }
            display(newStore, getElement('.products-container'), true);
        }
    })
};
export default setupCompanies;
