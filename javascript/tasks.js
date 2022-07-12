
const taskNameInput = document.getElementById("taskName");
const taskDescriptionInput = document.getElementById("taskDescription");
const taskPriorityInput = document.getElementById("taskPriority");
const taskDateInput = document.getElementById("taskDate");
const taskTimeInput = document.getElementById("taskTime");

//localStorage.removeItem("tasksData");

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
        saveLocalStorage(this.toDoList);
        completeTaskCreation();
    }
}

const addTask = new Tasks();
const sumbitTask = document.getElementById("btnFormSubmit");

let data = addTask.toDoList;

//Create Task
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

function saveLocalStorage(taskArray) {
    let myArray = JSON.stringify(taskArray);
    console.log(myArray)
    let myJSON = JSON.parse(myArray);
    console.log(myJSON);  

    const existingData = localStorage.getItem("tasksData");
    console.log(existingData);

    if (existingData == null) {
        let userData = JSON.stringify(myJSON);

        localStorage.setItem("tasksData", userData);
        console.log("local storage successfully saved");
    }
    else if (existingData !== null) {
        let myJSONArray = JSON.parse(existingData);
        localStorage.removeItem("tasksData");
        console.log(myJSONArray);
    
        let finalArray = myJSONArray.concat(myJSON);
        console.log(finalArray);
        let userData = JSON.stringify(finalArray);

        localStorage.setItem("tasksData", userData);
        console.log("local storage successfully saved");
    }
    else {
        console.log("Something Went Wrong When Attempting to Create a Task");
    }
}

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

//Change Task Status
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

//HTML Load
window.onload = function() {
    if (topButton.className == "btnCreateTop") {
        let list = localStorage.getItem("tasksData");
        let jsList = JSON.parse(list);

        createTodaysList(jsList);
    }
    else {
        console.log("Something Went Wrong While Attempting to Generate Today's Task List")
    }
}

//Create Today's Task List
const todaysTasksList = document.getElementById("topButton");

todaysTasksList.addEventListener('click', (e) => {
    if (todaysTasksList.className == "btnCreateTop") {
        let list = localStorage.getItem("tasksData");
        let jsList = JSON.parse(list);

        createTodaysList(jsList);
    }
    else {
        console.log("Something Went Wrong While Attempting to Generate Today's Task List")
    }
});

function createTodaysList(dataArray) {
    let arrayLength = dataArray.length;

    for (i = 0; i < arrayLength; i++) {
        console.log("You are creating the Todays Task List");

        let entriesArray = [];

        let today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        if (today == dataArray[i].objTaskDate) {
            const newListEntry = document.createElement('li');
            newListEntry.className = "allTasksEntries";
            newListEntry.id = i;

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

            //List Buttons
            const spanBtn = document.createElement('span'); 

            const editButton = document.createElement('button');
            const deleteButton = document.createElement('button');

            editButton.className = "listEditButton";
            deleteButton.className = "listDeleteButton";

            let editBtn = document.createTextNode("Edit");
            let deleteBtn = document.createTextNode("Del");

            editButton.appendChild(editBtn);
            deleteButton.appendChild(deleteBtn);

            spanBtn.append(editButton);
            spanBtn.append(deleteButton);

            newListEntry.append(spanBtn);

            const todaysTasksList = document.getElementById("todaysTasksList");       
            todaysTasksList.append(newListEntry);
            console.log(todaysTasksList);  
        }
        else {
            console.log("This task is NOT scheduled for Today");
        }
    }
}

//Create Full Task List
const viewAllTasks = document.getElementById("bottomButton");

viewAllTasks.addEventListener('click', (e) => {
    if (viewAllTasks.className == "btnCreateBottom") {
        let tasksData = localStorage.getItem("tasksData");
        let myJSONData = JSON.parse(tasksData);
        console.log(myJSONData);        

        clearList();
        createAllTasksList(myJSONData);
    }
    else {
        console.log("Something Went Wrong While Attempting to Generate the All Tasks List");
    }
});

function createAllTasksList(dataArray) {
    let arrayLength = dataArray.length;
    console.log(arrayLength);

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

        //List Buttons
        const spanBtn = document.createElement('span'); 

        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');

        editButton.className = "listEditButton";
        deleteButton.className = "listDeleteButton";

        let editBtn = document.createTextNode("Edit");
        let deleteBtn = document.createTextNode("Del");

        editButton.appendChild(editBtn);
        deleteButton.appendChild(deleteBtn);

        spanBtn.append(editButton);
        spanBtn.append(deleteButton);

        newListEntry.append(spanBtn);

        const allTasksList = document.getElementById("allTasksList");       
        allTasksList.append(newListEntry);
        console.log(allTasksList);        
    }

    changeStatus();
    taskManipulation();

    const sortSelection = document.getElementById("sortList");
    sortSelection.click();
}

function taskManipulation() {
    //Edit Task
    let editTask = document.getElementsByClassName("listEditButton");
    let editBtnCount = editTask.length;

    for (i = 0; i < editBtnCount; i++) {
        editTask[i].addEventListener('click', (e) => {
            console.log("Attempting to EDIT a Task");
        });
    }

    //Delete Task
    const deleteTask = document.getElementsByClassName("listDeleteButton");
    let deleteBtnCount = deleteTask.length;

    for (i = 0; i < deleteBtnCount; i++) {
        deleteTask[i].addEventListener('click', (e) => {
            console.log("Attempting to DELETE a Task");
        });
    }
}

//Clear Tasks List
function clearList() {
    console.log("attempting to clear list")
    const list = document.getElementsByClassName("allTasksEntries");

    while (list.length > 0) {
        list[0].remove();
        console.log("list item removed");
    }
}

//Sort Tasks
const sortSelection = document.getElementById("sortList");

sortSelection.addEventListener('click', (e) => {
    let list = localStorage.getItem("tasksData");
    let jsList = JSON.parse(list);
    let sortValue = e.target.value;

    if (sortValue == "Name") {
        let test = jsList.sort(sortByName);
        console.log(test);
        clearList();
        createAllTasksList(test);
    }
    else if (sortValue == "Priority") {
        let test = jsList.sort(sortByPriotity);
        console.log(test);
        clearList();
        createAllTasksList(test);
    }
    else if (sortValue == "Date") {
        let test = jsList.sort(sortByDate);
        console.log(test);
        clearList();
        createAllTasksList(test);
    }
    else {
        console.log("Something Went Wring While Attempting To Sort a List");
    }
});

function sortByName(a, b) {
    if (a.objTaskName < b.objTaskName) {
        return -1;
    }
    else if (a.objTaskName > b.objTaskName) {
        return 1;
    }
    else {
        return 0;
    }
}

function sortByPriotity(a, b) {
    if (a.objTaskPriority < b.objTaskPriority) {
        return -1;
    }
    else if (a.objTaskPriority > b.objTaskPriority) {
        return 1;
    }
    else {
        return 0;
    }
}

function sortByDate(a, b) {
    if (a.objTaskDate < b.objTaskDate) {
        return -1;
    }
    else if (a.objTaskDate > b.objTaskDate) {
        return 1;
    }
    else {
        return 0;
    }
}

/*
function compare( a, b ) {
    if ( a.objTaskDate < b.objTaskDate ){
      return -1;
    }
    if ( a.objTaskDate > b.objTaskDate ){
      return 1;
    }
    return 0;
  }
  
  let list = localStorage.getItem("tasksData");
  let jsList = JSON.parse(list);

  let test = jsList.sort(compare);
  console.log(test);
  */