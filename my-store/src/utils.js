// DB에서 데이터를 검색해 올 경우, allProductsUrl과 singleProductUrl 주소에 URL을 assign 합니다...
// const allProductsUrl = 'https://course-api.com/javascript-store-products'
const allProductsUrl = '';
// const singleProductUrl = 'https://course-api.com/javascript-store-single-product?id=rec43w3ipXvP28vog'
const singleProductUrl = ''

const getElement = (selection) => {
  const element = document.querySelector(selection)
  if(element) return element
  throw new Error(`Please check"${Selection}" selector. no such element exist`)
}

const formatPrice = (price) => {
  let formattedPrice = new Intl.NumberFormat('en-US', {
    style : 'currency',
    currency : 'USD',
  }).format((price / 10).toFixed(2))
  return formattedPrice
}

const getStorageItem = (item) => {
  let storageItem = localStorage.getItem(item)

  if (storageItem) {
    storageItem = JSON.parse(localStorage.getItem(item))
  } else {
    storageItem = []
  }
  return storageItem
 }
//  (parse)에대해 자세히 알아볼것 (문자열이기 때문에 객체로 바꿔주기 위함)


const setStorageItem = (name, item) => {
  localStorage.setItem(name, JSON.stringify(item))
 }
 export {
  allProductsUrl,
  singleProductUrl,
  getElement,
  formatPrice,
  getStorageItem,
  setStorageItem,
 }