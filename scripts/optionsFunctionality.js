const task_form_edit = document.querySelector("#form_task_edit");

const modal_edit = document.querySelector(".modalEdit");
const overlay_edit = document.querySelector(".overlayEdit");

const removeModalEdit = function () {
  overlay_edit.classList.add("hidden");
  modal_edit.classList.add("hidden");
};
listTask.addEventListener("click", function (e) {
  if (e.target.classList.contains("remove")) {
    const [id] = e.target.closest("li").classList;
    let data = [...JSON.parse(localStorage.getItem("data"))];
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === Number(id)) {
        data.splice(i, i + 1);
        activityLog.push({
          action: "delete",
          data: data[i],
        });
        localStorage.setItem("activityLog", JSON.stringify(activityLog));
        break;
      }
    }
    localStorage.setItem("data", JSON.stringify(data));
    render(data, showAll);
  } else if (e.target.classList.contains("edit")) {
    const [id] = e.target.closest("li").classList;
    overlay_edit.classList.remove("hidden");
    modal_edit.setAttribute("data-tab", id);
    modal_edit.classList.remove("hidden");
    overlay_edit.addEventListener("click", removeModalEdit);
  } else if (e.target.classList.contains("done")) {
    let data = [...JSON.parse(localStorage.getItem("data"))];
    const [id] = e.target.closest("li").classList;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === Number(id)) {
        data[i].done = !data[i].done;
        break;
      }
    }
    localStorage.setItem("data", JSON.stringify(data));
    render(data, showAll);
  } else if (e.target.classList.contains("deleteSubtask")) {
    let data = [...JSON.parse(localStorage.getItem("data"))];
    const [id] = e.target.closest(".task_and_option").classList;
    const pos = e.target.getAttribute("data-tab");
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === Number(id)) {
        data[i].subtask.splice(pos, pos + 1);
        break;
      }
    }
    localStorage.setItem("data", JSON.stringify(data));
    render(data, showAll);
  }
});

task_form_edit.addEventListener("submit", function (event) {
  event.preventDefault();
  let data = [...JSON.parse(localStorage.getItem("data"))];
  let id = modal_edit.getAttribute("data-tab");
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
  const taskTag = task_form_edit.elements.form_task_tag_edit.value;
  const taskDueDate = task_form_edit.elements.form_task_dueDate_edit.value;

  for (let i = 0; i < data.length; i++) {
    if (data[i].id === Number(id)) {
      data[i].title = taskTitle ? taskTitle : data[i].title;
      data[i].description = taskDescription
        ? taskDescription
        : data[i].description;
      data[i].category = taskCategory ? taskCategory : data[i].category;
      data[i].priority = taskPriority ? taskPriority : data[i].priority;
      data[i].dueDate = taskDueDate ? new Date(taskDueDate) : data[i].dueDate;

      if (subtask.length !== 0) {
        for (let st of subtask) data[i].subtask.push(st);
      }
      let x = new Date(Date.now());
      x = new Intl.DateTimeFormat("en-us").format(x);
      activityLog.push({
        action: "edit",
        data: data[i],
      });
      localStorage.setItem("activityLog", JSON.stringify(activityLog));
      localStorage.setItem("data", JSON.stringify(data));
      task_form_edit.reset();
      removeModalEdit();
      render(data, showAll);
      break;
    }
  }
});
