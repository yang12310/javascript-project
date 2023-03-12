let url = location.href;
const params = new URL(url).searchParams;
let setDate = params.get("date");
let id = params.get("id");
let mode = params.get("mode");

const initForm = () => {
    document.querySelector("#date").value = setDate;
    document.querySelector("#time").value = "00:00";
    document.querySelector("#title").value = "";
    document.querySelector("#type").value = "";
    document.querySelector("#description").value = "";
}

function getTodolistById(id) {
    fetch(`http://localhost:4000/todolist/${id}`)
    .then(response => response.json())
    .then(data => {
        //debugger
        document.querySelector("#date").value = data.date;
        document.querySelector("#time").value = data.time;
        document.querySelector("#title").value = data.title;
        document.querySelector("#type").value = data.type;
        document.querySelector("#status").value = data.status;
        document.querySelector("#description").value = data.description;
    });
}

function createTodolist(event) {
    event.preventDefault();
    let title = document.querySelector("#title").value;
    if(!title) {
        alert("Title must be entered!");
        return;
    } //빈칸잇으면 체크할 수 있도록
    const data = {
        "date" : document.querySelector("#date").value,
        "time" : document.querySelector("#time").value,
        "title" : title,
        "type" : document.querySelector("#type").value,
        "status" : "notyet",
        "description" : document.querySelector("#description").value
    };

    let options = {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(data)
    }

    fetch(`http://localhost:4000/todolist/`, options)
    .then(response => response.json())
    .then(data => {
        setDate =data.date;
        location.href=`../index.html?date=${setDate}`;
    });
}


function deleteTodolist(event) {
    event.preventDefault();
    // let id =document.querySelector("#saved-id").value;

    if(confirm("Do you really want to delete?")){
        fetch(`http://localhost:4000/todolist/${id}`, {
            method : "DELETE",
        })
        .then(response => response.json())
        .then(data => {
            location.href=`../index.html?date=${setDate}`;
        }) //삭제하고 원래 페이지로 돌아가기
        .catch(error => {
            console.error(error);
        });
    }
};


function editTodolist(event){
    event.preventDefault();

    let status = document.querySelector("#status").value;
    if(status === "done") {
        alert("Completed todolist cannot be edited!");
        return;
    } //완료된건 edit  하지 못하게 return시켜줌

    if(confirm("Do you want to save the edited data?")) {
        const data = {
            "date" : document.querySelector("#date").value,
            "time" : document.querySelector("#time").value,
            "title" : document.querySelector("#title").value,
            "type" : document.querySelector("#type").value,
            "status" : document.querySelector("#status").value,
            "description" : document.querySelector("#description").value,
        };
        
        let options = {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify(data)
        }
        fetch(`http://localhost:4000/todolist/${id}`, options)
        .then(response => response.json())
        .then(data => {
            setDate = data.date;
            location.href = `../index.html?date=${setDate}`; //수정된 결과 페이지로 이동
        });
    }
};


// go home 기능
function goHome(event){
    event.preventDefault();
    location.href=`../index.html?date=${setDate}`;
}


// 상황에 맞는 버튼 노출시키기
function displayBtns(createDisplay, editDisplay, deleteDisplay){
    document.querySelector("#create-btn").style.display = createDisplay;
    document.querySelector("#edit-btn").style.display = editDisplay;
    document.querySelector("#delete-btn").style.display = deleteDisplay;
}

let title = document.querySelector("#form-title")


if(mode === "view"){
    title.innerText = "View To-Do List";
    displayBtns("none","block", "block");
    getTodolistById(id);
}else if (mode === "new"){
    title.innerText = "New To-Do List";
    displayBtns("block","none", "none");
    initForm();
}

// getTodolistById(id);


