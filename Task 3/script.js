const taskInput = document.getElementById('task-input')
const taskForm = document.getElementById('task-form')
const taskList  = document.getElementById('task-list')

taskForm.addEventListener("submit", (e) =>{
     e.preventDefault(); 
     const taskTitle = taskInput.value; 
});
