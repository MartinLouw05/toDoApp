
const topButton = document.getElementById("topButton");
const bottomButton = document.getElementById("bottomButton");

const todaysTasks = document.getElementsByClassName("displayTodaysTasks");
const allTasks = document.getElementsByClassName("displayAllTasks");
const createTask = document.getElementsByClassName("createTask");

topButton.addEventListener('click', (e) => {
    if (topButton.className == "btnToday" && bottomButton.className == "btnCreateBottom") {
        topButton.className = "btnCreateTop";
        topButton.innerHTML = "<img src=\"/images/to-do-list-icon-buy-this-icon-for--0-48-1.png\" alt=\"Create Task Image Not Found\" class=\"btnImage\"><br>";
        topButton.innerHTML += "Create New Task";

        bottomButton.className = "btnViewTasks";
        bottomButton.innerHTML = "<img src=\"/images/to-do-list-icon-buy-this-icon-for--0-48-1.png\" alt=\"Create Task Image Not Found\" class=\"btnImage\"><br>";
        bottomButton.innerHTML += "View All Tasks";

        changeDisplay(allTasks, 'none');
        changeDisplay(createTask, 'none');
        changeDisplay(todaysTasks, 'block');
    }
    else if (topButton.className == "btnCreateTop") {
        topButton.className = "btnToday";
        topButton.innerHTML = "<img src=\"/images/to-do-list-icon-buy-this-icon-for--0-48-1.png\" alt=\"Create Task Image Not Found\" class=\"btnImage\"><br>";
        topButton.innerHTML += "Today's Tasks";

        changeDisplay(todaysTasks, 'none');
        changeDisplay(allTasks, 'none');
        changeDisplay(createTask, 'block');

        document.getElementById("formHeader").innerHTML = "Create New Task";
    }
    else if (topButton.className == "btnToday") {
        topButton.className = "btnCreateTop";
        topButton.innerHTML = "<img src=\"/images/to-do-list-icon-buy-this-icon-for--0-48-1.png\" alt=\"Create Task Image Not Found\" class=\"btnImage\"><br>";
        topButton.innerHTML += "Create New Task";

        changeDisplay(createTask, 'none');
        changeDisplay(allTasks, 'none');
        changeDisplay(todaysTasks, 'block');
    }
    else {
        console.log("ERROR. Something Went Wrong With The Top Button");
    }
});

bottomButton.addEventListener('click', (e) => {
    if (bottomButton.className == "btnViewTasks") {
        bottomButton.className = "btnCreateBottom";
        bottomButton.innerHTML = "<img src=\"/images/to-do-list-icon-buy-this-icon-for--0-48-1.png\" alt=\"Create Task Image Not Found\" class=\"btnImage\"><br>";
        bottomButton.innerHTML += "Create New Task";

        topButton.className = "btnToday";
        topButton.innerHTML = "<img src=\"/images/to-do-list-icon-buy-this-icon-for--0-48-1.png\" alt=\"Create Task Image Not Found\" class=\"btnImage\"><br>";
        topButton.innerHTML += "Today's Tasks";

        changeDisplay(todaysTasks, 'none');
        changeDisplay(createTask, 'none');
        changeDisplay(allTasks, 'block');
    }
    else if (bottomButton.className == "btnCreateBottom") {
        bottomButton.className = "btnViewTasks";
        bottomButton.innerHTML = "<img src=\"/images/to-do-list-icon-buy-this-icon-for--0-48-1.png\" alt=\"Create Task Image Not Found\" class=\"btnImage\"><br>";
        bottomButton.innerHTML += "View All Tasks";

        changeDisplay(allTasks, 'none');
        changeDisplay(todaysTasks, 'none');
        changeDisplay(createTask, 'block');
        
        document.getElementById("formHeader").innerHTML = "Create New Task";
    }
    else {
        console.log("ERROR. Something Went Wrong With The Bottom Button");
    }
});

function changeDisplay(tab, display) {
    let i;
    let tabLength = tab.length;

    for(i = 0; i < tabLength; i++) {
        tab[i].style["display"] = display;
    }
};
