
const taskNameInput = document.getElementById("taskName");
const taskDescriptionInput = document.getElementById("taskDescription");
const taskPriorityInput = document.getElementById("taskPriority");
const taskDateInput = document.getElementById("taskDate");
const taskTimeInput = document.getElementById("taskTime");

//Remove All Tasks Data from Local Storage
//Leave this Commented
//localStorage.removeItem("tasksData");

//Clear Input Field when User Click on the Element
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
    e.preventDefault();
    taskNameInput.value = '';
    taskDescriptionInput.value = '';
    taskPriorityInput.value = '';
    taskDateInput.value = '';
    taskTimeInput.value = '';
})

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
            //User Must Assign a String Value to Their Task
        }
    }

    //Create Task
    createTask(newTask) {
        //Creating a Task
        this._toDoList.push(newTask);       
        saveLocalStorage(this.toDoList);        

        this._toDoList = [];
    }
}

//Create Task
const addTask = new Tasks();
const sumbitTask = document.getElementById("btnFormSubmit");

let data = addTask.toDoList;

//Event for Submitting a New Task
sumbitTask.addEventListener('click', (e) => {
    if (sumbitTask.id == "btnFormSubmit") {        
        let taskName = taskNameInput.value;
        let taskDescription = taskDescriptionInput.value;
        let taskPriority = taskPriorityInput.value;
        let taskDate = taskDateInput.value;
        let taskTime = taskTimeInput.value;
        let taskStatus = "incomplete";

        if (taskName !== '' && taskDescription !== '' && taskPriority !== '' && taskDate !== '' && taskTime !== '') {
            let taskObj = { objTaskName : taskName, objTaskDescription : taskDescription, objTaskPriority : taskPriority, objTaskDate : taskDate, objTaskTime : taskTime, objTaskStatus : taskStatus };
    
            addTask.createTask(taskObj);
            //Task Data Submitted

            e.preventDefault();
            completeTaskCreation();
        }
        else {
            //Some Values are Missing
            alert("Task Creation Failed.  Please Ensure That All Fields Have Been Filled");
        }   
    }
    else {
        //The Submit Button ID is Incorrect
    }  
});

//Complete Task Creation Process
//Alert User and Change Display
function completeTaskCreation() {
    alert("New Task Succesfully Created");

    const allTasksButton = document.getElementById("bottomButton");
    allTasksButton.click();
}

//Save Task Data to Local Storage
function saveLocalStorage(taskArray) {
    let myArray = JSON.stringify(taskArray);
    let myJSON = JSON.parse(myArray); 

    const existingData = localStorage.getItem("tasksData");

    //Check for Existing Task's Data
    if (existingData == null) {
        let userData = JSON.stringify(myJSON);

        localStorage.setItem("tasksData", userData);
    }
    else if (existingData !== null) {
        let myJSONArray = JSON.parse(existingData);
        localStorage.removeItem("tasksData");
    
        let finalArray = myJSONArray.concat(myJSON);
        let userData = JSON.stringify(finalArray);

        localStorage.setItem("tasksData", userData);
    }
    else {
        //Something Went Wrong When Attempting to Create a Task
    }
}

//Change Task Status
function changeStatus() {
    let selectedEntry = document.getElementsByClassName("allTasksEntries");
    let length = selectedEntry.length;

    let data = localStorage.getItem("tasksData");
    let jsData = JSON.parse(data);

    //Return Correct Task
    for (i = 0; i < length; i++) {
        selectedEntry[i].addEventListener('dblclick', (e) => {              
            let selectedName = e.path[1].childNodes[0].innerHTML;
            let selectedDescription = e.path[1].childNodes[1].innerHTML;
            let selectedPriority = e.path[1].childNodes[2].innerHTML;
            let selectedDate = e.path[1].childNodes[3].innerHTML;
            let selectedTime = e.path[1].childNodes[4].innerHTML;
            
            //Create Selected Task Object
            let selectedObj = { objTaskName : selectedName, objTaskDescription : selectedDescription, objTaskPriority : selectedPriority, objTaskDate : selectedDate, objTaskTime : selectedTime };
            let stringObj = JSON.stringify(selectedObj);
            let length = jsData.length;

            for (i = 0; i < length; i++) {
                let jsName = jsData[i].objTaskName;
                let jsDescription = jsData[i].objTaskDescription;
                let jsPriority = jsData[i].objTaskPriority;
                let jsDate = jsData[i].objTaskDate;
                let jsTime = jsData[i].objTaskTime;
                let jsStatus = jsData[i].objTaskStatus;
                
                let jsObject = { objTaskName : jsName, objTaskDescription : jsDescription, objTaskPriority : jsPriority, objTaskDate : jsDate, objTaskTime : jsTime };

                //Check for Matching Task Data
                if (JSON.stringify(jsObject) == stringObj) {
                    //Save Index of Matching Task
                    selectedTask = i;
                    sessionStorage.setItem("selectedTask", selectedTask);

                    let select = e.path[1].id;
                    sessionStorage.setItem("selectedLineItem", select);                    

                    updateStatus();
                }
                else {
                    //This Entry Does Not Match
                }
            }                     
        })
    }
}

//Update Task Status
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

    //Check Task's Current Status
    if (taskStatus == "incomplete") {
        //Mark Task as Complete
        taskStatus = "complete";
        document.getElementById(select).style.textDecoration = "line-through";
    }
    else if (taskStatus == "complete") {
        //Mark Task as Incomplete
        taskStatus = "incomplete";
        document.getElementById(select).style.textDecoration = "none";
    }
    else {
        //This Task Does Not Have a Status
    }

    let updateObj = { objTaskName : taskName, objTaskDescription : taskDescription, objTaskPriority : taskPriority, objTaskDate : taskDate, objTaskTime : taskTime, objTaskStatus : taskStatus };

    //Save Updated Task's Data to Local Storage
    jsData.push(updateObj);
    let data = JSON.stringify(jsData);
    localStorage.setItem("tasksData", data);
}

//Load On Start Up
window.onload = function() {
    if (topButton.className == "btnCreateTop") {
        //Create Today's Task List
        let list = localStorage.getItem("tasksData");
        let jsList = JSON.parse(list);

        let jsSort = jsList.sort(sortByTime);
        createTodaysList(jsSort);
    }
    else {
        //Something Went Wrong While Attempting to Generate Today's Task List
    }
}

//Create Today's Task List Variable
const todaysTasksList = document.getElementById("topButton");

//Event Listener
todaysTasksList.addEventListener('click', (e) => {
    if (todaysTasksList.className == "btnCreateTop") {
        //Create Today's Task List
        clearList();

        let list = localStorage.getItem("tasksData");
        let jsList = JSON.parse(list);

        let jsSort = jsList.sort(sortByTime);
        createTodaysList(jsSort);
    }
    else {
        //Something Went Wrong While Attempting to Generate Today's Task List
    }
});

//Create Today's Task List
function createTodaysList(dataArray) {
    if (dataArray !== null) {
        let arrayLength = dataArray.length;

        for (i = 0; i < arrayLength; i++) {
            //Creating the Today's Task List
            let entriesArray = [];

            let today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();

            today = yyyy + '-' + mm + '-' + dd;

            //Check if the Task's Date Matches Today's Date
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
                
                //Create Element for Matching Task
                for (x = 0; x < 5; x++) {
                    const listData = document.createElement('span');
                    let listEntry = document.createTextNode(entriesArray[x]);
                    listData.appendChild(listEntry);

                    newListEntry.append(listData);
                }          

                //Create Buttons for the Matching Entry
                const spanBtn = document.createElement('span'); 

                const editButton = document.createElement('button');
                const deleteButton = document.createElement('button');

                editButton.className = "listEditButton";
                deleteButton.className = "listDeleteButton";

                let editBtn = document.createTextNode("&#128397");
                let deleteBtn = document.createTextNode("Del");

                editButton.appendChild(editBtn);
                deleteButton.appendChild(deleteBtn);

                spanBtn.append(editButton);
                spanBtn.append(deleteButton);

                newListEntry.append(spanBtn);

                const todaysTasksList = document.getElementById("todaysTasksList");       
                todaysTasksList.append(newListEntry);
                
                editButton.innerHTML = "&#9998";
                deleteButton.innerHTML = "&#128465";

                //Check Entry Status
                let status = dataArray[i].objTaskStatus;
                
                if (status == "complete") {
                    document.getElementById(i).style.textDecoration = "line-through";
                }
                else {
                    //console.log("Task " + i + " Has Not Been Completed");
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
                    //This Task Has No Priority
                }
            }
            else {
                //This task is NOT scheduled for Today
            }
        }

        changeStatus();
        taskManipulation();        
    }
    else {
        //No Tasks Data Found
    }
}

//Create All Tasks List Variable
const viewAllTasks = document.getElementById("bottomButton");

//Event Listener
viewAllTasks.addEventListener('click', (e) => {
    if (viewAllTasks.className == "btnCreateBottom") {
        //Create All Tasks List
        clearList();

        let tasksData = localStorage.getItem("tasksData");
        let myJSONData = JSON.parse(tasksData);  

        createAllTasksList(myJSONData);
    }
    else {
        //Something Went Wrong While Attempting to Generate the All Tasks List
    }
});

//Create All Tasks List
function createAllTasksList(dataArray) {
    if (dataArray !== null) {
        let arrayLength = dataArray.length;

        for (i = 0; i < arrayLength; i++) {
            //Creating the All Tasks List
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

            //Create Element for Each Saved Task
            for (x = 0; x < 5; x++) {
                const listData = document.createElement('span');
                let listEntry = document.createTextNode(entriesArray[x]);
                listData.appendChild(listEntry);

                newListEntry.append(listData);
            }

            //Create Buttons for Each Saved Task
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

            editButton.innerHTML = "&#9998";
            deleteButton.innerHTML = "&#128465";

            //Check Entry Status
            let status = dataArray[i].objTaskStatus;
            
            if (status == "complete") {
                document.getElementById(i).style.textDecoration = "line-through";
            }
            else {
                //console.log("Task " + i + " Has Not Been Completed");
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
                //This Task Has No Priority
            }
        }

        changeStatus();
        allTasksListManipulation();

        const sortSelection = document.getElementById("sortList");
        sortSelection.click();
    }
    else {
        //No Tasks Data Found
    }
}

//Edit or Delete Functions for the All Tasks List
function allTasksListManipulation() {
    //Edit Task
    let editTask = document.getElementsByClassName("listEditButton");
    let editBtnCount = editTask.length;

    let data = localStorage.getItem("tasksData");
    let jsData = JSON.parse(data);

    for (i = 0; i < editBtnCount; i++) {
        //Event Listener
        editTask[i].addEventListener('click', (e) => {
            //Attempting to EDIT a Task
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

            //Compare Selected Task with Saved Tasks
            for (i = 0; i < length; i++) {
                let jsName = jsData[i].objTaskName;
                let jsDescription = jsData[i].objTaskDescription;
                let jsPriority = jsData[i].objTaskPriority;
                let jsDate = jsData[i].objTaskDate;
                let jsTime = jsData[i].objTaskTime;
                let jsStatus = jsData[i].objTaskStatus;
                
                let jsObject = { objTaskName : jsName, objTaskDescription : jsDescription, objTaskPriority : jsPriority, objTaskDate : jsDate, objTaskTime : jsTime };

                if (JSON.stringify(jsObject) == stringObj) {
                    //Save Index of Matching Task
                    selectedTask = i;
                }
                else {
                    //This Entry Does Not Match
                }
            }
            
            //selectedTask = e.path[2].id;   
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
        //Event Listener
        deleteTask[i].addEventListener('click', (e) => {
            //Return Correct Task
            let selectedName = e.path[2].childNodes[0].innerHTML;
            let selectedDescription = e.path[2].childNodes[1].innerHTML;
            let selectedPriority = e.path[2].childNodes[2].innerHTML;
            let selectedDate = e.path[2].childNodes[3].innerHTML;
            let selectedTime = e.path[2].childNodes[4].innerHTML;
            let selectedObj = { objTaskName : selectedName, objTaskDescription : selectedDescription, objTaskPriority : selectedPriority, objTaskDate : selectedDate, objTaskTime : selectedTime };
            let stringObj = JSON.stringify(selectedObj);
            let length = jsData.length;

            //Compare Selected Task with Saved Tasks
            for (i = 0; i < length; i++) {
                let jsName = jsData[i].objTaskName;
                let jsDescription = jsData[i].objTaskDescription;
                let jsPriority = jsData[i].objTaskPriority;
                let jsDate = jsData[i].objTaskDate;
                let jsTime = jsData[i].objTaskTime;
                let jsStatus = jsData[i].objTaskStatus;
                
                let jsObject = { objTaskName : jsName, objTaskDescription : jsDescription, objTaskPriority : jsPriority, objTaskDate : jsDate, objTaskTime : jsTime };

                if (JSON.stringify(jsObject) == stringObj) {
                    //Save Index of Matching Task
                    select = i;
                    sessionStorage.setItem("deleteTask", select);
                }
                else {
                    //This Entry Does Not Match
                }
            }

            let selectDelete = sessionStorage.getItem("deleteTask");

            //Delete Task from Saved Tasks and Remove its Element
            if (selectDelete !== null) {
                let select = e.path[2].id;
                document.getElementById(select).remove();

                let savedData = localStorage.getItem("tasksData");
                localStorage.removeItem("tasksData");
                let jsonSavedData = JSON.parse(savedData);
                
                jsonSavedData.splice(selectDelete, 1);
                alert("Task Successfully Deleted");

                let newData = JSON.stringify(jsonSavedData);
                localStorage.setItem("tasksData", newData); 
            }
            else {
                //Something Went Wrong While Trying to Delete the Task
            }         
        })
    }
}

//Edit Task Variable
editSubmitButton = document.getElementById("btnEditSubmit");     

//Event Listener
editSubmitButton.addEventListener('click', (e) => {
    //Edit Task
    let storageData = localStorage.getItem("tasksData");
    let jsData = JSON.parse(storageData);
    let selectedTask = sessionStorage.getItem("selectedTask");    

    let taskName = taskNameInput.value;
    let taskDescription = taskDescriptionInput.value;
    let taskPriority = taskPriorityInput.value;
    let taskDate = taskDateInput.value;
    let taskTime = taskTimeInput.value;
    let taskStatus = sessionStorage.getItem("editStatus");

    if (taskName !== '' && taskDescription !== '' && taskPriority !== '' && taskDate !== '' && taskTime !== '') {
        //Editing Task Data
        sessionStorage.removeItem("selectedTask");
        localStorage.removeItem("tasksData");
        jsData.splice(selectedTask, 1);

        let taskObj = { objTaskName : taskName, objTaskDescription : taskDescription, objTaskPriority : taskPriority, objTaskDate : taskDate, objTaskTime : taskTime, objTaskStatus : taskStatus };

        jsData.push(taskObj);
        let data = JSON.stringify(jsData);

        localStorage.setItem("tasksData", data);              

        e.preventDefault();
        alert("Task Has Been Successfully Edited");

        const allTasksButton = document.getElementById("bottomButton");
        allTasksButton.click();
    }
    else {
        //Some Values are Missing
        alert("Task Updating Failed.  Please Ensure That All Fields Have Been Filled");
    }  
})

//Edit and Delete Functions for the Today's Task List
function taskManipulation() {
    //Edit Task
    let editTask = document.getElementsByClassName("listEditButton");
    let editBtnCount = editTask.length;

    let data = localStorage.getItem("tasksData");
    let jsData = JSON.parse(data);

    for (i = 0; i < editBtnCount; i++) {
        //Event Listener
        editTask[i].addEventListener('click', (e) => {
            //Attempting to EDIT a Task
            const taskEdit = document.getElementById("topButton");
            taskEdit.click();
            
            //Return Correct Task
            let selectedName = e.path[2].childNodes[0].innerHTML;
            let selectedDescription = e.path[2].childNodes[1].innerHTML;
            let selectedPriority = e.path[2].childNodes[2].innerHTML;
            let selectedDate = e.path[2].childNodes[3].innerHTML;
            let selectedTime = e.path[2].childNodes[4].innerHTML;
            let selectedObj = { objTaskName : selectedName, objTaskDescription : selectedDescription, objTaskPriority : selectedPriority, objTaskDate : selectedDate, objTaskTime : selectedTime };
            let stringObj = JSON.stringify(selectedObj);
            let length = jsData.length;

            //Compare Selected Task with Saved Tasks
            for (i = 0; i < length; i++) {
                let jsName = jsData[i].objTaskName;
                let jsDescription = jsData[i].objTaskDescription;
                let jsPriority = jsData[i].objTaskPriority;
                let jsDate = jsData[i].objTaskDate;
                let jsTime = jsData[i].objTaskTime;
                let jsStatus = jsData[i].objTaskStatus;
                
                let jsObject = { objTaskName : jsName, objTaskDescription : jsDescription, objTaskPriority : jsPriority, objTaskDate : jsDate, objTaskTime : jsTime };

                if (JSON.stringify(jsObject) == stringObj) {
                    //Save Entry Index that Matches
                    selectedTask = i;
                }
                else {
                    //Not This Entry
                }
            }
            
            //selectedTask = e.path[2].id;   
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
            //Attempting to DELETE a Task
        
            //Return Correct Task
            let selectedName = e.path[2].childNodes[0].innerHTML;
            let selectedDescription = e.path[2].childNodes[1].innerHTML;
            let selectedPriority = e.path[2].childNodes[2].innerHTML;
            let selectedDate = e.path[2].childNodes[3].innerHTML;
            let selectedTime = e.path[2].childNodes[4].innerHTML;
            let selectedObj = { objTaskName : selectedName, objTaskDescription : selectedDescription, objTaskPriority : selectedPriority, objTaskDate : selectedDate, objTaskTime : selectedTime };
            let stringObj = JSON.stringify(selectedObj);
            let length = jsData.length;

            for (i = 0; i < length; i++) {
                let jsName = jsData[i].objTaskName;
                let jsDescription = jsData[i].objTaskDescription;
                let jsPriority = jsData[i].objTaskPriority;
                let jsDate = jsData[i].objTaskDate;
                let jsTime = jsData[i].objTaskTime;
                let jsStatus = jsData[i].objTaskStatus;
                
                let jsObject = { objTaskName : jsName, objTaskDescription : jsDescription, objTaskPriority : jsPriority, objTaskDate : jsDate, objTaskTime : jsTime };

                //Compare Selected Task with Saved Tasks
                if (JSON.stringify(jsObject) == stringObj) {
                    //Save Index for Matching Task
                    select = i;
                    sessionStorage.setItem("deleteTask", select);
                }
                else {
                    //Not This Entry
                }
            }
            
            //Delete Selected Tasks from the Saved Tasks and Remove its Element from the List
            let selectDelete = sessionStorage.getItem("deleteTask");

            if (selectDelete !== null) {
                let select = e.path[2].id;
                document.getElementById(select).remove();

                let savedData = localStorage.getItem("tasksData");
                localStorage.removeItem("tasksData");
                let jsonSavedData = JSON.parse(savedData);
                
                jsonSavedData.splice(selectDelete, 1);
                alert("Task Successfully Deleted");

                let newData = JSON.stringify(jsonSavedData);
                localStorage.setItem("tasksData", newData);  
            }
            else {
                //Something Went Wrong While Trying to Delete the Task
            }            
        });
    }
}

//Clear Tasks List
function clearList() {
    //Attempting to clear list
    const list = document.getElementsByClassName("allTasksEntries");

    while (list.length > 0) {
        //List item removed
        list[0].remove();        
    }
}

//Sort Tasks
const sortSelection = document.getElementById("sortList");

sortSelection.addEventListener('click', (e) => {
    let list = localStorage.getItem("tasksData");
    let jsList = JSON.parse(list);
    let sortValue = e.target.value;

    //Sort Task by Name
    if (sortValue == "Name") {
        let test = jsList.sort(sortByName);
        clearList();
        createAllTasksList(test);
    }
    //Sort Task by Priority
    else if (sortValue == "Priority") {
        let test = jsList.sort(sortByPriotity);
        clearList();
        createAllTasksList(test);
    }
    //Sort Task by Date
    else if (sortValue == "Date") {
        let test = jsList.sort(sortByDate);
        clearList();
        createAllTasksList(test);
    }
    else {
        //Something Went Wring While Attempting To Sort a List
    }
});

//Sort Functions
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

function sortByTime(a, b) {
    if (a.objTaskTime < b.objTaskTime) {
        return -1;
    }
    else if (a.objTaskTime > b.objTaskTime) {
        return 1;
    }
    else {
        return 0;
    }
}

let buttonsColumn = document.getElementById("navButtons");
let mediaQuery = window.matchMedia('(max-width: 768px)');

function screenTestOne(e) {
    if (e.matches) {
        buttonsColumn.className = "col-lg-12";
    }
    else {
        buttonsColumn.className = "col-md-4";
    }
}

mediaQuery.addEventListener('change', screenTestOne);
