let missions = [];

if (localStorage.getItem("missions") !== null){
    missions = JSON.parse(localStorage.getItem("missions"));
}

const text = document.querySelector("#inputText")

let isEdit = false;
let selectedFilter = "All";
let editId;



insert_missions();
document.querySelector("#btnAdd").addEventListener("click",click_event);
document.querySelector("#btnDelete").addEventListener("click", deleteAllTask);





function insert_missions(){

    let ul = document.querySelector(".list-group");
    ul.innerHTML = "";

    if (missions.length == 0){
        ul.insertAdjacentHTML("beforeend","<p class='m-0 p-2'>You dont have any mission.</p>")
    } 
    else{
        for (item of missions){
            let isCheck = item.status == "Complated" ? "checked":"";
            if (item.status == selectedFilter || selectedFilter == "All"){
                ul.insertAdjacentHTML("beforeend",`
                <li class="task list-group-item display-flex">
                    <div class="form-check display-flex-mr">
                        <input onclick="clickCheck(${item.id})" type="checkbox" id="${item.id}" class="form-check-input" ${isCheck}>
                        <label for="${item.id}" class="form-check-label ${isCheck}">${item.mission}</label>
                    </div>
                    <div class="dropdown">
                        <button class="btn btn-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa-solid fa-ellipsis"></i>
                        </button>
                        <ul class="dropdown-menu" style="">
                            <li><a onclick="deleteTask(${item.id})" class="dropdown-item" href="#"><i class="fa-solid fa-trash"></i> Delete</a></li>
                            <li><a onclick="editTask(${item.id}, '${item.mission}')" class="dropdown-item" href="#"><i class="fa-solid fa-pen"></i> Edit</a></li>
                        </ul>
                    </div>
                </li>
                `);
            } 
        }
    }
    localStorage.setItem("missions", JSON.stringify(missions));

};

function click_event(){
    
    if (isEdit == false){
        if (text.value != ""){
            missions.push({
                "id": missions.length +1,
                "mission": text.value,
                "status": "Pending"
            })
        }
    }
    else{
        for (item of missions){
            if (item.id == editId){
                item.mission = text.value;
            }
        }
        isEdit = false
        editId = 0;
        text.value = "";
        text.classList.remove("active");

        
    };

    insert_missions();
    
};



function deleteTask(id){
    
    let deleteId;
    for (index in missions){
        if (missions[index].id == id){
            deleteId = index;
        }
    }

    missions.splice(deleteId, 1)
    insert_missions();

}

function deleteAllTask(){
    missions.splice(0, missions.length)
    insert_missions()
}

function editTask(id, mission){
    isEdit = true;
    editId = id;
    
    console.log(isEdit);
    text.value = mission;
    text.focus();
    text.classList.add("active");


}

function clickCheck(id){

    for (item in missions){
        if (missions[item].id == id && missions[item].status == "Complated") {
            missions[item].status = "Pending"
        } else if (missions[item].id == id && missions[item].status == "Pending"){
            missions[item].status = "Complated"
        }
    }
    insert_missions();
}

function clickFilters(filterMode) {
    let all = document.querySelector("#all")
    let pending = document.querySelector("#pending")
    let complated = document.querySelector("#complated")


    if (filterMode == "All" && selectedFilter != filterMode){
        selectedFilter = filterMode; 
        all.classList.add("active")
        pending.classList.remove("active")
        complated.classList.remove("active")

    }else if (filterMode == "Pending" && selectedFilter != filterMode){
        selectedFilter = filterMode; 
        pending.classList.add("active")
        all.classList.remove("active")
        complated.classList.remove("active")
    }else if (filterMode == "Complated" && selectedFilter != filterMode){
        selectedFilter = filterMode; 
        complated.classList.add("active")
        pending.classList.remove("active")
        all.classList.remove("active")
    }
    insert_missions();
}