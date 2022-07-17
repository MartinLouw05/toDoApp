
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
    set toDoList(text) {
        if (isNaN(text)) {
            this._toDoList = text;
        }
        else {
            console.log('You must assign a string value to your task');
        }
    }

    //Create Task
    createTask(newTask) {
        console.log("You are now creating a Task");
        this._toDoList.push(newTask);       
        saveLocalStorage(this.toDoList);        

        this._toDoList = [];
    }
}

//Create Task
const addTask = new Tasks();
const sumbitTask = document.getElementById("btnFormSubmit");

let data = addTask.toDoList;

sumbitTask.addEventListener('click', (e) => {
    if (sumbitTask.id == "btnFormSubmit") {
        e.preventDefault();
        let taskName = taskNameInput.value;
        let taskDescription = taskDescriptionInput.value;
        let taskPriority = taskPriorityInput.value;
        let taskDate = taskDateInput.value;
        let taskTime = taskTimeInput.value;
        let taskStatus = "incomplete";

        if (taskName !== null || taskDescription !== null || taskPriority !== null || taskDate !== null || taskTime !== null) {
            let taskObj = { objTaskName : taskName, objTaskDescription : taskDescription, objTaskPriority : taskPriority, objTaskDate : taskDate, objTaskTime : taskTime, objTaskStatus : taskStatus };
    
            addTask.createTask(taskObj);
            console.log(taskObj);
            console.log("Task Data Submitted");

            completeTaskCreation();
        }
        else {
            console.log("Some Values are Missing");
            alert("Task Creation Failed.  Please Ensure That All Fields Have Been Filled");
        }   
    }
    else {
        console.log("The Submit Button ID is Incorrect");
    }  
});

function completeTaskCreation() {
    alert("New Task Succesfully Created");

    const allTasksButton = document.getElementById("bottomButton");
    allTasksButton.click();
}

function saveLocalStorage(taskArray) {
    let myArray = JSON.stringify(taskArray);
    let myJSON = JSON.parse(myArray); 

    const existingData = localStorage.getItem("tasksData");

    if (existingData == null) {
        let userData = JSON.stringify(myJSON);

        localStorage.setItem("tasksData", userData);
        console.log("local storage successfully saved");
    }
    else if (existingData !== null) {
        let myJSONArray = JSON.parse(existingData);
        localStorage.removeItem("tasksData");
    
        let finalArray = myJSONArray.concat(myJSON);
        let userData = JSON.stringify(finalArray);

        localStorage.setItem("tasksData", userData);
        console.log("local storage successfully saved");
    }
    else {
        console.log("Something Went Wrong When Attempting to Create a Task");
    }
}

//Change Task Status
function changeStatus() {
    let selectedEntry = document.getElementsByClassName("allTasksEntries");
    let length = selectedEntry.length;

    let data = localStorage.getItem("tasksData");
    let jsData = JSON.parse(data);

    for (i = 0; i < length; i++) {
        selectedEntry[i].addEventListener('dblclick', (e) => {  
            console.log("Attempting to Change a Task's Status");
            
            let selectedName = e.path[1].childNodes[0].innerHTML;
            let selectedDescription = e.path[1].childNodes[1].innerHTML;
            let selectedPriority = e.path[1].childNodes[2].innerHTML;
            let selectedDate = e.path[1].childNodes[3].innerHTML;
            let selectedTime = e.path[1].childNodes[4].innerHTML;
            
            let selectedObj = { objTaskName : selectedName, objTaskDescription : selectedDescription, objTaskPriority : selectedPriority, objTaskDate : selectedDate, objTaskTime : selectedTime };
            let stringObj = JSON.stringify(selectedObj);
            let length = jsData.length;
            console.log(stringObj);

            for (i = 0; i < length; i++) {
                let jsName = jsData[i].objTaskName;
                let jsDescription = jsData[i].objTaskDescription;
                let jsPriority = jsData[i].objTaskPriority;
                let jsDate = jsData[i].objTaskDate;
                let jsTime = jsData[i].objTaskTime;
                let jsStatus = jsData[i].objTaskStatus;
                
                let jsObject = { objTaskName : jsName, objTaskDescription : jsDescription, objTaskPriority : jsPriority, objTaskDate : jsDate, objTaskTime : jsTime };

                if (JSON.stringify(jsObject) == stringObj) {
                    console.log("This entry matches the selected entry");
                    selectedTask = i;
                    sessionStorage.setItem("selectedTask", selectedTask);

                    let select = e.path[1].id;
                    sessionStorage.setItem("selectedLineItem", select);                    

                    updateStatus();
                }
                else {
                    console.log("Not This Entry");
                }
            }                     
        })
    }
}

function updateStatus() {
    let storageData = localStorage.getItem("tasksData");
    let jsData = JSON.parse(storageData);

    let selectedTask = sessionStorage.getItem("selectedTask");
    sessionStorage.removeItem("selectedTask");
    let select = sessionStorage.getItem("selectedLineItem");

    let taskName = jsData[selectedTask].objTaskName;
    let taskDescription = jsData[selectedTask].objTaskDescription;
    let taskPriority = jsData[selectedTask].objTaskPriority;
    let taskDate = jsData[selectedTask].objTaskDate;
    let taskTime = jsData[selectedTask].objTaskTime;
    let taskStatus = jsData[selectedTask].objTaskStatus;

    localStorage.removeItem("tasksData");
    jsData.splice(selectedTask, 1);

    if (taskStatus == "incomplete") {
        taskStatus = "complete";
        console.log("this task is now marked as complete");
        document.getElementById(select).style.textDecoration = "line-through";
    }
    else if (taskStatus == "complete") {
        taskStatus = "incomplete";
        console.log("this task is now marked as incomplete");
        document.getElementById(select).style.textDecoration = "none";
    }
    else {
        console.log("This Task Does Not Have a Status");
    }

    let updateObj = { objTaskName : taskName, objTaskDescription : taskDescription, objTaskPriority : taskPriority, objTaskDate : taskDate, objTaskTime : taskTime, objTaskStatus : taskStatus };

    jsData.push(updateObj);
    let data = JSON.stringify(jsData);
    localStorage.setItem("tasksData", data);
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
        clearList();

        let list = localStorage.getItem("tasksData");
        let jsList = JSON.parse(list);

        createTodaysList(jsList);
    }
    else {
        console.log("Something Went Wrong While Attempting to Generate Today's Task List")
    }
});

function createTodaysList(dataArray) {
    if (dataArray !== null) {
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
                entriesArray.push(dataArray[i].objTaskStatus);
                                
                for (x = 0; x < 5; x++) {
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

                //Check Entry Status
                let status = dataArray[i].objTaskStatus;
                
                if (status == "complete") {
                    document.getElementById(i).style.textDecoration = "line-through";
                }
                else {
                    console.log("Task " + i + " Has Not Been Completed");
                }

                //Check Entry Priority
                let priority = dataArray[i].objTaskPriority;

                if (priority == "Low") {
                    document.getElementById(i).style.backgroundColor = "lightgreen";
                }
                if (priority == "Medium") {
                    document.getElementById(i).style.backgroundColor = "lightsalmon";
                }
                if (priority == "High") {
                    document.getElementById(i).style.backgroundColor = "lightcoral";
                }
                else {
                    console.log("This Task Has No Priority");
                }
            }
            else {
                console.log("This task is NOT scheduled for Today");
            }
        }

        changeStatus();
        taskManipulation();
    }
    else {
        console.log("No Tasks Data Found");
    }
}

//Create Full Task List
const viewAllTasks = document.getElementById("bottomButton");

viewAllTasks.addEventListener('click', (e) => {
    if (viewAllTasks.className == "btnCreateBottom") {
        clearList();

        let tasksData = localStorage.getItem("tasksData");
        let myJSONData = JSON.parse(tasksData);  

        createAllTasksList(myJSONData);
    }
    else {
        console.log("Something Went Wrong While Attempting to Generate the All Tasks List");
    }
});

function createAllTasksList(dataArray) {
    if (dataArray !== null) {
        let arrayLength = dataArray.length;

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
            entriesArray.push(dataArray[i].objTaskStatus);

            for (x = 0; x < 5; x++) {
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

            //Check Entry Status
            let status = dataArray[i].objTaskStatus;
            
            if (status == "complete") {
                document.getElementById(i).style.textDecoration = "line-through";
            }
            else {
                console.log("Task " + i + " Has Not Been Completed");
            }

            //Check Entry Priority
            let priority = dataArray[i].objTaskPriority;

            if (priority == "Low") {
                document.getElementById(i).style.backgroundColor = "lightgreen";
            }
            if (priority == "Medium") {
                document.getElementById(i).style.backgroundColor = "lightsalmon";
            }
            if (priority == "High") {
                document.getElementById(i).style.backgroundColor = "lightcoral";
            }
            else {
                console.log("This Task Has No Priority");
            }
        }

        changeStatus();
        allTasksListManipulation();

        const sortSelection = document.getElementById("sortList");
        sortSelection.click();
    }
    else {
        console.log("No Tasks Data Found");
    }
}

function allTasksListManipulation() {
    //Edit Task
    let editTask = document.getElementsByClassName("listEditButton");
    let editBtnCount = editTask.length;

    let data = localStorage.getItem("tasksData");
    let jsData = JSON.parse(data);

    for (i = 0; i < editBtnCount; i++) {
        editTask[i].addEventListener('click', (e) => {
            console.log("Attempting to EDIT a Task");
            const bottomBtn = document.getElementById("bottomButton");
            bottomBtn.click();           

            //Return Correct Task
            let selectedName = e.path[2].childNodes[0].innerHTML;
            let selectedDescription = e.path[2].childNodes[1].innerHTML;
            let selectedPriority = e.path[2].childNodes[2].innerHTML;
            let selectedDate = e.path[2].childNodes[3].innerHTML;
            let selectedTime = e.path[2].childNodes[4].innerHTML;
            let selectedObj = { objTaskName : selectedName, objTaskDescription : selectedDescription, objTaskPriority : selectedPriority, objTaskDate : selectedDate, objTaskTime : selectedTime };
            let stringObj = JSON.stringify(selectedObj);
            let length = jsData.length;
            console.log(stringObj);

            for (i = 0; i < length; i++) {
                let jsName = jsData[i].objTaskName;
                let jsDescription = jsData[i].objTaskDescription;
                let jsPriority = jsData[i].objTaskPriority;
                let jsDate = jsData[i].objTaskDate;
                let jsTime = jsData[i].objTaskTime;
                let jsStatus = jsData[i].objTaskStatus;
                
                let jsObject = { objTaskName : jsName, objTaskDescription : jsDescription, objTaskPriority : jsPriority, objTaskDate : jsDate, objTaskTime : jsTime };

                if (JSON.stringify(jsObject) == stringObj) {
                    console.log(i)
                    console.log(jsData[i]);
                    selectedTask = i;
                }
                else {
                    console.log("Not This Entry");
                }
            }
            
            //selectedTask = e.path[2].id;   
            console.log(selectedTask);
            sessionStorage.setItem("selectedTask", selectedTask);       
                        
            let editName = jsData[selectedTask].objTaskName;
            let editDescription = jsData[selectedTask].objTaskDescription;
            let editPriority = jsData[selectedTask].objTaskPriority;
            let editDate = jsData[selectedTask].objTaskDate;
            let editTime = jsData[selectedTask].objTaskTime;
            let editStatus = jsData[selectedTask].objTaskStatus;
            sessionStorage.setItem("editStatus", editStatus);

            let taskNameInput = document.getElementById("taskName");
            let taskDescriptionInput = document.getElementById("taskDescription");
            let taskPriorityInput = document.getElementById("taskPriority");
            let taskDateInput = document.getElementById("taskDate");
            let taskTimeInput = document.getElementById("taskTime");

            //Edit Form
            taskNameInput.value = editName;
            taskDescriptionInput.value = editDescription;
            taskPriorityInput.value = editPriority;
            taskDateInput.value = editDate;
            taskTimeInput.value = editTime;           
                        
            document.getElementById("formHeader").innerHTML = "Edit Task";
            
            changeDisplay(formSubmitButton, 'none');
            changeDisplay(formEditButton, 'block'); 
        })   
    }

    //Delete Task
    const deleteTask = document.getElementsByClassName("listDeleteButton");
    let deleteBtnCount = deleteTask.length;

    for (i = 0; i < deleteBtnCount; i++) {
        deleteTask[i].addEventListener('click', (e) => {
            console.log("Attempting to DELETE a Task");

            //Return Correct Task
            let selectedName = e.path[2].childNodes[0].innerHTML;
            let selectedDescription = e.path[2].childNodes[1].innerHTML;
            let selectedPriority = e.path[2].childNodes[2].innerHTML;
            let selectedDate = e.path[2].childNodes[3].innerHTML;
            let selectedTime = e.path[2].childNodes[4].innerHTML;
            let selectedObj = { objTaskName : selectedName, objTaskDescription : selectedDescription, objTaskPriority : selectedPriority, objTaskDate : selectedDate, objTaskTime : selectedTime };
            let stringObj = JSON.stringify(selectedObj);
            let length = jsData.length;
            console.log(stringObj);

            for (i = 0; i < length; i++) {
                let jsName = jsData[i].objTaskName;
                let jsDescription = jsData[i].objTaskDescription;
                let jsPriority = jsData[i].objTaskPriority;
                let jsDate = jsData[i].objTaskDate;
                let jsTime = jsData[i].objTaskTime;
                let jsStatus = jsData[i].objTaskStatus;
                
                let jsObject = { objTaskName : jsName, objTaskDescription : jsDescription, objTaskPriority : jsPriority, objTaskDate : jsDate, objTaskTime : jsTime };

                if (JSON.stringify(jsObject) == stringObj) {
                    console.log(i)
                    console.log(jsData[i]);
                    select = i;
                    sessionStorage.setItem("deleteTask", select);
                }
                else {
                    console.log("Not This Entry");
                }
            }

            let selectDelete = sessionStorage.getItem("deleteTask");

            if (selectDelete !== null) {
                //let select = e.path[2].id;
                console.log(select)
                document.getElementById(select).remove();

                let savedData = localStorage.getItem("tasksData");
                localStorage.removeItem("tasksData");
                let jsonSavedData = JSON.parse(savedData);
                
                jsonSavedData.splice(select, 1);
                alert("Task Successfully Deleted");

                let newData = JSON.stringify(jsonSavedData);
                localStorage.setItem("tasksData", newData);
                console.log("local storage updated");   
            }
            else {
                console.log("Something Went Wrong While Trying to Delete the Task");
            }         
        })
    }
}

editSubmitButton = document.getElementById("btnEditSubmit");     

editSubmitButton.addEventListener('click', (e) => {
    let storageData = localStorage.getItem("tasksData");
    let jsData = JSON.parse(storageData);
    let selectedTask = sessionStorage.getItem("selectedTask");
    sessionStorage.removeItem("selectedTask");

    e.preventDefault();
    localStorage.removeItem("tasksData");
    jsData.splice(selectedTask, 1);

    let taskName = taskNameInput.value;
    let taskDescription = taskDescriptionInput.value;
    let taskPriority = taskPriorityInput.value;
    let taskDate = taskDateInput.value;
    let taskTime = taskTimeInput.value;
    let taskStatus = sessionStorage.getItem("editStatus");

    let taskObj = { objTaskName : taskName, objTaskDescription : taskDescription, objTaskPriority : taskPriority, objTaskDate : taskDate, objTaskTime : taskTime, objTaskStatus : taskStatus };

    jsData.push(taskObj);
    let data = JSON.stringify(jsData);
    console.log(data);

    localStorage.setItem("tasksData", data);              

    alert("Task Has Been Successfully Edited");

    const allTasksButton = document.getElementById("bottomButton");
    allTasksButton.click();
})

function taskManipulation() {
    //Edit Task
    let editTask = document.getElementsByClassName("listEditButton");
    let editBtnCount = editTask.length;

    let data = localStorage.getItem("tasksData");
    let jsData = JSON.parse(data);

    for (i = 0; i < editBtnCount; i++) {
        editTask[i].addEventListener('click', (e) => {
            console.log("Attempting to EDIT a Task");
            const taskEdit = document.getElementById("topButton");
            taskEdit.click();
            
            selectedTask = e.path[2].id;   
            console.log(selectedTask);
            sessionStorage.setItem("selectedTask", selectedTask);        
            
            let editName = jsData[selectedTask].objTaskName;
            let editDescription = jsData[selectedTask].objTaskDescription;
            let editPriority = jsData[selectedTask].objTaskPriority;
            let editDate = jsData[selectedTask].objTaskDate;
            let editTime = jsData[selectedTask].objTaskTime;
            let editStatus = jsData[selectedTask].objTaskStatus;
            sessionStorage.setItem("editStatus", editStatus);

            let taskNameInput = document.getElementById("taskName");
            let taskDescriptionInput = document.getElementById("taskDescription");
            let taskPriorityInput = document.getElementById("taskPriority");
            let taskDateInput = document.getElementById("taskDate");
            let taskTimeInput = document.getElementById("taskTime");

            //Edit Form
            taskNameInput.value = editName;
            taskDescriptionInput.value = editDescription;
            taskPriorityInput.value = editPriority;
            taskDateInput.value = editDate;
            taskTimeInput.value = editTime;           
                        
            document.getElementById("formHeader").innerHTML = "Edit Task";
            
            changeDisplay(formSubmitButton, 'none');
            changeDisplay(formEditButton, 'block'); 
        })   
    }

    //Delete Task
    const deleteTask = document.getElementsByClassName("listDeleteButton");
    let deleteBtnCount = deleteTask.length;

    for (i = 0; i < deleteBtnCount; i++) {
        deleteTask[i].addEventListener('click', (e) => {
            console.log("Attempting to DELETE a Task");
            let select = e.path[2].id;
            document.getElementById(select).remove();

            let savedData = localStorage.getItem("tasksData");
            localStorage.removeItem("tasksData");
            let jsonSavedData = JSON.parse(savedData);
            
            jsonSavedData.splice(select, 1);
            alert("Task Successfully Deleted");

            let newData = JSON.stringify(jsonSavedData);
            localStorage.setItem("tasksData", newData);
            console.log("local storage updated");            
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
        clearList();
        createAllTasksList(test);
    }
    else if (sortValue == "Priority") {
        let test = jsList.sort(sortByPriotity);
        clearList();
        createAllTasksList(test);
    }
    else if (sortValue == "Date") {
        let test = jsList.sort(sortByDate);
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