let count = 0;

// value 요소를 확보
const value = document.querySelector("#value");

const btns = document.querySelectorAll(".btn");

btns.forEach(function(btn){
    btn.addEventListener("click", function(e){
        // 어떤 event를 사용할지 모르니까 자바스크립트 안에 있는 event를 사용하여 event를 발생한 요소를 찾아내야한다.
        const styles = e.currentTarget.classList;
        debugger;
        if(styles.contains("decrease")){
         count--;
        }else if(styles.contains("increase")){
            count++;
        }else {
            count = 0;
        }

        if(count < 0){
            value.style.color = "red";
        }
        if (count > 0){
            value.style.color = "green";
        }
        if (count === 0){
            value.style.color = "#222";
        }
        value.textContent = count;
        // innerHTML /innerText 와 거의 동일
    })
})