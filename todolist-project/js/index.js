// Home 화면이 로딩될때 todolist 보이게 하기
let url = location.href;
const params = new URL(url).searchParams;

// debugger;

let setDate = params.get("date");

setDate = !setDate ? new Date().toISOString().substring(0,10) : setDate;
document.querySelector("#date").value = setDate;
// Home 화면이 로딩될때 todolist 보이게 하기

function listTodolist(event) {
        event.preventDefault();
        let setDate = document.querySelector("#date").value;
        if (setDate === null || setDate === undefined || setDate === "") {
            alert("Select Date First!");
            return;
        }
        getTodolistByDate(setDate);
    }

    let todoLists = []; //글로벌변수

    // Search todolist by date...
    function getTodolistByDate(setDate) {
        fetch(`http://localhost:4000/todolist?date=${setDate}`)
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            todolists = data;
            createTable(data);
        })
        .catch(error => {
            alert(error);
        });
    }

    function changeStatus(x){
        const todolist = todolists.filter(item => item.id === parseInt(x.dataset.id));

        let flag = x.dataset.status === "done" ? "notyet" : "done";
        let options = {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify({
                ...todolist[0], //전개연산자
                "status" : flag //나머지는 그대로 쓰는데 status만 바꾸겠다.
            })
        }
        fetch (`http://localhost:4000/todolist/${x.dataset.id}`, options)
        .then(response => response.json())
        .then(data => {
            x.dataset.status = flag;
            x.children[0].classList.contains("fas")
                ? x.children[0].classList.replace("fas", "far")
                : x.children[0].classList.replace("far", "fas")
            console.log(x.children[0].classList);
        })
    }

    //Create a todolist table
    function createTable(data) {
        let tableBase = document.querySelector("#table-main");
        let table=`
        <table class="table table-hover">
            <thead class="table-secondary">
            <tr>
                <th style="width: 100%">Title</th>
                <th style="width: 60px">Status</th>
            </tr>
        </thead>
        `;

        data.length === 0 ? table += `
        <tr>
            <td colspan="2" style="text-align: center;">There's no to do list.!</td>
        </tr>` 
        : data.forEach((obj, i) => {
            let icons = obj.status === "done" ? "fas" : "far";
            table += `
            <tr>
                <td onclick="showTodolist(${obj.id})"> ${obj.title}<br><span>(${obj.time})</span></td>
                <td style="text-align: center;" data-id=${obj.id} data-status=${obj.status}
                onclick="changeStatus(this)"><i class="status-icon far fa-check-circle"></i></td>
            </tr>`;
        });
        table += `</table>`;
        tableBase.innerHTML = table;
    }

    function showTodolist(id) {
        location.href = `http://localhost:5500/form.html?date=${setDate}&id=${id}&mode=view`
    }

    function newTodolist(){
        location.href = `http://localhost:5500/form.html?date=${setDate}&id=&mode=new`;
    }

    getTodolistByDate(setDate); // Home 화면이 로딩될때 todolist 보이게 하기

