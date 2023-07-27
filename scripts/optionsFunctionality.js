const task_form_edit = document.querySelector("#form_task_edit");
const modal_edit = document.querySelector(".modalEdit");
const overlay_edit = document.querySelector(".overlayEdit");
const closeModalEdit = document.querySelector(".close_form_task_edit");

const removeModalEdit = function () {
  overlay_edit.classList.add("hidden");
  modal_edit.classList.add("hidden");
};

const showModalEdit = function () {
  overlay_edit.classList.remove("hidden");
  modal_edit.classList.remove("hidden");
};

closeModalEdit.addEventListener("click", removeModalEdit);

overlay_edit.addEventListener("click", removeModalEdit);

listTask.addEventListener("click", function (e) {
  if (e.target.classList.contains("remove")) {
    const [id] = e.target.closest("li").classList;
    const activityLog = JSON.parse(localStorage.getItem("activityLog"));
    let newData = JSON.parse(localStorage.getItem("data"));
    newData = newData.map((obj) => {
      obj.dueDate = new Date(obj.dueDate);
      return obj;
    });
    for (let i = 0; i < newData.length; i++) {
      if (newData[i].id === Number(id)) {
        activityLog.push({
          action: "delete",
          data: newData[i],
        });
        newData.splice(i, i + 1);
        break;
      }
    }
    localStorage.setItem("activityLog", JSON.stringify(activityLog));
    localStorage.setItem("data", JSON.stringify(newData));
    render(newData, showAll);
  } else if (e.target.classList.contains("edit")) {
    const [id] = e.target.closest("li").classList;
    modal_edit.setAttribute("data-tab", id);
    showModalEdit();
  } else if (e.target.classList.contains("done")) {
    let newData = JSON.parse(localStorage.getItem("data"));
    newData = newData.map((obj) => {
      obj.dueDate = new Date(obj.dueDate);
      return obj;
    });
    const [id] = e.target.closest("li").classList;
    for (let i = 0; i < newData.length; i++) {
      if (newData[i].id === Number(id)) {
        newData[i].done = !newData[i].done;
        break;
      }
    }
    localStorage.setItem("data", JSON.stringify(newData));
    render(newData, showAll);
  } else if (e.target.classList.contains("deleteSubtask")) {
    let newData = JSON.parse(localStorage.getItem("data"));
    newData = newData.map((obj) => {
      obj.dueDate = new Date(obj.dueDate);
      return obj;
    });
    const [id] = e.target.closest(".task_and_option").classList;
    const pos = e.target.getAttribute("data-tab");
    for (let i = 0; i < newData.length; i++) {
      if (newData[i].id === Number(id)) {
        newData[i].subtask.splice(pos, pos + 1);
        break;
      }
    }
    localStorage.setItem("data", JSON.stringify(newData));
    render(newData, showAll);
  }
});

task_form_edit.addEventListener("submit", function (event) {
  event.preventDefault();
  let newData = JSON.parse(localStorage.getItem("data"));
  let id = modal_edit.getAttribute("data-tab");
  newData = newData.map((obj) => {
    obj.dueDate = new Date(obj.dueDate);
    return obj;
  });
  const taskTitle = task_form_edit.elements.form_task_title_edit.value;
  const taskDescription =
    task_form_edit.elements.form_task_description_edit.value;

  const form_task_subtasks_edit = document.querySelector(
    ".form_task_subtasks_edit"
  );
  const inputElements = form_task_subtasks_edit.querySelectorAll(
    "input[name='form_task_subtask_edit[]']"
  );
  const subtask = Array.from(inputElements, (input) => input.value);
  if (subtask.length === 1 && subtask[0] === "") subtask.splice(0, 1);

  const taskCategory = task_form_edit.elements.form_task_category_edit.value;
  const taskPriority = task_form_edit.elements.form_task_priority_edit.value;
  const taskTag =
    task_form_edit.elements.form_task_tag_edit.value.length > 0
      ? task_form_edit.elements.form_task_tag_edit.value.split(" ")
      : [];
  console.log(taskTag);
  const taskDueDate = task_form_edit.elements.form_task_dueDate_edit.value;
  let dueDate;
  if (taskDueDate) dueDate = new Date(taskDueDate);

  for (let i = 0; i < newData.length; i++) {
    if (newData[i].id === Number(id)) {
      newData[i].title = taskTitle ? taskTitle : newData[i].title;
      newData[i].description = taskDescription
        ? taskDescription
        : newData[i].description;
      newData[i].category = taskCategory ? taskCategory : newData[i].category;
      newData[i].priority = taskPriority ? taskPriority : newData[i].priority;
      newData[i].dueDate = dueDate ? dueDate : newData[i].dueDate;
      newData[i].tags = [...newData[i].tags, ...taskTag];
      if (subtask.length !== 0) {
        for (let st of subtask) newData[i].subtask.push(st);
      }
      const activityLog = JSON.parse(localStorage.getItem("activityLog"));
      activityLog.push({
        action: "edit",
        data: newData[i],
      });
      localStorage.setItem("activityLog", JSON.stringify(activityLog));
      localStorage.setItem("data", JSON.stringify(newData));
      task_form_edit.reset();
      removeModalEdit();
      render(newData, showAll);
      break;
    }
  }
});
