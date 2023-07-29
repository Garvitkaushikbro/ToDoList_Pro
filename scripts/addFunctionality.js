const operations = document.querySelector(".operations");
const modal = document.querySelector(".modal");
const modalSearch = document.querySelector(".modalSearch");
const overlay = document.querySelector(".overlay");
const overlaySearch = document.querySelector(".overlaySearch");
const task_form = document.querySelector("#form_task");
const taskFormSearch = document.querySelector("#form_task_search");
const closeModal = document.querySelector(".close_form_task");
const closeModalSearch = document.querySelector(".close_form_task_search");

const removeModal = function () {
  overlay.classList.add("hidden");
  modal.classList.add("hidden");
};

const showModal = function () {
  overlay.classList.remove("hidden");
  modal.classList.remove("hidden");
};

const removeModalSearch = function () {
  overlaySearch.classList.add("hidden");
  modalSearch.classList.add("hidden");
};

const showModalSearch = function () {
  overlaySearch.classList.remove("hidden");
  modalSearch.classList.remove("hidden");
};

overlay.addEventListener("click", removeModal);

overlaySearch.addEventListener("click", removeModalSearch);

closeModal.addEventListener("click", removeModal);

closeModalSearch.addEventListener("click", removeModalSearch);

operations.addEventListener("click", function (e) {
  // event delegation
  e.preventDefault();
  const target = e.target.closest(".ops");
  if (!target) return;

  if (target.classList.contains("add")) {
    showModal();
  } else if (target.classList.contains("search")) {
    showModalSearch();
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
  const Subtask = Array.from(inputElements, (input) => input.value);
  const subtask = Subtask.filter((st) => st !== "");

  const taskCategory = task_form.elements.form_task_category.value;
  const taskPriority = task_form.elements.form_task_priority.value;
  let taskTag =
    task_form.elements.form_task_tag.value.length > 0
      ? task_form.elements.form_task_tag.value.split(" ")
      : [];
  taskTag = taskTag.filter((t) => t !== "");
  const taskDueDate = task_form.elements.form_task_dueDate.value;
  const dateInput = document.getElementById("timeInputForm").value;
  // Split dateInput into hours and minutes
  const [hours, minutes] = dateInput.split(":");

  // Split taskDueDate into year, month, and day
  const [year, month, day] = taskDueDate.split("-");

  // Create the Date object with date and time
  const dueDate = new Date(year, month - 1, day, hours, minutes);

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
      timestamp: new Date(),
    },
  });
  localStorage.setItem("activityLog", JSON.stringify(activityLog));
  localStorage.setItem("data", JSON.stringify(newData));
  localStorage.setItem("id", JSON.stringify(id));
  task_form.reset();

  removeModal();
  render(newData, showAll);
});

taskFormSearch.addEventListener("submit", function (event) {
  event.preventDefault();
  let newData = JSON.parse(localStorage.getItem("data"));
  newData = newData.map((obj) => {
    obj.dueDate = new Date(obj.dueDate);
    return obj;
  });
  const keyword = taskFormSearch.elements.form_task_search.value;
  newData = newData.filter((d) => {
    if (d.title.toLowerCase().includes(keyword.toLowerCase())) return true;
    if (d.description.toLowerCase().includes(keyword.toLowerCase()))
      return true;
    if (d.tags.includes(keyword)) return true;
    return false;
  });
  removeModalSearch();
  taskFormSearch.reset();
  render(newData, showAll);
});

const taskTitleInput = document.querySelector(".form_task_title");
const dueDateInput = document.querySelector(".form_task_dueDate");
const timeInput = document.getElementById("timeInputForm");

taskTitleInput.addEventListener("input", function () {
  const title = taskTitleInput.value.toLowerCase();
  const currentDate = new Date();

  if (title.includes("by tomorrow")) {
    const tomorrow = new Date(currentDate);
    tomorrow.setDate(currentDate.getDate() + 1);
    dueDateInput.value = formatDate(tomorrow);
    timeInput.value = "00:00";
    taskTitleInput.value = title.replace("by tomorrow", "");
  } else if (title.includes("by")) {
    const byIndex = title.indexOf("by");
    const dateStr = title.substring(byIndex + 3);
    const dateObject = parseDate(dateStr);
    timeInput.value = `${dateObject.getHours()}:${String(
      dateObject.getMinutes()
    ).padStart(2, "0")}`;
    dueDateInput.value = formatDate(dateObject);
    taskTitleInput.value = title.replace(title.slice(title.indexOf("by")), "");
  }
});

function parseDate(str) {
  // Convert the string to a standard format for parsing
  str = str.replace(/(st|nd|rd|th)/g, "");

  // Split the string into date and time parts
  const [day, month, year, x, y] = str.split(" ");

  timePart = x + " " + y;
  // Get the 12-hour time and AM/PM from the time part
  const [time, ampm] = timePart.split(" ");

  // Convert the hour to 24-hour format
  let hour = parseInt(time);

  if (ampm && ampm.toLowerCase() === "pm" && hour !== 12) {
    hour += 12;
  } else if (ampm && ampm.toLowerCase() === "am" && hour === 12) {
    hour = 0;
  }
  const dateString = day + " " + month + " " + year;
  const date = new Date(Date.parse(dateString));

  date.setHours(hour);
  date.setMinutes(parseInt(time.split(":")[1]) || 0);
  date.setSeconds(0);
  return date;
}

function formatDate(date) {
  const year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}
