// 23.03.04 수업

// 서버쪽에 요청한url
const url =
  'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=';

  const formDOM = document.querySelector(".form");
  const inputDOM = document.querySelector(".form-input");
  const resultDOM = document.querySelector(".results");
  
  formDOM.addEventListener("submit",(e) => {
    e.preventDefault(); //reload 되는 것을 방지
    const value = inputDOM.value;
    if(!value){
        resultDOM.innerHTML = `<div class="error">Please Enter valid search term!</div>`;
        return;
    }
    fetchPages(value);
  });

  const fetchPages = async (searchValue) => {
    resultDOM.innerHTML = `<div class="loading"></div>`;
    try {
        const response = await fetch(`${url}${searchValue}`); //비동기 처리를 위한 await
        const data = await response.json();
        const results = data.query.search;
        if (results.length < 1){
            resultDOM.innerHTML = `<div class="error">No matching result!</div>`
            return;
        }
        renderResults(results);
    } catch(error){
        resultDOM.innerHTML = `<div class="error">There was an Error...</div>`;
    }
  } //ajax 를 적용한 부분 (페이지 로딩없어 결과값이 나오는 것'fetch')

  const renderResults = (list) => {
    const cardsList = list.map((item) => {
        const {title, snippet, pageid} = item; //구조분해할당 (object와 많이 사용함)
        return `<a href="http://en.wikipedia.org/?curid=${pageid}" target="_blank">
            <h4>${title}</h4>
            <p>${snippet}</p>
        </a>`
    }).join("");
    resultDOM.innerHTML = `<div class="articles">${cardsList}</div>`
  }


