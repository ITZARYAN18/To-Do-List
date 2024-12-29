document.addEventListener("DOMContentLoaded", ()=>{
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));

    if (storedTasks) {
        storedTasks.forEach((task)=> tasks.push(task));
        updateTasksList();
        updateStats();
    }
})
let tasks = [];

const saveTasks = ()=>{
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
const addTask = () => {
    const taskInput = document.getElementById('taskinput');
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = "";
        updateTasksList();
        updateStats();
        saveTasks();
    }
};

const updateTasksList = () => {
    const taskList = document.querySelector('.task-list');
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? 'completed' : ''}">
                    <input 
                        type="checkbox" 
                        class="checkbox" 
                        ${task.completed ? 'checked' : ''} 
                        onchange="toggleTaskComplete(${index})"
                    />
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <img src="./img/edit.png" alt="Edit" onClick="editTask(${index})"/>
                    <img src="./img/bin.png" alt="Delete" onClick="deleteTask(${index})"/>
                </div>
            </div>
        `;
        taskList.append(listItem);
    });
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updateStats();
    saveTasks();
};

const editTask = (index) => {
    const newText = prompt("Edit your task:", tasks[index].text);
    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        updateTasksList();
        updateStats();
        saveTasks();
    }
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
    saveTasks();
};

const updateStats = () => {
    const completeTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = totalTasks === 0 ? 0 : (completeTasks / totalTasks) * 100;
    const progressbar = document.getElementById('progress');
    progressbar.style.width = `${progress}%`;
    document.getElementById('numbers').textContent = `${completeTasks} / ${totalTasks}`;
    if (tasks.length && completeTasks === totalTasks) {
        animation();
    };
};

document.getElementById("new-task").addEventListener('click', function (e) {
    e.preventDefault();
    addTask();
});

const animation = ()=>{
    const count = 200,
    defaults = {
      origin: { y: 0.7 },
    };
  
  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    );
  }
  
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  
  fire(0.2, {
    spread: 60,
  });
  
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
};
