// Get the list container and the input fields
const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('taskInput');
const dateTimeInput = document.getElementById('dateTimeInput'); // NEW

// Initial Data List - updated to include a date/time string
const initialTasks = [
    { text: "Grocery Shopping (Milk, Eggs, Bread)", datetime: "2025-09-30T10:00" },
    { text: "Finish JavaScript To-Do App 💻", datetime: "2025-09-25T14:30" },
    { text: "Call the Dentist for Appointment", datetime: "2025-10-01T09:00" },
    { text: "Go for a 30-minute walk 🚶‍♀️", datetime: "2025-10-02T09:00" } // add task as object gor list
];

// Date and time
function formatDateTime(dateTimeString) {
    if (!dateTimeString) {
        return ""; 
    }
    const options = { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
    };
    return new Date(dateTimeString).toLocaleString(undefined, options);
}

// Function to load and display the initial data
function loadInitialTasks() {
    initialTasks.forEach(task => {
        // Pass both properties to the creation function
        createTaskElement(task.text, task.datetime);
    });
}

// **CALL THE FUNCTION TO LOAD DATA WHEN THE SCRIPT RUNS**
loadInitialTasks();


/**
 * CREATE operation: Adds a new task to the list.
 */
function addTask() {
    const taskText = taskInput.value.trim();
    const taskDateTime = dateTimeInput.value; // Get the date/time value

    // Do nothing if the task input is empty
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    // Call a function to render the new task
    createTaskElement(taskText, taskDateTime);

    // Clear the input fields after adding the task
    taskInput.value = '';
    dateTimeInput.value = ''; // Clear date/time field
}

/**
 * Helper function to create the LI element for a new task.
 * @param {string} text - The text content of the task.
 * @param {string} dateTime - The date/time string from the input.
 */
function createTaskElement(text, dateTime) {
    const listItem = document.createElement('li');
    // Store the raw dateTime on the listItem for easier editing later
    listItem.dataset.datetime = dateTime; 

    // Create a span for the task text
    const taskTextSpan = document.createElement('span');
    taskTextSpan.className = 'task-text';
    
    // Combine task text and formatted date/time for display
    const formattedDate = formatDateTime(dateTime);
    taskTextSpan.innerHTML = `
        <strong style="margin-right: 10px;">${text}</strong>
        ${formattedDate ? `<small style="color: #6c757d;">(Due: ${formattedDate})</small>` : ''}
    `;
    
    listItem.appendChild(taskTextSpan);

    // Container for action buttons (rest of the logic remains the same)
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'action-buttons';

    // Create the EDIT button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit-btn';
    editButton.onclick = function() {
        // Pass the listItem to access both the text and the stored date/time
        editTask(listItem, taskTextSpan);
    };
    buttonContainer.appendChild(editButton);

    // Create the DELETE button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-btn';
    deleteButton.onclick = function() {
        deleteTask(listItem);
    };
    buttonContainer.appendChild(deleteButton);

    listItem.appendChild(buttonContainer);
    taskList.appendChild(listItem); // Add the new task to the UL
}

/**
 * UPDATE operation: Edits an existing task.
 */
function editTask(listItem, taskTextSpan) {
    // 1. Get current values from the list item
    const currentText = listItem.querySelector('strong').textContent;
    const currentDateTime = listItem.dataset.datetime;

    // 2. Prompt for new text
    const newText = prompt("Edit task description:", currentText);

    if (newText === null || newText.trim() === "") {
        return; // User cancelled or entered empty text
    }

    // 3. Prompt for new date/time (less user-friendly, but works with prompt)
    const newDateTime = prompt("Edit task date/time (e.g., YYYY-MM-DDTHH:MM):", currentDateTime);

    // 4. Update the stored data and display
    const finalDateTime = (newDateTime !== null) ? newDateTime.trim() : currentDateTime;
    listItem.dataset.datetime = finalDateTime; // Update stored value
    
    const formattedDate = formatDateTime(finalDateTime);
    
    // Re-render the task display
    taskTextSpan.innerHTML = `
        <strong style="margin-right: 10px;">${newText.trim()}</strong>
        ${formattedDate ? `<small style="color: #6c757d;">(Due: ${formattedDate})</small>` : ''}
    `;
}


/**
 * DELETE operation: Removes a task from the list.
 */
function deleteTask(listItem) {
    if (confirm("Are you sure you want to delete this task?")) {
        listItem.remove();
    }
}

// Allows pressing 'Enter' key to add a task
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});