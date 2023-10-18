const buttonToAdd = document.querySelector(".button-to-add")
const inputYourTasks = document.querySelector(".input-your-tasks")
const completeTaskList = document.querySelector(".list-tasks")

let myToDoList = []

function addTaskToList() {

    if (inputYourTasks.value === '') {
        alert("A tarefa não pode ser vazia!")
        return;
    }

    myToDoList.push({
        tarefa: inputYourTasks.value,
        concluida: false
    })

    inputYourTasks.value = ""
    showAllTasks()
}

function showAllTasks() {
    let newTaskList = "";

    myToDoList.forEach((task, index) => {
        newTaskList = newTaskList + `
    <li class="task ${task.concluida && "done"}">
        <img src="./assets/check.png" alt="task-checked" class="task-checked" onclick="taskCompleted(${index})">
        <p>${task.tarefa}</p>
        <img src="assets/delete-list.png" alt="deleted-task" class="deleted-task"onclick="deleteTask(${index})">
    </li>
`

    })

    completeTaskList.innerHTML = newTaskList
    localStorage.setItem("list", JSON.stringify(myToDoList))

}

function taskCompleted(index) {
    myToDoList[index].concluida = !myToDoList[index].concluida

    showAllTasks()
}

function deleteTask(index) {
    myToDoList.splice(index, 1)

    showAllTasks()
}

function reloadTasks() {
    const taskDoLocalStorage = localStorage.getItem("list")

    if (taskDoLocalStorage) {
        myToDoList = JSON.parse(taskDoLocalStorage)
    }

    showAllTasks()

}

reloadTasks()
buttonToAdd.addEventListener("click", addTaskToList)