let tasksList = [
    {
        value: 'Task 1'
    },
    {
        value: 'Task 2'
    },
    {
        value: 'Task 3'
    }
]

function initializeData() {
    loadSessionStorageTasks();
    displayTaskList();
}

function loadSessionStorageTasks() {
    const storedTasksList = sessionStorage.getItem('tasksListKey');
    if (storedTasksList) {
        tasksList = JSON.parse(storedTasksList);
    }
}

function saveTaskToSessionStorage() {
    sessionStorage.setItem('tasksListKey', JSON.stringify(tasksList));
}

function displayTaskList() {
    const tasksContainer = document.querySelector('.tasks-container');
    tasksContainer.innerHTML = '';

    for(let i = 0; i < tasksList.length; i++) {
        tasksList[i].id = i;

        if(tasksList[i].isChecked) {
            tasksContainer.innerHTML += 
            `<div class="task-item">
                <p class="task-number">${i+1}</p>
                <p class="task-info">${tasksList[i].value}</p>
                <p class="task-status">${tasksList[i].status}</p>
                <button onclick="removeTask(event)" class="delete-button" data-id="${i}" type="button">delete</button>
            </div>`;
        }
        else {
            tasksContainer.innerHTML += 
            `<div class="task-item">
                <p class="task-number">${i+1}</p>
                <p class="task-info">${tasksList[i].value}</p>
                <input class="task-checkbox" onchange="handleCheckbox(event)" data-id="${i}" type="checkbox">
                <button onclick="removeTask(event)" class="delete-button" data-id="${i}" type="button">delete</button>
            </div>`;
        }
    }
    displayTasksAmount();
}

function displayTasksAmount() {
    const tasksDone = document.querySelector('.tasks-done');
    const totalTasks = document.querySelector('.total-tasks');

    let completedTasksCounter = 0;
    for(let i = 0; i < tasksList.length; i++) {
        if(tasksList[i].isChecked) {
            completedTasksCounter++;
        }
    }

    tasksDone.innerHTML = completedTasksCounter;
    totalTasks.innerHTML = tasksList.length;
}

function handleCheckbox(event) {
    const id = event.target.dataset.id;
    tasksList[id].isChecked = true;
    tasksList[id].status = 'done';

    saveTaskToSessionStorage();
    displayTaskList();
}

function addTask() {
    const taskInput = document.querySelector('.task-input');
    const newTask = {};

    if(!taskInput.value) {
        return;
    }

    newTask.value = taskInput.value;
    tasksList.unshift(newTask);
    taskInput.value = '';

    saveTaskToSessionStorage();
    displayTaskList();
}

function removeTask(event) {
    const id = event.target.dataset.id;
    tasksList.splice(id, 1);
    saveTaskToSessionStorage();
    displayTaskList();
}