//Define UI variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//Load all event listeners
loadEventListeners();

function loadEventListeners() {
    //DOM Load Event
    document.addEventListener("DOMContentLoaded",getTasks);
    form.addEventListener("submit", addTask);
    //Remove task event 
    taskList.addEventListener("click", removeTask);
    //Clear Task Event
    clearBtn.addEventListener("click",clearTasks);
    //Filter through the tasks
    filter.addEventListener("keyup", filterTasks);
}

function getTasks(e){
    let tasks;
    if(localStorage.getItem("tasks")===null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function(task){
        const li = document.createElement("li");
        li.className = "collection-item";
        li.appendChild(document.createTextNode(task));
        const link = document.createElement("a");
        link.className = "delete-item secondary-content";
        link.innerHTML = "<i class='fas fas-minus-circle></i>";
        li.appendChild(link);
        taskList.appendChild(li);
    })
}

function addTask(e) {
    e.preventDefault();
    if (taskInput.value === "") {
        alert("Task entered is empty");
    }
    else{
    const li = document.createElement("li");
    li.className = "collection-item";
    //Create a text node and append to the li
    li.appendChild(document.createTextNode(taskInput.value));
    //Create new link element
    const link = document.createElement("a");
    //Add class
    link.className = "delete-item secondary-content";
    //Add icon html
    link.innerHTML = '<i class="fas fa-band-aid"></i>';
    //Append the link to the li
    li.appendChild(link);
    //Append li to ul
    taskList.appendChild(li);
    //Store task in local storage
    storeTaskInLocalStorage(taskInput.value);
    //Clear input
    taskInput.value = "";
    
    }
}

function storeTaskInLocalStorage(value){
    let tasks;
    if(localStorage.getItem("tasks")===null){
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(value);
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm("Are you sure?")) {
            e.target.parentElement.parentElement.remove();

            //Remove from local storage
            removeTaskFromLocalStoarage(e.target.parentElement.parentElement);
        }
    }
}

//Remove a single task from local storage
function removeTaskFromLocalStoarage(element){
    let tasks;
    if(localStorage.getItem("tasks")===null){

    }
    else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function(task,index){
        if(task===element.textContent){
            tasks.splice(index,1);
        }
    });
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function clearTasks(e){
    //taskList.innerHTML = "";
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    if(localStorage.getItem("tasks")!=null)
    {
        localStorage.removeItem("tasks");
    }
}

function filterTasks(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll(".collection-item").forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text)!=-1) { 
            task.style.display = "block";
        }
        else {
            task.style.display = "none";
        }
    })   
}