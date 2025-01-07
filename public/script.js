document.addEventListener('DOMContentLoaded', loadTasks);
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveData() {
    const taskId = document.getElementById('taskId').value;
    const taskDescription = document.getElementById('taskDescription').value.trim();
    const assignedTo = document.getElementById('assignedTo').value.trim();
    const dueDate = document.getElementById('dueDate').value.trim(); 
    const priority = document.getElementById('priority').value;
    const status = document.getElementById('status').value;

    // data validation 
    if (!taskDescription || !assignedTo || !dueDate || !priority || !status) {
        alert('Please fill out every field.');
        return; 
    }

    const taskData = { id: taskId || Date.now().toString(), 
        taskDescription,
         assignedTo,
          dueDate,
           priority,
            status };

    if (taskId) { 
        const taskIndex = tasks.findIndex(task => task.id == taskId);
        tasks[taskIndex] = taskData;
    } else { 
        tasks.push(taskData);
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    clearForm();
    loadTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

//edit task function
function editTask(id) {
    const task = tasks.find(task => task.id === id);
    document.getElementById('taskId').value = task.id;
    document.getElementById('taskDescription').value = task.taskDescription;
    document.getElementById('assignedTo').value = task.assignedTo;
    document.getElementById('dueDate').value = task.dueDate;
    document.getElementById('priority').value = task.priority;
    document.getElementById('status').value = task.status;
}

function clearForm() {
    document.getElementById('taskId').value = '';
    document.getElementById('taskDescription').value = '';
    document.getElementById('assignedTo').value = '';
    document.getElementById('dueDate').value = '';
    document.getElementById('priority').value = '';
    document.getElementById('status').value = '';
}

function loadTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        
        // set background color based on priority
        if (task.priority === 'High') {
            taskElement.style.backgroundColor = '#FB4659';
        } else if (task.priority === 'Medium') {
            taskElement.style.backgroundColor = '#FBAD79';
        } else if (task.priority === 'Low') {
            taskElement.style.backgroundColor = '#7973DB';
        }
        
        if (task.status === 'Completed') {
            taskElement.style.backgroundColor = '#8DDAB0';
        }

        // task details container
        const taskDetails = document.createElement('div');
        taskDetails.classList.add('task-details');

        // displaying task details
        const detailsHTML = `
        <p style="color: white;">Description: ${task.taskDescription}</p>
        <p style="color: white;">Assigned To: ${task.assignedTo}</p>
        <p style="color: white;">Due Date: ${task.dueDate}</p>
        <p style="color: white;">Priority: ${task.priority}</p>
        <p style="color: white;">Status: ${task.status}</p>
    `;
    taskDetails.innerHTML = detailsHTML;

        // buttons 
        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('task-buttons');

        // edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-button');
        editButton.style.backgroundColor = 'white';
        editButton.style.color = 'black';
        editButton.style.padding = '10px'; 
        editButton.style.fontSize = '15px'; 
        editButton.onclick = () => editTask(task.id);

        // delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.style.backgroundColor = 'white';
        deleteButton.style.color = 'black';
        deleteButton.style.padding = '10px'; 
        deleteButton.style.fontSize = '15px';
        deleteButton.onclick = () => deleteTask(task.id);


        // append buttons to container
        buttonsContainer.appendChild(editButton);
        buttonsContainer.appendChild(deleteButton);

        taskElement.appendChild(taskDetails);
        taskElement.appendChild(buttonsContainer);

        taskList.appendChild(taskElement);
    });
}


// search function
function searchData() {
    const searchText = document.getElementById('search').value.toLowerCase();
    const filteredTasks = tasks.filter(task =>
        task.taskDescription.toLowerCase().includes(searchText) ||
        task.assignedTo.toLowerCase().includes(searchText) ||
        task.dueDate.includes(searchText) ||
        task.priority.toLowerCase().includes(searchText) ||
        task.status.toLowerCase().includes(searchText)
    );

    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    filteredTasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        
        // set background color based on priority
        if (task.priority === 'High') {
            taskElement.style.backgroundColor = '#FB4659';
        } else if (task.priority === 'Medium') {
            taskElement.style.backgroundColor = '#FBAD79';
        } else if (task.priority === 'Low') {
            taskElement.style.backgroundColor = '#7973DB';
        }
        
        if (task.status === 'Completed') {
            taskElement.style.backgroundColor = '#8DDAB0';
        }

        // task details container
        const taskDetails = document.createElement('div');
        taskDetails.classList.add('task-details');

        // displaying task details
        const detailsHTML = `
        <p style="color: white;">Description: ${task.taskDescription}</p>
        <p style="color: white;">Assigned To: ${task.assignedTo}</p>
        <p style="color: white;">Due Date: ${task.dueDate}</p>
        <p style="color: white;">Priority: ${task.priority}</p>
        <p style="color: white;">Status: ${task.status}</p>
        `;
        taskDetails.innerHTML = detailsHTML;

        // buttons 
        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('task-buttons');

        // edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-button');
        editButton.style.backgroundColor = 'white';
        editButton.style.color = 'black';
        editButton.style.padding = '10px'; 
        editButton.style.fontSize = '15px'; 
        editButton.onclick = () => editTask(task.id);

        // delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.style.backgroundColor = 'white';
        deleteButton.style.color = 'black';
        deleteButton.style.padding = '10px'; 
        deleteButton.style.fontSize = '15px';
        deleteButton.onclick = () => deleteTask(task.id);

        // append buttons to buttons container
        buttonsContainer.appendChild(editButton);
        buttonsContainer.appendChild(deleteButton);

        // append details and buttons to task element
        taskElement.appendChild(taskDetails);
        taskElement.appendChild(buttonsContainer);

        // append task element to task list
        taskList.appendChild(taskElement);
    });
}

// date validation
const currentDate = new Date().toISOString().split('T')[0];
document.getElementById('dueDate').min = currentDate;


