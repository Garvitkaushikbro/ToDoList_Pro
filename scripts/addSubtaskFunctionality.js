const form_add_subtask_icon = document.querySelector(".form_add_subtask_icon");
const form_task_subtasks = document.querySelector(".form_task_subtasks");

form_add_subtask_icon.addEventListener("click", function (e) {
  e.preventDefault();
  const input = document.createElement("input");
  input.type = "text";
  input.name = "form_task_subtask[]";
  input.placeholder = "Enter another subtask";
  form_task_subtasks.appendChild(input);
});

const form_add_subtask_icon_edit = document.querySelector(
  ".form_add_subtask_icon_edit"
);
const form_task_subtasks_edit = document.querySelector(
  ".form_task_subtasks_edit"
);

form_add_subtask_icon_edit.addEventListener("click", function (e) {
  e.preventDefault();
  const input = document.createElement("input");
  input.type = "text";
  input.name = "form_task_subtask_edit[]";
  input.placeholder = "Enter another subtask";
  form_task_subtasks_edit.appendChild(input);
});
