let tasks = []; // array to store all the tasks
let pastTasks = JSON.parse(localStorage.getItem("tasks")); // fetching all the past tasks
console.log(pastTasks);
if (pastTasks) {
  tasks = pastTasks;
  showTasks(); // showing all the past tasks if they exsist
  showCount();
  showProgress();
}
function task(title, done) {
  // a constructor to create an object of task
  this.title = title;
  this.done = done;
}
// adding event listener to the add button
document.querySelector("#add-button").addEventListener("click", () => {
  let title = document.querySelector("#task-input").value;
  if (title) {
    addTask(new task(title, false));
  }
  document.querySelector("#task-input").value = "";
});
// function to show all the tasks
function showTasks() {
  let task_list = document.querySelector("#tasks-list");
  task_list.innerHTML = "";
  tasks.forEach((task, index) => {
    task_list.innerHTML += `<li id="${index}" class="task">
    <div class="check-task">
      <input ${
        task.done ? "checked" : ""
      } data-index=${index} onclick="checkTask(this)" class="list-checkbox" type="checkbox" name="task-check" />
      <label data-index=${index} class="list-label ${
      task.done ? "checked" : ""
    }" for="task-check">${task.title}</label>
    </div>
    <i data-index=${index} class="fa-solid fa-trash-can delete-button" onclick=deleteTask(this)></i>
  </li>`;
  });
}
// function to add a task to the list
function addTask(task) {
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  showTasks();
  showCount();
  showProgress();
}
// function to delete a task from the list
function deleteTask(task) {
  let index = task.getAttribute("data-index");
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  showTasks();
  showCount();
  showProgress();
}
// function to check or uncheck a task
function checkTask(task) {
  let index = task.getAttribute("data-index");
  tasks[index].done = !tasks[index].done;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  let label = document.querySelector(`label[data-index="${index}"]`);
  tasks[index].done
    ? label.classList.add("checked")
    : label.classList.remove("checked");
  showCount();
  showProgress();
}
// function to show the current progress based on number tasks checked/completed
function showProgress() {
  let percent = document.querySelector("#percent-value");
  percent.style.width = `${calPercent()}%`;
}
// function to show the number of tasks left to be done
function showCount() {
  document.querySelector("#show-task-left").innerHTML = leftCount();
}
// function to calculate the number of tasks left to de done
function leftCount() {
  let done = 0;
  tasks.forEach((task) => {
    if (task.done) {
      done += 1;
    }
  });
  return tasks.length - done;
}
// function to calculate the percentage of progress
function calPercent() {
  let total = tasks.length;
  return ((total - leftCount()) / total) * 100;
}
