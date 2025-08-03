// Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', function() {
    // Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    
    // Load Tasks from Local Storage Function
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
    }
    
    // Create the addTask Function
    function addTask(taskText, save = true) {
        // If called without taskText (from button/enter), get it from input
        if (typeof taskText === 'undefined' || typeof taskText === 'object') {
            taskText = taskInput.value.trim();
            save = true;
        }
        
        // Check if taskText is not empty
        if (taskText === "") {
            alert("Please enter a task");
            return;
        }
        
        // Task Creation and Removal
        // Create a new li element and set its textContent to taskText
        const li = document.createElement('li');
        li.textContent = taskText;
        
        // Create a new button element for removing the task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';
        
        // Assign an onclick event to the remove button that, when triggered, removes the li element from taskList
        removeButton.onclick = function() {
            taskList.removeChild(li);
            
            // Remove from Local Storage
            if (save) {
                removeTaskFromStorage(taskText);
            }
        };
        
        // Append the remove button to the li element
        li.appendChild(removeButton);
        
        // Append the li to taskList
        taskList.appendChild(li);
        
        // Clear the task input field by setting taskInput.value to an empty string
        if (save) {
            taskInput.value = '';
            
            // Save to Local Storage
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }
    
    // Function to remove task from Local Storage
    function removeTaskFromStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
    
    // Load existing tasks when page loads
    loadTasks();
    
    // Attach Event Listeners
    // Add an event listener to addButton that calls addTask when the button is clicked
    addButton.addEventListener('click', addTask);
    
    // Add an event listener to taskInput for the 'keypress' event to allow tasks to be added by pressing the "Enter" key
    taskInput.addEventListener('keypress', function(event) {
        // Inside this event listener, check if event.key is equal to 'Enter' before calling addTask
        if (event.key === 'Enter') {
            addTask();
        }
    });
});