//Variables
const topButton = document.getElementById("topButton");
const bottomButton = document.getElementById("bottomButton");

const todaysTasks = document.getElementsByClassName("displayTodaysTasks");
const allTasks = document.getElementsByClassName("displayAllTasks");
const createTask = document.getElementsByClassName("createTask");

const formSubmitButton = document.getElementsByClassName("formButtonSubmit");
const formEditButton = document.getElementsByClassName("formButtonEdit");

//Event Listeners for the Navigation Buttons
topButton.addEventListener('click', (e) => {
    if (topButton.className == "btnToday" && bottomButton.className == "btnCreateBottom") {
        //Display Today's Task List
        topButton.className = "btnCreateTop";
        topButton.innerHTML = "Create New Task";

        bottomButton.className = "btnViewTasks";
        bottomButton.innerHTML = "View All Tasks";

        changeDisplay(allTasks, 'none');
        changeDisplay(createTask, 'none');
        changeDisplay(todaysTasks, 'block');
    }
    else if (topButton.className == "btnCreateTop") {
        //Display Create Task Page
        topButton.className = "btnToday";
        topButton.innerHTML = "Today's Tasks";

        changeDisplay(todaysTasks, 'none');
        changeDisplay(allTasks, 'none');  
        changeDisplay(formEditButton, 'none'); 
        changeDisplay(formSubmitButton, 'block');     
        changeDisplay(createTask, 'block');

        taskNameInput.value = '';
        taskDescriptionInput.value = '';
        taskPriorityInput.value = '';
        taskDateInput.value = '';
        taskTimeInput.value = '';

        document.getElementById("formHeader").innerHTML = "Create New Task";
    }
    else if (topButton.className == "btnToday") {
        //Display Today's Task List
        topButton.className = "btnCreateTop";
        topButton.innerHTML = "Create New Task";

        changeDisplay(createTask, 'none');
        changeDisplay(allTasks, 'none');
        changeDisplay(todaysTasks, 'block');
    }
    else {
        //console.log("ERROR. Something Went Wrong With The Top Button");
    }
});

bottomButton.addEventListener('click', (e) => {
    if (bottomButton.className == "btnViewTasks") {
        //Display All Tasks
        bottomButton.className = "btnCreateBottom";
        bottomButton.innerHTML = "Create New Task";

        topButton.className = "btnToday";
        topButton.innerHTML = "Today's Tasks";

        changeDisplay(todaysTasks, 'none');
        changeDisplay(createTask, 'none');
        changeDisplay(allTasks, 'block');
    }
    else if (bottomButton.className == "btnCreateBottom") {
        //Display Create Task Page
        bottomButton.className = "btnViewTasks";
        bottomButton.innerHTML = "View All Tasks";

        changeDisplay(allTasks, 'none');
        changeDisplay(todaysTasks, 'none');
        changeDisplay(formEditButton, 'none'); 
        changeDisplay(formSubmitButton, 'block'); 
        changeDisplay(createTask, 'block');

        taskNameInput.value = '';
        taskDescriptionInput.value = '';
        taskPriorityInput.value = '';
        taskDateInput.value = '';
        taskTimeInput.value = '';
        
        document.getElementById("formHeader").innerHTML = "Create New Task";
    }
    else {
        //console.log("ERROR. Something Went Wrong With The Bottom Button");
    }
})

//Change Display Style Property
function changeDisplay(tab, display) {
    let i;
    let tabLength = tab.length;

    for(i = 0; i < tabLength; i++) {
        tab[i].style["display"] = display;
    }
}


