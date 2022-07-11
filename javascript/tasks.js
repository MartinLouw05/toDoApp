
const taskNameInput = document.getElementById("taskName");
const taskDescriptionInput = document.getElementById("taskDescription");
const taskPriorityInput = document.getElementById("taskPriority");
const taskDateInput = document.getElementById("taskDate");
const taskTimeInput = document.getElementById("taskTime");

taskNameInput.addEventListener('focus', (e) => {
    e.target.value = '';
});

taskDescriptionInput.addEventListener('focus', (e) => {
    e.target.value = '';
});

taskPriorityInput.addEventListener('focus', (e) => {
    e.target.value = '';
});

taskDateInput.addEventListener('focus', (e) => {
    e.target.value = '';
});

taskTimeInput.addEventListener('focus', (e) => {
    e.target.value = '';
});

//Clear Form Data
const clearForm = document.getElementById("btnFormClear");

clearForm.addEventListener('click', (e) => {
    taskNameInput.value = '';
    taskDescriptionInput.value = '';
    taskPriorityInput.value = '';
    taskDateInput.value = '';
    taskTimeInput.value = '';
});

//Tasks Class
class Tasks {
    constructor() {
        this._toDoList = [];
    }
    get toDoList() {
        return this._toDoList;
    }

    //Create Task
    createTask(newTask) {
        console.log("You are now creating a Task");
        this._toDoList.push(newTask);
        console.log(data);
        completeTaskCreation();
    }
}

const addTask = new Tasks();
const sumbitTask = document.getElementById("btnFormSubmit");

let data = addTask.toDoList;

sumbitTask.addEventListener('click', (e) => {
    e.preventDefault();
    let taskName = taskNameInput.value;
    let taskDescription = taskDescriptionInput.value;
    let taskPriority = taskPriorityInput.value;
    let taskDate = taskDateInput.value;
    let taskTime = taskTimeInput.value;

    let taskObj = { objTaskName : taskName, objTaskDescription : taskDescription, objTaskPriority : taskPriority, objTaskDate : taskDate, objTaskTime : taskTime };

    addTask.createTask(taskObj);
    console.log("Task Data Submitted");    
});

function completeTaskCreation() {
    alert("New Task Succesfully Created");

    const allTasksButton = document.getElementById("bottomButton");
    allTasksButton.click();
}

//Edit Task

//Delete Task

//Complete Task
class Completion extends Tasks {
    constructor(taskName, taskDescription, taskPriority, taskDate, taskTime, taskStatus) {
        super(taskName, taskDescription, taskPriority, taskDate, taskTime);
        this._taskStatus = taskStatus;
    }
    get taskStatus() {
        return this._taskStatus;
    }
    set taskStatus(text) {
        if (isNaN(text)) {
            this._taskStatus = text;
        }
        else {
            console.log('You must assign a string value to your task status');
        }
    }

    changeTaskStatus(taskStatus) {
        console.log("You are now creating a task status");
        if (taskStatus == "completed") {
            taskStatus = "uncompleted";
            this._toDoList.push(taskStatus);
        }
    }
}

function changeStatus() {
    let selectedEntry = document.getElementsByClassName("allTasksEntries");
    let length = selectedEntry.length;

    for (i = 0; i < length; i++) {
        selectedEntry[i].addEventListener('dblclick', (e) => {     
            //ERROR RETURNING WINDOW AND NOT ELEMENT
            let select = this.id;
            document.getElementById(select).style.textDecoration = "line-through";
        })
    }
}

//Create Today's Task List

//Create Full Task List
const viewAllTasks = document.getElementById("bottomButton");

viewAllTasks.addEventListener('click', (e) => {
    if (viewAllTasks.className == "btnCreateBottom") {
        createAllTasksList(addTask.toDoList);
    }
    else {
        console.log("Something went wrong");
    }
});

function createAllTasksList(dataArray) {
    arrayLength = dataArray.length;

    for (i = 0; i < arrayLength; i++) {
        console.log("You are creating the ALL TASKS LIST");

        const newListEntry = document.createElement('li');
        newListEntry.className = "allTasksEntries";
        newListEntry.id = i;

        let entriesArray = [];

        entriesArray.push(dataArray[i].objTaskName);
        entriesArray.push(dataArray[i].objTaskDescription);
        entriesArray.push(dataArray[i].objTaskPriority);
        entriesArray.push(dataArray[i].objTaskDate);
        entriesArray.push(dataArray[i].objTaskTime);

        let entriesArrayLength = entriesArray.length;

        for (x = 0; x < entriesArrayLength; x++) {
            const listData = document.createElement('span');
            let listEntry = document.createTextNode(entriesArray[x]);
            listData.appendChild(listEntry);

            newListEntry.append(listData);
        }

        const allTasksList = document.getElementById("allTasksList");
        allTasksList.append(newListEntry);

        changeStatus();
    }
}


