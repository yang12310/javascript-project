const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

btn = document.getElementById("btn");
color = document.querySelector(".color");

btn.addEventListener("click",function(){
    let hexColor = "#";

    for(let i  = 0; i<6; i++){
        hexColor += hex[getrandomNumber()];
    }

    console.log(hex)

    document.body.style.backgroundColor = hexColor;

    color.textContent = hexColor;
})

function getrandomNumber(){
    return Math.floor(Math.random() * hex.length);
}