const operations = document.querySelector(".operations");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const task_form = document.querySelector("#form_task");
const closeModal = document.querySelector(".close_form_task");

const removeModal = function () {
  overlay.classList.add("hidden");
  modal.classList.add("hidden");
};

const showModal = function () {
  overlay.classList.remove("hidden");
  modal.classList.remove("hidden");
};

overlay.addEventListener("click", removeModal);

closeModal.addEventListener("click", removeModal);

operations.addEventListener("click", function (e) {
  // event delegation
  e.preventDefault();
  const target = e.target.closest(".ops");
  if (!target) return;

  if (target.classList.contains("add")) {
    showModal();
  } else if (target.classList.contains("search")) {
  }
});

task_form.addEventListener("submit", function (event) {
  event.preventDefault();
  let newData = JSON.parse(localStorage.getItem("data"));
  let id = JSON.parse(localStorage.getItem("id"));
  newData = newData.map((obj) => {
    obj.dueDate = new Date(obj.dueDate);
    return obj;
  });
  const taskTitle = task_form.elements.form_task_title.value;
  const taskDescription = task_form.elements.form_task_description.value;

  const form_task_subtasks = document.querySelector(".form_task_subtasks");
  const inputElements = form_task_subtasks.querySelectorAll(
    "input[name='form_task_subtask[]']"
  );
  const subtask = Array.from(inputElements, (input) => input.value);
  if (subtask.length === 1 && subtask[0] === "") subtask.splice(0, 1);

  const taskCategory = task_form.elements.form_task_category.value;
  const taskPriority = task_form.elements.form_task_priority.value;
  const taskTag = task_form.elements.form_task_tag.value.split(" ");
  const taskDueDate = task_form.elements.form_task_dueDate.value;
  const dueDate = new Date(taskDueDate);
  newData.push({
    id: id,
    title: taskTitle,
    description: taskDescription,
    subtask: subtask,
    category: taskCategory,
    priority: taskPriority,
    dueDate: dueDate,
    done: false,
    tags: taskTag,
  });
  id++;
  let activityLog = JSON.parse(localStorage.getItem("activityLog"));
  activityLog.push({
    action: "add",
    data: {
      id: id,
      title: taskTitle,
      description: taskDescription,
      subtask: subtask,
      category: taskCategory,
      priority: taskPriority,
      dueDate: dueDate,
      done: false,
    },
  });
  localStorage.setItem("activityLog", JSON.stringify(activityLog));
  localStorage.setItem("data", JSON.stringify(newData));
  localStorage.setItem("id", JSON.stringify(id));
  task_form.reset();

  removeModal();
  render(newData, showAll);
});
